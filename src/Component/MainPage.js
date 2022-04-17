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
import { useNavigate } from "react-router-dom";

import axios from "axios";

function MainPage() {
	const navigate = useNavigate();
	const [open, setopen] = useState(false);

	const toggleDrawer = (event) => {
		setopen(!open);
	};

	const [status, setstatus] = useState(null);
	const [DisplayPage, setDisplayPage] = useState("New Customer");

	//Axios state for post start
	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");
	const [name, setname] = useState("");
	const [role, setrole] = useState("");
	const [email, setemail] = useState("");
	const [Alldata, setAlldata] = useState(null);
	const [Value, setValue] = useState("");
	const [Expire, setExpire] = useState("");
	const [SliderValue, setSliderValue] = useState("");

	const FormValue = (e) => {
		setValue(e.target.value);
	};
	const SliderVal = (e) => {
		setSliderValue(e.target.value);
		console.log(SliderValue);
	};

	//Axios state for expired get start
	const fetchdataExpire = async () => {
		await axios
			.get("https://api-tokyo.remit.digi46.id/api/portal/getParameter", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				setExpire(res.data);
				console.log(Expire);
			});
	};
	useEffect(() => {
		fetchdataExpire();
	}, [setExpire]);
	//Axios state for expired get end

	//Axios state for expired put start
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
					// console.log(res);
					// setSliderValue(Expire.value);
					fetchdataExpire();
				});
		} catch (error) {
			console.log(error);
		}
	};

	//Axios state for expired put end

	//Axios state for get start
	const fetchdata = async () => {
		await axios
			.get(
				"https://api-tokyo.remit.digi46.id/api/portal/retrieveRoleManagement",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			)
			.then((res) => {
				setAlldata(res.data);
			});
	};
	useEffect(() => {
		fetchdata();
	}, [setAlldata]);

	//Axios state for get end

	//axios data for post start
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
						role: [role],
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				)
				.then((response) => {
					console.log(response);
					if (localStorage.getItem("token") != null) {
						console.log(response);
					} else {
						console.log("error");
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	//axios data for post end

	//Axios state for update start
	const HandleUpdate = async (roleId, userId) => {
		try {
			await axios
				.post(
					"https://api-tokyo.remit.digi46.id/api/portal/roleManagement",
					{
						role_id: Value,
						users_id: userId,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					},
					{ updatedrole: roleId }
				)
				.then((response) => {
					console.log(Alldata);
					setAlldata([...Alldata, { updatedrole: Value }]);
				});
		} catch (error) {
			console.log(error);
		}
	};

	//Axios state for update end

	//Axios state for Delete start
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
					console.log(response);
					// UpdateData = res
				});
		} catch (error) {
			console.log(error);
		}
	};

	//Axios state for Delete end

	//conditional rendering start
	let Conditional;
	if (DisplayPage === "New Customer") {
		Conditional = (
			<Grid container spacing={2} paddingX={1} marginTop={0.1}>
				<Grid item xs={4}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="ID Number"
						autoFocus
						color="secondary"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Name"
						autoFocus
						color="secondary"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Registration Reference Number"
						autoFocus
						color="secondary"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						required
						fullWidth
						id="datetime-local"
						label="Date of Birth"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						color="secondary"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						required
						fullWidth
						id="datetime-local"
						label="Date from"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						color="secondary"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						required
						fullWidth
						id="datetime-local"
						label="Date to"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						color="secondary"
					/>
				</Grid>

				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel color="secondary">status</InputLabel>
						<Select
							value={status}
							label="status"
							onChange={(e) => {
								setstatus(e.target.value);
							}}
							color="secondary"
						>
							<MenuItem defaultValue="Pending" value={"Pending"}>
								Pending
							</MenuItem>
							<MenuItem defaultValue="Completed" value={"Completed"}>
								Completed
							</MenuItem>
							<MenuItem defaultValue="Rejected" value={"Rejected"}>
								Rejected
							</MenuItem>
							<MenuItem defaultValue="Canceled" value={"Canceled"}>
								Canceled
							</MenuItem>
							<MenuItem defaultValue="Verified" value={"Verified"}>
								Verified
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		);
	}
	if (DisplayPage === "Existing Customer") {
		Conditional = (
			<Grid container spacing={2} paddingX={1} marginTop={0.1}>
				<Grid item xs={4}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="ID Number"
						autoFocus
						color="secondary"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Name"
						autoFocus
						color="secondary"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Registration Reference Number"
						autoFocus
						color="secondary"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						required
						fullWidth
						id="datetime-local"
						label="Date of Birth"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						color="secondary"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						required
						fullWidth
						id="datetime-local"
						label="Date from"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						color="secondary"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						required
						fullWidth
						id="datetime-local"
						label="Date to"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						color="secondary"
					/>
				</Grid>

				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel>status</InputLabel>
						<Select
							value={status}
							label="status"
							onChange={(e) => {
								setstatus(e.target.value);
							}}
							color="secondary"
						>
							<MenuItem defaultValue="Pending" value={"Pending"}>
								Pending
							</MenuItem>
							<MenuItem defaultValue="Completed" value={"Completed"}>
								Completed
							</MenuItem>
							<MenuItem defaultValue="Rejected" value={"Rejected"}>
								Rejected
							</MenuItem>
							<MenuItem defaultValue="Canceled" value={"Canceled"}>
								Canceled
							</MenuItem>
							<MenuItem defaultValue="Verified" value={"Verified"}>
								Verified
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		);
	}
	if (DisplayPage === "Add User") {
		Conditional = (
			<Grid
				container
				paddingX={1}
				marginTop={3}
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
						fontSize: "16",
						marginTop: "10",
					}}
				>
					Please fill new user detail
				</Typography>
				<Divider />
				<Grid item xs={4}>
					<TextField
						value={username}
						onChange={(e) => {
							setusername(e.target.value);
						}}
						margin="normal"
						required
						sx={{
							width: "50%",
						}}
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
						margin="normal"
						required
						sx={{
							width: "50%",
						}}
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
						margin="normal"
						required
						sx={{
							width: "50%",
						}}
						label="Email"
						autoFocus
						type="text"
						color="secondary"
						variant="standard"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						value={role}
						onChange={(e) => {
							setrole(e.target.value);
						}}
						margin="normal"
						required
						sx={{
							width: "50%",
						}}
						label="Role"
						autoFocus
						type="text"
						color="secondary"
						variant="standard"
					/>
				</Grid>

				<Grid item xs={4}>
					<TextField
						value={password}
						onChange={(e) => {
							setpassword(e.target.value);
						}}
						margin="normal"
						required
						sx={{
							width: "50%",
						}}
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
						width: "10%",
						color: "black",
					}}
				>
					Submit
				</Button>
			</Grid>
		);
	}
	if (DisplayPage === "Role Management") {
		Conditional = (
			<Grid
				container
				spacing={1}
				paddingX={1}
				marginTop={0.1}
				justifyContent="center"
			>
				<Grid container direction="row" xs={12}>
					<Grid xs={3}>
						<Typography>Username</Typography>
					</Grid>
					<Grid xs={3}>
						<Typography>Name</Typography>
					</Grid>
					<Grid xs={3}>
						<Typography>Roles</Typography>
					</Grid>
					<Grid xs={3}>
						<Typography>Action</Typography>
					</Grid>
				</Grid>
				`
				{Alldata
					? Alldata.map((e, i) => {
							return (
								<>
									<Grid container direction="row" xs={12}>
										<Grid
											xs={3}
											justifyContent="center"
											alignContent="center"
											alignItems="center"
										>
											<Typography>{e.username}</Typography>
										</Grid>
										<Grid
											xs={3}
											justifyContent="center"
											alignContent="center"
											alignItems="center"
										>
											<Typography>{e.name}</Typography>
										</Grid>
										<Grid
											xs={3}
											justifyContent="center"
											alignContent="center"
											alignItems="center"
										>
											<RadioGroup
												row
												margin="0"
												defaultValue={e.roles[0].id}
												onChange={FormValue}
											>
												<FormControlLabel
													disabled={e.roles[0].id === 1}
													value={1}
													control={<Radio size="small" />}
													label="Administrator"
												/>
												<FormControlLabel
													disabled={e.roles[0].id === 1}
													value={2}
													control={<Radio size="small" />}
													label="Inquiry"
												/>
												<FormControlLabel
													disabled={e.roles[0].id === 1}
													value={3}
													control={<Radio size="small" />}
													label="Operator"
												/>
											</RadioGroup>
										</Grid>
										<Grid
											xs={3}
											justifyContent="center"
											alignContent="center"
											alignItems="center"
										>
											<Stack direction="row" spacing={1}>
												<Button
													variant="contained"
													size="small"
													onClick={() => {
														HandleUpdate(e.roles[0].id, e.id);
													}}
												>
													Update
												</Button>
												<Button
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
				`
			</Grid>
		);
	}
	if (DisplayPage === "Code Activation Expiry") {
		Conditional = (
			<Grid
				container
				sx={{
					width: "clamp(350px, 40%, 1000px)",
					alignSelf: "flex-start",
				}}
				margin={5}
				direction="column"
			>
				<Grid item>
					<Slider
						size="small"
						defaultValue={0}
						max="30"
						aria-label="Small"
						valueLabelDisplay="on"
						value={SliderValue}
						onChange={SliderVal}
						step={1}
						marks
					/>
					<Typography
						sx={{
							alignSelf: "center",
						}}
					>
						Expired in day/days
					</Typography>
				</Grid>
				<Button
					variant="contained"
					sx={{
						margin: "10px",
					}}
					onClick={() => {
						putdataExpire();
					}}
				>
					Submit
				</Button>
			</Grid>
		);
	}
	//conditional rendering end

	return (
		<ThemeProvider theme={Theme}>
			<Wrapper
				maxWidth={false}
				sx={{
					justifyContent: "flex-start",
					alignItems: "flex-start",
				}}
			>
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

						<ListItem button onClick={() => navigate("/Button </")}>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<Typography>Button </Typography>
						</ListItem>
						{/* {[
							"New Customer",
							"Existing Customer",
							"Add User",
							"Role Management",
							"Code Activation Expiry",
							"Logout",
						].map((text, index) => (
							<ListItem
								button
								key={text}
								onClick={() => {
									useNavigate("/MainPage");
								}}
							>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))} */}
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
					{Conditional}
				</Box>
			</Wrapper>
		</ThemeProvider>
	);
}

export default MainPage;
