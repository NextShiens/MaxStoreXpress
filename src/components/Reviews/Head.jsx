import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Review.css";
import LiveClock from "./timeUpdating";

const Head = () => {
  return (
    <div className="container-fluid Head py-3 px-5 my-3">
      <div className="row justify-content-between align-items-center">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <h1>Reviews</h1>
        </div>
        <div className="col-lg-6">
          <div className="row align-items-center justify-content-end">
            <div className="col-lg-4 d-none d-md-block p-0">
              <button className="btn btn-transparent">
                Date Refresher <CachedIcon color="primary" />
              </button>
            </div>
            <div className="col-lg-6  p-0">
              <LiveClock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
