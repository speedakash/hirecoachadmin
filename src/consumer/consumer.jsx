import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MaleImg from "../assets/images/male.png";
import FemaleImg from "../assets/images/female.png";
import moment from "moment";

import ConsumerTaskDetail from "./consumerTaskDetails";

const FETCH_ALL_USERS = gql`
  query getUsers($role: String!) {
    consumersOrprovider(role: $role) {
      id
      name
      email
      role
      gender
      state
      city
      locality
      address
      createdAt
      updatedAt
      status
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $status: String!) {
    updateUser(id: $id, status: $status) {
      id
      name
      email
      role
      gender
      state
      city
      locality
      status
      address
      createdAt
      updatedAt
    }
  }
`;

const ConsumerData = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedConsumer, setSelectedConsumer] = useState("");

  const [getAllUsers, { loading, data, error, fetchMore }] = useLazyQuery(
    FETCH_ALL_USERS,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        role: "consumer",
      },
    }
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  const [
    updateUser,
    { loading: updateLoading, data: updatedata, error: updateerror },
  ] = useMutation(UPDATE_USER);
  const changeStatus = (user) => {
    updateUser({
      variables: {
        id: user.id,
        status: user.status === "active" ? "deactive" : "active",
      },
    });
  };

  const showSelectedConsumer = (consumer) => {
    setShowModal(true);
    setSelectedConsumer(consumer);
  };

  if (data) {
    return (
      <div className="row m-0 p-4">
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton className="p-2 border-primary">
            <Modal.Title className="h5 text-primary font-weight-bold">
              <h5 className="px-4 py-2 font-weight-bold m-0">
                {selectedConsumer.name}
              </h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalPopup-height p-0">
            <div className="row p-4">
              <div className="col-12">
                <div className="row m-0">
                  <div className="col-12 bg-light rounded animated fadeIn">
                    <div className="row p-4">
                      <div className="col-12">
                        <span className="font-weight-bold">Email: </span>
                        {selectedConsumer.email}
                      </div>
                      <div className="col-12">
                        <span className="font-weight-bold">Joined: </span>
                        {moment(new Date(selectedConsumer.createdAt)).format(
                          "DD MMM YYYY"
                        )}
                      </div>
                      <div className="col-12">
                        <span className="font-weight-bold">Gender: </span>
                        {selectedConsumer.gender === "male" ? "Male" : "Female"}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 p-0 mt-3 animated fadeInUp">
                    <ConsumerTaskDetail
                      userEmail={selectedConsumer.email}
                    ></ConsumerTaskDetail>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="border-0"></Modal.Footer>
        </Modal>
        <div className="col-12 animated fadeIn">
          <h2 className="font-bold text-primary">Consumer details -</h2>
        </div>

        <div className="col-12 bg-light rounded p-5">
          {data.consumersOrprovider.map((el, index) => {
            return (
              <div
                className="row mx-0 my-2 bg-white box-shadow-secondary animated fadeInUp"
                key={index}
              >
                <div className="col-1 p-0">
                  <div
                    className={`p-2 w-fit-content ${
                      el.gender === "male" ? "bg-purple" : "bg-pink"
                    }`}
                  >
                    <img
                      className="genderIcon"
                      src={el.gender === "male" ? MaleImg : FemaleImg}
                      alt={el.gender === "male" ? "male" : "female"}
                    />
                  </div>
                </div>
                <div className="col-2 p-2 ln-40">{el.name}</div>
                <div className="col-2 p-2 ln-40">{el.email}</div>
                <div className="col-3 p-2 ln-40">
                  {el.locality}, {el.city}, {el.state}
                </div>
                <div className="col-2 p-2">
                  <p
                    className="cursor-pointer text-green text-center font-weight-normal m-0 ln-40"
                    onClick={() => showSelectedConsumer(el)}
                  >
                    View Details
                  </p>
                </div>
                <div className="col-2 p-2">
                  <p
                    className={`cursor-pointer text-center font-weight-normal m-0 ln-40 ${
                      el.status === "active" ? "text-pink" : "text-green"
                    }`}
                    onClick={() => changeStatus(el)}
                  >
                    {el.status === "active" ? "Deactive" : "Active"}
                  </p>
                </div>
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

export default ConsumerData;
