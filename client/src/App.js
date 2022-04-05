import { Route, Routes } from "react-router-dom";
import "./App.css";
import Student from "./pages/Student";
import LoginPage from "./pages/LoginPage";
import NavBarPhone from "./components/NavBarPhone";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import LunchMaker from "./pages/LunchMaker";
import Shopper from "./pages/Shopper";
import NavBar from "./components/NavBar";

const App = () => (
	<div>
		<div className="visibility">
			<NavBar />
		</div>
		<div className="phone-visibility">
			<NavBarPhone />
		</div>

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
