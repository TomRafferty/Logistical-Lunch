import { Route, Routes } from "react-router-dom";

import Student from "./pages/Student";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Shopper from "./components/Shopper";

const App = () => (
	<div>
		<NavBar />
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/student" element={<Student />} />
			<Route path="/shopper" element={<Shopper />} />
		</Routes>
		<Footer />
	</div>
);

export default App;
