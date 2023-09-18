	import React from 'react'
	import { Line } from 'react-chartjs-2'
	import 'chart.js/auto'
	import { getRoundedHourLabelsLast12HoursFrench } from '../../utils/TimeUtil'
	import { useContext, useEffect, useState } from 'react';
	import { fetchApi } from '../../utils/ApiUtil';
	import { AuthContext } from '../../context/AuthContext';

	const SensorDataChart = (props) => {
	// Oxydants: NO²
	// Reducteurs: CO

	const [sensorHistory, setSensorHistory] = useState(0);
    const context = useContext(AuthContext);

	useEffect(() => {
        const fetchAsync = async () => {
            try {
                let response = await fetchApi('GET', null, '/sensors/'+ props.id +'/data-over-time?time=12', context.token);
                setSensorHistory(response);
                } catch (error) {
                console.log(error);
            }
        }
        fetchAsync();
    },[])

	let chartData = []
	for (let h in sensorHistory) {
		chartData.push(sensorHistory[h][props.pollutant])
	}

	const data = {
		labels: getRoundedHourLabelsLast12HoursFrench(),
		datasets: [
		{
			data: chartData,
			fill: false,
			borderColor: props.color,
			borderWidth: 2,
			borderJoinStyle: 'bevel',
			pointRadius: 2
		}
		]
	}

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
			<Line data={data} options={options} />
			</div>
		</>
	)
	}

	export default SensorDataChart
