import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import FrameImg from "../assets/images/frame.png";

import GetALLCategories from "./getCategories";

export const ADD_CATEGORY = gql`
  mutation addCategory($name: String!, $status: String!) {
    addCategory(name: $name, status: $status) {
      id
      name
      status
    }
  }
`;

const CategoryAdd = () => {
  const [categoryName, setcategoryName] = useState("");

  const [reloadService, setReloadService] = useState(false);

  const [
    addNewCategory,
    {
      loading: addCategoryLoading,
      data: addCategorydata,
      error: addCategoryerror,
    },
  ] = useMutation(ADD_CATEGORY);
  //const [mutate] = useMutation(UPLOAD_FILE);

  const addCategory = () => {
    setReloadService(false);
    addNewCategory({
      variables: {
        name: categoryName,
        status: "active",
      },
    });
  };

  useEffect(() => {
    if (addCategorydata) {
      setcategoryName("");
      setReloadService(true);
    }
  }, [addCategorydata]);

  const categorySelect = (event) => {
    setcategoryName(event.target.value);
  };

  // if (categoryLoading) {
  //   return (
  //     <div className="row mt-5">
  //       <div className="col-12 text-center text-primary mt-5 p-5 font-weight-bold h5">
  //         Hold on, services are loading ...
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="row m-0">
      <div className="col-6 p-4">
        <h2 className="font-bold text-primary animated fadeIn mb-4">
          Categories -
        </h2>
        <div className="row p-4 bg-pink box-shadow rounded animated fadeInUp mt-5 mx-0">
          <div className="col-12 p-0">
            <div className="form-group">
              <input
                className="form-control rounded-0 my-3 border-0"
                type="text"
                value={categoryName}
                onChange={categorySelect}
                placeholder="Enter category name"
              />

              <div className="row">
                <div className="col-6 text-center text-primary align-self-center"></div>
                <div className="col-6 text-right">
                  {addCategoryLoading ? (
                    "Adding category ..."
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
                      onClick={addCategory}
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
        <div className="row m-0 overflow-y-only vertical-height-100">
          <GetALLCategories
            reloadService={reloadService}
            addedData={addCategorydata}
          ></GetALLCategories>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdd;

// const [previewImage, setpreviewImage] = useState("");
// const [newfile, setFile] = useState("");
// const [serviceName, setserviceName] = useState("");
// const [categoryName, setcategoryName] = useState("");
