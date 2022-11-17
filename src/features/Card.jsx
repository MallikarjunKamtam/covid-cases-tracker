import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { Line } from "react-chartjs-2";
import "react-dropdown/style.css";
import { MutatingDots } from "react-loader-spinner";
import axios from "axios";
import Chart from "chart.js/auto";
import moment from "moment";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const Card = () => {
  const [countries, setCountries] = useState([]);
  const [detail, setDetail] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("");
  const countriesList = countries.map((country) => {
    return {
      id: country.ISO2,
      label: country.Country,
      value: country.ISO2,
    };
  });

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    currentCountry && getDetailsByCountry(currentCountry);
  }, [currentCountry]);

  const getCountries = async () => {
    const res = await axios({
      method: "get",
      url: "https://api.covid19api.com/countries",
    });
    setCountries(res.data);
  };

  const getDetailsByCountry = async (payload) => {
    const res = await axios({
      method: "get",
      url: `https://api.covid19api.com/country/${payload}`,
    });
    setDetail(res.data);
  };

  return (
    <div>
      {
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> */}
        </div>
      }
      <div>
        Time frame:{" "}
        {`${moment(detail[0]?.Date || new Date()).format(
          "MM/DD/YYYY"
        )} to ${moment(detail[detail.length - 1]?.Date || new Date()).format(
          "MM/DD/YYYY"
        )}`}
      </div>
      <div
        style={{
          width: "100%",
          marginTop: 50,
          backgroundColor: "ButtonShadow",
          height: "400px",
          marginBottom: "30px",
        }}
      >
        <Line
          options={{
            responsive: true,
          }}
          width={800}
          data={{
            labels: detail.map((item) =>
              moment(item.Date).format("MM/DD/YYYY")
            ),
            datasets: [
              {
                label: "Active",
                data: detail.map((item) => item.Active),
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
              },
              {
                label: "Confirmed",
                data: detail.map((item) => item.Confirmed),
                fill: false,
                borderColor: "#742774",
              },
            ],
          }}
        />
      </div>
      <div
        style={{
          width: "356px",
          margin: "auto",
          backgroundColor: "InactiveBorder",
          padding: "2px",
        }}
      >
        <Dropdown
          options={countriesList}
          onChange={(e) => {
            setCurrentCountry(e.value.split().join("-"));
          }}
        />
      </div>
    </div>
  );
};

export default Card;
