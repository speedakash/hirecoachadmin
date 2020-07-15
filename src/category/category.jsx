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
  mutation addCategory($name: String!, $status: String!) {
    addCategory(name: $name, status: $status) {
      name
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

const CategoryAdd = () => {
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
  ] = useMutation(UPLOAD_FILE);

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
      setcategoryName("");
      setReloadService(true);
    }
  }, [addServicedata]);

  const categorySelect = (event) => {
    setcategoryName(event.target.value);
  };

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
      <div className="row">
        <div className="col-6 align-self-center p-5">
          <div className="row p-4 bg-green box-shadow rounded animated fadeInUp">
            <div className="col-12 p-0">
              <div className="form-group">
                <input
                  className="form-control rounded-0 my-3 border-0"
                  type="text"
                  value={categoryName}
                  onChange={categorySelect}
                  placeholder="Enter service name"
                />

                <div className="row">
                  <div className="col-6 text-center text-primary align-self-center"></div>
                  <div className="col-6 text-right">
                    {addServiceLoading || uploadOneFileLoading ? (
                      "Adding service ..."
                    ) : categoryName === "" ? (
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
                        Add category
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <GetALLServices reloadService={reloadService}></GetALLServices>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CategoryAdd;

// const [previewImage, setpreviewImage] = useState("");
// const [newfile, setFile] = useState("");
// const [serviceName, setserviceName] = useState("");
// const [categoryName, setcategoryName] = useState("");
