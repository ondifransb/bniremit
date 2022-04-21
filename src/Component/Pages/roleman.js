import {
	ThemeProvider,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Box,
	Grid,
	Button,
	Drawer,
	FormControlLabel,
	RadioGroup,
	Radio,
	Stack,
	CircularProgress,
	Alert,
	AlertTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Theme } from "./styles";
import MenuIcon from "@mui/icons-material/Menu";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import PersonIcon from "@mui/icons-material/Person";

import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function RoleManagement() {
	const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
	const updateDimensions = () => {
		setWindowWidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const [Loading, setLoading] = useState(false);
	const [AlertLoading, setAlertLoading] = useState(false);
	const [AlertMessage, setAlertMessage] = useState("");
	const [ResStat, RetresStat] = useState("");
	const ShowAlert = (Stat) => {
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
					<AlertTitle sx={{ lineHeight: "0" }}>
						{ResStat === 200 ? "sucess" : "Error"}
					</AlertTitle>
					<strong>{AlertMessage}</strong>
				</Alert>
			</>
		) : null;
	};

	const DisplayPage = "Role Management";

	const navigate = useNavigate();
	const logoutf = () => {
		navigate("/");
		localStorage.removeItem("name");
		localStorage.removeItem("username");
		localStorage.removeItem("token");
		localStorage.removeItem("role");
	};
	const [open, setopen] = useState(false);
	const toggleDrawer = (event) => {
		setopen(!open);
	};

	const [Value, setValue] = useState("");
	const FormValue = (e) => {
		setValue(e.target.value);
	};

	let [Alldata, setAlldata] = useState("");
	const fetchdata = async () => {
		await axios
			.get(
				"https://api-tokyo.remit.digi46.id/api/portal/retrieveRoleManagement",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
				setLoading(true)
			)
			.then((res) => {
				setAlldata(res.data);
				setLoading(false);
			});
	};

	const HandleUpdate = async (rolesid, userid) => {
		try {
			await axios
				.post(
					"https://api-tokyo.remit.digi46.id/api/portal/roleManagement",
					{
						role_id: Value,
						users_id: userid,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				)
				.then((response) => {
					setAlertMessage(response.data.message);
					setAlertLoading(true);
					RetresStat(response.status);
					ShowAlert(response.data.status);
					setTimeout(() => {
						setAlertLoading(false);
						RetresStat("");
					}, 1500);
					fetchdata();
				});
		} catch (error) {
			if (error.response) {
				if (error.response.data.status === 401) {
					setAlertMessage(
						error.response.data.Message || error.response.data.message
					);
					setAlertLoading(true);
					ShowAlert();
					setTimeout(() => {
						setAlertLoading(false);
						logoutf();
					}, 1500);
				} else {
					setAlertMessage(
						error.response.data.Message || error.response.data.message
					);
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
					}, 1500);
				}
			}
		}
	};

	const HandleDelete = async (userId) => {
		try {
			await axios
				.delete(
					`https://api-tokyo.remit.digi46.id/api/portal/deleteUserPortal/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				)
				.then((response) => {
					setAlertMessage(response.data.message);
					setAlertLoading(true);
					RetresStat(response.status);
					ShowAlert(response.data.status);
					setTimeout(() => {
						setAlertLoading(false);
					}, 1500);
					fetchdata();
				});
		} catch (error) {
			if (error.response) {
				if (error.response.data.status === 401) {
					setAlertMessage(
						error.response.data.Message || error.response.data.message
					);
					setAlertLoading(true);
					ShowAlert();
					setTimeout(() => {
						setAlertLoading(false);
						logoutf();
					}, 1500);
				} else {
					setAlertMessage(
						error.response.data.Message || error.response.data.message
					);
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
					}, 1500);
				}
			}
		}
	};

	useEffect(() => {
		fetchdata();
	}, []);

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
								<h3>{localStorage.getItem("name")}</h3>
								<p>{localStorage.getItem("username")}</p>
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

			{AlertLoading ? <ShowAlert /> : null}

			<Box
				mt={5}
				sx={{
					width: "clamp(400px, 100%, 1980px)",
					backgroundColor: "rgba(255, 255, 255, 0.02)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{Loading ? (
					<Grid
						container
						sx={{
							justifyContent: "center",
							position: "fixed",
							transform: "translate(-50%,-50%)",
							top: "50%",
							left: "50%",
							zIndex: "2",
						}}
					>
						<CircularProgress color="secondary" />
					</Grid>
				) : null}

				{WindowWidth <= 900 ? (
					<>
						<Grid container paddingX={2}>
							{Alldata
								? Alldata.map((e, i) => {
										return (
											<Grid
												container
												direction="column"
												spacing={1}
												marginTop={1.5}
												paddingBottom={1}
												sx={{ borderBottom: "2px solid black" }}
												key={i}
											>
												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography>Username</Typography>
														<Typography>{e.username}</Typography>
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

												<Grid item>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography
															sx={{
																marginTop: "25px",
															}}
														>
															Roles
														</Typography>
														<RadioGroup
															defaultValue={e.roles[0].id}
															onChange={FormValue}
														>
															<FormControlLabel
																disabled={e.roles[0].id === 1}
																labelPlacement="start"
																value={1}
																control={
																	<Radio size="small" color="secondary" />
																}
																label="Administrator"
																sx={{
																	marginBottom: "-15px",
																	marginTop: "-5px",
																}}
															/>
															<FormControlLabel
																disabled={e.roles[0].id === 1}
																labelPlacement="start"
																value={2}
																control={
																	<Radio size="small" color="secondary" />
																}
																label="Inquiry"
																sx={{ marginBottom: "-15px" }}
															/>
															<FormControlLabel
																disabled={e.roles[0].id === 1}
																labelPlacement="start"
																value={3}
																control={
																	<Radio size="small" color="secondary" />
																}
																label="Operator"
															/>
														</RadioGroup>
													</Grid>
												</Grid>

												<Grid item sx={{ flexDirection: "row" }}>
													<Grid
														container
														sx={{ justifyContent: "space-between" }}
														mb={0.5}
													>
														<Typography
															sx={{
																marginTop: "5px",
																marginBottom: "10px",
															}}
														>
															Actions
														</Typography>
														<Stack direction="row" spacing={1}>
															<Button
																disabled={e.roles[0].id === 1}
																variant="contained"
																size="small"
																onClick={() => {
																	HandleUpdate(e.roles[0], e.id);
																}}
															>
																Update
															</Button>

															<Button
																disabled={e.roles[0].id === 1}
																variant="contained"
																size="small"
																onClick={() => {
																	HandleDelete(e.id);
																}}
															>
																Delete
															</Button>
														</Stack>
													</Grid>
												</Grid>
											</Grid>
										);
								  })
								: null}
						</Grid>
					</>
				) : (
					<>
						<Grid
							container
							paddingX={WindowWidth <= 750 ? 2 : 3}
							direction="row"
							mt={3}
							mb={2}
							sx={{
								justifyContent: "space-between",
							}}
						>
							<Grid sm={2}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									Username
								</Typography>
							</Grid>
							<Grid sm={2}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									Name
								</Typography>
							</Grid>
							<Grid sm={4}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									Roles
								</Typography>
							</Grid>
							<Grid sm={3}>
								<Typography
									sx={{ fontWeight: "600", color: "gray", fontSize: "14px" }}
								>
									Action
								</Typography>
							</Grid>
						</Grid>

						{Alldata
							? Alldata.map((e, i) => {
									return (
										<Grid
											container
											paddingX={WindowWidth <= 750 ? 2 : 3}
											direction="row"
											sx={{
												justifyContent: "space-between",
											}}
											key={i}
										>
											<Grid sm={2}>
												<Typography>{e.username}</Typography>
											</Grid>
											<Grid sm={2}>
												<Typography>{e.name}</Typography>
											</Grid>
											<Grid sm={4} mt={-1}>
												<RadioGroup
													row
													defaultValue={e.roles[0].id}
													onChange={FormValue}
													sx={{ alignContent: "flex-start" }}
												>
													<FormControlLabel
														disabled={e.roles[0].id === 1}
														value={1}
														control={<Radio size="small" color="secondary" />}
														label="Administrator"
													/>
													<FormControlLabel
														disabled={e.roles[0].id === 1}
														value={2}
														control={<Radio size="small" color="secondary" />}
														label="Inquiry"
													/>
													<FormControlLabel
														disabled={e.roles[0].id === 1}
														value={3}
														control={<Radio size="small" color="secondary" />}
														label="Operator"
													/>
												</RadioGroup>
											</Grid>
											<Grid sm={3} mb={1}>
												<Stack direction="row" spacing={1}>
													<Button
														disabled={e.roles[0].id === 1}
														variant="contained"
														size="small"
														onClick={() => {
															HandleUpdate(e.roles[0], e.id);
														}}
													>
														Update
													</Button>

													<Button
														disabled={e.roles[0].id === 1}
														variant="contained"
														size="small"
														onClick={() => {
															HandleDelete(e.id);
														}}
													>
														Delete
													</Button>
												</Stack>
											</Grid>
										</Grid>
									);
							  })
							: null}
					</>
				)}
			</Box>
		</ThemeProvider>
	);
}

export default RoleManagement;
