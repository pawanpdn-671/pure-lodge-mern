import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoShareSocial } from "react-icons/io5";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import ImageSlider from "../components/ImageSlider";
import * as apiClient from "./../api-client";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { useAppContext } from "../context/AppContext";

const HotelDetails = () => {
	const [hotelDetails, setHotelDetails] = useState<HotelType | null>(null);
	const { hotelId } = useParams();
	const { showToast } = useAppContext();

	const { data: hotel } = useQuery("fetchHotelById", () => apiClient.fetchHotelById(hotelId || ""), {
		enabled: !!hotelId,
	});

	useEffect(() => {
		if (hotel) {
			setHotelDetails(hotel);
		}
	}, [hotel]);

	const handleCopy = () => {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
		showToast({
			message: "Copied to Clipboard!",
			type: "SUCCESS",
		});
	};

	return (
		<>
			{!hotelDetails ? (
				<></>
			) : (
				<div className="max-w-7xl mx-auto">
					<div className="py-0 pb-20">
						<div className="mt-0">
							<div className="flex justify-between items-center">
								<h2 className="text-3xl font-bold">{hotelDetails?.name}</h2>
								<div className="flex gap-4">
									<button type="button" onClick={handleCopy} className="flex items-center hover:underline">
										<IoShareSocial size={15} className="mr-1" />
										Share
									</button>
								</div>
							</div>

							<div className="mt-5 w-full">
								<div className="grid grid-cols-1">
									<ImageSlider urls={hotelDetails?.imageUrls} />
								</div>

								<div className="mt-4 flex flex-col md:flex-row gap-2 md:gap-10 relative">
									<div className="w-full md:w-1/2">
										<h3 className="text-xl font-semibold">
											{hotelDetails?.type} room in {hotelDetails?.city}, {hotelDetails?.country}
										</h3>

										<p className="flex mt-2">
											{Array.from({ length: hotelDetails?.starRating || 0 })?.map((num, i) => (
												<AiFillStar key={`${num}${i}`} className="fill-yellow-400" />
											))}
										</p>

										<div className="my-6 border-t border-zinc-200">
											<p className=" text-base border-transparent py-6 border border-b-border">
												{hotelDetails?.description}
											</p>
											<p className="text-xl border-t border-zinc-200 pt-4 font-semibold mt-6">
												What this place offers
											</p>
											<div className="mt-6 grid gap-4 grid-cols-2">
												{hotelDetails?.facilities.map((item, i) => (
													<span key={i} className="text-base ">
														{item}
													</span>
												))}
											</div>
										</div>
									</div>
									<div className="w-full md:w-1/2 relative pt-10 pb-10 flex md:justify-end items-start">
										{hotel && <GuestInfoForm pricePerNight={hotel?.pricePerNight} hotelId={hotel._id} />}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default HotelDetails;
