import React, { useContext, useState } from "react";

type SearchContext = {
	destination: string;
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
	hotelId: string;
	handleSearchSave: (
		desination: string,
		checkIn: Date,
		checkOut: Date,
		childCount: number,
		adultCount: number,
	) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
	children: React.ReactNode;
};

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
	const [destination, setDestination] = useState<string>(() => sessionStorage.getItem("destination") || "");
	const [checkIn, setCheckIn] = useState<Date>(
		() => new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()),
	);
	const [checkOut, setCheckOut] = useState<Date>(
		() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()),
	);
	const [adultCount, setAdultCount] = useState<number>(() =>
		parseInt(sessionStorage.getItem("adultCount") || "1", 10),
	);
	const [childCount, setChildCount] = useState<number>(() =>
		parseInt(sessionStorage.getItem("childCount") || "0", 10),
	);
	const [hotelId, setHotelId] = useState<string>(() => sessionStorage.getItem("hotelId") || "");

	const handleSearchSave = (
		destination: string,
		checkIn: Date,
		checkOut: Date,
		adultCount: number,
		childCount: number,
		hotelId?: string,
	) => {
		setDestination(destination);
		setCheckIn(checkIn);
		setCheckOut(checkOut);
		setAdultCount(adultCount);
		setChildCount(childCount);
		if (hotelId) {
			setHotelId(hotelId);
		}

		sessionStorage.setItem("destination", destination);
		sessionStorage.setItem("checkIn", checkIn.toISOString());
		sessionStorage.setItem("checkOut", checkOut.toISOString());
		sessionStorage.setItem("adultCount", adultCount.toString());
		sessionStorage.setItem("childCount", childCount.toString());
		if (hotelId) {
			sessionStorage.setItem("hotelId", hotelId);
		}
	};

	return (
		<SearchContext.Provider
			value={{ destination, checkIn, adultCount, checkOut, childCount, handleSearchSave, hotelId }}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => {
	const context = useContext(SearchContext);

	return context as SearchContext;
};
