//nested page cant be applied => gotta fix

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
	Slider,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Theme, Wrapper } from "./styles";
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

import InboxIcon from "@mui/icons-material/MoveToInbox";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function CodeActivation() {
	const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
	const updateDimensions = () => {
		setWindowWidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);
	const navigate = useNavigate();
	const logoutf = () => {
		navigate("/");
		localStorage.removeItem("name");
		localStorage.removeItem("username");
		localStorage.removeItem("token");
		localStorage.removeItem("role");
	};

	const [open, setopen] = useState(false);
	const [SliderValue, setSliderValue] = useState("");
	const [ExpireDate, setExpireDate] = useState("");

	const toggleDrawer = (event) => {
		setopen(!open);
	};

	const fetchdataExpire = () => {
		axios
			.get("https://api-tokyo.remit.digi46.id/api/portal/getParameter", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				setExpireDate(res);
				console.log(ExpireDate);
			});
	};
	useEffect(() => {
		fetchdataExpire();
	}, []);

	const SliderVal = (e) => {
		setSliderValue(e.target.value);
	};
	const putdataExpire = async () => {
		try {
			await axios
				.put(
					"https://api-tokyo.remit.digi46.id/api/portal/updateParameter/expirationDay",
					{
						value: SliderValue,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				)
				.then((res) => {
					fetchdataExpire();
					// setSliderValue(Expire.value);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const DisplayPage = "Code Activation Expiry";

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

				<Grid
					container
					paddingX={WindowWidth <= 750 ? 2 : 3}
					sx={{
						width: WindowWidth <= 750 ? "100%" : "clamp(350px, 40%, 1000px)",
						alignSelf: "flex-start",
					}}
					marginTop={5}
					direction="column"
				>
					<Slider
						color="secondary"
						size="small"
						defaultValue={0}
						max="30"
						aria-label="Small"
						valueLabelDisplay="on"
						value={SliderValue}
						onChange={SliderVal}
						step={1}
						sx={{ marginX: "5px" }}
					/>
					<Typography marginTop={1} mb={2}>
						Expired in day/days
					</Typography>
					<Button
						color="info"
						variant="contained"
						onClick={() => {
							putdataExpire();
						}}
					>
						Submit
					</Button>
				</Grid>
			</Box>
		</ThemeProvider>
	);
}

export default CodeActivation;
