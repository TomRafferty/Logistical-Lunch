import { Route, Routes } from "react-router-dom";

import Student from "./pages/Student";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Admin  from "./pages/Admin";

const App = () => (
	<div>
		<NavBar />
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/student" element={<Student />} />
			<Route path="/admin" element={<Admin />} />
		</Routes>
		<Footer />
	</div>
);

export default App;
