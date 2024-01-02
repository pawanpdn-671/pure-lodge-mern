import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel.options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<HotelFormData>();
	const typeWatch = watch("type");

	return (
		<div className="my-5">
			<h2 className="text-2xl font-bold mb-3">Type</h2>
			<div className="grid grid-cols-4 gap-2">
				{hotelTypes.map((type, index) => (
					<label
						key={index}
						className={`${
							typeWatch === type
								? "cursor-pointer bg-indigo-500 text-white text-sm rounded-full px-4 py-2 font-semibold"
								: "cursor-pointer bg-indigo-100 text-sm rounded-full px-4 py-2 font-semibold"
						}`}>
						<input
							type="radio"
							value={type}
							{...register("type", { required: "This field is required" })}
							className="hidden"
						/>
						<span>{type}</span>
					</label>
				))}
			</div>
			{errors.type && <span className="text-red-400 text-sm font-medium">{errors.type.message}</span>}
		</div>
	);
};

export default TypeSection;
