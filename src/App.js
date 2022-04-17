//EXPLORE ALL NEEDED COMPONENT

//GOTTA KNOW HOW MUI (EASY APPLY FOR NEXT TASK)
//=> THEME => CREATETHEME
//=> STYLE => CREATESTYLE
//=>CUSTOM COMPONENT => USING BOTH THEME AND STYLE

//DEPLOY TO PERSONAL GIT

import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Component/LoginPage";
import AddUser from "./Component/Pages/adduser";
import ExistingCustomer from "./Component/Pages/existing";
import CodeActivation from "./Component/Pages/expire";
import Newcustomer from "./Component/Pages/newcustomer";
import RoleManagement from "./Component/Pages/roleman";
import Testing from "./Component/Pages/testing";

function App() {
	return (
		<Routes>
			<Route path="" element={<LoginPage />} />
			<Route path="NewCustomer" element={<Newcustomer />} />
			<Route path="ExistingCustomer" element={<ExistingCustomer />} />
			<Route path="AddUser" element={<AddUser />} />
			<Route path="RoleMagement" element={<RoleManagement />} />
			<Route path="CodeActivation" element={<CodeActivation />} />
			<Route path="Testing" element={<Testing />} />
		</Routes>
	);
}

export default App;
