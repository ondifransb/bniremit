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
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Theme, Wrapper } from "./styles";
import MenuIcon from "@mui/icons-material/Menu";

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
					setdataRemit(res.data);
					console.log(res.data.beneficiaryCustomers.referenceNumber);

					// dataRemit.map((e, i, j, referenceNumber) => {
					// 	return (
					// 		setRegisDate(e.registrationDate),
					// 		setRegNumber(e.beneficiaryCustomers),
					// 		setUserName(e.name),
					// 		setIDNum(e.id),
					// 		setDateob(e.birthdate),
					// 		setAddress(e.address1 + " " + e.address2 + " " + e.address3)
					// 	);
					// });
					// RegNumber?.map((e, i) => {
					// 	return (setrefNum = e.referenceNumber);
					// });

					// console.log(refNum);
					// console.log(RegisDate, UserName, IDNum, Dateob, Address);
				});
		} catch (error) {
			console.log(error);
		}
	};
	//FUNCTION AREA END

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
							required
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
							required
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
							required
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
						<FormControl fullWidth>
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
								variant="contained"
								onClick={FetchData}
								size="medium"
								margin="10px"
								// color="secondary"
							>
								Filter
							</Button>
							<Button
								variant="contained"
								size="medium"
								margin="normal"
								// color="secondary"
							>
								Export
							</Button>
							<Button
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
					<Grid
						container
						direction="row"
						spacing={2}
						paddingX={2}
						marginTop={0.1}
						sx={{ justifyContent: "space-between" }}
					>
						<Grid item>
							<Typography>Registration Date</Typography>

							{dataRemit
								? dataRemit.map((e, i) => {
										return (
											<>
												<Grid item mb={1}>
													<Typography>{e.registrationDate}</Typography>
												</Grid>
											</>
										);
								  })
								: null}
						</Grid>

						<Grid item>
							<Typography>Reg Ref Number</Typography>
							{dataRemit
								? dataRemit.map((e, i) => {
										return (
											<>
												<Grid item mb={1}>
													<Typography>
														{e.referenceNumber ? e.referenceNumber : "-"}
													</Typography>
												</Grid>
											</>
										);
								  })
								: null}
						</Grid>

						<Grid item>
							<Typography>Name</Typography>
							{dataRemit
								? dataRemit.map((e, i) => {
										return (
											<>
												<Grid item mb={1}>
													<Typography>{e.name}</Typography>
												</Grid>
											</>
										);
								  })
								: null}
						</Grid>

						<Grid item>
							<Typography>ID Number</Typography>
							{dataRemit
								? dataRemit.map((e, i) => {
										return (
											<>
												<Grid item mb={1}>
													<Typography>{e.idNumber1}</Typography>
												</Grid>
											</>
										);
								  })
								: null}
						</Grid>

						<Grid item>
							<Typography>Date of Birth</Typography>
							{dataRemit
								? dataRemit.map((e, i) => {
										return (
											<>
												<Grid item mb={1}>
													<Typography>{e.birthdate}</Typography>
												</Grid>
											</>
										);
								  })
								: null}
						</Grid>

						<Grid item>
							<Typography>Home Address</Typography>
							{dataRemit
								? dataRemit.map((e, i) => {
										return (
											<>
												<Grid item mb={1}>
													<Typography>{e.address3}</Typography>
												</Grid>
											</>
										);
								  })
								: null}
						</Grid>

						<Grid item>
							<Typography>Status</Typography>
							{dataRemit
								? dataRemit.map((e, i) => {
										return (
											<>
												<Grid item mb={1}>
													<Typography>{e.statusRegister}</Typography>
												</Grid>
											</>
										);
								  })
								: null}
						</Grid>

						<Grid item>
							<Typography>action</Typography>
							{dataRemit
								? dataRemit.map((e, i) => {
										return (
											<>
												<Grid item mb={1}>
													<Typography>||</Typography>
												</Grid>
											</>
										);
								  })
								: null}
						</Grid>
						{Loading ? (
							<Grid
								container
								mt={2}
								spacding={2}
								paddingX={2}
								sx={{ justifyContent: "center" }}
							>
								<CircularProgress color="secondary" />
							</Grid>
						) : null}
					</Grid>
				)}
			</Box>
		</ThemeProvider>
	);
}

export default ExistingCustomer;
