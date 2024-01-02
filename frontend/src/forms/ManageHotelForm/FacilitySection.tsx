import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel.options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitySection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Facilities</h2>
			<div className="grid grid-cols-3 gap-4">
				{hotelFacilities.map((fal, index) => (
					<label key={index} className="text-sm flex gap-1 text-gray-700 cursor-pointer">
						<input
							className="cursor-pointer"
							type="checkbox"
							value={fal}
							{...register("facilities", {
								validate: (facilities) => {
									if (facilities && facilities.length > 0) {
										return true;
									} else return "Select atleast one facility";
								},
							})}
						/>
						{fal}
					</label>
				))}
			</div>
			{errors.facilities && <span className="text-red-400 text-sm font-medium">{errors.facilities.message}</span>}
		</div>
	);
};

export default FacilitySection;
