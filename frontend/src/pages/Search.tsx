import React, { useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import SearchHotelCard from "../components/SearchHotelCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
	const search = useSearchContext();
	const [page, setPage] = useState<number>(1);
	const [selectedStars, setSelectedStars] = useState<string[]>([]);
	const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
	const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
	const [sortOption, setSortOption] = useState<string>("");

	const searchParams = {
		destination: search.destination,
		checkIn: search.checkIn.toISOString(),
		checkOut: search.checkOut.toISOString(),
		adultCount: search.adultCount.toString(),
		childCount: search.childCount.toString(),
		page: page.toString(),
		stars: selectedStars,
		types: selectedHotelTypes,
		facilities: selectedFacilities,
		maxPrice: selectedPrice?.toString(),
		sortOption: sortOption,
	};

	const { data: hotelData } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams));

	const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const starRating = event.target.value;
		setSelectedStars((prev) => {
			return event.target.checked ? [...prev, starRating] : prev.filter((star) => star !== starRating);
		});
	};

	const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const hotelType = event.target.value;
		setSelectedHotelTypes((prev) => {
			return event.target.checked ? [...prev, hotelType] : prev.filter((type) => type !== hotelType);
		});
	};

	const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const facility = event.target.value;
		setSelectedFacilities((prev) => {
			return event.target.checked ? [...prev, facility] : prev.filter((fal) => fal !== facility);
		});
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
			<div className="rounded-lg border border-slate-300 p-5 h-fit sticky">
				<div className="space-y-5">
					<h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>

					<StarRatingFilter onChange={handleRatingChange} selectedStars={selectedStars} />
					<HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
					<FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
					<PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
				</div>
			</div>
			<div className="flex flex-col gap-5">
				<div className="flex justify-between items-center">
					<span className="text-xl font-bold">
						{hotelData?.pagination.total} Hotels Found
						{search.destination ? ` in ${search.destination}` : ""}
					</span>

					<select
						className="p-2 border rounded-md outline-none"
						onChange={(event) => setSortOption(event.target.value)}
						value={sortOption}>
						<option value={""}>Sort By</option>
						<option value={"starRating"}>Star Rating</option>
						<option value={"pricePerNightAsc"}>Price Per Night(low to high)</option>
						<option value={"pricePerNightDesc"}>Price Per Night(high to low)</option>
					</select>
				</div>
				{hotelData?.data?.map((hotel, index) => (
					<SearchHotelCard key={index} hotel={hotel} />
				))}

				<div className="mt-5">
					<Pagination
						page={hotelData?.pagination.page || 1}
						pages={hotelData?.pagination.pages || 1}
						onPageChange={(page) => setPage(page)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Search;
