import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import React, { useEffect, useState, useForm } from "react";
import axios from "axios";

const SalesChart = () => {
  const [sale, setSale] = useState([]);
  const [date, setDate] = useState([]);
  const [token, setToken] = useState("");

  const getPurchases = () => {
    let saleDate = [];
    let salePrice = [];

    axios
      .get("http://localhost:8080/sale/date", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          for (const dataObj of res.data) {
            saleDate.push(dataObj.date);
            salePrice.push(dataObj.sale.toFixed(2));
          }
          setDate(saleDate);
          setSale(salePrice);
        }, 200);
      });
  };
  useEffect(() => {
    getPurchases();
    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user.jwt);
  }, []);
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    colors: ["#0d6efd", "#009efb", "#6771dc"],
    xaxis: {
      categories: date,
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "30%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "Ventas",
      data: sale,
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Ventas</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Reporte de ventas
        </CardSubtitle>
        <Chart options={options} series={series} type="bar" height="379" />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
