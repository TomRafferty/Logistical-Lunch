import { Route, Routes } from "react-router-dom";

import Student from "./pages/Student";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CreateEventForm from "./components/CreateEventForm";

const App = () => (
	<div>
		<NavBar />
		<CreateEventForm />
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/student" element={<Student />} />
		</Routes>
		<Footer />
	</div>
);

export default App;
