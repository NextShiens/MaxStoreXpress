import React from "react";
import Head from "../../components/Reviews/Head";
import CardComponent from "../../components/Reviews/Card";
import Data from "../../components/Reviews/Data";
import "../../components/Reviews/Review.css";
import Progress from "../../components/Reviews/progress";
import BasicTable from "../../components/Reviews/table"

const Review = () => {
  return (
    <div className="container-fluid">
      <Head />
      <div className="container-fluid">
        <div className="row align-item-stretch justify-content-between gy-3">
          <div className="col-sm-12 col-md-12 col-lg-8">
            <div className="row justify-content-between text-center gy-3 gy-lg-0 p-3">
              {Data.map((card, index) => (
                <CardComponent key={index} type={card.type} data={card} />
              ))}
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-4 p-0 ">
            <div className="row align-items-stretch">
              <div className="col-sm-12 col-md-12 col-lg-12 py-3">
                <Progress />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BasicTable/>
    </div>
  );
};

export default Review;
