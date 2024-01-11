import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdTravelExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";
import { useAppContext } from "../context/AppContext";

const SearchBar = () => {
	const search = useSearchContext();
	const [destination, setDestination] = useState<string>(search.destination);
	const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
	const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
	const [adultCount, setAdultCount] = useState<number>(search.adultCount);
	const [childCount, setChildCount] = useState<number>(search.childCount);
	const { showToast } = useAppContext();

	const navigate = useNavigate();
	const handleSearch = (event: FormEvent) => {
		event.preventDefault();

		search.handleSearchSave(destination, checkIn, checkOut, adultCount, childCount);
		navigate("/search");
	};

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (checkIn.toISOString() < checkOut.toISOString()) {
			handleSearch(event);
		} else {
			showToast({
				message: "Select a valid checkout date.",
				type: "ERROR",
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="-mt-8 p-3 bg-zinc-50 rounded shadow-md flex flex-col sm:flex-row sm:flex-wrap items-center gap-4">
			<div className="flex flex-row items-center bg-white p-2 border rounded-md border-indigo-300">
				<MdTravelExplore size={25} className="mr-2" />
				<input
					type="text"
					placeholder="Where are you going?"
					className="text-base w-[160px] focus:outline-none"
					value={destination}
					onChange={(e) => setDestination(e.target.value)}
				/>
			</div>
			<div className="flex bg-white px-2 py-1 gap-2  border rounded-md border-indigo-300">
				<label className="items-center flex">
					Adults:
					<input
						className="w-full p-1 focus:outline-none font-bold"
						type="number"
						min={1}
						max={20}
						value={adultCount}
						onChange={(e) => setAdultCount(parseInt(e.target.value))}></input>
				</label>
				<label className="items-center flex">
					Children:
					<input
						className="w-full p-1 focus:outline-none font-bold"
						type="number"
						min={0}
						max={20}
						value={childCount}
						onChange={(e) => setChildCount(parseInt(e.target.value))}></input>
				</label>
			</div>
			<div className="border rounded-md border-indigo-300">
				<DatePicker
					selected={checkIn}
					onChange={(date) => setCheckIn(date as Date)}
					selectsStart
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
					placeholderText="Check-in Date"
					className="min-w-full bg-white rounded-md p-2 focus:outline-none"
					wrapperClassName="min-w-full"
				/>
			</div>
			<div className="border rounded-md border-indigo-300">
				<DatePicker
					selected={checkOut}
					onChange={(date) => setCheckOut(date as Date)}
					selectsStart
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
					placeholderText="Check-out Date"
					className="min-w-full bg-white p-2 rounded-md focus:outline-none"
					wrapperClassName="min-w-full"
				/>
			</div>
			<div className="max-h-full">
				<button className=" bg-indigo-600 text-white p-1.5 font-semibold text-xl hover:bg-indigo-500 h-full px-5">
					Search
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
