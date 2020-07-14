import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

const FETCH_ALL_TASKS = gql`
  query getTasks($consumerEmail: String!, $skip: Int, $limit: Int) {
    tasks(consumerEmail: $consumerEmail, skip: $skip, limit: $limit) {
      id
      providerName
      service
      category
      createdAt
      status
      bookingDate
      bookingSlot
    }
  }
`;

const ConsumerTaskDetail = (props) => {
  const [loadMore, setLoadmore] = useState(false);
  const [showLoadMore, setshowLoadMore] = useState(true);

  const [getAllTask, { loading, data, error, fetchMore }] = useLazyQuery(
    FETCH_ALL_TASKS,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        consumerEmail: props.userEmail,
        skip: 0,
        limit: 10,
      },
    }
  );
  useEffect(() => {
    getAllTask();
  }, [props.userEmail]);

  if (data) {
    return (
      <div className="row">
        <div className="col-12">
          <table className="table table-striped text-primary box-shadow-secondary rounded">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Booking Date</th>
                <th scope="col">Booking Slot</th>
                <th scope="col">Provider Name</th>
                <th scope="col">Service</th>
                <th scope="col">Category</th>
                <th scope="col">Task Status</th>
              </tr>
            </thead>
            <tbody>
              {data.tasks.map((el, index) => {
                return (
                  <tr className="py-4" key={index}>
                    <th
                      scope="row"
                      className={`border-top border-primary ${
                        el.status === "notstarted"
                          ? "bg-orange"
                          : el.status === "started"
                          ? "bg-purple"
                          : el.status === "completed"
                          ? "bg-green"
                          : el.status === "cancelledByProvider"
                          ? "bg-pink"
                          : "bg-pink"
                      }`}
                    >
                      {moment(new Date(el.bookingDate)).format("DD MMM YYYY")}
                    </th>
                    <td
                      className={`border-top border-primary ${
                        el.status === "notstarted"
                          ? "bg-orange"
                          : el.status === "started"
                          ? "bg-purple"
                          : el.status === "completed"
                          ? "bg-green"
                          : el.status === "cancelledByProvider"
                          ? "bg-pink"
                          : "bg-pink"
                      }`}
                    >
                      {el.bookingSlot}
                    </td>
                    <td
                      className={`border-top border-primary ${
                        el.status === "notstarted"
                          ? "bg-orange"
                          : el.status === "started"
                          ? "bg-purple"
                          : el.status === "completed"
                          ? "bg-green"
                          : el.status === "cancelledByProvider"
                          ? "bg-pink"
                          : "bg-pink"
                      }`}
                    >
                      {el.providerName}
                    </td>
                    <td
                      className={`border-top border-primary ${
                        el.status === "notstarted"
                          ? "bg-orange"
                          : el.status === "started"
                          ? "bg-purple"
                          : el.status === "completed"
                          ? "bg-green"
                          : el.status === "cancelledByProvider"
                          ? "bg-pink"
                          : "bg-pink"
                      }`}
                    >
                      {el.service}
                    </td>
                    <td
                      className={`border-top border-primary ${
                        el.status === "notstarted"
                          ? "bg-orange"
                          : el.status === "started"
                          ? "bg-purple"
                          : el.status === "completed"
                          ? "bg-green"
                          : el.status === "cancelledByProvider"
                          ? "bg-pink"
                          : "bg-pink"
                      }`}
                    >
                      {el.category}
                    </td>
                    <td
                      className={`border-top border-primary ${
                        el.status === "notstarted"
                          ? "bg-orange"
                          : el.status === "started"
                          ? "bg-purple"
                          : el.status === "completed"
                          ? "bg-green"
                          : el.status === "cancelledByProvider"
                          ? "bg-pink"
                          : "bg-pink"
                      }`}
                    >
                      {el.status === "notstarted"
                        ? "Not Started"
                        : el.status === "started"
                        ? "Started"
                        : el.status === "completed"
                        ? "Completed"
                        : el.status === "cancelledByProvider"
                        ? "Cancelled By Provider"
                        : "Cancelled By Consumer"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-center">
            <div
              className="btn bg-green"
              onClick={() =>
                fetchMore({
                  variables: {
                    skip: data.tasks.length,
                    limit: 10,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    let newData;
                    setLoadmore(true);
                    if (fetchMoreResult.tasks.length === 0) {
                      setshowLoadMore(false);
                      newData = prev;
                    } else {
                      newData = Object.assign({}, prev, {
                        tasks: [...prev.tasks, ...fetchMoreResult.tasks],
                      });
                    }
                    setLoadmore(false);

                    return newData;
                  },
                })
              }
            >
              {!showLoadMore
                ? "That's all admin!"
                : loadMore
                ? "Loading"
                : "Load More"}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ConsumerTaskDetail;
