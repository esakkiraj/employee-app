import React from "react";
import { isEmpty } from "lodash";

export const useFetchEmployeeHierarchy = (employee) => {
  const [{ data, loading, error }, dispatcher] = React.useReducer(
    (state, action) => {
      if (action.type === "UPDATE_DATA") {
        return {
          data: action.data,
          loading: false,
          error: null,
        };
      }

      if (action.type === "FETCHING_START") {
        return {
          data: null,
          loading: true,
          error: null,
        };
      }
      if (action.type === "FETCHING_ERROR") {
        return { data: null, loading: false, error: action.error };
      }
    },
    {
      data: null,
      loading: false,
      error: null,
    }
  );

  React.useEffect(() => {
    const asynFetch = async (searchFor) => {
      const data = await fetch(
        `https://api.additivasia.io/api/v1/assignment/employees/${searchFor}`
      ).then((resp) => resp.json());

      if (isEmpty(data)) return;

      const designation = data && data[0];
      const childrens =
        (data && data[1] && data[1]["direct-subordinates"]) || [];

      const directReports = await Promise.all(
        childrens.map((childName) => {
          return asynFetch(childName);
        })
      );

      return {
        designation,
        directReports,
        name: searchFor,
      };
    };

    dispatcher({ type: "FETCHING_START" });
    asynFetch(employee).then(
      (data) => {
        console.log(data);
        dispatcher({ type: "UPDATE_DATA", data });
      },
      (err) => {
        dispatcher({ type: "FETCHING_ERROR", error: err });
      }
    );
  }, [employee, dispatcher]);

  return {
    data,
    loading,
    error,
  };
};
