import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MaleImg from "../assets/images/male.png";
import FemaleImg from "../assets/images/female.png";
import moment from "moment";
import TaskContext from "../context/taskContext";
import "./task.css";
import Pagination from "react-js-pagination";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import SelectedTask from "./selectedTask";

const FETCH_ALL_TASKS = gql`
  query getTasks($skip: Int, $limit: Int) {
    getAlltasks(skip: $skip, limit: $limit) {
      id
      consumerEmail
      consumerName
      providerEmail
      providerName
      service
      category
      status
      bookingDate
      bookingSlot
      createdAt
      updatedAt
      paymentStatus
      paymentType
    }
  }
`;

const FETCH_ALL_TASKS_BYDATE = gql`
  query getTaskByDate($date: String!, $skip: Int, $limit: Int) {
    getTaskByDate(date: $date, skip: $skip, limit: $limit) {
      id
      consumerEmail
      consumerName
      providerEmail
      providerName
      service
      category
      status
      bookingDate
      bookingSlot
      createdAt
      updatedAt
      paymentStatus
      paymentType
    }
  }
`;

const GET_ALL_TASK_COUNT = gql`
  query getTotalTaskCount {
    getTotalTaskCount
  }
`;

const GET_ALL_TASK_COUNT_BY_DATE = gql`
  query getTotalTaskCountByDate($date: Date!) {
    getTotalTaskCountByDate(date: $date)
  }
`;

const FETCH_ALL_SERVICES = gql`
  query getServices {
    services {
      name
      iconPath
    }
  }
`;
const TasksData = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedPage, setselectedPage] = useState(1);
  const [showType, setshowType] = useState("date");
  const [totalCount, setTotalCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [allTask, setAllTask] = useState();
  const [calendar, showCalendar] = useState(false);
  const [iconArray, setIconArray] = useState(false);

  const [context, setContext] = useContext(TaskContext);

  let pagination = [];

  useEffect(() => {
    console.log(context);
    if (parseInt(context) > 11) {
      for (let i = 0; i < Math.ceil(context / 10); i++) {
        pagination.push(i + 1);
      }
    }
  }, [context]);

  const [
    getAllTask,
    { loading: taskLoader, data: taskData, error: taskError, fetchMore },
  ] = useLazyQuery(FETCH_ALL_TASKS, {
    fetchPolicy: "cache-and-network",
  });

  const [
    getTotalTaskCount,
    { loading: totalTaskLoader, data: totalTaskData, error: totalTaskError },
  ] = useLazyQuery(GET_ALL_TASK_COUNT, {
    fetchPolicy: "cache-and-network",
  });

  const [
    getTotalTaskCountByDate,
    {
      loading: totalTaskByDateLoader,
      data: totalTaskByDateData,
      error: totalTaskByDateError,
    },
  ] = useLazyQuery(GET_ALL_TASK_COUNT_BY_DATE, {
    fetchPolicy: "cache-and-network",
  });

  const [
    getAllTaskByDate,
    { loading: taskLoaderByDate, data: taskDataByDate, error: taskErrorByDate },
  ] = useLazyQuery(FETCH_ALL_TASKS_BYDATE, {
    fetchPolicy: "cache-and-network",
  });

  const [
    getServices,
    { loading: serviceLoader, data: serviceData, error: serviceError },
  ] = useLazyQuery(FETCH_ALL_SERVICES);

  useEffect(() => {
    getServices();
  }, []);

  let icons = [];
  useEffect(() => {
    if (serviceData) {
      serviceData.services.map((el) => {
        icons.push({ name: el.name, url: el.iconPath });
      });
      console.log(iconArray);
    }
    setIconArray(icons);
  }, [serviceData]);

  const loadMoreTasks = (event) => {
    setselectedPage(event);
    if (showType === "date") {
      getAllTaskByDate({
        variables: {
          date: moment(new Date(selectedDate)).format("YYYY-MM-DD"),
          skip: 10 * (event - 1),
          limit: 9,
        },
      });
    } else if (showType === "all") {
      getAllTask({
        variables: {
          skip: 10 * (event - 1),
          limit: 9,
        },
      });
    }
  };

  const getAllTaskData = () => {
    setAllTask("");
    setSelectedTask("");
    setTotalCount(0);
    setshowType("all");
    //setSelectedDate(new Date());
    getTotalTaskCount();

    getAllTask({
      variables: {
        skip: 0,
        limit: 9,
      },
    });
  };

  useEffect(() => {
    if (!taskLoader && taskData) {
      setAllTask(taskData.getAlltasks);
      setSelectedTask(taskData.getAlltasks[0]);
    }
  }, [taskLoader]);

  useEffect(() => {
    if (!totalTaskLoader && totalTaskData) {
      setTotalCount(totalTaskData.getTotalTaskCount);
    }
  }, [totalTaskLoader]);

  useEffect(() => {
    setAllTask("");
    setTotalCount(0);
    getAllTaskByDate({
      variables: {
        date: moment(new Date(selectedDate)).format("YYYY-MM-DD"),
        skip: 0,
        limit: 9,
      },
    });

    getTotalTaskCountByDate({
      variables: {
        date: moment(new Date(selectedDate)).format("YYYY-MM-DD"),
      },
    });
  }, [selectedDate]);

  useEffect(() => {
    if (!taskLoaderByDate && taskDataByDate) {
      setAllTask(taskDataByDate.getTaskByDate);
      setSelectedTask(taskDataByDate.getTaskByDate[0]);
    }
  }, [taskLoaderByDate]);

  useEffect(() => {
    if (!totalTaskByDateLoader && totalTaskByDateData) {
      setTotalCount(totalTaskByDateData.getTotalTaskCountByDate);
    }
  }, [totalTaskByDateLoader]);

  const onchangeDate = (value, event) => {
    setshowType("date");
    setSelectedDate(value);
    toggleCalendar();
    setSelectedTask("");
  };

  const showSelectedTask = (el) => {
    setShowModal(true);
    setSelectedTask(el);
  };

  const toggleCalendar = () => {
    if (calendar) {
      showCalendar(false);
    } else {
      showCalendar(true);
    }
  };

  // if (taskLoader || taskLoaderByDate) {
  //   return (
  //     <div className="row mt-5">
  //       <div className="col-12 text-center text-primary mt-5 p-5 font-weight-bold h5">
  //         hey Admin wait some time, our providers are punctual here ...
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="row m-0 p-4">
      <div className="col-8 p-0">
        <h2 className="font-bold text-primary animated fadeIn">
          Task details -
        </h2>
      </div>
      <div className="col-4 p-0">
        <div className="row bg-light cursor-pointer m-0">
          <div
            className={`col-6 p-2 text-center text-white border-right border-white rounded ${
              showType === "all" ? "bg-green" : "bg-primary"
            }`}
            onClick={getAllTaskData}
          >
            Load all task
          </div>
          <div
            className="col-6 p-2 text-center bg-pink border-left border-white rounded"
            onClick={toggleCalendar}
          >
            {moment(new Date(selectedDate)).format("DD MMM YYYY")}
            <span className="pl-3 text-right">
              <FontAwesomeIcon icon={calendar ? faChevronUp : faChevronDown} />
            </span>
          </div>
        </div>
        {calendar ? (
          <div className="position-absolute z-index-9">
            <Calendar
              className="px-2 rounded box-shadow-secondary mt-2 animated zoomIn"
              onChange={(e) => onchangeDate(e)}
              value={selectedDate}
              view="month"
              aria-label="prev"
              showNeighboringMonth={false}
              maxDate={new Date()}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="col-12 p-0">
        <div className="row m-0">
          <div className="col-5 p-0">
            {/* <p className="font-weight-normal m-0 p-2 bg-light rounded animated fadeIn">
              Load task by selecting date -
            </p> */}

            {taskLoader ||
            taskLoaderByDate ||
            totalTaskByDateLoader ||
            totalTaskLoader ||
            serviceLoader ? (
              <div className="row mt-5">
                <div className="col-12 text-center text-primary mt-5 p-5 font-weight-bold h5">
                  wait some time, Tasks are piling up ...
                </div>
              </div>
            ) : allTask && iconArray.length != 0 ? (
              <span>
                {totalCount === 0 ? (
                  <div className="bg-light p-3 rounded animated fadeInUp">
                    <h5 className="m-0 p-3 text-center text-secondary">
                      No task on{" "}
                      {moment(new Date(selectedDate)).format("DD MMM")}
                    </h5>
                  </div>
                ) : (
                  <span>
                    <p className="font-weight-normal m-0 py-3 px-2 bg-light text-secondary rounded animated fadeInUp">
                      {showType === "date"
                        ? "Showing tasks for " +
                          moment(new Date(selectedDate)).format("DD MMM") +
                          " , Click Load all tasks button to view all tasks"
                        : "Showing all tasks, select a date from calendar to view selected date data"}
                    </p>
                    <div className="row row mx-0 my-2 bg-primary box-shadow-secondary rounded animated fadeInUp">
                      <div className="col-1 p-0"></div>
                      <div className="col-3 text-white p-2 ln-40">Service</div>
                      <div className="col-3 text-white p-2 ln-40">Consumer</div>
                      <div className="col-4 text-white p-2 ln-40">Provider</div>
                      <div className="col-1 text-white p-0 ln-40"></div>
                    </div>
                    {allTask.map((el, index) => {
                      return (
                        <div
                          className={`row mx-0 my-2 rounded animated fadeInUp cursor-pointer ${
                            selectedTask.id === el.id
                              ? "bg-green text-white"
                              : "bg-light text-primary"
                          }`}
                          key={index}
                          onClick={() => showSelectedTask(el)}
                        >
                          <div className="col-1 p-2 ln-40">
                            {iconArray.map((icon, indexIcon) => {
                              if (icon.name === el.service) {
                                return (
                                  <img
                                    className="serviceIcon"
                                    key={indexIcon}
                                    src={icon.url}
                                  />
                                );
                              }
                            })}
                          </div>
                          <div className="col-3 p-2 ln-40 white-space-nowrap text-truncate">
                            {el.service}
                          </div>
                          <div className="col-3 p-2 ln-40 white-space-nowrap text-truncate">
                            {el.consumerName}
                          </div>
                          <div className="col-4 p-2 ln-40 white-space-nowrap text-truncate">
                            {el.providerName}
                          </div>
                          <div className="col-1 py-2 ln-40 px-0 text-center">
                            {selectedTask.id === el.id ? (
                              <FontAwesomeIcon icon={faChevronRight} />
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                    {totalCount >= 10 ? (
                      <div className="text-center">
                        <Pagination
                          activePage={selectedPage}
                          itemsCountPerPage={10}
                          totalItemsCount={totalCount}
                          pageRangeDisplayed={10}
                          onChange={loadMoreTasks}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </span>
                )}
              </span>
            ) : (
              <div></div>
            )}
          </div>
          <div className="col-7 pr-0">
            {selectedTask ? (
              <SelectedTask selectedTask={selectedTask}></SelectedTask>
            ) : (
              <div className="bg-light text-center vertical-height-100 align-items-center d-flex justify-content-center rounded">
                <h4 className="m-0 py-5 align-self-center text-secondary">
                  Please select a task to view details
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksData;
