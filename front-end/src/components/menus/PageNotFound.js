import React from "react";
import { useLocation } from "react-router-dom";

function PageNotFound() {
  let location = useLocation();

  return (
    <div>
      <br />
      <div>
        <h3>Sorry about that, the page {location.pathname} doesn't exist! </h3>
      </div>
    </div>
  );
}
export default PageNotFound;
