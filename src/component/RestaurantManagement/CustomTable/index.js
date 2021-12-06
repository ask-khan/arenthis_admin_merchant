import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useNavigate } from 'react-router';
import { outletUrl } from '../../../utils/Urls';
// import OrderStatusChip from '../OrderStatusChip';
import {
	Grid,
	IconButton,
	TableContainer,
	TablePagination,
	makeStyles,
	Typography,
	Collapse,
	Box,
	LinearProgress,
	Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import OutletDailog from '../Dailogs/OutletDailog';

import { getOutletsAction } from '../../../reduxState/aciton/restaurantAction';

const useStyles = makeStyles((theme) => ({
	header: {
		fontSize: '14px',
		fontWeight: 'bold',
	},
	tabelCellFont: {
		fontSize: '12px',
	},
	PName: {
		fontSize: '12px',
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},

	tablePaginationCon: {
		width: '100% !important',
	},

	innerTableHeading: {
		fontWeight: 'bold',
	},

	tableRowPd: {
		paddingTop: '10px !important',
		paddingBottom: '10px !important',
	},
}));

const OrdersTable = ({ tableData, tableHead, innerTableHead, innerTableData, loading }) => {
	// ********** useStyles **********
	const classes = useStyles();

	// ********** useState **********

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [tbData, setTbData] = useState([]);

	// ********** handleChangePage **********
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleTableIconClick = (curItemIndex) => {
		const newTbData = tbData.map((item, index) =>
			index === curItemIndex ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
		);
		setTbData(newTbData);
	};

	useEffect(() => {
		if (tableData) {
			const newTableData = tableData?.map((tbd) => ({ ...tbd, isOpen: false }));
			setTbData(newTableData);
		}
	}, [tableData]);

	return (
		<Grid item container variant='outlined'>
			<Box width={1} minHeight={20}>
				{loading && <LinearProgress mode='determinate' value={10} style={{ width: '100%' }} />}
			</Box>

			<TableContainer>
				<Table aria-label='collapsible table'>
					<TableHead>
						<TableRow className={classes.tableHeadRow}>
							{tableHead.map((prop, key) => {
								return (
									<TableCell align='center' key={key}>
										<Typography className={classes.header}>{prop.label}</Typography>
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					{tbData?.length >= 1 ? (
						<TableBody>
							{tbData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
								return (
									<Row
										itemIndex={index}
										row={row}
										tableHead={tableHead}
										innerTableHead={innerTableHead}
										innerTableData={innerTableData}
										loading={loading}
										handleTableIconClick={handleTableIconClick}
									/>
								);
							})}
						</TableBody>
					) : (
						<TableBody>
							<TableRow>
								<TableCell align='center' colSpan={12}>
									Sorry! No Data Available
								</TableCell>
							</TableRow>
						</TableBody>
					)}
				</Table>
			</TableContainer>
			<Box width={1} display='flex' justifyContent='felx-end'>
				<TablePagination
					className={classes.tablePaginationCon}
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={tableData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Box>
		</Grid>
	);
};

const Row = ({ row, itemIndex, handleTableIconClick }) => {
	// ********** useState **********
	const [historyId, setHistoryId] = useState(null);
	const [open, setOpen] = useState(false);

	// ********** Redux State **********
	const dispatch = useDispatch();

	// ********** useNavigate **********
	const navigate = useNavigate();

	const handleClickOpen = () => {
		setOpen(true);
	};

	useEffect(() => {
		if (row?.isOpen) {
			if (historyId !== null) {
				dispatch(getOutletsAction(historyId));
			}
		}
	}, [row?.isOpen]);

	return (
		<>
			<TableRow hover>
				<TableCell align='center' width='10'>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => {
							setHistoryId(row._id);
							handleTableIconClick(itemIndex);
						}}
					>
						{row?.isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell align='center'>{row.name}</TableCell>
				<TableCell align='center' style={{ width: '350px' }}>
					{row.description}
				</TableCell>
				<TableCell align='center'>{row.franchise ? 'Yes' : 'No'}</TableCell>
				<TableCell align='center'> {row.franchise ? row?.franchiseId?.name : row.franchiseName}</TableCell>
				<TableCell align='center'>{moment(row.createdAt).format('YYYY-MM-DD')}</TableCell>
				<TableCell align='center'>
					<Button variant='contained' color='primary' style={{ marginRight: '.5rem' }} onClick={handleClickOpen}>
						Create Outlet
					</Button>
				</TableCell>
			</TableRow>
			<DetailTable isOpen={row.isOpen} products={row.products} />

			<OutletDailog open={open} setOpen={setOpen} restaurantId={row._id} />
		</>
	);
};

const DetailTable = ({ isOpen, products }) => {
	const [historyDetail, setHistoryDetail] = useState([]);

	const productsCols = [
		'Cover',
		'Outlets Code',
		'Outlets Name',
		'Outlets Description',
		'Outlets Location',
		'Status',
		'Created Date',
		'Manage',
	];

	// ********** useStyles **********
	const classes = useStyles();

	// ********** Redux State **********
	const getOutlets = useSelector((state) => state.getOutlets);
	const { outlets, loading: historyDataloading } = getOutlets;

	useEffect(() => {
		if (outlets) {
			let getOutletsData = outlets?.doc?.data || [];
			setHistoryDetail(getOutletsData);
		}
	}, [outlets]);

	return (
		<>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
					<Collapse in={isOpen} timeout='auto' unmountOnExit>
						<Box margin={1}>
							<Typography variant='h6' className={classes.innerTableHeading}>
								Outlets
							</Typography>

							<Box width={1} minHeight={20}>
								{historyDataloading && <LinearProgress mode='determinate' value={10} style={{ width: '100%' }} />}
							</Box>

							<Table size='small' aria-label='purchases'>
								<TableHead>
									<TableRow>
										{historyDataloading
											? 'Loading....'
											: historyDetail?.length == 0
											? 'No outlets Found'
											: productsCols?.map((col) => (
													<TableCell className={classes.innerTableHeading} align='center' key={col}>
														{col}
													</TableCell>
											  ))}
									</TableRow>
								</TableHead>
								<TableBody>
									{historyDetail?.map((item) => {
										return (
											<>
												<TableRow className={classes.tableRowPd} key={item._id}>
													<TableCell align='center'>
														<Box style={{ display: 'block', margin: '0 auto' }}>
															<img
																style={{ backgroundSize: 'cover' }}
																src={`${outletUrl}${item?.images}`}
																alt={item?.product?.name}
																width='70px'
																height='70px'
															/>
														</Box>
													</TableCell>
													<TableCell align='center'>{item.code}</TableCell>
													<TableCell align='center'>{item.name}</TableCell>
													<TableCell align='center' style={{ width: '300px' }}>
														{item?.description?.length > 140 ? item?.description?.slice(0, 140) + '....' : item?.description}
													</TableCell>
													<TableCell align='center' style={{ width: '300px' }}>
														{item?.location?.address?.length > 70
															? item?.location?.address?.slice(0, 70) + '....'
															: item?.location?.address}
													</TableCell>
													<TableCell align='center'>{item.outletLifeCycle}</TableCell>
													<TableCell align='center'>{moment(item?.createdAt).format('YYYY-MM-DD')}</TableCell>
													<TableCell align='center'>
														<Link to={`/admin/restaurant-shop/${item.slug}`}>
															<Typography>Manage Outlet</Typography>
														</Link>
													</TableCell>
												</TableRow>
											</>
										);
									})}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default OrdersTable;
