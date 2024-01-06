import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext<HotelFormData>();

	const existingImgUrls = watch("imageUrls");

	const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
		event.preventDefault();
		setValue(
			"imageUrls",
			existingImgUrls.filter((url) => url !== imageUrl),
		);
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Images</h2>
			<div className="border border-gray-300 rounded p-4 flex flex-col gap-4">
				{existingImgUrls && (
					<div className="grid grid-cols-3 gap-4">
						{existingImgUrls.map((url, index) => (
							<div key={index} className="relative group">
								<img src={url} className="min-h-full object-cover" />
								<div className="absolute inset-0 flex font-semibold items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
									<button onClick={(e) => handleDelete(e, url)} className="py-1 px-3 bg-white text-red-500">
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				)}
				<input
					multiple
					accept="image/*"
					className="w-full text-gray-700 font-normal"
					type="file"
					{...register("imageFiles", {
						validate: (files) => {
							const totalLength = files.length + (existingImgUrls?.length || 0);
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
