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
	const [password, setpassword] = useState("");
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
						password: password,
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
					setLoading(false);
					setusername("");
					setpassword("");
					setname("");
					setrole("");
					setemail("");
					setopen("");
					setStatus("");
				});
		} catch (error) {
			console.log(error);
		}
	};

	const [status, setstatus] = useState(null);
	const [DisplayPage, setDisplayPage] = useState("Add User");

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
							top: "100%",
							left: "50%",
							transform: "translate(-50%,-50%)",
						}}
					>
						<CircularProgress color="secondary" />
					</Grid>
				) : null}

				<Grid
					container
					paddingX={2}
					marginTop={2}
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
							// fontSize: "16",
							marginTop: "10",
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
								width: WindowWidth <= 600 ? "100%" : "30%",
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
								width: WindowWidth <= 600 ? "100%" : "30%",
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
								width: WindowWidth <= 600 ? "100%" : "30%",
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
									width: WindowWidth <= 600 ? "100%" : "30%",
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
							value={password}
							onChange={(e) => {
								setpassword(e.target.value);
							}}
							margin="dense"
							required
							sx={{
								width: WindowWidth <= 600 ? "100%" : "30%",
							}}
							size="small"
							label="password"
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
							width: WindowWidth <= 600 ? "100%" : "10%",
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
