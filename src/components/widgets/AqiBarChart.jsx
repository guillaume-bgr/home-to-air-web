import React from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { getRoundedHourLabelsLast12HoursFrench } from '../../utils/TimeUtil'
import { useContext, useEffect, useState } from 'react';
import { fetchApi } from '../../utils/ApiUtil';
import { AuthContext } from '../../context/AuthContext';

const AqiBarChart = (props) => {

const [aqiHistory, setAqiHistory] = useState(0);
const context = useContext(AuthContext);

useEffect(() => {
    const fetchAsync = async () => {
        try {
            let response = await fetchApi('GET', null, '/sensors/aqi/average?customerId='+context.userId, context.token);
            setAqiHistory(response);
            } catch (error) {
            console.log(error);
        }
    }
    fetchAsync();
},[])

const data = {
    labels: getRoundedHourLabelsLast12HoursFrench(),
    datasets: [{
        label: 'AQI',
        data: aqiHistory,
        backgroundColor: [
            '#7400b8',
            '#80ffdb',
            '#4ea8de',
            '#5390d9',
            '#5e60ce',
            '#64dfdf',
        ],
        hoverBackgroundColor: [
            '#620399',
            '#71d9bb',
            '#4391bf',
            '#4476b3',
            '#4e50ad',
            '#54bfbf',
        ],
        barThickness: 35
    }]
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value, index, ticks) {
                    let unit = props.unit ? ' '+props.unit : ''
                    return value + unit
                }
            }
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
    legend: {
        display: false
    }
    }
}

return (
    <>
        <div className='d-flex justify-content-between'>
            <p className='sensor-chart-title'>{props.label}</p>
            {props.aqi ? 
            <p className=''>AQI: <span className='fw-bold'>{props.aqi}</span></p>
            : null}
        </div>
        <div className="lineChart d-flex flex-row justify-content-center align-items-center pb-4">
        <Bar data={data} options={options} />
        </div>
    </>
)
}

export default AqiBarChart
