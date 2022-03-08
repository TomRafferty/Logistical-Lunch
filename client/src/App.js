import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import LoginPage from "./pages/LoginPage";

const App = () => (
	<Routes>
		<Route path="/" element={<LoginPage />} />
		<Route path="/about/this/side" element={<About />} />
	</Routes>
);

export default App;
