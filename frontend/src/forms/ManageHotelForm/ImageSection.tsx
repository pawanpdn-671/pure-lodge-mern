import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
const ImageSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Images</h2>
			<div className="border border-gray-300 rounded p-4 flex flex-col gap-4">
				<input
					multiple
					accept="image/*"
					className="w-full text-gray-700 font-normal"
					type="file"
					{...register("imageFiles", {
						validate: (files) => {
							const totalLength = files.length;
							if (totalLength === 0) return "Select atleast one image";
							if (totalLength > 6) return "Selected images shouldn't be more than 6";
							return true;
						},
					})}
				/>
			</div>
			{errors.imageFiles && <span className="text-red-400 text-sm font-medium">{errors.imageFiles.message}</span>}
		</div>
	);
};

export default ImageSection;
