import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Component/LoginPage";
import AddUser from "./Component/Pages/adduser";
import ExistingCustomer from "./Component/Pages/existing";
import CodeActivation from "./Component/Pages/expire";
import Newcustomer from "./Component/Pages/newcustomer";
import RoleManagement from "./Component/Pages/roleman";

function App() {
	return (
		<Routes>
			<Route path="" element={<LoginPage />} />
			<Route path="NewCustomer" element={<Newcustomer />} />
			<Route path="ExistingCustomer" element={<ExistingCustomer />} />
			<Route path="AddUser" element={<AddUser />} />
			<Route path="RoleMagement" element={<RoleManagement />} />
			<Route path="CodeActivation" element={<CodeActivation />} />
		</Routes>
	);
}

export default App;
