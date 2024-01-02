import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/AppContext";

function App() {
	const { isLoggedIn } = useAppContext();

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<p>Home page</p>
						</Layout>
					}
				/>
				<Route
					path="/search"
					element={
						<Layout>
							<p>
								<>SearchPage</>
							</p>
						</Layout>
					}
				/>
				<Route
					path="/register"
					element={
						<Layout>
							<Register />
						</Layout>
					}
				/>
				<Route
					path="/login"
					element={
						<Layout>
							<Login />
						</Layout>
					}
				/>
				{isLoggedIn && (
					<>
						<Route
							path="/add-hotel"
							element={
								<Layout>
									<AddHotel />
								</Layout>
							}
						/>
					</>
				)}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	);
}

export default App;
