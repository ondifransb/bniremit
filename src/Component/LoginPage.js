import { ThemeProvider, Button, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { Theme, Wrapper } from "./styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/BNILOGO.svg";

function LoginPage() {
	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");

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
				.post("https://api-tokyo.remit.digi46.id/api/portal/login", {
					username: username,
					password: password,
				})
				.then((response) => {
					if (response.status === 200 && response.data.token != null) {
						localStorage.setItem("token", response.data.token);
						localStorage.setItem("name", response.data.name);
						localStorage.setItem("username", response.data.username);
						localStorage.setItem("role", response.data.roles);

						//keep user data on device => if needed
						// localStorage.setItem("user", JSON.stringify(response.data));

						Navigate("NewCustomer");
					} else {
						alert(response.data.message);
					}
				});
		} catch (error) {
			alert("looks like you typed wrong password/username");
		}
	};

	return (
		<ThemeProvider theme={Theme}>
			<Wrapper maxWidth={false}>
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
						<img src={Logo} sx={{ width: "100%", height: "auto" }} />
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
