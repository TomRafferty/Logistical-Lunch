import { Route, Routes } from "react-router-dom";

import Student from "./pages/Student";
import LoginPage from "./pages/LoginPage";

const App = () => (
	<Routes>
		<Route path="/" element={<LoginPage />} />
		<Route path="/student" element={<Student />} />
	</Routes>
);

export default App;
