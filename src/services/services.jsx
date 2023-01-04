import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import FrameImg from "../assets/images/frame.png";

import GetALLServices from "./getServices";

const FETCH_ALL_CATEGORIES = gql`
  query categories {
    categories {
      name
      status
    }
  }
`;
export const ADD_SERVICE = gql`
  mutation addService(
    $name: String!
    $category: String!
    $iconName: String!
    $status: String!
    $iconPath: String!
  ) {
    addService(
      name: $name
      category: $category
      iconName: $iconName
      status: $status
      iconPath: $iconPath
    ) {
      name
      category
      iconName
      iconPath
      status
    }
  }
`;
export const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      path
    }
  }
`;

const ServiceAdd = () => {
  const [previewImage, setpreviewImage] = useState("");
  const [newfile, setFile] = useState("");
  const [serviceName, setserviceName] = useState("");
  const [categoryName, setcategoryName] = useState("");

  const [reloadService, setReloadService] = useState(false);

  const [
    getAllCategories,
    { loading: categoryLoading, data: categorydata, error: categoryerror },
  ] = useLazyQuery(FETCH_ALL_CATEGORIES);

  useEffect(() => {
    getAllCategories();
  }, []);

  const [
    uploadOneFile,
    {
      loading: uploadOneFileLoading,
      data: uploadOneFiledata,
      error: uploadOneFileerror,
    },
  ] = useMutation(UPLOAD_FILE,{
    context: {
      headers: {
        'apollo-require-preflight': true,
      },
    }});

  const [
    addService,
    {
      loading: addServiceLoading,
      data: addServicedata,
      error: addServiceerror,
    },
  ] = useMutation(ADD_SERVICE);
  //const [mutate] = useMutation(UPLOAD_FILE);

  const uploadFile = () => {
    setReloadService(false);
    console.log(categoryName);
    uploadOneFile(newfile);
  };

  useEffect(() => {
    if (uploadOneFiledata) {
      addService({
        variables: {
          name: serviceName,
          category: categoryName,
          iconName: newfile.variables.file.name,
          status: "active",
          iconPath: uploadOneFiledata.singleUpload.path,
        },
      });
    }
  }, [uploadOneFiledata]);

  useEffect(() => {
    if (addServicedata) {
      setFile();
      setcategoryName("");
      setserviceName("");
      setpreviewImage("");
      setReloadService(true);
    }
  }, [addServicedata]);

  const categorySelect = (event) => {
    setcategoryName(event.target.value);
  };
  const serviceSelect = (event) => {
    setserviceName(event.target.value);
  };

  function onChange({
    target: {
      validity,
      files: [file],
      value,
    },
  }) {
    if (validity.valid) {
      setFile({ variables: { file } });
      setpreviewImage(URL.createObjectURL(file));
    }
  }

  if (categoryLoading) {
    return (
      <div className="row mt-5">
        <div className="col-12 text-center text-primary mt-5 p-5 font-weight-bold h5">
          Hold on, services are loading ...
        </div>
      </div>
    );
  }

  if (categorydata) {
    return (
      <div className="row m-0">
        <div className="col-6 p-4">
          <h2 className="font-bold text-primary animated fadeIn mb-4">
            Services -
          </h2>
          <div className="row p-4 bg-green box-shadow rounded animated fadeInUp mt-5 mx-0">
            <div className="col-12 p-0">
              <div className="row m-0">
                <div className="col-12 p-0">
                  {/* <div className="border border-white d-inline-block p-1"></div> */}
                  <label className="custom-file-upload bg-pink text-primary text-left px-2 py-1 m-0">
                    <img
                      src={previewImage ? previewImage : FrameImg}
                      className="genderIcon"
                      alt="Service Icon"
                    ></img>
                    <input type="file" required onChange={onChange} />
                    <p className="m-0 px-3 d-inline">
                      {newfile
                        ? newfile.variables.file.name
                        : "Upload icon for service"}
                    </p>
                  </label>
                </div>
                {/* <div className="col-6 p-0 text-center"></div> */}
              </div>
            </div>

            <div className="col-12 p-0">
              <div className="form-group">
                <input
                  className="form-control rounded-0 my-3 border-0"
                  type="text"
                  value={serviceName}
                  onChange={serviceSelect}
                  placeholder="Enter service name"
                />
                <select
                  className="form-control rounded-0 my-3 border-0"
                  value={categoryName}
                  onChange={categorySelect}
                >
                  <option value="">Select service category</option>
                  {categorydata.categories.map((el, index) => {
                    if (el.status === "active") {
                      return (
                        <option key={index} value={el.name}>
                          {el.name}
                        </option>
                      );
                    }
                  })}
                </select>
                <div className="row">
                  <div className="col-6 text-center text-primary align-self-center"></div>
                  <div className="col-6 text-right">
                    {addServiceLoading || uploadOneFileLoading ? (
                      "Adding service ..."
                    ) : previewImage === "" ||
                      serviceName === "" ||
                      categoryName === "" ? (
                      <div
                        className="bg-primary text-white rounded-0 d-inline-block px-4 py-2 cursor-pointer"
                        disabled="disabled"
                      >
                        Please fill all fields
                      </div>
                    ) : (
                      <div
                        className="bg-primary text-white rounded-0 d-inline-block px-4 py-2 cursor-pointer"
                        disabled="disabled"
                        onClick={uploadFile}
                      >
                        Add service
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="row m-0 overflow-y-only vertical-height-100">
            <GetALLServices reloadService={reloadService}></GetALLServices>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ServiceAdd;

// const [previewImage, setpreviewImage] = useState("");
// const [newfile, setFile] = useState("");
// const [serviceName, setserviceName] = useState("");
// const [categoryName, setcategoryName] = useState("");
