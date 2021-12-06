import React, { createRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Charts = ({ name }) => {

	const chartRef = createRef();

	const creatChart = () => {

		const myChartRef = chartRef.current.getContext("2d");

		new Chart(myChartRef, {
			type: 'line',
			data: {
				labels: ['jan', 'Feb', 'Mar', 'Apr', 'Jun', 'July'],
				datasets: [{
					label: `${name}`,
					data: [5, 25, 35, 50, 70],
					backgroundColor: [
						'#ffc72d',
					],
					borderColor: [
						'#ffc72d',
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				},
				responsive: true,
			}
		});
	};

	useEffect(() => {
		creatChart()
	})

	return (
		<canvas ref={chartRef} width="400" height="400"></canvas>
	);
}

export default Charts;