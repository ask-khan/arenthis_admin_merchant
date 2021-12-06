import React from 'react';
import { Chart } from 'react-charts';

function Charts() {
	const data = React.useMemo(
		() => [
			{
				label: 'order',
				data: [
					[0, 1],
					[1, 2],
					[2, 4],
					[3, 2],
					[4, 7],
					[3, 2],
					[4, 7],
					[3, 2],
					[4, 7],
				],
			},
			{
				label: 'Complete',
				data: [
					[0, 3],
					[1, 1],
					[2, 5],
					[3, 6],
					[4, 4],
					[2, 5],
					[3, 6],
					[4, 4],
					[2, 5],
					[3, 6],
					[4, 4],
				],
			},
			{
				label: 'Users',
				data: [
					[0, 3],
					[1, 1],
					[2, 5],
					[3, 6],
					[4, 4],
					[2, 5],
					[3, 6],
					[4, 4],
					[2, 5],
					[3, 6],
					[4, 4],
				],
			},
		],
		[]
	);

	const series = React.useMemo(
		() => ({
			type: 'bar',
		}),
		[]
	);

	const axes = React.useMemo(
		() => [
			{ primary: true, type: 'ordinal', position: 'bottom' },
			{ position: 'left', type: 'linear', stacked: false },
		],
		[]
	);
	return (
		<div>
			<div
				style={{
					width: '100%',
					height: '350px',
					overflow: 'hidden',
				}}
			>
				<Chart data={data} series={series} axes={axes} tooltip />
			</div>
		</div>
	);
}

export default Charts;
