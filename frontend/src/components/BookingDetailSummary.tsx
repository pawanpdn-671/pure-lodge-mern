import { HotelType } from "../../../backend/src/shared/types";

type Props = {
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
	numberOfNights: number;
	hotel: HotelType;
};

const BookingDetailSummary = (props: Props) => {
	const { adultCount, checkIn, checkOut, childCount, hotel, numberOfNights } = props;

	return (
		<div className="grid gap-4 rounded-md border border-slate-300 p-5 h-fit">
			<h2 className="text-lg font-semibold">Your Booking Details</h2>
			<div className="border-b py-2">
				Location <div className="font-semibold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
			</div>
			<div className="flex justify-between">
				<div className="">
					Checkin
					<div className="font-semibold">{checkIn.toDateString()}</div>
				</div>
				<div className="">
					Checkout
					<div className="font-semibold">{checkOut.toDateString()}</div>
				</div>
			</div>
			<div className="border-t border-b py-2">
				Number of Staying Day:
				<span className="font-semibold"> {numberOfNights}</span>
			</div>
			<div>
				Guest
				<div className="font-semibold">
					{adultCount} adults & {childCount} children
				</div>
			</div>
		</div>
	);
};

export default BookingDetailSummary;
