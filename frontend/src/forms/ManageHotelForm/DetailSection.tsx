import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

			<label className="text-gray-700 text-base font-bold flex-1">
				Name
				<input
					type="text"
					className="border border-gray-300 h-10 rounded w-full px-4 font-normal outline-none"
					{...register("name", { required: "This field is required" })}
				/>
				{errors.name && <span className="text-red-400 text-sm font-medium">{errors.name.message}</span>}
			</label>

			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-gray-700 text-base font-bold flex-1">
					City
					<input
						type="text"
						className="border border-gray-300 h-10 rounded w-full px-4 font-normal outline-none"
						{...register("city", { required: "This field is required" })}
					/>
					{errors.city && <span className="text-red-400 text-sm font-medium">{errors.city.message}</span>}
				</label>
				<label className="text-gray-700 text-base font-bold flex-1">
					Country
					<input
						type="text"
						className="border border-gray-300 h-10 rounded w-full px-4 font-normal outline-none"
						{...register("country", { required: "This field is required" })}
					/>
					{errors.country && <span className="text-red-400 text-sm font-medium">{errors.country.message}</span>}
				</label>
			</div>
			<label className="text-gray-700 text-base font-bold flex-1">
				Description
				<textarea
					rows={8}
					cols={8}
					className="border border-gray-300 h-10 rounded w-full p-4 font-normal outline-none min-h-40"
					{...register("description", { required: "This field is required" })}></textarea>
				{errors.description && (
					<span className="text-red-400 text-sm font-medium">{errors.description.message}</span>
				)}
			</label>
			<label className="text-gray-700 text-base font-bold max-w-[50%]">
				Price Per Night
				<input
					min={1}
					type="number"
					className="border border-gray-300 h-10 rounded w-full px-4 font-normal outline-none"
					{...register("pricePerNight", { required: "This field is required" })}
				/>
				{errors.pricePerNight && (
					<span className="text-red-400 text-sm font-medium">{errors.pricePerNight.message}</span>
				)}
			</label>
			<label className="text-gray-700 text-base font-bold max-w-[50%]">
				Star Rating
				<select
					{...register("starRating", { required: "This field is required" })}
					className="border border-gray-300 rounded w-full p-2 text-gray-700 outline-none font-normal">
					<option value="" className="text-sm font-bold">
						Select a Rating
					</option>
					{[1, 2, 3, 4, 5].map((num, index) => (
						<option key={index} value={num}>
							{num}
						</option>
					))}
				</select>
				{errors.starRating && <span className="text-red-400 text-sm font-medium">{errors.starRating.message}</span>}
			</label>
		</div>
	);
};

export default DetailSection;
