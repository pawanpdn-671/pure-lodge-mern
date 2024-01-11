import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import ImageSlider from "../components/ImageSlider";

const MyBookings = () => {
	const { data: hotels } = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

	if (!hotels || hotels.length === 0) {
		return <span>No Bookings Found</span>;
	}
	return (
		<div className="space-y-5 pb-20">
			<h1 className="text-3xl font-bold">My Bookings</h1>

			<div>
				{hotels?.map((hotel) => (
					<div
						key={hotel._id}
						className="grid grid-cols-1 lg:grid-cols-3 border border-slate-200 rounded-lg p-2 lg:p-8 gap-5">
						<div className="lg:w-full h-[300px] md:h-[500px] col-span-2">
							<ImageSlider urls={hotel.imageUrls} />
						</div>
						<div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
							<div className="text-xl font-semibold">
								{hotel.name}
								<div className="text-xs font-normal">
									{hotel.city}, {hotel.country}
								</div>
							</div>
							{hotel.bookings.map((booking) => (
								<div className="border-t border-zinc-200 pt-2">
									<div className="">
										<span className="font-semibold mr-2">Dates:</span>
										<span>
											{new Date(booking.checkIn).toDateString()} -{" "}
											{new Date(booking.checkOut).toDateString()}
										</span>
									</div>
									<div className="">
										<span className="font-semibold mr-2">Guests:</span>
										<span>
											{booking.adultCount} adults, {booking.childCount} children.
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyBookings;
