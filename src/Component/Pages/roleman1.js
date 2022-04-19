//TAMBAH FITUR DIALOG (FOR MESSAGE) DI SEMUA ROUTE..

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
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Theme, Wrapper } from "./styles";
import MenuIcon from "@mui/icons-material/Menu";

import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import InboxIcon from "@mui/icons-material/MoveToInbox";

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
	const [dummy, setdummy] = useState(false);
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
					console.log(response);

					fetchdata();
					// window.location.reload(false);
				});
		} catch (error) {
			console.log(error);
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
					fetchdata();
				});
		} catch (error) {
			console.log(error);
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

				{Loading ? (
					<Grid
						container
						sx={{
							justifyContent: "center",
							position: "absolute",
							transform: "translate(-50%,-50%)",
							top: "50%",
							left: "50%",
						}}
					>
						<CircularProgress color="secondary" />
					</Grid>
				) : null}

				{WindowWidth <= 600 ? (
					<>
						<Grid container paddingX={2}>
							{Alldata
								? Alldata.map((e, i) => {
										return (
											<>
												<Grid
													container
													direction="column"
													spacing={1}
													marginTop={0.1}
													paddingBottom={1}
													sx={{ borderBottom: "2px solid black" }}
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
											</>
										);
								  })
								: null}
						</Grid>
					</>
				) : (
					<>
						<Grid
							container
							paddingX={WindowWidth <= 600 ? 2 : 3}
							direction="row"
							mt={2}
							mb={2}
							sx={{
								justifyContent: "space-between",
							}}
						>
							<Grid md={2}>
								<Typography>Username</Typography>
							</Grid>
							<Grid md={2}>
								<Typography>Name</Typography>
							</Grid>
							<Grid md={4}>
								<Typography>Roles</Typography>
							</Grid>
							<Grid md={3}>
								<Typography>Action</Typography>
							</Grid>
						</Grid>

						{Alldata
							? Alldata.map((e, i) => {
									return (
										<>
											<Grid
												key={i}
												container
												paddingX={WindowWidth <= 600 ? 2 : 3}
												direction="row"
												sx={{ justifyContent: "space-between" }}
											>
												<Grid md={2}>
													<Typography>{e.username}</Typography>
												</Grid>
												<Grid md={2}>
													<Typography>{e.name}</Typography>
												</Grid>
												<Grid md={4} mt={-1}>
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
												<Grid md={3} mb={1}>
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
										</>
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