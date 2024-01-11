import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types";
import { useForm } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../context/SearchContext";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";

type Props = {
	currentUser: UserType;
	paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
	firstName: string;
	lastName: string;
	email: string;
	adultCount: number;
	childCount: number;
	checkIn: string;
	checkOut: string;
	hotelId: string;
	paymentIntentId: string;
	totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
	const stripe = useStripe();
	const elements = useElements();

	const search = useSearchContext();
	const { id } = useParams();
	const { showToast } = useAppContext();
	const navigate = useNavigate();
	const [stripeLoading, setStripeLoading] = useState(false);

	const { mutate: bookRoom, isLoading } = useMutation(apiClient.createRoomBooking, {
		onSuccess: () => {
			showToast({ message: "Booking Added!", type: "SUCCESS" });
			navigate("/my-bookings");
		},
		onError: () => {
			showToast({ message: "Error adding booking!", type: "ERROR" });
		},
	});

	const { handleSubmit, register } = useForm<BookingFormData>({
		defaultValues: {
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
			email: currentUser.email,
			adultCount: search.adultCount,
			childCount: search.childCount,
			checkIn: search.checkIn.toISOString(),
			checkOut: search.checkOut.toISOString(),
			hotelId: id,
			totalCost: paymentIntent.totalCost,
			paymentIntentId: paymentIntent.paymentIntentId,
		},
	});

	const onSubmit = async (formData: BookingFormData) => {
		if (!stripe || !elements) {
			return;
		}
		setStripeLoading(true);
		const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
			payment_method: {
				card: elements?.getElement(CardElement) as StripeCardElement,
			},
		});

		if (result.paymentIntent?.status === "succeeded") {
			bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
			setStripeLoading(false);
		} else setStripeLoading(false);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid grid-cols-1 gap-5 rounded-md border border-slate-300 p-3 sm:p-5">
			<span className="text-2xl font-semibold">Confirm your details</span>
			<div className="grid grid-cols-2 gap-6">
				<label className="text-gray-700 text-sm font-semibold flex-1">
					First Name
					<input
						type="text"
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-zinc-100 font-normal"
						readOnly
						disabled
						{...register("firstName")}
					/>
				</label>
				<label className="text-gray-700 text-sm font-semibold flex-1">
					Last Name
					<input
						type="text"
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-zinc-100 font-normal"
						readOnly
						disabled
						{...register("lastName")}
					/>
				</label>
				<label className="col-span-2 md:col-span-1 text-gray-700 text-sm font-semibold flex-1">
					Email
					<input
						type="text"
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-zinc-100 font-normal"
						readOnly
						disabled
						{...register("email")}
					/>
				</label>
			</div>
			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Your Price Summary</h2>
				<div className="bg-indigo-200 p-4 rounded-md">
					<div className="font-semibold text-lg">Total Cost: ₹{paymentIntent.totalCost.toFixed(2)}</div>
					<div className="text-xs">Includes taxes and charges</div>
				</div>
			</div>
			<div className="space-y-2">
				<h3 className="text-xl font-semibold">Payment Details</h3>
				<CardElement id="payment-element" className="border rounded-md p-2 text-sm" />
			</div>
			<div className="flex justify-end mt-4 relative">
				<button
					type="submit"
					className="disabled:cursor-not-allowed disabled:bg-gray-300 bg-indigo-600 text-white p-2 px-4 font-semibold hover:bg-indigo-500 text-base"
					disabled={isLoading || stripeLoading}>
					Confirm Booking
				</button>
				{(isLoading || stripeLoading) && (
					<span className="absolute inline-block w-5 h-5 mr-3 rounded-full animate-spin border-[3px] border-gray-400 border-t-black left-2 top-1/2 -mt-2.5"></span>
				)}
			</div>
			<div className="mt-4 grid w-[250px] font-semibold mx-auto grid-cols-1 text-sm bg-zinc-100 p-2">
				<h2 className="text-center font-bold pb-2">TEST IT</h2>
				<span>Use card no. 4242424242424242</span>
				<span>Expired should be future random month & year, rest can be random.</span>
			</div>
		</form>
	);
};

export default BookingForm;
