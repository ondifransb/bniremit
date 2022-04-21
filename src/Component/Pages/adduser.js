//nested page cant be applied => gotta fix

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
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
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
						top: "100%",
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

	const navigate = useNavigate();
	const logoutf = () => {
		navigate("/");
		localStorage.removeItem("name");
		localStorage.removeItem("username");
		localStorage.removeItem("token");
		localStorage.removeItem("role");
	};

	const [Status, setStatus] = useState("");
	const StatusVal = (e) => {
		setStatus(e.target.value);
	};

	const [username, setusername] = useState("");
	const [NewPassword, setNewPassword] = useState("");
	const [name, setname] = useState("");
	const [role, setrole] = useState("");
	const [email, setemail] = useState("");
	const [open, setopen] = useState(false);

	const toggleDrawer = (event) => {
		setopen(!open);
	};

	const HandleRegister = async (e) => {
		try {
			await axios
				.post(
					"https://api-tokyo.remit.digi46.id/api/portal/register",
					{
						username: username,
						password: NewPassword,
						email: email,
						name: name,
						role: [Status],
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					},
					setLoading(true)
				)
				.then((response) => {
					setAlertMessage(response.data.message);
					setAlertLoading(true);
					RetresStat(response.status);
					ShowAlert();
					setTimeout(() => {
						setAlertLoading(false);
						RetresStat("");
					}, 1500);
					setLoading(false);
					setusername("");
					setNewPassword("");
					setname("");
					setrole("");
					setemail("");
					setopen("");
					setStatus("");
				});
		} catch (error) {
			setLoading(false);
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

	const DisplayPage = "Add User";

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
				{AlertLoading ? <ShowAlert /> : null}

				{Loading ? (
					<Grid
						container
						sx={{
							justifyContent: "center",
							position: "fixed",
							transform: "translate(-50%,-50%)",
							top: "100%",
							left: "50%",
							zIndex: "3",
						}}
					>
						<CircularProgress color="secondary" />
					</Grid>
				) : null}

				<Grid
					container
					paddingX={2}
					marginTop={8}
					marginLeft={WindowWidth <= 750 ? 0 : 2}
					direction="column"
					columns={28}
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography
						xs={4}
						sx={{
							marginTop: "10",
							fontWeight: "600",
							color: "gray",
							fontSize: "14px",
						}}
					>
						Please fill new user detail
					</Typography>
					<Divider sx={{ marginBottom: "-10px" }} />
					<Grid item xs={4}>
						<TextField
							value={username}
							onChange={(e) => {
								setusername(e.target.value);
							}}
							margin="dense"
							required
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							size="small"
							label="Username"
							autoFocus
							type="text"
							color="secondary"
							variant="standard"
						/>
					</Grid>

					<Grid item xs={4}>
						<TextField
							value={name}
							onChange={(e) => {
								setname(e.target.value);
							}}
							margin="dense"
							required
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							size="small"
							label="Name"
							autoFocus
							type="text"
							color="secondary"
							variant="standard"
						/>
					</Grid>

					<Grid item xs={4}>
						<TextField
							value={email}
							onChange={(e) => {
								setemail(e.target.value);
							}}
							margin="dense"
							required
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							size="small"
							label="Email"
							autoFocus
							type="text"
							color="secondary"
							variant="standard"
						/>
					</Grid>

					<Grid item xs={4}>
						<FormControl fullWidth variant="standard">
							<InputLabel color="secondary">status</InputLabel>
							<Select
								defaultValue=""
								required
								label="dense"
								color="secondary"
								sx={{
									width: WindowWidth <= 750 ? "100%" : "30%",
								}}
								size="small"
								value={Status}
								onChange={StatusVal}
							>
								<MenuItem value={"ADMINISTRATOR"}>ADMINISTRATOR</MenuItem>
								<MenuItem value={"OPERATOR"}>OPERATOR</MenuItem>
								<MenuItem value={"INQUIRY"}>INQUIRY</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={4}>
						<TextField
							value={NewPassword}
							onChange={(e) => {
								setNewPassword(e.target.value);
							}}
							margin="dense"
							required
							sx={{
								width: WindowWidth <= 750 ? "100%" : "30%",
							}}
							size="small"
							label="Password"
							autoFocus
							type="password"
							color="secondary"
							variant="standard"
						/>
					</Grid>

					<Button
						onClick={HandleRegister}
						xs={4}
						color="secondary"
						type="submit"
						variant="outlined"
						sx={{
							width: WindowWidth <= 750 ? "100%" : "10%",
							color: "black",
							marginTop: "10px",
						}}
					>
						Submit
					</Button>
				</Grid>
			</Box>
		</ThemeProvider>
	);
}

export default AddUser;
