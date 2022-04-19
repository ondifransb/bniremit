//TAMBAHIN FITUR DIALOG (FOR MESSAGE) DI SEMUA ROUTE..
//LANJUT PRINT DAN EXPORT
//GANTI ICON SIDE MENU
//kalau data ben tidak ada, jgn di tampilin
//TAMBAHIN scope per roles => HANYA ADMIN YANG BISA AKSES SEMUA
//BUAT SNACKBAR UNTUK ERROR (cari kondisi jika token habis)
//kuasain pernak pernik, kayak web dashboard

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
	FormControlLabel,
	RadioGroup,
	Radio,
	Stack,
	Slider,
	CircularProgress,
	Dialog,
	DialogContent,
	Alert,
	AlertTitle,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Buffer } from "buffer";

import { Theme, Wrapper } from "./styles";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InputAdornment from "@mui/material/InputAdornment";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { spacing } from "@mui/system";
import { MoreVert } from "@mui/icons-material";
import ReactToPrint from "react-to-print";

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
					}}
				>
					<AlertTitle>{ResStat === 200 ? "sucess" : "Error"}</AlertTitle>
					<strong>{AlertMessage}</strong>
				</Alert>
			</>
		) : null;
	};

	//LOADING AREA END

	//ACTION AREA START
	const [ActionF, setActionF] = useState(false);
	const fAction = () => {
		setActionF(true);
	};
	//ACTION AREA END

	//STATE AREA  START
	const [FromDate, setFromDate] = useState();
	const FromVal = (e) => {
		setFromDate(e.target.value);
	};

	const [ToDate, setToDate] = useState();
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
	let [RegisDate, setRegisDate] = useState("");
	let [RegNumber, setRegNumber] = useState("");
	let [UserName, setUserName] = useState("");
	let [IDNum, setIDNum] = useState("");
	let [Dateob, setDateob] = useState("");
	let [Address, setAddress] = useState("");
	let [refNum, setrefNum] = useState("");
	let Today = new Date(Date.now() - new Date().getTimezoneOffset() * 75000)
		.toISOString()
		.substr(0, 10);

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
					console.log(error.response.data.status);
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
			})
			.catch((error) => {
				setLoading(false);
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
			});
	};
	//FUNCTION AREA END

	useEffect(() => {
		FetchData();
	}, []);

	// DOWNLOAD FUNCTION AREA START
	const DownloadData = async () => {
		try {
			await axios
				.get(
					"url",
					{
						responseType: "blob",
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					},
					{}
				)
				.then((response) => {
					console.log(response.data);
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
		let blob = new Blob([source], { type: "image/png;base64" }),
			url = window.URL.createObjectURL(blob);
		window.open(url);
	};
	//DOWNLOAD FUNCTION AREA END

	function BenItem({ k, m }) {
		return (
			<>
				<Grid
					container
					direction="row"
					sx={{
						display: "flex",
						justifyContent: "space-between",
						marginTop: "20px",
					}}
					paddingX={2}
				>
					{k?.long_name ? (
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
							label="Beneficiary Name"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.long_name}
						/>
					) : null}

					{k?.address1 && k?.address2 && k?.address3 ? (
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
							label="Beneficiary Address"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.address1 + " " + k?.address2 + " " + k?.address3}
						/>
					) : null}

					{k?.sourceoffund ? (
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
							label="Source Fund"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.sourceoffund}
						/>
					) : null}
				</Grid>

				<Grid
					container
					direction="row"
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
					paddingX={2}
				>
					{k?.resident ? (
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
							label="Beneficiery Residence"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.resident}
						/>
					) : null}

					{k?.datecreate ? (
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
							label="Beneficiery Date Created"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.datecreate}
						/>
					) : null}

					{k?.dateupdate ? (
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
							label="Beneficiery Date Updated"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.dateupdate}
						/>
					) : null}
				</Grid>

				<Grid
					container
					direction="row"
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
					paddingX={2}
				>
					{k?.remitcardno ? (
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
							label="Beneficiery Remitance Card Numbers"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.remitcardno}
						/>
					) : null}

					{k?.idtype ? (
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
							label="Beneficiery ID Type"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.idtype}
						/>
					) : null}

					{k?.idtypeno ? (
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
							label="Beneficiery ID Number"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.idtypeno}
						/>
					) : null}
				</Grid>

				<Grid
					container
					direction="row"
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
					paddingX={2}
				>
					{k?.service_type ? (
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
							label="Beneficiery Service Type"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.service_type}
						/>
					) : null}

					{k?.service_type ? (
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
							label="Beneficiery Bank Name"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.service_type}
						/>
					) : null}

					{k?.accountnum ? (
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
							label="Beneficiery Bank Account Number"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.accountnum}
						/>
					) : null}
				</Grid>

				<Grid
					container
					direction="row"
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
					paddingX={2}
				>
					{k?.trxpurpose ? (
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
							label="Transaction Purpose"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.trxpurpose}
						/>
					) : null}

					{k?.email ? (
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
							label="Beneficiary Email"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							color="secondary"
							defaultValue={k?.email}
						/>
					) : null}
				</Grid>
			</>
		);
	}

	function DialogItem({ e, i }) {
		return (
			<Dialog
				key={i}
				fullWidth
				sx={{
					"& .MuiPaper-root": {
						height: "80%",
						width: "100%",
						maxWidth: "900px",
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
				<Grid key={i} container ref={componentRef}>
					<Grid
						key={i}
						container
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						paddingX={2}
					>
						{e.referenceNumber ? (
							<TextField
								key={i}
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.referenceNumber}
							/>
						) : null}

						{e.registrationDate ? (
							<TextField
								key={i}
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.registrationDate}
							/>
						) : null}

						<TextField
							key={i}
							InputProps={{
								readOnly: true,
								style: { fontSize: "13px" },
							}}
							variant="standard"
							margin="dense"
							size="small"
							required
							label="Activation Code"
							autoFocus
							fullWidth={WindowWidth <= 750 ? true : false}
							sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
							color="secondary"
							defaultValue={"nanti"}
						/>
					</Grid>

					<Grid
						key={i}
						container
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						paddingX={2}
					>
						{e.long_name ? (
							<TextField
								key={i}
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.long_name}
							/>
						) : null}

						{e.birthdate ? (
							<TextField
								key={i}
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.birthdate}
							/>
						) : null}

						{e.sex ? (
							<TextField
								key={i}
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.sex}
							/>
						) : null}
					</Grid>

					<Grid
						key={i}
						container
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						paddingX={2}
					>
						{e.nationality ? (
							<TextField
								key={i}
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.nationality}
							/>
						) : null}

						{e.email ? (
							<TextField
								key={i}
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.email}
							/>
						) : null}

						<Box key={i} sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}>
							<TextField
								key={i}
								xs={4}
								InputProps={{
									readOnly: true,
									style: { fontSize: "13px" },
								}}
								variant="standard"
								margin="dense"
								size="small"
								required
								// label="Signature Image"
								autoFocus
								fullWidth
								color="secondary"
								defaultValue={"Signature Image"}
								InputProps={{
									endAdornment: (
										<InputAdornment key={i} position="start">
											<IconButton
												key={i}
												onClick={() => {
													downloadIt(e.ttd_doc);
												}}
											>
												<FileDownloadOutlinedIcon key={i} />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Box>
					</Grid>

					<Grid
						container
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						paddingX={2}
					>
						{e.idNumber1 ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.idNumber1}
							/>
						) : null}

						{e.idType1 ? (
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
								label="First ID Type"
								autoFocus
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.idType1}
							/>
						) : null}

						{e.idExpire1 ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.idExpire1}
							/>
						) : null}
					</Grid>

					<Grid
						container
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						paddingX={2}
					>
						{e.idNumber2 ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.idNumber2}
							/>
						) : null}

						{e.idType2 ? (
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
								label="Second ID Type"
								autoFocus
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.idType2}
							/>
						) : null}

						{e.idExpire2 ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.idExpire2}
							/>
						) : null}
					</Grid>

					<Grid
						container
						direction="row"
						marginTop={2}
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						paddingX={2}
					>
						{e.address1 && e.address2 && e.address3 ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.address1 + " " + e.address2 + " " + e.address3}
							/>
						) : null}

						{e.postcode ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.postcode}
							/>
						) : null}

						{e.phone_number ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.phone_number}
							/>
						) : null}
					</Grid>

					<Grid
						container
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						paddingX={2}
					>
						{e.mobile ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.mobile}
							/>
						) : null}

						{e.fax ? (
							<TextField
								xs={4}
								variant="standard"
								margin="dense"
								size="small"
								required
								label="Fax Number"
								autoFocus
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.fax}
							/>
						) : null}

						{e.occupation ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.occupation}
							/>
						) : null}
					</Grid>

					<Grid
						container
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						paddingX={2}
					>
						{e.company_name ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.company_name}
							/>
						) : null}

						{e.company_address1 && e.company_address2 && e.company_address3 ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={
									e.company_address1 +
									" " +
									e.company_address2 +
									" " +
									e.company_address3
								}
							/>
						) : null}

						{e.company_phone ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.company_phone}
							/>
						) : null}
					</Grid>

					<Grid
						container
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						paddingX={2}
					>
						{e.company_fax ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.company_fax}
							/>
						) : null}

						{e.freqPerYear ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.freqPerYear}
							/>
						) : null}

						{e.estimateyeartrx ? (
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
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{ width: WindowWidth <= 750 ? "100%" : "30%" }}
								color="secondary"
								defaultValue={e.estimateyeartrx}
							/>
						) : null}
					</Grid>

					{/* BENEFICIARY START */}
					{e
						? e.beneficiaryCustomers.map((k, m) => {
								return (
									<>
										<BenItem k={k} m={m} />
									</>
								);
						  })
						: null}

					{/* BENEFICIARY END */}
					<Grid
						container
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						paddingX={2}
					>
						{e.statusRegister ? (
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
								label="Status"
								autoFocus
								fullWidth={WindowWidth <= 750 ? true : false}
								sx={{
									width: WindowWidth <= 750 ? "100%" : "30%",
									marginTop: "20px",
								}}
								color="secondary"
								defaultValue={e.statusRegister}
							/>
						) : null}
					</Grid>
				</Grid>

				<Grid
					container
					direction="row"
					sx={{
						display: "flex",
						justifyContent: "space-between",
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
						fullWidth
						color="secondary"
						defaultValue={""}
						value={PutMess}
						onChange={PutMessVal}
					/>
				</Grid>

				<Grid
					container
					direction="row"
					paddingX={WindowWidth <= 750 ? 1 : 2}
					mt={WindowWidth <= 750 ? 0.5 : 1.5}
				>
					<Stack
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						spacing={WindowWidth <= 750 ? 0 : 2}
					>
						<Button
							variant="contained"
							size="small"
							color="success"
							sx={{ transform: WindowWidth <= 750 ? "scale(0.8)" : "scale(1)" }}
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
							sx={{ transform: WindowWidth <= 750 ? "scale(0.8)" : "scale(1)" }}
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
							sx={{ transform: WindowWidth <= 750 ? "scale(0.8)" : "scale(1)" }}
							onClick={() => {
								PutData(3);
							}}
						>
							Verify
						</Button>

						<Button
							variant="contained"
							size="small"
							sx={{ transform: WindowWidth <= 750 ? "scale(0.8)" : "scale(1)" }}
							onClick={() => {
								PutData(4);
							}}
						>
							Cancel
						</Button>
					</Stack>
					<ReactToPrint
						trigger={() => (
							<Button
								variant="outlined"
								size="small"
								fullWidth
								color="text"
								sx={{
									transform: WindowWidth <= 750 ? "scale(0.8)" : "scale(1)",
									marginTop: "10px",
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
			<>
				<Grid key={i} md={1.5} marginBottom={1.5}>
					<Typography key={i}>{e.registrationDate}</Typography>
				</Grid>

				<Grid key={i} md={1.5} marginBottom={1.5}>
					<Typography key={i}>
						{e.referenceNumber ? e.referenceNumber : "-"}
					</Typography>
				</Grid>

				<Grid key={i} md={1} marginBottom={1.5}>
					<Typography key={i}>{e.name}</Typography>
				</Grid>

				<Grid key={i} md={1.5} marginBottom={1.5}>
					<Typography key={i}>{e.idNumber1}</Typography>
				</Grid>

				<Grid key={i} md={1.5} marginBottom={1.5}>
					<Typography key={i}>{e.birthdate}</Typography>
				</Grid>

				<Grid key={i} md={1.5} marginBottom={1.5}>
					<Typography key={i}>{e.address3}</Typography>
				</Grid>

				<Grid key={i} md={1.5} marginBottom={1.5}>
					<Typography key={i}>{e.statusRegister}</Typography>
				</Grid>

				<Grid key={i} md={1} marginBottom={1.5}>
					<MoreVert
						key={i}
						onClick={() => {
							openHandle(e, i);
						}}
						sx={{
							fontSize: "16px",
							":hover": { cursor: "pointer" },
						}}
					/>
				</Grid>

				{OpenIt === true && SelectedIndex === i ? (
					<DialogItem e={e} i={i} />
				) : null}
			</>
		);
	}

	function ListProvider() {
		return (
			<Grid
				container
				spacing={2}
				// marginX={4}
				paddingLeft={4}
				marginTop={1}
				sx={{ justifyContent: "space-between" }}
			>
				{dataRemit
					? dataRemit.map((e, i) => {
							return (
								<>
									<AllItem e={e} i={i} />
								</>
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

						<ListItem button onClick={() => logoutf()}>
							<ListItemIcon>
								<ExitToAppRoundedIcon />
							</ListItemIcon>
							<Typography>LogOut </Typography>
						</ListItem>
					</List>
				) : (
					<List>
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

						<ListItem button onClick={() => logoutf()}>
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
							defaultValue="today"
							type="date"
							defaultValue={Today}
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
								size="medium"
								margin="10px"
							>
								Filter
							</Button>
							<Button
								size="small"
								variant="contained"
								size="medium"
								margin="normal"
							>
								Export
							</Button>
							<Button
								size="small"
								variant="contained"
								size="medium"
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
										<>
											<Grid
												container
												direction="column"
												spacing={1}
												marginTop={0.1}
												key={i}
											>
												<Grid key={i} item sx={{ flexDirection: "row" }}>
													<Grid
														key={i}
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography key={i}>Registration Date</Typography>
														<Typography key={i}>
															{e.registrationDate}
														</Typography>
													</Grid>
												</Grid>

												<Grid key={i} item sx={{ flexDirection: "row" }}>
													<Grid
														key={i}
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography key={i}>Reg Ref Number</Typography>
														<Typography key={i}>
															{e.referenceNumber ? e.referenceNumber : "-"}
														</Typography>
													</Grid>
												</Grid>

												<Grid key={i} item sx={{ flexDirection: "row" }}>
													<Grid
														key={i}
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography key={i}>Name</Typography>
														<Typography key={i}>{e.name}</Typography>
													</Grid>
												</Grid>

												<Grid key={i} item sx={{ flexDirection: "row" }}>
													<Grid
														key={i}
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography key={i}>ID Number</Typography>
														<Typography key={i}>{e.idNumber1}</Typography>
													</Grid>
												</Grid>

												<Grid key={i} item sx={{ flexDirection: "row" }}>
													<Grid
														key={i}
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography key={i}>Date of Birth</Typography>
														<Typography key={i}>{e.birthdate}</Typography>
													</Grid>
												</Grid>

												<Grid key={i} item sx={{ flexDirection: "row" }}>
													<Grid
														key={i}
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography key={i}>Home Address</Typography>
														<Typography key={i}>{e.address3}</Typography>
													</Grid>
												</Grid>

												<Grid key={i} item sx={{ flexDirection: "row" }}>
													<Grid
														key={i}
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography key={i}>Status</Typography>
														<Typography key={i}>{e.statusRegister}</Typography>
													</Grid>
												</Grid>

												<Grid key={i} item sx={{ flexDirection: "row" }}>
													<Grid
														key={i}
														container
														sx={{
															justifyContent: "space-between",
															borderBottom: "1px solid gray",
														}}
														mb={0.5}
													>
														<Typography key={i}>Actions</Typography>
														<MoreVert
															key={i}
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
												<DialogItem e={e} key={i} />
											) : null}
										</>
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
							paddingLeft={4}
							marginTop={4}
							sx={{ justifyContent: "space-between" }}
						>
							<Grid md={1.5}>
								<Typography>Registration Date</Typography>
							</Grid>
							<Grid md={1.5}>
								<Typography>Reg Ref Number</Typography>
							</Grid>
							<Grid md={1}>
								<Typography>Name</Typography>
							</Grid>
							<Grid md={1.5}>
								<Typography>ID Number</Typography>
							</Grid>
							<Grid md={1.5}>
								<Typography>Date of Birth</Typography>
							</Grid>
							<Grid md={1.5}>
								<Typography>Home Address</Typography>
							</Grid>
							<Grid md={1.5}>
								<Typography>Status</Typography>
							</Grid>
							<Grid md={1}>
								<Typography>actions</Typography>
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
