import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

const FETCH_ALL_TASKS = gql`
  query getTasks($providerEmail: String!, $skip: Int, $limit: Int) {
    providerAlltasks(
      providerEmail: $providerEmail
      skip: $skip
      limit: $limit
    ) {
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

const ProviderTaskDetail = (props) => {
  const [loadMore, setLoadmore] = useState(false);
  const [showLoadMore, setshowLoadMore] = useState(true);

  const [getAllTask, { loading, data, error, fetchMore }] = useLazyQuery(
    FETCH_ALL_TASKS,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        providerEmail: props.providerEmail,
        skip: 0,
        limit: 10,
      },
    }
  );
  useEffect(() => {
    getAllTask();
  }, [props.providerEmail]);

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
              {data.providerAlltasks.map((el, index) => {
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
                    skip: data.providerAlltasks.length,
                    limit: 10,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    let newData;
                    setLoadmore(true);
                    if (fetchMoreResult.providerAlltasks.length === 0) {
                      setshowLoadMore(false);
                      newData = prev;
                    } else {
                      newData = Object.assign({}, prev, {
                        providerAlltasks: [
                          ...prev.providerAlltasks,
                          ...fetchMoreResult.providerAlltasks,
                        ],
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

export default ProviderTaskDetail;
