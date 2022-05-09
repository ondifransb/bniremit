import {
	ThemeProvider,
	Button,
	Box,
	TextField,
	Alert,
	Grid,
	CircularProgress,
	InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import React, { useState } from "react";
import { Theme, Wrapper } from "./styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/BNILOGO.png";
import "./Login.css";

function LoginPage() {
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
						height: "108px",
						width: "clamp(300px, 24.5%, 800px)",
						position: "fixed",
						transform: "translate(-50%,-50%)",
						top: "51.3%",
						left: "50%",
						zIndex: "11",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<strong>{AlertMessage}</strong>
				</Alert>
			</>
		) : null;
	};

	const Navigate = useNavigate();

	const [username, setusername] = useState("");
	const [userNameValid, setuserNameValid] = useState(false);
	const [password, setPassword] = useState("");
	const [PasswordValid, setPasswordValid] = useState(false);
	const [VisibilityValue, setVisibilityValue] = useState(false);

	const VisibilityHandler = () => {
		setVisibilityValue(!VisibilityValue);
	};

	const UsernameHandle = (e) => {
		setusername(e.target.value);
		console.log(username.length);
		if (username.length < 6) {
			setuserNameValid(true);
		} else {
			setuserNameValid(false);
		}

		// console.log(username.length);
	};

	const PasswordHandle = (e) => {
		setPassword(e.target.value);
		if (password.length < 6) {
			setPasswordValid(true);
		} else {
			setPasswordValid(false);
		}

		// console.log(PasswordValid);
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
			setLoading(false);
			setusername("");
			setPassword("");
			if (error.response) {
				// console.log(error.response.data.Status);
				RetresStat(error.response.data.Status);
				if (error.response.data.status === 401) {
					setAlertMessage(error.response.data.message);
					ShowAlert();
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
						setAlertMessage("");
					}, 1500);
				}
				if (error.response.data.Status === 400) {
					setAlertMessage(error.response.data.Message);
					ShowAlert();
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
						setAlertMessage("");
					}, 1500);
				} else {
					ShowAlert();
					setAlertLoading(true);
					setTimeout(() => {
						setAlertLoading(false);
						setAlertMessage("");
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
							height: "108px",
							width: "clamp(300px, 24.5%, 800px)",
							position: "fixed",
							transform: "translate(-50%,-50%)",
							top: "51.3%",
							left: "50%",
							zIndex: "11",
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
						width: "clamp(300px, 25%, 800px)",
						height: "clamp(250px, 25%, 900px)",
						backgroundColor: "#fff",
						borderRadius: "40px 0 ",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
						alignItems: "center",
						padding: "20px",
						zIndex: "10",
						position: "relative",
					}}
				>
					<img src={Logo} alt="BNI-REMITANCE LOGO" />

					{PasswordValid || userNameValid ? (
						<Alert
							severity={PasswordValid || userNameValid ? "error" : "success"}
							sx={{
								height: "40px",
								width: "100%",
								position: "absolute",
								transform: "translate(-50%,0%)",
								bottom: "clamp(20px,1vw,2vw)",
								left: "50%",
								zIndex: "3",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<strong>
								Username and Password should have at least six characters
							</strong>
						</Alert>
					) : null}

					<Box
						component="form"
						noValidate
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-around",
							alignItems: "center",
							width: "clamp(250px, 70%, 900px)",
							mt: -3,
						}}
					>
						<TextField
							variant="standard"
							error={userNameValid}
							value={username}
							size="small"
							onChange={UsernameHandle}
							margin="normal"
							required
							fullWidth
							label="Username"
							color="secondary"
							// defaultValue={username}
						/>
						<TextField
							variant="standard"
							error={PasswordValid}
							value={password}
							size="small"
							onChange={PasswordHandle}
							required
							fullWidth
							label="Password"
							type={VisibilityValue ? "text" : "password"}
							color="secondary"
							// defaultValue={password}
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="start"
										sx={{ transform: "translateX(30%)" }}
									>
										{VisibilityValue ? (
											<VisibilityIcon
												sx={{
													":hover": { cursor: "pointer" },
													backgroundColor: "transparent",
												}}
												size="small"
												onClick={VisibilityHandler}
											/>
										) : (
											<VisibilityOffIcon
												sx={{
													":hover": { cursor: "pointer" },
													backgroundColor: "transparent",
												}}
												size="small"
												onClick={VisibilityHandler}
											/>
										)}
									</InputAdornment>
								),
							}}
						/>
						<Button
							disabled={PasswordValid || userNameValid}
							onClick={loginHandler}
							color="secondary"
							type="submit"
							variant="contained"
							size="small"
							sx={{ width: "50%", mt: 1, color: "white" }}
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
