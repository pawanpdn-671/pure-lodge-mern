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
import Loader from "../components/Loader";
import { IoClose } from "react-icons/io5";

const Search = () => {
	const [filterOpen, setFilterOpen] = useState(false);
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

	const { data: hotelData, isLoading } = useQuery(["searchHotels", searchParams], () =>
		apiClient.searchHotels(searchParams),
	);

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

	const handleFilterApply = () => {
		setFilterOpen(false);
	};

	return (
		<div className="w-full grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 pb-20">
			<div className="rounded-lg hidden lg:block border border-slate-300 p-5 h-fit sticky">
				<div className="space-y-5">
					<h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>

					<StarRatingFilter onChange={handleRatingChange} selectedStars={selectedStars} />
					<HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
					<FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
					<PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
				</div>
			</div>
			<div className="flex w-full flex-col gap-5">
				{isLoading ? (
					<Loader />
				) : (
					<>
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
							<span className="text-xl font-bold">
								{hotelData?.pagination.total} Hotels Found
								{search.destination ? ` in ${search.destination}` : ""}
							</span>
							<button
								onClick={() => setFilterOpen(true)}
								className="py-2 mt-4 sm:mt-0 text-left pl-3 sm:text-center ml-auto w-full sm:w-max sm:px-5 border border-slate-300 rounded-md lg:hidden hover:bg-slate-200">
								Filters
							</button>
							<select
								className="p-2 sm:ml-4 mt-2 sm:mt-0 border border-slate-300 rounded-md outline-none"
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

						{hotelData?.data?.length !== 0 && (
							<div className="w-full mt-5">
								<Pagination
									page={hotelData?.pagination.page || 1}
									pages={hotelData?.pagination.pages || 1}
									onPageChange={(page) => setPage(page)}
								/>
							</div>
						)}
					</>
				)}
			</div>

			{filterOpen && (
				<div className="fixed bg-black/50 inset-0 z-50 flex items-center justify-center">
					<div className="absolute bg-white p-4">
						<IoClose
							className="absolute top-4 cursor-pointer right-10 text-4xl text-black p-1"
							onClick={() => setFilterOpen(false)}
						/>
						<div className="space-y-5 bg-white p-2 max-h-[500px] overflow-y-auto min-w-[300px] w-[300px] sm:w-[500px]">
							<h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
							<StarRatingFilter onChange={handleRatingChange} selectedStars={selectedStars} />
							<HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
							<FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
							<PriceFilter
								selectedPrice={selectedPrice}
								onChange={(value?: number) => setSelectedPrice(value)}
							/>
						</div>
						<button
							onClick={handleFilterApply}
							className="text-white py-1.5 bg-indigo-600 text-lg font-semibold hover:bg-indigo-500 w-full block mt-5 sticky bottom-0 left-0">
							Apply Filters
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Search;
