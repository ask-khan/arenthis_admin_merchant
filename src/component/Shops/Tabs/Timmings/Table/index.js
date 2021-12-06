import { useEffect, useState } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Switch } from '@material-ui/core';
import { globalStyles } from '../../../../Layout/Styles';
import AppSnackbar from '../../../../AppSnackbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const TimingsTable = ({ hasHours, formik, loading, tableColumns, tableRows }) => {
	// ********** globalStyles **********
	const gbclasses = globalStyles();

	return (
		<>
			<Box width={1} minHeight={20}>
				{loading && <LinearProgress mode='determinate' value={10} style={{ width: '100%' }} />}
			</Box>
			<PerfectScrollbar>
				<Box width={1}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell />
								{tableColumns &&
									tableColumns.map((item, index) => (
										<TableCell key={`${index}`} className={gbclasses.tableHeadCell}>
											{item.label}
										</TableCell>
									))}
							</TableRow>
						</TableHead>
						<TableBody>
							{tableRows?.map((row, index) => {
								return (
									<TableRow hover key={`${index}`}>
										<TableCell />
										<TableCell size='small'>{row.label}</TableCell>
										<TableCell size='small'>
											<TextField
												id='time'
												type='time'
												name={`${row.id}Stime`}
												InputLabelProps={{
													shrink: true,
												}}
												inputProps={{
													step: 300, // 5 min
												}}
												value={formik?.values[`${row.id}Stime`]}
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												error={formik?.touched[`${row.id}Stime`] && Boolean(formik?.errors[`${row.id}Stime`])}
											/>
										</TableCell>
										<TableCell size='small'>
											<TextField
												id='time'
												type='time'
												name={`${row.id}Ctime`}
												InputLabelProps={{
													shrink: true,
												}}
												inputProps={{
													step: 300, // 5 min
												}}
												value={formik?.values[`${row.id}Ctime`]}
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												error={formik?.touched[`${row.id}Ctime`] && Boolean(formik?.errors[`${row.id}Ctime`])}
											/>
										</TableCell>
										<TableCell size='small'>
											<Switch
												checked={formik?.values[`${row.id}Active`]}
												name={`${row.id}Active`}
												value={formik?.values[`${row.id}Active`]}
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												color='primary'
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>

			{/* ********** Snackbar ********** */}
			<AppSnackbar />
		</>
	);
};

export default TimingsTable;
