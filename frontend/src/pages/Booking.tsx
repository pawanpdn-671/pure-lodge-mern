import React, { useEffect, useState } from "react";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
	const { stripePromise } = useAppContext();
	const search = useSearchContext();
	const { id } = useParams();

	const [numberOfNights, setNumberOfNights] = useState<number>(0);

	const { data: hotel } = useQuery("fetchHotelById", () => apiClient.fetchHotelById(id as string), {
		enabled: !!id,
	});

	const { data: currentUser } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

	const { data: paymentIntentData } = useQuery(
		"createPaymentIntent",
		() => apiClient.createPaymentIntent(id as string, numberOfNights.toString()),
		{
			enabled: !!id && numberOfNights > 0,
		},
	);

	useEffect(() => {
		if (search.checkIn && search.checkOut) {
			const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);

			setNumberOfNights(Math.ceil(nights));
		}
	}, [search.checkIn, search.checkOut]);

	if (!hotel) {
		return <></>;
	}

	return (
		<div className="grid gap-4 md:grid-cols-[1fr_2fr]">
			<BookingDetailSummary
				checkIn={search.checkIn}
				checkOut={search.checkOut}
				adultCount={search.adultCount}
				childCount={search.childCount}
				numberOfNights={numberOfNights}
				hotel={hotel}
			/>
			{currentUser && paymentIntentData && (
				<Elements
					stripe={stripePromise}
					options={{
						clientSecret: paymentIntentData.clientSecret,
					}}>
					<BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
				</Elements>
			)}
		</div>
	);
};

export default Booking;
