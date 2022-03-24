import { Route, Routes } from "react-router-dom";

import Student from "./pages/Student";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import LunchMaker from "./pages/LunchMaker";
import Shopper from "./pages/Shopper";

const App = () => (
	<div>
		<NavBar />
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/student" element={<Student />} />
			<Route path="/shopper" element={<Shopper />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="/recipes" element={<LunchMaker />} />
		</Routes>
		<Footer />
	</div>
);

export default App;
