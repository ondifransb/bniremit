import {
	ThemeProvider,
	Button,
	Box,
	TextField,
	Alert,
	AlertTitle,
	Grid,
	CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Theme, Wrapper } from "./styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/BNILOGO.svg";

function LoginPage() {
	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");
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
						height: "100px",
						width: "clamp(300px, 25%, 800px)",
						position: "fixed",
						transform: "translate(-50%,-50%)",
						top: "50%",
						left: "50%",
						zIndex: "3",
						display: "flex",
						alignItems: "center",
						borderRadius: "10px",
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

	const Navigate = useNavigate();

	const UsernameHandle = (e) => {
		setusername(e.target.value);
	};

	const PasswordHandle = (e) => {
		setPassword(e.target.value);
	};

	const loginHandler = async (e) => {
		e.preventDefault();

		try {
			await axios
				.post(
					"https://api-tokyo.remit.digi46.id/api/portal/login",
					{
						username: username,
						password: password,
					},
					setLoading(true)
				)
				.then((response) => {
					setLoading(false);

					localStorage.setItem("token", response.data.token);
					localStorage.setItem("name", response.data.name);
					localStorage.setItem("username", response.data.username);
					localStorage.setItem("role", response.data.roles);
					Navigate("NewCustomer");
				});
		} catch (error) {
			if (error.response) {
				console.log(error.response.data.Status);
				RetresStat(error.response.data.Status);
				if (error.response.data.Status === 401) {
					setAlertMessage(error.response.data.Message);
					ShowAlert();
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
						setLoading(false);
					}, 1500);
				}
				if (error.response.data.Status === 400) {
					setAlertMessage(error.response.data.Message);
					ShowAlert();
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
						setLoading(false);
					}, 1500);
				} else {
					ShowAlert();
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
						setLoading(false);
					}, 1500);
				}
			}
		}
	};

	return (
		<ThemeProvider theme={Theme}>
			<Wrapper maxWidth={false}>
				{Loading ? (
					<Grid
						container
						sx={{
							width: "clamp(300px, 25%, 800px)",
							height: "100px",
							position: "fixed",
							transform: "translateY(-50%)",
							top: "50%",
							// left: "50%",
							zIndex: "3",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#fff",
						}}
					>
						<CircularProgress color="secondary" />
					</Grid>
				) : null}

				{AlertLoading ? <ShowAlert /> : null}
				<Box
					sx={{
						width: "clamp(300px, 30%, 800px)",
						height: "clamp(280px, 30%, 900px)",
						backgroundColor: "#fff",
						borderRadius: "20px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "20px",
					}}
				>
					<Box
						sx={{
							boxSizing: "border-box",
							borderRadius: "50px",
							width: "clamp(250px,60%, 400px)",
							display: "flex",
							alignItems: "center",
						}}
					>
						<img src={Logo} sx={{ width: "100%", height: "auto" }} alt="" />
					</Box>

					<Box
						component="form"
						noValidate
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<TextField
							value={username}
							size="small"
							onChange={UsernameHandle}
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							autoComplete="email"
							autoFocus
							color="secondary"
						/>
						<TextField
							value={password}
							size="small"
							onChange={PasswordHandle}
							required
							fullWidth
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							color="secondary"
						/>
						<Button
							onClick={loginHandler}
							color="secondary"
							type="submit"
							variant="contained"
							size="small"
							sx={{ width: "50%", mt: 3, mb: 2, color: "white" }}
						>
							Sign In
						</Button>
					</Box>
				</Box>
			</Wrapper>
		</ThemeProvider>
	);
}

export default LoginPage;
