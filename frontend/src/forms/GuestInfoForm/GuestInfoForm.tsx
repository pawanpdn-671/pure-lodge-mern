import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../context/SearchContext";
import { useAppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
	hotelId: string;
	pricePerNight: number;
};

type GuestInfoFormData = {
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
	const search = useSearchContext();
	const { isLoggedIn } = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		watch,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<GuestInfoFormData>({
		defaultValues: {
			checkIn: search.checkIn,
			checkOut: search.checkOut,
			adultCount: search.adultCount,
			childCount: search.childCount,
		},
	});

	const checkIn = watch("checkIn");
	const checkOut = watch("checkOut");

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	const onSignInClick = (data: GuestInfoFormData) => {
		search.handleSearchSave("", data.checkIn, data.checkOut, data.adultCount, data.childCount);

		navigate("/login", { state: { from: location } });
	};

	const onSubmit = (data: GuestInfoFormData) => {
		search.handleSearchSave("", data.checkIn, data.checkOut, data.adultCount, data.childCount);

		navigate(`/hotel/${hotelId}/booking`);
	};

	return (
		<div className="sticky top-28 shadow-lg shadow-slate-200 px-5 py-6 border border-border rounded-lg">
			<h3 className="text-2xl font-semibold">
				₹{pricePerNight} /<span className="text-sm text-muted-foreground font-normal">night</span>
			</h3>
			<div className="mt-8 w-[300px]">
				<form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
					<div className="grid grid-cols-1 gap-4 items-center">
						<div className="border border-indigo-300 rounded-md">
							<DatePicker
								required
								selected={checkIn}
								onChange={(date) => setValue("checkIn", date as Date)}
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
						<div className="border border-indigo-300 rounded-md">
							<DatePicker
								required
								selected={checkOut}
								onChange={(date) => setValue("checkOut", date as Date)}
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

						<div className="flex bg-white px-2 py-1 gap-2  border rounded-md border-indigo-300">
							<label className="items-center flex">
								Adults:
								<input
									className="w-full p-1 focus:outline-none font-bold"
									type="number"
									min={1}
									max={20}
									{...register("adultCount", {
										required: "This field is required",
										min: {
											value: 1,
											message: "There must be at least one adult",
										},
										valueAsNumber: true,
									})}></input>
							</label>
							<label className="items-center flex">
								Children:
								<input
									className="w-full p-1 focus:outline-none font-bold"
									type="number"
									min={0}
									max={20}
									{...register("childCount", {
										valueAsNumber: true,
									})}></input>
							</label>
							{errors.adultCount && (
								<span className="text-red-500 font-semibold text-sm">{errors.adultCount.message}</span>
							)}
						</div>
						<div className="mt-4 w-full">
							<button className="w-full bg-indigo-600 text-white h-full p-2 font-semibold hover:bg-indigo-500 text-lg outline-none">
								{isLoggedIn ? "Book Now" : "Login to book"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default GuestInfoForm;
