import React, { useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const FETCH_ALL_SERVICES = gql`
  query getServices {
    services {
      id
      name
      category
      iconName
      iconPath
      status
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation updateService($id: ID!, $status: String!) {
    updateService(id: $id, status: $status) {
      id
      name
      category
      iconName
      iconPath
      status
    }
  }
`;

const GetALLServices = (props) => {
  const [getServices, { loading, data, error, fetchMore }] = useLazyQuery(
    FETCH_ALL_SERVICES,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    getServices();
  }, []);

  const [
    updateService,
    { loading: updateLoading, data: updatedata, error: updateerror },
  ] = useMutation(UPDATE_STATUS);
  const changeStatus = (service) => {
    updateService({
      variables: {
        id: service.id,
        status: service.status === "active" ? "deactive" : "active",
      },
    });
  };

  useEffect(() => {
    if (props.reloadService) {
      getServices();
    }
  }, [props.reloadService]);

  if (data) {
    return (
      <div className="row m-0 overflow-y-only vertical-height-100">
        <div className="col-12 py-3 px-4">
          <div className="row row mx-0 my-2 bg-primary box-shadow-secondary rounded">
            <div className="col-2"></div>
            <div className="col-4 text-white p-2 ln-40">Service name</div>
            <div className="col-4 text-white p-2 ln-40">Service category</div>
            <div className="col-2"></div>
          </div>
          {data.services.map((el, index) => {
            return (
              <div
                className="row mx-0 my-2 bg-white box-shadow-secondary border rounded animated fadeInUp"
                key={index}
              >
                <div className="col-2 p-0">
                  <div className="p-2 w-fit-content">
                    <img className="serviceIcon" src={el.iconPath} alt="" />
                  </div>
                </div>
                <div className="col-4 p-2 align-self-center">{el.name}</div>
                <div className="col-4 p-2 align-self-center">{el.category}</div>

                <div className="col-2 p-2 align-self-center">
                  <p
                    className={`cursor-pointer text-center font-weight-normal m-0 ${
                      el.status === "active" ? "text-pink" : "text-green"
                    }`}
                    onClick={() => changeStatus(el)}
                  >
                    {el.status === "active" ? "Deactive" : "Activate"}
                  </p>
                </div>
                {/* <div className="col-2 p-2">
                  <p
                    className={`cursor-pointer text-center font-weight-normal m-0 ln-40 ${
                      el.status === "active" ? "text-pink" : "text-green"
                    }`}
                    onClick={() => changeStatus(el)}
                  >
                    {el.status === "active" ? "Deactive" : "Active"}
                  </p>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default GetALLServices;
