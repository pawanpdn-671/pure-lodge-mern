import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="bg-zinc-50 border-t border-zinc-100 py-20">
			<div className="max-w-[1280px] px-4 mx-auto flex flex-wrap lg:flex-nowrap lg:flex-row justify-between items-start text-sm sm:text-base">
				<span className="text-xl w-full block mb-10 lg:mb-0 lg:w-max sm:text-3xl font-bold tracking-tight">
					<Link to="/">PureLodge.com</Link>
					<span className="text-sm sm:text-base font-semibold block mt-2">
						© {new Date().getFullYear()} PureLodge.com | All Rights Reserved
					</span>
				</span>
				<span className="flex flex-col gap-4 text-slate-600 font-semibold">
					<Link className="hover:underline" to="/my-bookings">
						My Bookings
					</Link>
					<Link className="hover:underline" to="/my-hotels">
						My Hotels
					</Link>
					<Link className="hover:underline" to="/search">
						Find Hotels
					</Link>
				</span>
				<span className="flex flex-col font-semibold text-slate-600 gap-4">
					<Link className="hover:underline" to="/search">
						Find Best Hotels
					</Link>
					<p className="cursor-pointer hover:underline">Privacy Policy</p>
					<p className="cursor-pointer hover:underline">Terms of Service</p>
				</span>
				<span className="flex text-slate-600 flex-col font-semibold tracking-tight gap-4">
					<p className="cursor-pointer hover:underline">About Us</p>
					<p className="cursor-pointer hover:underline">Support</p>
				</span>
			</div>
		</div>
	);
};

export default Footer;
