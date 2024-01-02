import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Guests</h2>
			<div className="grid grid-cols-2 p-4 gap-5 bg-indigo-100">
				<label className="text-gray-700 text-sm font-semibold">
					Adults
					<input
						type="number"
						min={1}
						className="border rounded w-full py-2 px-3 font-normal outline-none"
						{...register("adultCount", {
							required: "This field is required",
						})}
					/>
					{errors.adultCount && (
						<span className="text-red-400 text-sm font-medium">{errors.adultCount.message}</span>
					)}
				</label>
				<label className="text-gray-700 text-sm font-semibold">
					Children
					<input
						type="number"
						min={0}
						className="border rounded w-full py-2 px-3 font-normal outline-none"
						{...register("childCount", {
							required: "This field is required",
						})}
					/>
					{errors.childCount && (
						<span className="text-red-400 text-sm font-medium">{errors.childCount.message}</span>
					)}
				</label>
			</div>
		</div>
	);
};

export default GuestSection;
