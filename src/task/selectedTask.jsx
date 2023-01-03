import React from "react";
import moment from "moment";

const selectedTask = (props) => {
  return (
    <div className="row m-0">
      <div className="col-12 p-0">
        <div className="row m-0">
          <div className="col-12 bg-light rounded animated fadeIn p-4 vertical-height-100 ">
            <div className="row p-2 m-0">
              <div className="col-6">
                <p className="font-weight-bold m-0">Consumer name: </p>
                <p className="font-weight-normal m-0">
                  {props.selectedTask.consumerName}
                </p>
              </div>
              <div className="col-6">
                <p className="font-weight-bold m-0">Consumer email: </p>
                <p className="font-weight-normal m-0">
                  {props.selectedTask.consumerEmail}
                </p>
              </div>
            </div>
            <div className="row p-2 mx-0 mt-2">
              <div className="col-6">
                <p className="font-weight-bold m-0">Provider name: </p>
                <p className="font-weight-normal m-0">
                  {props.selectedTask.providerName}
                </p>
              </div>
              <div className="col-6">
                <p className="font-weight-bold m-0">Provider email: </p>
                <p className="font-weight-normal m-0">
                  {props.selectedTask.providerEmail}
                </p>
              </div>
            </div>
            <div className="row p-2 mx-0 mt-2">
              <div className="col-6">
                <p className="font-weight-bold m-0">Service requested for: </p>
                <p className="font-weight-normal m-0">
                  {props.selectedTask.service}
                </p>
              </div>
              <div className="col-6">
                <p className="font-weight-bold m-0">Service category: </p>
                <p className="font-weight-normal m-0">
                  {props.selectedTask.category}
                </p>
              </div>
            </div>
            <div className="row p-2 mx-0 mt-2">
              <div className="col-6">
                <p className="font-weight-bold m-0">Payment Status: </p>
                <p className="font-weight-normal m-0">
                  {props.selectedTask.paymentStatus ? 'Paid' : 'Not-Paid'}
                </p>
              </div>
              <div className="col-6">
                <p className="font-weight-bold m-0">Payment Type: </p>
                  <div className="d-flex align-items-center border rounded border-primary paymentContainer bg-primary">
                    <div className={`paymentCardShowBlock p-1 rounded bg-white
                        ${props.selectedTask.paymentType.split('-')[0] === 'online' ?  props.selectedTask.paymentType.split('-')[1] || `creditCard` : `cash`}`}></div>
                    <p className="font-weight-light m-0 py-1 px-2  text-white logo-title">
                      {props.selectedTask.paymentType.split('-')[0].toUpperCase()}
                    </p>
                  </div>
              </div>
            </div>
            <div className="row p-2 mx-0 mt-2">
              <div className="col-6">
                <p className="font-weight-bold m-0">Booking date: </p>
                <p className="font-weight-normal m-0">
                  {moment(new Date(props.selectedTask.bookingDate)).format(
                    "MMM DD"
                  )}
                </p>
              </div>
              <div className="col-6">
                <p className="font-weight-bold m-0">Booking slot: </p>
                <p className="font-weight-normal m-0">
                  {props.selectedTask.bookingSlot}
                </p>
              </div>
            </div>
            <div className="row p-2 mx-0 mt-2">
              <div className="col-6">
                <p className="font-weight-bold m-0">Task generated: </p>
                <p className="font-weight-normal m-0">
                  {moment(new Date(props.selectedTask.createdAt)).format(
                    "MMM DD"
                  )}
                </p>
              </div>
              <div className="col-6">
                <p className="font-weight-bold m-0">Task status: </p>
                <p className="font-weight-normal m-0">
                  {props.selectedTask.status === "notstarted"
                    ? "Not Started"
                    : props.selectedTask.status === "started"
                    ? "Started"
                    : props.selectedTask.status === "completed"
                    ? "Completed"
                    : props.selectedTask.status === "cancelledByProvider"
                    ? "Cancelled By Provider"
                    : "Cancelled By Consumer"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default selectedTask;
