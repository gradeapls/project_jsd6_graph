import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axiosInstance from './API/axion';

import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

function CardDataGrapt({ chartConfig, onClick  }) {

    const handleButtonClick = () => {
       
      };

    return (
        <>
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
                            <button onClick={onClick}>ย้อนกลับ</button>
                        </Typography>
                    </div>
                </CardHeader>
                <CardBody className="px-2 pb-0">
                    <Chart {...chartConfig} />
                </CardBody>
            </Card>
        </>
    );
}
export default CardDataGrapt;
