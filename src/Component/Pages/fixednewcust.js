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
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Theme, Wrapper } from "./styles";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";

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

function Newcustomer() {
	const navigate = useNavigate();
	const logoutf = () => {
		navigate("/");
		localStorage.removeItem("name");
		localStorage.removeItem("username");
		localStorage.removeItem("token");
		localStorage.removeItem("role");
	};

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

	const [DisplayPage, setDisplayPage] = useState("New Customer");

	let [IDOrder, setIDOrder] = useState("");
	var PutMess;
	const PutMessVal = (e) => {
		PutMess = e.target.value;
		console.log(PutMess);
	};
	console.log(PutMess);
	const [OpenIt, setOpenIt] = useState(false);
	const [SelectedIndex, setSelectedIndex] = useState(undefined);
	const openHandle = (e, i) => {
		// console.log(e.id);
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
	let Today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
		.toISOString()
		.substr(0, 10);

	const FetchData = async () => {
		try {
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
					const alldata = res.data.shift();
					setdataRemit(res.data);
				});
		} catch (error) {
			console.log(error);
			logoutf();
		}
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
				console.log(res);
				setLoading(false);
				FetchData();
			});
	};
	//FUNCTION AREA END

	useEffect(() => {
		FetchData();
	}, []);

	// function ButtonItem(e) {
	// 	return (

	// 	)
	// }

	function DialogItem({ e }) {
		return (
			<Dialog
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
				<Grid
					container
					direction="row"
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
					paddingX={2}
				>
					<TextField
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Registration Reference Number"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.referenceNumber ? e.referenceNumber : "-"}
					/>

					<TextField
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Registration Date"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.registrationDate ? e.registrationDate : "-"}
					/>

					<TextField
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Activation Code"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={"nanti"}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Name"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.long_name ? e.long_name : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Date of Birth"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.birthdate ? e.birthdate : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Sex"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.sex ? e.sex : "-"}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Nationality"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.nationality ? e.nationality : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Email"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.email ? e.email : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Signature"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={"nanti"}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="First ID Number"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.idNumber1 ? e.idNumber1 : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="First ID Type"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.idType1 ? e.idType1 : "-".idType1}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="First ID Expiry Date"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.idExpire1 ? e.idExpire1 : "-"}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Second ID Number"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.idNumber2 ? e.idNumber2 : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Second ID Type"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.idType2 ? e.idType2 : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Second ID Expiry"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.idExpire2 ? e.idExpire2 : "-"}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Home Address"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.address1 + " " + e.address2 + " " + e.address3}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Zip Code"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.postcode ? e.postcode : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Phone Number"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.phone_number ? e.phone_number : "-"}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Mobile Phone"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.mobile ? e.mobile : "-"}
					/>

					<TextField
						xs={4}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Fax Number"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.fax ? e.fax : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Occupation"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.occupation ? e.occupation : "-"}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Office Name"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.company_name ? e.company_name : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Office Address"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.company_address1 +
							" " +
							e.company_address2 +
							" " +
							e.company_address3
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Office Phone Number"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.company_phone ? e.company_phone : "-"}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Office Fax Number"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.company_fax ? e.company_fax : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Estimated Remitance Frequency/year"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.freqPerYear ? e.freqPerYear : "-"}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Estimated Remitance Amount/year(YEN)"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.estimateyeartrx ? e.estimateyeartrx : "-"}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiary Name"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.long_name
								? e.beneficiaryCustomers[0]?.long_name
								: "-"
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiary Address"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.address1 +
							" " +
							e.beneficiaryCustomers[0]?.address2 +
							" " +
							e.beneficiaryCustomers[0]?.address3
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Source Fund"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.sourceoffund
								? e.beneficiaryCustomers[0]?.sourceoffund
								: "-"
						}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiery Residence"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.resident
								? e.beneficiaryCustomers[0]?.resident
								: "-"
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiery Date Created"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.datecreate
								? e.beneficiaryCustomers[0]?.datecreate
								: "-"
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiery Date Updated"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.dateupdate
								? e.beneficiaryCustomers[0]?.dateupdate
								: "-"
						}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiery Remitance Card Numbers"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.remitcardno
								? e.beneficiaryCustomers[0]?.remitcardno
								: "-"
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiery ID Type"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.idtype
								? e.beneficiaryCustomers[0]?.idtype
								: "-"
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiery ID Number"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.idtypeno
								? e.beneficiaryCustomers[0]?.idtypeno
								: "-"
						}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiery Service Type"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.service_type
								? e.beneficiaryCustomers[0]?.service_type
								: "-"
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiery Bank Name"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.service_type
								? e.beneficiaryCustomers[0]?.service_type
								: "-"
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiery Bank Account Number"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.accountnum
								? e.beneficiaryCustomers[0]?.accountnum
								: "-"
						}
					/>
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
					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Transaction Purpose"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.trxpurpose
								? e.beneficiaryCustomers[0]?.trxpurpose
								: "-"
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Beneficiary Email"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={
							e.beneficiaryCustomers[0]?.email
								? e.beneficiaryCustomers[0]?.email
								: "-"
						}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
							style: { fontSize: 13 },
						}}
						variant="standard"
						margin="dense"
						size="small"
						required
						label="Status"
						autoFocus
						fullWidth={WindowWidth <= 600 ? true : false}
						sx={{ width: WindowWidth <= 600 ? "100%" : "30%" }}
						color="secondary"
						defaultValue={e.statusRegister ? e.statusRegister : "-"}
					/>
				</Grid>

				<Grid
					container
					direction="row"
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
					paddingX={2}
					mt={WindowWidth <= 600 ? 0 : 2}
				>
					<TextField
						InputProps={{
							style: { fontSize: 13 },
						}}
						variant="standard"
						marginBottom="dense"
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
					paddingX={WindowWidth <= 600 ? 1 : 2}
					mt={WindowWidth <= 600 ? 0.5 : 1.5}
				>
					<Stack
						direction="row"
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						spacing={WindowWidth <= 600 ? 0 : 2}
					>
						<Button
							variant="contained"
							size="small"
							color="success"
							sx={{ transform: WindowWidth <= 600 ? "scale(0.8)" : "scale(1)" }}
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
							sx={{ transform: WindowWidth <= 600 ? "scale(0.8)" : "scale(1)" }}
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
							sx={{ transform: WindowWidth <= 600 ? "scale(0.8)" : "scale(1)" }}
							onClick={() => {
								PutData(3);
							}}
						>
							Verify
						</Button>

						<Button
							variant="contained"
							size="small"
							sx={{ transform: WindowWidth <= 600 ? "scale(0.8)" : "scale(1)" }}
							onClick={() => {
								PutData(4);
							}}
						>
							Cancel
						</Button>
					</Stack>
				</Grid>
			</Dialog>
		);
	}

	function AllItem({ e, i }) {
		return (
			<>
				<Grid md={1.5} marginBottom={1.5}>
					<Typography>{e.registrationDate}</Typography>
				</Grid>

				<Grid md={1.5} marginBottom={1.5}>
					<Typography>{e.referenceNumber ? e.referenceNumber : "-"}</Typography>
				</Grid>

				<Grid md={1} marginBottom={1.5}>
					<Typography>{e.name}</Typography>
				</Grid>

				<Grid md={1.5} marginBottom={1.5}>
					<Typography>{e.idNumber1}</Typography>
				</Grid>

				<Grid md={1.5} marginBottom={1.5}>
					<Typography>{e.birthdate}</Typography>
				</Grid>

				<Grid md={1.5} marginBottom={1.5}>
					<Typography>{e.address3}</Typography>
				</Grid>

				<Grid md={1.5} marginBottom={1.5}>
					<Typography>{e.statusRegister}</Typography>
				</Grid>

				<Grid md={1} marginBottom={1.5}>
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

				{Loading ? (
					<Grid
						container
						mt={2}
						spacing={2}
						paddingX={2}
						sx={{
							justifyContent: "center",
							position: "absolute",
							transform: "translate(-50%,-100%)",
							top: "100%",
							left: "50%",
						}}
					>
						<CircularProgress color="secondary" />
					</Grid>
				) : null}

				{OpenIt === true && SelectedIndex === i ? <DialogItem e={e} /> : null}
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
									<AllItem key={i} e={e} i={i} />
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
				<List>
					<ListItem button onClick={() => navigate("/NewCustomer")}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<Typography>New Customer</Typography>
					</ListItem>

					<ListItem button onClick={() => navigate("/ExistingCustomer")}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<Typography>Existing Customer</Typography>
					</ListItem>

					<ListItem button onClick={() => navigate("/AddUser")}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<Typography>Add User</Typography>
					</ListItem>

					<ListItem button onClick={() => navigate("/RoleMagement")}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<Typography>Role Magement</Typography>
					</ListItem>

					<ListItem button onClick={() => navigate("/CodeActivation")}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<Typography>Code Activation Expiry </Typography>
					</ListItem>

					<ListItem button onClick={() => logoutf()}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<Typography>LogOut </Typography>
					</ListItem>
				</List>
			</Drawer>

			<Box
				sx={{
					width: "clamp(400px, 100%, 1980px)",
					blur: "20px",
					height: "clamp(400px, 100%, 1080px)",
					backdropFilter: "blur(3px)",
					backgroundColor: "rgba(255, 255, 255, 0.02)",
					WebkitBackdropFilter: "blur(3px)",
					borderRadius: "0",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<AppBar
					position="static"
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

				<Grid container spacing={2} paddingX={2}>
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
								{/* <IconButton>
									<DeleteIcon />
								</IconButton> */}
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

				{WindowWidth <= 600 ? (
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
															justifyContent: "space-between",
															borderBottom: "1px solid gray",
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

											{Loading ? (
												<Grid
													container
													mt={2}
													spacing={2}
													paddingX={2}
													sx={{
														justifyContent: "center",
														position: "absolute",
														transform: "translate(-50%,-25%)",
														top: "25%",
														left: "50%",
													}}
												>
													<CircularProgress color="secondary" />
												</Grid>
											) : null}

											{OpenIt === true && SelectedIndex === i ? (
												<DialogItem e={e} />
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
