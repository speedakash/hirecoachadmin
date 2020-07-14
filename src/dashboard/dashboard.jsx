import React, { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";
import TaskChart from "../chart/taskChart";
import { useHistory } from "react-router-dom";

const FETCH_ALL_USERS = gql`
  query getUsers {
    users {
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
    }
  }
`;

const FETCH_ALL_TASKS = gql`
  query getTasks {
    getAlltasks {
      id
      createdAt
      updatedAt
    }
  }
`;
const Dashboard = () => {
  let history = useHistory();
  const navigateTo = (navigationPoint) => {
    history.push("/" + navigationPoint);
  };
  const [
    getAllUsers,
    { loading: userLoader, data: userData, error: userError },
  ] = useLazyQuery(FETCH_ALL_USERS, {
    fetchPolicy: "cache-and-network",
    variables: {
      role: "consumer",
    },
  });

  let userMonthArray = [];
  let countUser = {};
  if (userData) {
    userData.users.map((el) => {
      userMonthArray.push(moment(new Date(el.createdAt)).format("MMM"));
    });

    userMonthArray.forEach(function (i) {
      countUser[i] = (countUser[i] || 0) + 1;
    });
  }

  const [
    getAllTasks,
    { loading: taskLoader, data: taskData, error: taskError },
  ] = useLazyQuery(FETCH_ALL_TASKS);

  useEffect(() => {
    getAllUsers();
    getAllTasks();
  }, []);

  let monthsArray = [];
  let countTask = {};
  if (taskData) {
    taskData.getAlltasks.map((el) => {
      monthsArray.push(moment(new Date(el.createdAt)).format("MMM"));
    });

    monthsArray.forEach(function (i) {
      countTask[i] = (countTask[i] || 0) + 1;
    });
  }

  if (userData && taskData) {
    const totalConsumer = userData.users.filter((el) => {
      if (el.role === "consumer") {
        return el;
      }
    });
    const totalProvider = userData.users.filter((el) => {
      if (el.role === "provider") {
        return el;
      }
    });

    return (
      <div className="row">
        <div className="col-8 px-5 py-3">
          <h2 className="text-primary font-bold animated fadeIn">
            Hello Admin
          </h2>
          <div className="row">
            <div className="col-8">
              <div className="bg-green p-4 m-1 rounded box-shadow animated fadeInUp">
                <p className="text-primary">
                  User traffic till - {moment(new Date()).format("DD MMM YYYY")}
                </p>
                <table className="table text-center m-0 border border-primary rounded">
                  <tbody>
                    <tr>
                      <th scope="col" className="border-0">
                        Users
                      </th>
                      <th scope="col" className="border-0">
                        Consumers
                      </th>
                      <th scope="col" className="border-0">
                        Providers
                      </th>
                    </tr>
                    <tr>
                      <td className="border-primary">
                        <h5 className="font-bold m-0">
                          {userData.users.length}
                        </h5>
                      </td>
                      <td className="border-primary">
                        <h5 className="font-bold m-0">
                          {totalConsumer.length}
                        </h5>
                      </td>
                      <td className="border-primary">
                        <h5 className="font-bold m-0">
                          {totalProvider.length}
                        </h5>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-4 p-0">
              <div className="p-5 animated fadeInUp">
                <h4 className="text-purple border-bottom border-purple">
                  Total tasks
                </h4>
                <div className="m-0 p-2 bg-pink rounded">
                  <h3 className="font-bold m-0 text-white">
                    {taskData.getAlltasks.length}
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-12 animated fadeInUp">
              <TaskChart userData={countUser} taskData={countTask}></TaskChart>
            </div>
          </div>
        </div>
        <div className="col-4 p-1">
          <div className="row m-0">
            <div className="col-6 p-0">
              <div
                className="border border-white rounded serviceBackground p-3 height-30 position-relative animated fadeInUp"
                onClick={() => navigateTo("services")}
              >
                <div className="bg-primary-light hover-background rounded"></div>
                <div className="position-absolute rightBlock">
                  <h3 className="text-white m-0 font-weight-bold border-bottom border-white">
                    Services
                  </h3>
                </div>
              </div>
              <div
                className="border border-white rounded categoryBackground p-3 height-30 position-relative animated fadeInUp"
                onClick={() => navigateTo("categories")}
              >
                <div className="bg-pink-light hover-background rounded"></div>
                <div className="position-absolute rightBlock">
                  <h3 className="text-white m-0 font-weight-bold border-bottom border-white">
                    Categories
                  </h3>
                </div>
              </div>
              <div
                className="border border-white rounded consumerBackground p-3 height-40 position-relative animated fadeInUp"
                onClick={() => navigateTo("consumer")}
              >
                <div className="bg-orange-light hover-background rounded"></div>
                <div className="position-absolute rightBlock">
                  <h3 className="text-white m-0 font-weight-bold border-bottom border-white">
                    Consumer
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-6 p-0">
              <div
                className="border border-white rounded taskBackground p-3 height-50 position-relative animated fadeInUp"
                onClick={() => navigateTo("tasks")}
              >
                <div className="bg-green-light hover-background rounded"></div>
                <div className="position-absolute rightBlock">
                  <h3 className="text-white m-0 font-weight-bold border-bottom border-white">
                    Tasks
                  </h3>
                </div>
              </div>
              <div
                className="border border-white rounded providerBackground p-3 height-50 position-relative animated fadeInUp"
                onClick={() => navigateTo("provider")}
              >
                <div className="bg-purple-light hover-background rounded"></div>
                <div className="position-absolute rightBlock">
                  <h3 className="text-white m-0 font-weight-bold border-bottom border-white">
                    Provider
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Dashboard;
