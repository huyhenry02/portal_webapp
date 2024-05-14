import React from 'react';
import MapsCountry from '../../layouts/components/widgets/MapsCountry';
import CardAnalystStyleOne from '../../layouts/components/cards/CardAnalystStyleOne';
import CardAnalystStyleTwo from '../../layouts/components/cards/CardAnalystStyleTwo';
import CardAnalystStyleThree from '../../layouts/components/cards/CardAnalystStyleThree';
import CardAnalystStyleFour from '../../layouts/components/cards/CardAnalystStyleFour';
import CardQuestionStyleOne from '../../layouts/components/cards/CardQuestionStyleOne';
import HorizontalLineChart from '../../layouts/components/charts/HorizontalLineChart';
import CardListStyleOne from '../../layouts/components/cards/CardListStyleOne';
import CardListStyleTwo from '../../layouts/components/cards/CardListStyleTwo';
import MountainChart from '../../layouts/components/charts/MountainChart';
import CardListStyleThree from '../../layouts/components/cards/CardListStyleThree';
import CardListStyleFour from '../../layouts/components/cards/CardListStyleFour';
import BarChart from '../../layouts/components/charts/BarChart';
import CardListStyleFive from '../../layouts/components/cards/CardListStyleFive';
import VerticalLineChart from '../../layouts/components/charts/VerticalLineChart';

const Dashboard = () => {
  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-fluid"
        >
          <div className="row g-5 g-xl-10">
            <div className="col-xxl-6 mb-md-5 mb-xl-10">
              <div className="row g-5 g-xl-10">
                <div className="col-md-6 col-xl-6 mb-xxl-10">
                  <CardAnalystStyleOne />
                  <CardAnalystStyleTwo />
                </div>

                <div className="col-md-6 col-xl-6 mb-xxl-10">
                  <CardAnalystStyleThree />
                  <CardAnalystStyleFour />
                </div>
              </div>
            </div>

            <div className="col-xxl-6 mb-5 mb-xl-10">
              <MapsCountry />
            </div>
          </div>

          <div className="row g-5 g-xl-10 g-xl-10">
            <div className="col-xl-4 mb-xl-10">
              <CardQuestionStyleOne />
            </div>
            <div className="col-xl-4 mb-xl-10">
              <HorizontalLineChart />
            </div>
            <div className="col-xl-4 mb-5 mb-xl-10">
              <CardListStyleOne />
            </div>
          </div>

          <div className="row g-5 g-xl-10">
            <div className="col-xxl-4 mb-xxl-10">
              <CardListStyleTwo />
            </div>
            <div className="col-xxl-8 mb-5 mb-xl-10">
              <MountainChart />
            </div>
          </div>

          <div className="row g-5 g-xl-10 g-xl-10">
            <div className="col-xl-4 mb-xl-10">
              <CardListStyleThree />
            </div>
            <div className="col-xl-4 mb-xl-10">
              <CardListStyleFour />
            </div>
            <div className="col-xl-4 mb-5 mb-xl-10">
              <BarChart />
            </div>
          </div>

          <div className="row g-5 g-xl-10 g-xl-10">
            <div className="col-xl-4">
              <CardListStyleFive />
            </div>
            <div className="col-xl-8">
              <VerticalLineChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
