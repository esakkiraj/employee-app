import React from "react";
import { useFetchEmployeeHierarchy } from "./useFetchEmployeeHierarchy";

import "./EmployeeDetail.css";

const EmployeeDetail = ({ employee }) => {
  const { data, loading, error } = useFetchEmployeeHierarchy(employee);
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: ${error}</div>;

  if (!data)
    return (
      <div className="noResultsBanner">
        Could not find employee with name "{employee}".
      </div>
    );

  if (data) {
    return (
      <div className="searchResultDisplay">
        <RenderEmployeeCard employeeTreeData={data} />
      </div>
    );
  }

  return null;
};

const RenderEmployeeCard = ({ employeeTreeData, hirearchyLevel = 0 }) => {
  const { name, designation, directReports } = employeeTreeData;
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const setCollapsePanel = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  return (
    <div
      key={name}
      className="resultCard"
      style={{ paddingLeft: `${hirearchyLevel * 20}px` }}
    >
      <div className="nameHeader" onClick={setCollapsePanel}>
        <span>{`${name} - ${designation}`}</span>
        {isCollapsed && directReports.length > 0 ? (
          <span className="directReportsCount">
            {`${directReports.length} Direct Reports`}
          </span>
        ) : null}
      </div>
      {isCollapsed ? null : (
        <div className="reportsData">
          {directReports.map((report, idx) => (
            <RenderEmployeeCard
              employeeTreeData={report}
              hirearchyLevel={hirearchyLevel + 1}
              key={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDetail;
