import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignoutButton from "./SIgnoutButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const Header = () => {
	const { isLoggedIn } = useAppContext();
	const [menuOpen, setMenuOpen] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	return (
		<div className="bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-950 py-6">
			<div className="max-w-[1280px] px-4 mx-auto flex justify-between">
				<span className="text-xl sm:text-3xl text-white font-bold tracking-tight">
					<Link to="/">PureLodge.com</Link>
				</span>
				<div className="flex">
					{isLoggedIn ? (
						<>
							<div className="hidden sm:flex space-x-2">
								<Link
									to="/my-bookings"
									className="flex items-center text-white px-3 font-bold hover:bg-indigo-600">
									My Bookings
								</Link>
								<Link
									to="/my-hotels"
									className="flex items-center text-white px-3 font-bold hover:bg-indigo-600">
									My Hotels
								</Link>
								<SignoutButton />
							</div>
							<div className="sm:hidden">
								<RxHamburgerMenu
									onClick={() => setMenuOpen(true)}
									className={"text-white text-[27px] cursor-pointer"}
								/>
							</div>
						</>
					) : (
						<Link
							to="/login"
							className="flex justify-center bg-white items-center text-indigo-600 px-3 font-bold hover:bg-gray-100">
							Login
						</Link>
					)}
				</div>
			</div>
			{menuOpen && (
				<div className="fixed inset-0 z-50 bg-black/60" onClick={() => setMenuOpen(false)}>
					<div
						onClick={(e) => e.stopPropagation()}
						className="bg-zinc-50 text-gray-700 gap-4 items-center h-full w-[80%] flex flex-col justify-center absolute right-0">
						<div className="absolute top-2 right-2 p-2" onClick={() => setMenuOpen(false)}>
							<IoClose className="text-black text-3xl" />
						</div>
						<Link to="/my-bookings" className="font-semibold py-2">
							My Bookings
						</Link>
						<Link to="/my-hotels" className="font-semibold py-2">
							My Hotels
						</Link>
						<SignoutButton setMenuOpen={setMenuOpen} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
