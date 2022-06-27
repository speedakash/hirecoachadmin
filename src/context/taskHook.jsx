import React, { useState, useCallback } from "react";
import TaskContext from "./taskContext";

const TaskHook = () => {
  const [taskTotal, settaskTotal] = useState(0);

  const setTaskNumber = useCallback((total) => {
    settaskTotal(total);
  }, []);

  return {
    taskTotal,
    setTaskNumber,
  };
};

export default TaskHook;
