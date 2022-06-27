import React, { useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore, faTrash } from "@fortawesome/free-solid-svg-icons";

const FETCH_ALL_SERVICES = gql`
  query getCategories {
    categories {
      id
      name
      status
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation updateCategory($id: ID!, $status: String!) {
    updateCategory(id: $id, status: $status) {
      id
      name
      status
    }
  }
`;

const GetALLCategories = (props) => {
  const [getCategories, { loading, data, error, fetchMore }] = useLazyQuery(
    FETCH_ALL_SERVICES,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    getCategories();
  }, []);

  const [
    updateCategory,
    { loading: updateLoading, data: updatedata, error: updateerror },
  ] = useMutation(UPDATE_STATUS);
  const changeStatus = (service) => {
    updateCategory({
      variables: {
        id: service.id,
        status: service.status === "active" ? "deactive" : "active",
      },
    });
  };

  useEffect(() => {
    if (props.reloadService) {
      getCategories();
    }
  }, [props.reloadService]);

  if (loading) {
    return (
      <div className="row mt-5">
        <div className="col-12 text-center text-primary mt-5 p-5 font-weight-normal h6">
          Categories are still loading... , meanwhile you can add new service
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="col-12 py-3 px-4">
        <div className="row row mx-0 my-2 bg-primary box-shadow-secondary rounded">
          <div className="col-8 text-white p-2 ln-40">Category name</div>
          <div className="col-4"></div>
        </div>
        {data.categories.map((el, index) => {
          return (
            <div
              className="row mx-0 my-2 bg-light rounded animated fadeInUp"
              key={index}
            >
              <div className="col-8 p-2 ln-40 align-self-center">{el.name}</div>

              <div className="col-4 p-2 ln-40 align-self-center">
                <p
                  className={`cursor-pointer px-2 font-weight-normal m-0 white-space-nowrap text-truncate rounded ${
                    el.status === "active" ? "bg-pink" : "bg-green"
                  }`}
                  onClick={() => changeStatus(el)}
                >
                  {el.status === "active" ? (
                    <React.Fragment>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      <span className="pl-2">Deactivate</span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <FontAwesomeIcon icon={faTrashRestore}></FontAwesomeIcon>
                      <span className="pl-2">Activate</span>
                    </React.Fragment>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default GetALLCategories;
