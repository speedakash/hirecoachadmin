import React from "react";
import ReactHighcharts from "react-highcharts";

function TaskChart(props) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const config = {
    chart: {
      type: "areaspline",
      backgroundColor: "rgba(108, 117, 125, 0)",
      height: "50%",
    },
    title: {
      text: "Visual representation",
      align: "left",
      style: {
        fontFamily: "Sen",
        fontWeight: "bold",
        color: "#666666",
        padding: "60px",
      },
    },

    credits: {
      enabled: false,
    },
    xAxis: {
      visible: true,
      type: "datetime",
      gridLineWidth: 0,
      showLastLabel: true,
      categories: months,
      tickPosition: "inside",
      tickWidth: 0,
    },
    yAxis: {
      title: {
        text: "",
      },
      minorGridLineWidth: 1,
      gridLineWidth: 1,
    },
    tooltip: {
      valueSuffix: " ",
    },
    plotOptions: {
      areaspline: {
        marker: {
          enabled: false,
        },
      },
    },

    series: [
      {
        name: "Tasks",
        data: months.map((month) => {
          if (Object.keys(props.taskData).includes(month)) {
            return props.taskData[month];
          } else {
            return 0;
          }
        }),
        type: undefined,
        color: "rgba(255, 193, 7, 1)",
      },
      {
        name: "Users",
        data: months.map((month) => {
          if (Object.keys(props.userData).includes(month)) {
            return props.userData[month];
          } else {
            return 0;
          }
        }),
        type: undefined,
        color: "#94d3ac",
      },
    ],
    legend: {
      align: "center",
      title: {
        text: "To view indivisual data use below legends",
        style: {
          fontFamily: "Sen",
          fontWeight: "bold",
          color: "#666666",
        },
      },
      itemStyle: {
        fontFamily: "Sen",
        fontWeight: "bold",
        color: "#666666",
        padding: "20px",
      },
    },
    navigation: {
      menuItemStyle: {
        fontSize: "10px",
      },
    },
  };

  /*
   * return JSX element with bar chart representation
   */
  if (props.taskData) {
    return (
      <div className="col-12 p-0">
        <div className="rwo m-0">
          <div className="col-12 py-3 px-0">
            <ReactHighcharts config={config}></ReactHighcharts>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

/*
 * export BarchartCovid functional component
 */
export default React.memo(TaskChart);
