import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StarIcon from "@mui/icons-material/Star";

const StarRatingProgressBars = ({ ratings }) => {
  return (
    <div>
      {ratings.map((percentage, index) => (
        <div key={index} className="d-flex justify-content-between align-items-center my-1 text-center ">
          <strong style={{width:"15%"}}>
            {5-index} <StarIcon className="text-warning"/>
          </strong>
          <div className="progress " style={{ height: "15px",width:"70%"}}>
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: `${percentage}%` }}
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
            </div>
          </div>
          <strong style={{width:"10%"}}>{percentage}%</strong>
        </div>
      ))}
    </div>
  );
};

const Progress = () => {
  const starRatings = [31, 23, 15, 8, 5];

  return (
    <div className="ProgressBar p-3">
      <StarRatingProgressBars ratings={starRatings}/>
    </div>
  );
};

export default Progress;
