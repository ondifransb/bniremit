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

function ExistingCustomer() {
	const navigate = useNavigate();
	const logoutf = () => {
		navigate("/");
		localStorage.removeItem("name");
		localStorage.removeItem("username");
		localStorage.removeItem("token");
		localStorage.removeItem("role");
	};

	//WINDOW SIZE AREA START
	const [width, setWidth] = useState(window.innerWidth);
	const updateDimensions = () => {
		setWidth(window.innerWidth);
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

	let [BenRegref, setBenRegref] = useState("");
	let [BenRegDate, setBenRegDate] = useState("");
	let [BenActCode, setBenActCode] = useState("");
	let [BenName, setBenName] = useState("");
	let [BenDoB, setBenDoB] = useState("");
	let [BenSex, setBenSex] = useState("");
	let [BenNatio, setBenNatio] = useState("");
	let [BenEmail, setBenEmail] = useState("");
	let [BenSignature, setBenSignature] = useState("");
	let [BenFirstIDNum, setFirstIDNum] = useState("");
	let [BenFirstIDType, setBenFirstIDType] = useState("");
	let [BenFirstIDExp, setBenFirstIDExp] = useState("");
	let [BenSecondIDNum, setSecondIDNum] = useState("");
	let [BenSecondIDType, setBenSecondIDType] = useState("");
	let [BenSecondIDExp, setBenSecondIDExp] = useState("");
	let [BenHomeAdd, setBenHomeAdd] = useState("");
	let [BenZipCode, setBenZipCode] = useState("");
	let [BenPhoneNum, setBenPhoneNum] = useState("");
	let [BenMobNum, setBenMobNum] = useState("");
	let [BenFaxNum, setBenFaxNum] = useState("");
	let [BenOccupation, setBenOccupation] = useState("");
	let [BenOffName, setBenOffName] = useState("");
	let [BenOffAdd, setBenOffAdd] = useState("");
	let [BenOffNumb, setBenOffNumb] = useState("");
	let [BenOffFaxNum, setBenOffFaxNum] = useState("");
	let [BenEstFreq, setBenEstFreq] = useState("");
	let [BenEstAm, setBenEstAm] = useState("");
	let [BenBenName, setBenBenName] = useState("");
	let [BenBenAdd, setBenBenAdd] = useState("");
	let [BenBenSource, setBenBenSource] = useState("");
	let [BenBenRes, setBenBenRes] = useState("");
	let [BenBenDateCreate, setBenBenDateCreate] = useState("");
	let [BenBenDateUpdated, setBenBenDateUpdated] = useState("");
	let [BenBenRemitNumb, setBenBenRemitNumb] = useState("");
	let [BenBenIDType, setBenBenIDType] = useState("");
	let [BenBenIDNumb, setBenBenIDNumb] = useState("");
	let [BenBenServiceType, setBenBenServiceType] = useState("");
	let [BenBenBankName, setBenBenBankName] = useState("");
	let [BenBenBankNumb, setBenBenBankNumb] = useState("");
	let [BenBenTransPur, setBenBenTransPur] = useState("");
	let [BenBenEmail, setBenBenEmail] = useState("");
	let [BenStatus, setBenStatus] = useState("");

	const [OpenIt, setOpenIt] = useState(false);
	const openHandle = (e, i) => {
		setBenRegref(e.id);
		setBenRegDate(e.registrationDate);
		setBenActCode("nanti");
		setBenName(e.long_name);
		setBenDoB(e.birthdate);
		setBenSex(e.sex);
		setBenNatio(e.nationality);
		setBenEmail(e.email);
		setBenSignature("nanti");
		setFirstIDNum(e.idNumber1);
		setBenFirstIDType(e.idType1);
		setBenFirstIDExp(e.idExpire1);
		setSecondIDNum(e.idNumber2);
		setBenSecondIDType(e.idType2);
		setBenSecondIDExp(e.idExpire2);
		setBenHomeAdd(e.address1 + " " + e.address2 + " " + e.address3);
		setBenZipCode(e.postcode);
		setBenPhoneNum(e.phone_number);
		setBenMobNum(e.mobile);
		setBenFaxNum(e.fax);
		setBenOccupation(e.occupation);
		setBenOffName(e.company_name);
		setBenOffAdd(
			e.company_address1 + " " + e.company_address2 + " " + e.company_address3
		);
		setBenOffNumb(e.company_phone);
		setBenOffFaxNum(e.company_fax);
		setBenEstFreq(e.freqPerYear);
		setBenEstAm(e.estimateyeartrx);
		setBenBenName(e.beneficiaryCustomers[0]?.long_name);
		setBenBenAdd(
			e.beneficiaryCustomers[0]?.address1 +
				" " +
				e.beneficiaryCustomers[0]?.address2 +
				" " +
				e.beneficiaryCustomers[0]?.address3
		);
		setBenBenSource(e.beneficiaryCustomers[0]?.sourceoffund);
		setBenBenRes(e.beneficiaryCustomers[0]?.resident);
		setBenBenDateCreate(e.beneficiaryCustomers[0]?.datecreate);
		setBenBenDateUpdated(e.beneficiaryCustomers[0]?.dateupdate);
		setBenBenRemitNumb(e.beneficiaryCustomers[0]?.remitcardno);
		setBenBenIDType(e.beneficiaryCustomers[0]?.idtype);
		setBenBenIDNumb(e.beneficiaryCustomers[0]?.idtypeno);
		setBenBenServiceType(e.beneficiaryCustomers[0]?.service_type);
		setBenBenBankName(e.beneficiaryCustomers[0]?.service_type);
		setBenBenBankNumb(e.beneficiaryCustomers[0]?.accountnum);
		setBenBenTransPur(e.beneficiaryCustomers[0]?.trxpurpose);
		setBenBenEmail(e.beneficiaryCustomers[0]?.email);
		setBenStatus(e.beneficiaryCustomers[0]?.status);

		console.log(e.id);
		setOpenIt(true);
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

					if (res.status == 401) {
						logoutf();
					}
				});
		} catch (error) {
			console.log(error);
		}
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
						height: "60%",
						width: "100%",
						maxWidth: "700px",
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
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Registration Reference Number"
						autoFocus
						color="secondary"
						defaultValue={BenRegref}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Registration Date"
						autoFocus
						color="secondary"
						defaultValue={BenRegDate}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Activation Code"
						autoFocus
						color="secondary"
						defaultValue={BenActCode}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="Name"
						autoFocus
						color="secondary"
						defaultValue={BenName}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Date of Birth"
						autoFocus
						color="secondary"
						defaultValue={BenDoB}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Sex"
						autoFocus
						color="secondary"
						defaultValue={BenSex}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="Nationality"
						autoFocus
						color="secondary"
						defaultValue={BenNatio}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Email"
						autoFocus
						color="secondary"
						defaultValue={BenEmail}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Signature"
						autoFocus
						color="secondary"
						defaultValue={BenSignature}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="First ID Number"
						autoFocus
						color="secondary"
						defaultValue={BenFirstIDNum}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="First ID Type"
						autoFocus
						color="secondary"
						defaultValue={e.idType1}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="First ID Expiry Date"
						autoFocus
						color="secondary"
						defaultValue={BenFirstIDType}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="Second ID Number"
						autoFocus
						color="secondary"
						defaultValue={BenSecondIDNum}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Second ID Type"
						autoFocus
						color="secondary"
						defaultValue={BenSecondIDType}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Second ID Expiry"
						autoFocus
						color="secondary"
						defaultValue={BenSecondIDExp}
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
						variant="standard"
						margin="normal"
						required
						label="Home Address"
						autoFocus
						color="secondary"
						defaultValue={BenHomeAdd}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Zip Code"
						autoFocus
						color="secondary"
						defaultValue={BenZipCode}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Phone Number"
						autoFocus
						color="secondary"
						defaultValue={BenPhoneNum}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="Mobile Phone"
						autoFocus
						color="secondary"
						defaultValue={BenMobNum}
					/>

					<TextField
						xs={4}
						variant="standard"
						margin="normal"
						required
						label="Fax Number"
						autoFocus
						color="secondary"
						defaultValue={BenFaxNum}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Occupation"
						autoFocus
						color="secondary"
						defaultValue={BenOccupation}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="Office Name"
						autoFocus
						color="secondary"
						defaultValue={BenOffName}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Office Address"
						autoFocus
						color="secondary"
						defaultValue={BenOffAdd}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Office Phone Number"
						autoFocus
						color="secondary"
						defaultValue={BenOffNumb}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="Office Fax Number"
						autoFocus
						color="secondary"
						defaultValue={BenOffFaxNum}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Estimated Remitance Frequency/year"
						autoFocus
						color="secondary"
						defaultValue={BenEstFreq}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Estimated Remitance Amount/year(YEN)"
						autoFocus
						color="secondary"
						defaultValue={BenEstAm}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="Beneficiary Name"
						autoFocus
						color="secondary"
						defaultValue={BenBenName}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Beneficiary Address"
						autoFocus
						color="secondary"
						defaultValue={BenBenAdd}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Source Fund"
						autoFocus
						color="secondary"
						defaultValue={BenBenSource}
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
						variant="standard"
						margin="normal"
						required
						label="Beneficiery Residence"
						autoFocus
						color="secondary"
						defaultValue={BenBenRes}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Beneficiery Date Created"
						autoFocus
						color="secondary"
						defaultValue={BenBenDateCreate}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Beneficiery Date Updated"
						autoFocus
						color="secondary"
						defaultValue={BenBenDateUpdated}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="Beneficiery Remitance Card Numbers"
						autoFocus
						color="secondary"
						defaultValue={BenBenRemitNumb}
					/>

					<TextField
						xs={4}
						variant="standard"
						margin="normal"
						required
						label="Beneficiery ID Type"
						autoFocus
						color="secondary"
						defaultValue={BenBenIDType}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Beneficiery ID Number"
						autoFocus
						color="secondary"
						defaultValue={BenBenIDNumb}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="Beneficiery Service Type"
						autoFocus
						color="secondary"
						defaultValue={BenBenServiceType}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Beneficiery Bank Name"
						autoFocus
						color="secondary"
						defaultValue={BenBenBankName}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Beneficiery Bank Account Number"
						autoFocus
						color="secondary"
						defaultValue={BenBenBankNumb}
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
						}}
						variant="standard"
						margin="normal"
						required
						label="Transaction Purpose"
						autoFocus
						color="secondary"
						defaultValue={BenBenTransPur}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Beneficiary Email"
						autoFocus
						color="secondary"
						defaultValue={BenBenEmail}
					/>

					<TextField
						xs={4}
						InputProps={{
							readOnly: true,
						}}
						variant="standard"
						margin="normal"
						required
						label="Status"
						autoFocus
						color="secondary"
						defaultValue={BenStatus}
					/>
				</Grid>
			</Dialog>
		);
	}

	function AllItem({ e, i }) {
		return (
			<Grid
				key={i}
				container
				spacing={2}
				paddingX={2}
				marginTop={0.1}
				sx={{ justifyContent: "space-between" }}
			>
				<Grid item>
					<Grid item mb={1}>
						<Typography>{e.registrationDate}</Typography>
					</Grid>
				</Grid>

				<Grid item>
					<Grid item mb={1}>
						<Typography>
							{e.referenceNumber ? e.referenceNumber : "-"}
						</Typography>
					</Grid>
				</Grid>

				<Grid item>
					<Grid item mb={1}>
						<Typography>{e.name}</Typography>
					</Grid>
				</Grid>

				<Grid item>
					<Grid item mb={1}>
						<Typography>{e.idNumber1}</Typography>
					</Grid>
				</Grid>

				<Grid item>
					<Grid item mb={1}>
						<Typography>{e.birthdate}</Typography>
					</Grid>
				</Grid>

				<Grid item>
					<Grid item mb={1}>
						<Typography>{e.address3}</Typography>
					</Grid>
				</Grid>

				<Grid item>
					<Grid item mb={1}>
						<Typography>{e.statusRegister}</Typography>
					</Grid>
				</Grid>

				<Grid item>
					<Grid item mb={1}>
						<Typography>
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
				</Grid>

				{Loading ? (
					<Grid
						container
						mt={2}
						spacding={2}
						paddingX={2}
						sx={{
							justifyContent: "center",
							position: "absolute",
							transform: "translate(-50%,-100%)",
							top: "50%",
							left: "50%",
						}}
					>
						<CircularProgress color="secondary" />
					</Grid>
				) : null}

				{OpenIt ? <DialogItem e={e} /> : null}
			</Grid>
		);
	}

	function ListProvider() {
		return (
			<ul>
				{dataRemit
					? dataRemit.map((e, i) => {
							return (
								<>
									<AllItem e={e} i={i} />
								</>
							);
					  })
					: null}
			</ul>
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
				<Grid
					container
					spacing={2}
					paddingX={2}
					marginTop={0.1}
					sx={{ justifyContent: "space-between" }}
				>
					<Typography>Registration Date</Typography>
					<Typography>Reg Ref Number</Typography>
					<Typography>Name</Typography>
					<Typography>ID Number</Typography>
					<Typography>Date of Birth</Typography>
					<Typography>Home Address</Typography>
					<Typography>Status</Typography>
					<Typography>action</Typography>
				</Grid>
				>
				{width <= 600 ? (
					<Grid container spacing={2} paddingX={2} marginTop={0.1}>
						{dataRemit
							? dataRemit.map((e, i) => {
									return (
										<>
											<Grid
												container
												direction="column"
												spacing={1}
												paddingX={1}
												marginTop={0.1}
												sx={{
													justifyContent: "space-between",
													borderBottom: "1px solid black",
												}}
											>
												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={1}
													>
														<Typography>Registration Date</Typography>
														<Typography>{e.registrationDate}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={1}
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
														mb={1}
													>
														<Typography>Name</Typography>
														<Typography>{e.name}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={1}
													>
														<Typography>ID Number</Typography>
														<Typography>{e.idNumber1}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={1}
													>
														<Typography>Date of Birth</Typography>
														<Typography>{e.birthdate}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={1}
													>
														<Typography>Home Address</Typography>
														<Typography>{e.address3}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={1}
													>
														<Typography>Status</Typography>
														<Typography>{e.statusRegister}</Typography>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={1}
													>
														<Typography>action</Typography>
														<Typography>||</Typography>
													</Grid>
												</Grid>
											</Grid>
										</>
									);
							  })
							: null}
					</Grid>
				) : (
					<ListProvider />
				)}
			</Box>
		</ThemeProvider>
	);
}

export default ExistingCustomer;
