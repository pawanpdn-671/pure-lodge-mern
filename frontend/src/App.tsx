import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

function App() {
	const { isLoggedIn } = useAppContext();

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<Home />
						</Layout>
					}
				/>
				<Route
					path="/search"
					element={
						<Layout>
							<Search />
						</Layout>
					}
				/>
				<Route
					path="/detail/:hotelId"
					element={
						<Layout>
							<HotelDetails />
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
						<Route
							path="/edit-hotel/:id"
							element={
								<Layout>
									<EditHotel />
								</Layout>
							}
						/>
						<Route
							path="/my-hotels"
							element={
								<Layout>
									<MyHotels />
								</Layout>
							}
						/>
						<Route
							path="/hotel/:id/booking"
							element={
								<Layout>
									<Booking />
								</Layout>
							}
						/>
						<Route
							path="/my-bookings"
							element={
								<Layout>
									<MyBookings />
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
