import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
	const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
		onError: () => {},
	});

	if (!hotelData) {
		return <span>No Hotels Found</span>;
	}

	return (
		<div className="space-y-5 pb-20">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold">My Hotels</h1>
				<Link
					to="/add-hotel"
					className="flex bg-indigo-600 text-white textbase lg:text-xl font-semibold px-5 py-2 hover:bg-indigo-500">
					Add Hotel
				</Link>
			</div>

			<div className="grid grid-cols-1 gap-8">
				{hotelData?.map((hotel, index) => (
					<div
						key={index}
						className="flex gap-5 flex-col justify-between border border-slate-300 rounded-lg p-2 sm:p-8">
						<p className="text-2xl font-semibold">{hotel.name}</p>
						<div className="whitespace-pre-line">{hotel.description}</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
							<div
								className="border border-slate-300 rounded-sm p-3
                      flex items-center">
								<BsMap className="mr-2" />
								{hotel.city}, {hotel.country}
							</div>
							<div
								className="border border-slate-300 rounded-sm p-3
                      flex items-center">
								<BsBuilding className="mr-2" />
								{hotel.type}
							</div>
							<div
								className="border border-slate-300 rounded-sm p-3
                      flex items-center">
								<BiMoney className="mr-2" />
								Rs. {hotel.pricePerNight} per night
							</div>
							<div
								className="border border-slate-300 rounded-sm p-3
                      flex items-center">
								<BiHotel className="mr-2" />
								{hotel.adultCount} adults, {hotel.childCount} children
							</div>
							<div
								className="border border-slate-300 rounded-sm p-3
                      flex items-center">
								<BiStar className="mr-2" />
								{hotel.starRating} Star Rating
							</div>
						</div>
						<div className="flex justify-end">
							<Link
								to={`/edit-hotel/${hotel._id}`}
								className="flex bg-indigo-600 text-white text-base font-semibold px-4 py-2 hover:bg-indigo-500">
								View Details
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyHotels;
