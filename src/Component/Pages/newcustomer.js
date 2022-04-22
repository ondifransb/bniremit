import {
	ThemeProvider,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Box,
	TextField,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Button,
	Drawer,
	FormControl,
	Stack,
	CircularProgress,
	Dialog,
	Alert,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Buffer } from "buffer";

import { Theme } from "./styles";
import MenuIcon from "@mui/icons-material/Menu";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MoreVert } from "@mui/icons-material";
import ReactToPrint from "react-to-print";

import * as XLSX from "xlsx";

window.Buffer = window.Buffer || require("buffer").Buffer;

function Newcustomer() {
	const navigate = useNavigate();
	const logoutf = () => {
		navigate("/");
		localStorage.removeItem("name");
		localStorage.removeItem("username");
		localStorage.removeItem("token");
		localStorage.removeItem("role");
	};

	//PRINT FUNCTION START

	const componentRef = useRef(null);

	//PRINT FUNCTION END

	//WINDOW SIZE AREA START
	const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
	const updateDimensions = () => {
		setWindowWidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);
	//WINDOW SIZE AREA END

	//LOADING AREA START
	const [Loading, setLoading] = useState(false);
	const [AlertMessage, setAlertMessage] = useState("");
	const [ResStat, RetresStat] = useState("");
	const [AlertLoading, setAlertLoading] = useState(false);
	const ShowAlert = () => {
		return AlertLoading ? (
			<>
				<Alert
					severity={ResStat === 200 ? "success" : "error"}
					sx={{
						position: "fixed",
						transform: "translate(-50%,-50%)",
						top: "50%",
						left: "50%",
						zIndex: "3",
						display: "flex",
						alignItems: "center",
					}}
				>
					<strong>{AlertMessage}</strong>
				</Alert>
			</>
		) : null;
	};

	//LOADING AREA END

	//ACTION AREA START

	//ACTION AREA END

	//STATE AREA  START
	const [FromDate, setFromDate] = useState();
	const FromVal = (e) => {
		setFromDate(e.target.value);
	};

	let Today = new Date(Date.now() - new Date().getTimezoneOffset() * 75000)
		.toISOString()
		.substr(0, 10);

	const [ToDate, setToDate] = useState(Today);
	const ToVal = (e) => {
		setToDate(e.target.value);
	};

	const [BirthDate, setBirthDate] = useState();
	const BirthVal = (e) => {
		setBirthDate(e.target.value);
	};

	const [IdNum, setIdNum] = useState();
	const IdNumVal = (e) => {
		setIdNum(e.target.value);
	};

	const [Name, setName] = useState();
	const NameVal = (e) => {
		setName(e.target.value);
	};

	const [Regis, setRegis] = useState();
	const RegisVal = (e) => {
		setRegis(e.target.value);
	};

	const [Status, setStatus] = useState("");
	const StatusVal = (e) => {
		setStatus(e.target.value);
	};

	const [open, setopen] = useState(false);
	const toggleDrawer = (event) => {
		setopen(!open);
	};

	const DisplayPage = "New Customer";

	let [IDOrder, setIDOrder] = useState("");
	var PutMess;
	const PutMessVal = (e) => {
		PutMess = e.target.value;
	};

	const [OpenIt, setOpenIt] = useState(false);
	const [SelectedIndex, setSelectedIndex] = useState(undefined);
	const openHandle = (e, i) => {
		setOpenIt(true);
		setSelectedIndex(i);
		setIDOrder(e.idOrdering);
	};
	const closeHandle = () => {
		setOpenIt(false);
	};
	//STATE AREA  END

	//FUNCTION AREA START
	const resetit = async () => {
		await window.location.reload(false);
	};

	let [dataRemit, setdataRemit] = useState("");

	const FetchData = async () => {
		await axios
			.post(
				"https://api-tokyo.remit.digi46.id/api/portal/filterDataOrdering",
				{
					idNumber: IdNum ? IdNum : null,
					name: Name ? Name : null,
					birthDate: BirthDate ? BirthDate : null,
					dateForm: FromDate ? FromDate : null,
					dateTo: ToDate ? ToDate : null,
					status: Status ? Status : null,
					referenceNumber: Regis ? Regis : null,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
				setLoading(true)
			)
			.then((res) => {
				setLoading(false);
				setdataRemit(res.data);
			})
			.catch((error) => {
				if (error.response) {
					// console.log(error.response.data.status);
					if (error.response.data.status === 401) {
						setAlertMessage(error.response.data.message);
						ShowAlert();
						setAlertLoading(true);
						setTimeout(() => {
							setAlertLoading(false);
							logoutf();
						}, 1500);
					}
					if (error.response.data.status === 400) {
						setAlertMessage(error.response.data.Errors);
						ShowAlert();
						setAlertLoading(true);
						setTimeout(() => {
							setAlertLoading(false);
						}, 1500);
					} else {
						ShowAlert();
						setAlertLoading(true);
						setTimeout(() => {
							setAlertLoading(false);
						}, 1500);
					}
				}
			});
	};

	const PutData = async (RegisterStat) => {
		try {
			await axios
				.put(
					"https://api-tokyo.remit.digi46.id/api/portal/actionPortal",
					{
						idOrdering: IDOrder,
						statusRegister: RegisterStat,
						message: PutMess,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json",
						},
					},
					setLoading(true),
					setOpenIt(false)
				)
				.then((res) => {
					setAlertMessage(res.data.message);
					setAlertLoading(true);
					RetresStat(res.status);
					ShowAlert();
					setTimeout(() => {
						setAlertLoading(false);
						RetresStat("");
					}, 1500);
					setLoading(false);
					FetchData();
				});
		} catch (error) {
			setLoading(false);
			if (error.response) {
				if (error.response.data.status === 401) {
					setAlertMessage(
						error.response.data.Message || error.response.data.message
					);
					ShowAlert();
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
						logoutf();
					}, 1500);
				} else {
					setAlertMessage(
						error.response.data.Message || error.response.data.message
					);
					ShowAlert();
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
					}, 1500);
				}
			}
		}
	};
	//FUNCTION AREA END

	// DOWNLOAD FUNCTION AREA START
	const DownloadData = async (link) => {
		try {
			await axios
				.get(
					link,
					{
						responseType: "blob",
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					},
					{}
				)
				.then((response) => {
					// console.log(response.data);
					let blob = new Blob([response.data], {
							type: "image/png, image/jpg",
						}),
						url = window.URL.createObjectURL(blob);
					window.open(url);
				});
		} catch (error) {
			if (error.response) {
				if (error.response.data.status === 401) {
					setAlertMessage(error.response.data.Errors);
					ShowAlert();
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
						logoutf();
					}, 1500);
				} else {
					setAlertMessage(error.response.data.Errors);
					ShowAlert();
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
					}, 1500);
				}
			}
		}
	};

	const downloadIt = async (source) => {
		source = Buffer.from(source, "base64");
		let blob = new Blob([source], { type: "image/png   base64" }),
			url = window.URL.createObjectURL(blob);
		window.open(url);
	};
	//DOWNLOAD FUNCTION AREA END

	const excelDownload = () => {
		var wb = XLSX.utils.book_new(),
			ws = XLSX.utils.json_to_sheet(dataRemit);
		ws["!cols"] = [
			{ width: 5 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 25 },
			{ width: 75 },
			{ width: 25 },
			{ width: 15 },
			{ width: 25 },
			{ width: 75 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 25 },
			{ width: 25 },
			{ width: 25 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 25 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 270 },
			{ width: 15 },
			{ width: 15 },
			{ width: 15 },
			{ width: 20 },
			{ width: 15 },
			{ width: 15 },
		];

		XLSX.utils.book_append_sheet(wb, ws, "beneficieryData");

		XLSX.writeFile(
			wb,
			`${IdNum ? IdNum : ""}${IdNum ? "_" : ""}${Name ? Name : ""} ${
				Name ? "_" : ""
			}${Regis ? Regis : ""}${Regis ? "_" : ""}${FromDate ? FromDate : ""}${
				FromDate ? " to " : ""
			}${ToDate ? ToDate : ""}${ToDate ? "_" : ""}${
				BirthDate ? BirthDate : ""
			}${BirthDate ? "_" : ""}${Status ? Status : ""}.xlsx`
		);
	};

	function BenItem({ k, m }) {
		return (
			<>
				<Grid
					spacing={2}
					container
					direction="row"
					sx={{
						display: "flex",
						marginTop: "20px",
					}}
					paddingX={2}
				>
					{k?.long_name ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiary Name"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.long_name}
							/>
						</Grid>
					) : null}

					{k?.address1 && k?.address2 && k?.address3 ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiary Address"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={
									k?.address1 + " " + k?.address2 + " " + k?.address3
								}
							/>
						</Grid>
					) : null}

					{k?.sourceoffund ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Source Fund"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.sourceoffund}
							/>
						</Grid>
					) : null}
				</Grid>

				<Grid
					spacing={2}
					container
					direction="row"
					sx={{
						display: "flex",
					}}
					paddingX={2}
				>
					{k?.resident ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiery Residence"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.resident}
							/>
						</Grid>
					) : null}

					{k?.datecreate ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiery Date Created"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.datecreate}
							/>
						</Grid>
					) : null}

					{k?.dateupdate ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiery Date Updated"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.dateupdate}
							/>
						</Grid>
					) : null}
				</Grid>

				<Grid
					spacing={2}
					container
					direction="row"
					sx={{
						display: "flex",
					}}
					paddingX={2}
				>
					{k?.remitcardno ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiery Remitance Card Numbers"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.remitcardno}
							/>
						</Grid>
					) : null}

					{k?.idtype ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiery ID Type"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.idtype}
							/>
						</Grid>
					) : null}

					{k?.idtypeno ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiery ID Number"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.idtypeno}
							/>
						</Grid>
					) : null}
				</Grid>

				<Grid
					spacing={2}
					container
					direction="row"
					sx={{
						display: "flex",
					}}
					paddingX={2}
				>
					{k?.service_type ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiery Service Type"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.service_type}
							/>
						</Grid>
					) : null}

					{k?.service_type ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiery Bank Name"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.service_type}
							/>
						</Grid>
					) : null}

					{k?.accountnum ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiery Bank Account Number"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.accountnum}
							/>
						</Grid>
					) : null}
				</Grid>

				<Grid
					spacing={2}
					container
					direction="row"
					sx={{
						display: "flex",
					}}
					paddingX={2}
				>
					{k?.trxpurpose ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Transaction Purpose"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.trxpurpose}
							/>
						</Grid>
					) : null}

					{k?.email ? (
						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Beneficiary Email"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={k?.email}
							/>
						</Grid>
					) : null}
				</Grid>
			</>
		);
	}

	function DialogItem({ e, i }) {
		return (
			<Dialog
				sx={{
					"& .MuiPaper-root": {
						height: "80%",
						width: "100%",
						maxWidth: "1100px",
						padding: "10px",
						borderRadius: "10px",
						"&::-webkit-scrollbar": {
							display: "none",
						},
					},
				}}
				open={OpenIt}
				onClose={closeHandle}
			>
				<Grid container ref={componentRef}>
					<Grid
						spacing={2}
						container
						direction="row"
						sx={{
							display: "flex",
							// backgroundColor: "#000",
						}}
						paddingX={2}
					>
						{e.referenceNumber ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Registration Reference Number"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.referenceNumber}
								/>
							</Grid>
						) : null}

						{e.registrationDate ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Registration Date"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.registrationDate}
								/>
							</Grid>
						) : null}

						{e.activationCode ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px", boxSizing: "border-box" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Activation Code"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.activationCode}
								/>
							</Grid>
						) : null}
					</Grid>

					<Grid
						spacing={2}
						container
						direction="row"
						sx={{
							display: "flex",
						}}
						paddingX={2}
					>
						{e.long_name ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Name"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.long_name}
								/>
							</Grid>
						) : null}

						{e.birthdate ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Date of Birth"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.birthdate}
								/>
							</Grid>
						) : null}

						{e.sex ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Sex"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.sex}
								/>
							</Grid>
						) : null}
					</Grid>

					<Grid
						spacing={2}
						container
						direction="row"
						sx={{
							display: "flex",
						}}
						paddingX={2}
					>
						{e.nationality ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Nationality"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.nationality}
								/>
							</Grid>
						) : null}

						{e.email ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Email"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.email}
								/>
							</Grid>
						) : null}

						<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
							<TextField
								xs={4}
								InputProps={{
									readOnly: true,
									style: {
										fontSize: "13px",
										boxSizing: "border-box",
									},

									endAdornment: (
										<InputAdornment position="start">
											<FileDownloadOutlinedIcon
												sx={{ ":hover": { cursor: "pointer" } }}
												size="small"
												onClick={() => {
													downloadIt(e.ttd_doc);
												}}
											/>
										</InputAdornment>
									),
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Signature Image"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={""}
							/>
						</Grid>
					</Grid>

					<Grid
						spacing={2}
						container
						direction="row"
						sx={{
							display: "flex",
						}}
						paddingX={2}
					>
						{e.idNumber1 ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="First ID Number"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.idNumber1}
								/>
							</Grid>
						) : null}

						{e.idType1 ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
										endAdornment: (
											<InputAdornment position="start">
												<FileDownloadOutlinedIcon
													sx={{ ":hover": { cursor: "pointer" } }}
													size="small"
													onClick={() => {
														DownloadData(e.idType1_doc);
													}}
												/>
											</InputAdornment>
										),
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="First ID Type"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.idType1}
								/>
							</Grid>
						) : null}

						{e.idExpire1 ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="First ID Expiry Date"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.idExpire1}
								/>
							</Grid>
						) : null}
					</Grid>

					<Grid
						spacing={2}
						container
						direction="row"
						sx={{
							display: "flex",
						}}
						paddingX={2}
					>
						{e.idNumber2 ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Second ID Number"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.idNumber2}
								/>
							</Grid>
						) : null}

						{e.idType2 ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
										endAdornment: (
											<InputAdornment position="start">
												<FileDownloadOutlinedIcon
													sx={{ ":hover": { cursor: "pointer" } }}
													size="small"
													onClick={() => {
														DownloadData(e.idType2_doc);
													}}
												/>
											</InputAdornment>
										),
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Second ID Type"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.idType2}
								/>
							</Grid>
						) : null}

						{e.idExpire2 ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Second ID Expiry"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.idExpire2}
								/>
							</Grid>
						) : null}
					</Grid>

					<Grid
						spacing={2}
						container
						direction="row"
						marginTop={2}
						sx={{
							display: "flex",
						}}
						paddingX={2}
					>
						{e.address1 && e.address2 && e.address3 ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Home Address"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={
										e.address1 + " " + e.address2 + " " + e.address3
									}
								/>
							</Grid>
						) : null}

						{e.postcode ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Zip Code"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.postcode}
								/>
							</Grid>
						) : null}

						{e.phone_number ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Phone Number"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.phone_number}
								/>
							</Grid>
						) : null}
					</Grid>

					<Grid
						spacing={2}
						container
						direction="row"
						sx={{
							display: "flex",
						}}
						paddingX={2}
					>
						{e.mobile ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Mobile Phone"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.mobile}
								/>
							</Grid>
						) : null}

						{e.fax ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Fax Number"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.fax}
								/>
							</Grid>
						) : null}

						{e.occupation ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Occupation"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.occupation}
								/>
							</Grid>
						) : null}
					</Grid>

					<Grid
						spacing={2}
						container
						direction="row"
						sx={{
							display: "flex",
						}}
						paddingX={2}
					>
						{e.company_name ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Office Name"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.company_name}
								/>
							</Grid>
						) : null}

						{e.company_address1 && e.company_address2 && e.company_address3 ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Office Address"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={
										e.company_address1 +
										" " +
										e.company_address2 +
										" " +
										e.company_address3
									}
								/>
							</Grid>
						) : null}

						{e.company_phone ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Office Phone Number"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.company_phone}
								/>
							</Grid>
						) : null}
					</Grid>

					<Grid
						spacing={2}
						container
						direction="row"
						sx={{
							display: "flex",
						}}
						paddingX={2}
					>
						{e.company_fax ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Office Fax Number"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.company_fax}
								/>
							</Grid>
						) : null}

						{e.freqPerYear ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Estimated Remitance Frequency/year"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.freqPerYear}
								/>
							</Grid>
						) : null}

						{e.estimateyeartrx ? (
							<Grid item sx={{ width: WindowWidth <= 750 ? "100%" : "33.3%" }}>
								<TextField
									xs={4}
									InputProps={{
										readOnly: true,
										style: { fontSize: "13px" },
									}}
									variant="standard"
									margin="dense"
									size="small"
									required
									label="Estimated Remitance Amount/year(YEN)"
									autoFocus
									fullWidth
									color="secondary"
									defaultValue={e.estimateyeartrx}
								/>
							</Grid>
						) : null}
					</Grid>

					{/* BENEFICIARY START */}
					{e
						? e.beneficiaryCustomers.map((k, m) => {
								return (
									<Fragment key={m}>
										<BenItem k={k} m={m} />
									</Fragment>
								);
						  })
						: null}

					{/* BENEFICIARY END */}
					<Grid
						container
						direction="row"
						sx={{
							display: "flex",
							width: WindowWidth <= 750 ? "100%" : "34%",
						}}
						paddingX={2}
					>
						{e.statusRegister ? (
							<TextField
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px", boxSizing: "border-box" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Status"
								autoFocus
								fullWidth
								sx={{
									marginTop: "20px",
								}}
								color="secondary"
								defaultValue={e.statusRegister}
							/>
						) : null}
					</Grid>

					<Grid
						container
						direction="row"
						sx={{
							display: "flex",
						}}
						paddingX={2}
						mt={WindowWidth <= 750 ? 0 : 2}
					>
						<TextField
							InputProps={{
								style: { fontSize: "13px" },
							}}
							variant="standard"
							// margin="dense"
							size="small"
							required
							label="Input Your Note Here"
							autoFocus
							sx={{ width: WindowWidth <= 750 ? "100%" : "99.9%" }}
							color="secondary"
							defaultValue={e.message}
							value={PutMess}
							onChange={PutMessVal}
						/>
					</Grid>
				</Grid>

				<Grid
					container
					direction="row"
					paddingX={WindowWidth <= 750 ? 1 : 2}
					mt={WindowWidth <= 750 ? 0.5 : 1.5}
				>
					{e.statusRegister === "VERIFIED" ? null : (
						<Stack
							direction="row"
							sx={{
								display: "flex",
							}}
							spacing={WindowWidth <= 750 ? 0 : 2}
						>
							<Button
								variant="contained"
								size="small"
								color="success"
								sx={{
									transform: WindowWidth <= 750 ? "scale(0.8)" : "scale(1)",
								}}
								onClick={() => {
									PutData(1);
								}}
							>
								Complete
							</Button>

							<Button
								variant="contained"
								size="small"
								color="error"
								sx={{
									transform: WindowWidth <= 750 ? "scale(0.8)" : "scale(1)",
								}}
								onClick={() => {
									PutData(2);
								}}
							>
								Reject
							</Button>

							<Button
								variant="contained"
								size="small"
								color="info"
								sx={{
									transform: WindowWidth <= 750 ? "scale(0.8)" : "scale(1)",
								}}
								onClick={() => {
									PutData(3);
								}}
							>
								Verify
							</Button>

							<Button
								variant="contained"
								size="small"
								sx={{
									transform: WindowWidth <= 750 ? "scale(0.8)" : "scale(1)",
								}}
								onClick={() => {
									PutData(4);
								}}
							>
								Cancel
							</Button>
						</Stack>
					)}

					<ReactToPrint
						trigger={() => (
							<Button
								variant="outlined"
								size="small"
								color="text"
								sx={{
									transform: WindowWidth <= 750 ? "scale(0.8)" : "scale(1)",
									marginTop: "10px",
									width: WindowWidth <= 750 ? "100%" : "99.9%",
								}}
							>
								PRINT
							</Button>
						)}
						content={() => componentRef.current}
					/>
				</Grid>
			</Dialog>
		);
	}

	function AllItem({ e, i }) {
		return (
			<Fragment key={i}>
				<Grid item sm={1.5} marginBottom={1.5}>
					<Typography>{e.registrationDate}</Typography>
				</Grid>

				<Grid item sm={2} marginBottom={1.5}>
					<Typography>{e.referenceNumber ? e.referenceNumber : "-"}</Typography>
				</Grid>

				<Grid item sm={1.5} marginBottom={1.5}>
					<Typography>{e.name}</Typography>
				</Grid>

				<Grid item sm={2.2} marginBottom={1.5}>
					<Typography>{e.idNumber1}</Typography>
				</Grid>

				<Grid item sm={1.3} marginBottom={1.5}>
					<Typography>{e.birthdate}</Typography>
				</Grid>

				<Grid item sm={1.5} marginBottom={1.5}>
					<Typography>{e.address3}</Typography>
				</Grid>

				<Grid item sm={1} marginBottom={1.5}>
					<Typography>{e.statusRegister}</Typography>
				</Grid>

				<Grid item sm={1} marginBottom={1.5}>
					<Typography sx={{ textAlign: "center" }}>
						<MoreVert
							onClick={() => {
								openHandle(e, i);
							}}
							sx={{
								fontSize: "16px",
								":hover": { cursor: "pointer" },
							}}
						/>
					</Typography>
				</Grid>

				{OpenIt === true && SelectedIndex === i ? (
					<DialogItem e={e} i={i} />
				) : null}
			</Fragment>
		);
	}

	function ListProvider() {
		return (
			<Grid
				container
				spacing={2}
				// marginX={4}
				paddingX={2}
				marginTop={1}
				sx={{ justifyContent: "space-between" }}
			>
				{dataRemit
					? dataRemit.map((e, i) => {
							return (
								<Fragment key={i}>
									<AllItem e={e} i={i} />
								</Fragment>
							);
					  })
					: null}
			</Grid>
		);
	}

	return (
		<ThemeProvider theme={Theme}>
			<Drawer
				variant="temporary"
				open={open}
				ModalProps={{
					keepMounted: true,
				}}
				onClose={toggleDrawer}
			>
				{localStorage.getItem("role") === "ROLE_ADMIN" ? (
					<List>
						<ListItem
							sx={{
								paddingBottom: "30px",
								marginBottom: "10px",
								borderBottom: "0.5px solid grey",
							}}
						>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<Typography>
								<span style={{ fontSize: "20px", fontWeight: "600" }}>
									{localStorage.getItem("name")}
								</span>
								<br />
								<span>{localStorage.getItem("username")}</span>
							</Typography>
						</ListItem>

						<ListItem button onClick={() => navigate("/NewCustomer")}>
							<ListItemIcon>
								<AssignmentIndIcon />
							</ListItemIcon>
							<Typography>New Customer</Typography>
						</ListItem>

						<ListItem button onClick={() => navigate("/ExistingCustomer")}>
							<ListItemIcon>
								<AssignmentTurnedInIcon />
							</ListItemIcon>
							<Typography>Existing Customer</Typography>
						</ListItem>

						<ListItem button onClick={() => navigate("/AddUser")}>
							<ListItemIcon>
								<AddReactionIcon />
							</ListItemIcon>
							<Typography>Add User</Typography>
						</ListItem>

						<ListItem button onClick={() => navigate("/RoleMagement")}>
							<ListItemIcon>
								<ManageAccountsIcon />
							</ListItemIcon>
							<Typography>Role Magement</Typography>
						</ListItem>

						<ListItem button onClick={() => navigate("/CodeActivation")}>
							<ListItemIcon>
								<TimelapseOutlinedIcon />
							</ListItemIcon>
							<Typography>Code Activation Expiry </Typography>
						</ListItem>

						<ListItem
							button
							onClick={() => logoutf()}
							sx={{ marginTop: "20px" }}
						>
							<ListItemIcon>
								<ExitToAppRoundedIcon />
							</ListItemIcon>
							<Typography>LogOut </Typography>
						</ListItem>
					</List>
				) : (
					<List>
						<ListItem
							sx={{
								paddingBottom: "30px",
								marginBottom: "10px",
								borderBottom: "0.5px solid grey",
							}}
						>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<Typography>
								<span style={{ fontSize: "20px", fontWeight: "600" }}>
									{localStorage.getItem("name")}
								</span>
								<br />
								<span>{localStorage.getItem("username")}</span>
							</Typography>
						</ListItem>
						<ListItem button onClick={() => navigate("/NewCustomer")}>
							<ListItemIcon>
								<AssignmentIndIcon />
							</ListItemIcon>
							<Typography>New Customer</Typography>
						</ListItem>

						<ListItem button onClick={() => navigate("/ExistingCustomer")}>
							<ListItemIcon>
								<AssignmentTurnedInIcon />
							</ListItemIcon>
							<Typography>Existing Customer</Typography>
						</ListItem>

						<ListItem
							button
							onClick={() => logoutf()}
							sx={{ marginTop: "20px" }}
						>
							<ListItemIcon>
								<ExitToAppRoundedIcon />
							</ListItemIcon>
							<Typography>LogOut </Typography>
						</ListItem>
					</List>
				)}
			</Drawer>

			<AppBar
				position="fixed"
				sx={{
					backgroundColor: "#0091FF",
				}}
			>
				<Toolbar variant="dense">
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={toggleDrawer}
					>
						<MenuIcon color="primary" onc />
					</IconButton>
					<Typography variant="h6" color="primary" component="div">
						{DisplayPage}
					</Typography>
				</Toolbar>
			</AppBar>

			{Loading ? (
				<Grid
					container
					mt={2}
					spacing={2}
					paddingX={2}
					sx={{
						justifyContent: "center",
						position: "fixed",
						transform: "translate(-50%,-50%)",
						top: "50%",
						left: "50%",
						zIndex: "3",
					}}
				>
					<CircularProgress color="secondary" />
				</Grid>
			) : null}

			{AlertLoading ? <ShowAlert /> : null}

			<Box
				mt={6}
				sx={{
					width: "clamp(400px, 100%, 1980px)",
					height: "clamp(400px, 100%, 1080px)",
					backgroundColor: "rgba(255, 255, 255, 0.02)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Grid container spacing={2} paddingX={2} sx={{ marginTop: "-30px" }}>
					<Grid item xs={4}>
						<TextField
							margin="normal"
							size="small"
							required
							variant="standard"
							fullWidth
							label="ID Number"
							autoFocus
							color="secondary"
							onChange={IdNumVal}
						/>
					</Grid>

					<Grid item xs={4}>
						<TextField
							margin="normal"
							size="small"
							required
							variant="standard"
							fullWidth
							label="Name"
							autoFocus
							color="secondary"
							onChange={NameVal}
						/>
					</Grid>

					<Grid item xs={4}>
						<TextField
							margin="normal"
							size="small"
							required
							variant="standard"
							fullWidth
							label="Registration Reference Number"
							autoFocus
							color="secondary"
							onChange={RegisVal}
						/>
					</Grid>

					<Grid item xs={4}>
						<TextField
							required
							variant="standard"
							size="small"
							fullWidth
							label="Date from"
							type="date"
							InputLabelProps={{
								shrink: true,
							}}
							color="secondary"
							onChange={FromVal}
						/>
					</Grid>

					<Grid item xs={4}>
						<TextField
							required
							variant="standard"
							size="small"
							fullWidth
							label="Date to"
							type="date"
							defaultValue={ToDate}
							InputLabelProps={{
								shrink: true,
							}}
							color="secondary"
							onChange={ToVal}
						/>
					</Grid>

					<Grid item xs={4}>
						<TextField
							required
							variant="standard"
							size="small"
							fullWidth
							label="Date of Birth"
							type="date"
							InputLabelProps={{
								shrink: true,
							}}
							color="secondary"
							onChange={BirthVal}
						/>
					</Grid>

					<Grid item xs={12}>
						<FormControl fullWidth size="small">
							<InputLabel color="secondary">status</InputLabel>
							<Select
								defaultValue=""
								label="status"
								color="secondary"
								value={Status}
								onChange={StatusVal}
							>
								<MenuItem value={"PENDING"}>Pending</MenuItem>
								<MenuItem value={"COMPLETED"}>Completed</MenuItem>
								<MenuItem value={"REJECTED"}>Rejected</MenuItem>
								<MenuItem value={"CANCELED"}>Canceled</MenuItem>
								<MenuItem value={"VERIFIED"}>Verified</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={4}>
						<Stack direction="row" spacing={2}>
							<Button
								size="small"
								variant="contained"
								onClick={FetchData}
								margin="10px"
							>
								Filter
							</Button>
							<Button
								onClick={excelDownload}
								size="small"
								variant="contained"
								margin="normal"
							>
								Export
							</Button>
							<Button
								size="small"
								variant="contained"
								margin="normal"
								onClick={resetit}
							>
								Reset
							</Button>
						</Stack>
					</Grid>
				</Grid>

				{WindowWidth <= 750 ? (
					<Grid container spacing={1} paddingX={3} marginTop={1}>
						{dataRemit
							? dataRemit.map((e, i) => {
									return (
										<Fragment key={i}>
											<Grid
												container
												direction="column"
												spacing={1}
												marginTop={0.1}
											>
												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography>Registration Date</Typography>
														<Typography>{e.registrationDate}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography>Reg Ref Number</Typography>
														<Typography>
															{e.referenceNumber ? e.referenceNumber : "-"}
														</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography>Name</Typography>
														<Typography>{e.name}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography>ID Number</Typography>
														<Typography>{e.idNumber1}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography>Date of Birth</Typography>
														<Typography>{e.birthdate}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography>Home Address</Typography>
														<Typography>{e.address3}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography>Status</Typography>
														<Typography>{e.statusRegister}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{
															borderBottom: "1px solid gray",
															justifyContent: "space-between",
														}}
														mb={0.5}
													>
														<Typography>Actions</Typography>
														<MoreVert
															onClick={() => {
																openHandle(e, i);
															}}
															sx={{
																fontSize: "16px",
																":hover": { cursor: "pointer" },
															}}
														/>
													</Grid>
												</Grid>
											</Grid>

											{OpenIt === true && SelectedIndex === i ? (
												<DialogItem e={e} />
											) : null}
										</Fragment>
									);
							  })
							: null}
					</Grid>
				) : (
					<>
						<Grid
							container
							spacing={2}
							// marginX={4}
							paddingX={2}
							marginTop={1}
							sx={{ justifyContent: "space-between" }}
						>
							<Grid item sm={1.5}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									Registration Date
								</Typography>
							</Grid>
							<Grid item sm={2}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									Reg Ref Number
								</Typography>
							</Grid>
							<Grid item sm={1.5}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									Name
								</Typography>
							</Grid>
							<Grid item sm={2.2}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									ID Number
								</Typography>
							</Grid>
							<Grid item sm={1.3}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									Date of Birth
								</Typography>
							</Grid>
							<Grid item sm={1.5}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									Home Address
								</Typography>
							</Grid>
							<Grid item sm={1}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									Status
								</Typography>
							</Grid>
							<Grid item sm={1}>
								<Typography
									sx={{
										textAlign: "right",
										fontWeight: "600",
										color: "gray",
										fontSize: "14px",
									}}
								>
									actions
								</Typography>
							</Grid>
						</Grid>

						<ListProvider />
					</>
				)}
			</Box>
		</ThemeProvider>
	);
}

export default Newcustomer;

//32948329048329 sec id num
//7823721293791112 first id num
