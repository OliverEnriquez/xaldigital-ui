import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import React, { useEffect, useState, useForm } from "react";
import axios from "axios";

const PurchaseChart = () => {
  const [purchase, setPurchase] = useState([]);
  const [date, setDate] = useState([]);
  
  const getPurchases = () => {
    let purchDate = [];
    let purchPrice = [];

    axios.get("http://localhost:8080/purchase/date")
    .then(res => {
        console.log(res);         
        setTimeout(() => {
          for(const dataObj of res.data){
            purchDate.push(dataObj.date);
            purchPrice.push(dataObj.purchase);
  
          }
          setDate(purchDate);
          setPurchase(purchPrice);
        }, 200);

       
      })
  }
  useEffect(() => {
    getPurchases();
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
      name: "Compras",
      data: purchase,
    }
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Compras</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Reporte de compras
        </CardSubtitle>
        <Chart options={options} series={series} type="bar" height="379" />
      </CardBody>
    </Card>
  );
};

export default PurchaseChart;
