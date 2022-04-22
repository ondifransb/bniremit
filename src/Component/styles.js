import styled from "@emotion/styled";
import { Button, Container } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const Colors = {
	primary: "#fff",
	secondary: "#000",
	darker: "#ff6600",
	Trasnparent: "transparent",
};

export const Theme = createTheme({
	palette: {
		primary: {
			main: Colors.primary,
		},
		secondary: {
			main: Colors.secondary,
		},
		text: {
			main: Colors.darker,
		},
		background: {
			main: Colors.Trasnparent,
		},
	},
});

export const Wrapper = styled(Container)({
	margin: "0",
	padding: "0",
	boxSizing: "border-box",
	height: "100vh",
	width: "100vw",
	backgroundColor: "#e1e1e1",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
});

export const BootstrapButton = styled(Button)({
	height: "2rem",
	boxShadow: "none",
	textTransform: "none",
	fontSize: 16,
	padding: "6px 12px",
	border: "1px solid",
	lineHeight: 1.5,
	backgroundColor: "#0063cc",
	borderColor: "#0063cc",
	transition: "all 1s ease-in",
	fontFamily: [
		"-apple-system",
		"BlinkMacSystemFont",
		'"Segoe UI"',
		"Roboto",
		'"Helvetica Neue"',
		"Arial",
		"sans-serif",
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(","),
	"&:hover": {
		backgroundColor: "#000",
		borderColor: "#0062cc",
		boxShadow: "none",
	},
	"&:active": {
		boxShadow: "none",
		backgroundColor: "#0062cc",
		borderColor: "#005cbf",
	},
	"&:focus": {
		boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
	},
});
