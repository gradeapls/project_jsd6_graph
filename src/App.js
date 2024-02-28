import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axiosInstance from './API/axion';
import CardHeaderG from './CardDataGrapt';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

function App() {
  const [datahealth, setDatahealth] = useState();
  const [datacompany, setDatacompany] = useState();
  const [datausers, setDatausers] = useState();
  const [showChart, setShowChart] = useState(true);
  const [showChartUser, setShowChartUser] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chartConfig, setChartConfig] = useState({
    type: "pie",
    width: 500,
    height: 500,
    series: [],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
    },
  });

  const [chartConfigBar, setChartConfigBar] = useState({
    type: "bar",
    width: 700,
    height: 500,
    series: [
      {
        name: "ระที่วิ่งได้",
        data: [], // ข้อมูลแท่งที่ 1
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [

        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  });

  const [chartConfigBarThree, setChartConfigBarThree] = useState({
    type: "bar",
    width: 700,
    height: 500,
    series: [
      {
        name: "ระที่วิ่งได้",
        data: [5.2],
      },
      {
        name: "ระที่วิ่งได้",
        data: [3.8],
      },
      {
        name: "ระที่วิ่งได้",
        data: [7.5],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [

        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  });

  // let groupsOne = {
  //   "distance": [],
  //   "userId": [],
  // };

  useEffect(() => {
    axiosInstance.get('products')
      .then(response => {
        setDatahealth(response.data.datahealth);
        setDatacompany(response.data.datacompany);
        setDatausers(response.data.datausers);

        const groups = {
          "notmore": [],
          "number": [],
          "upnumber": []
        };

        const groupsDistance = {
          distance: [],
          userId: []
        };

        response.data.datahealth.forEach(item => {
          if (item.duration <= 30) {
            groups["notmore"].push(item);
          } else if (item.duration > 30 && item.duration <= 59) {
            groups["number"].push(item);
          } else {
            groups["upnumber"].push(item);
          }
        });

        console.log(response.data.datahealth);
        response.data.datahealth.forEach(item => {
          groupsDistance["distance"].push(item.distance);
          groupsDistance["userId"].push(item.user_id);
        });

        const a = groups.notmore.length;
        const b = groups.number.length;
        const c = groups.upnumber.length;

        const dataArray = Object.values(groupsDistance.distance);
        const dataArrayId = Object.values(groupsDistance.userId);

        setChartConfigBar(prevState => ({
          ...prevState,
          series: [{
            ...prevState.series[0],
            data: dataArray,
          }],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: dataArrayId,
            },
          },
        }));

        setChartConfig(prevConfig => ({
          ...prevConfig,
          series: [a, b, c],
        }));

        setChartLoaded(true);

      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const groupedData = {};

  const groupDataByDistance = (name) => {
    const filteredData = datahealth.filter(item => item.name === name);

    const sortedData = filteredData.sort((a, b) => a.distance - b.distance);

    const minDistance = sortedData[0];
    const maxDistance = sortedData[sortedData.length - 1];

    const totalDistance = filteredData.reduce((sum, item) => sum + item.distance, 0);
    const averageDistance = totalDistance / filteredData.length;

    return { minDistance, maxDistance, averageDistance };
  };

  const handleButtonClick = () => {
    if (inputValue !== '') {
      const Data = groupDataByDistance(inputValue);
      console.log(Data);

      setChartConfigBarThree(prevState => ({
        ...prevState,
        series: [
          {
            name: "ระที่วิ่งได้มากสุด",
            data: [Data.maxDistance.distance]
          },
          {
            name: "ระที่วิ่งได้น้อยสุด",
            data: [Data.minDistance.distance]
          },
          {
            name: "ค่าเฉลี่ยที่ได้",
            data: [Data.averageDistance]
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: [1,2], // ข้อมูล user_id
          },
        },
      }));
      setShowChart(false)
    }
  };

  const handleButtonClickOff = () => {
    setShowChart(true)
    setInputValue('')
  }

  if (!chartLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>

      <div className='App'>
        <div className='graptc'>
          <h1>Bar Chart </h1>
          {showChart && (
            <Card>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
              >
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Bar Chart
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="max-w-sm font-normal"
                  >
                    <div className="p-4 flex items-center gap-4">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="กรุณากรอกชื่อ"
                      />
                      <button onClick={handleButtonClick}>Submit</button>
                    </div>
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="px-2 pb-0">
                <Chart {...chartConfigBar} />
              </CardBody>
            </Card>
          )}
          {!showChart && (
            <>
              <CardHeaderG chartConfig={chartConfigBarThree} onClick={handleButtonClickOff}/>
            </>

          )}

        </div>
        <br />
        <br />
        <div className='graptc'>
          <h1>Pie Char</h1>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
export default App;
