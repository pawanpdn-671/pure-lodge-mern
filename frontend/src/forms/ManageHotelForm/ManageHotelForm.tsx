import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import TypeSection from "./TypeSection";
import FacilitySection from "./FacilitySection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
	name: string;
	city: string;
	country: string;
	description: string;
	type: string;
	pricePerNight: number;
	starRating: number;
	facilities: string[];
	imageFiles: FileList;
	imageUrls: string[];
	adultCount: number;
	childCount: number;
};

type Props = {
	hotel?: HotelType;
	onSave: (hotelFormData: FormData) => void;
	isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
	const formMethods = useForm<HotelFormData>();
	const { handleSubmit, reset } = formMethods;

	useEffect(() => {
		if (hotel) reset(hotel);
	}, [hotel, reset]);

	const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
		const formData = new FormData();

		if (hotel) {
			formData.append("id", hotel._id);
		}

		formData.append("name", formDataJson.name);
		formData.append("city", formDataJson.city);
		formData.append("country", formDataJson.country);
		formData.append("description", formDataJson.description);
		formData.append("type", formDataJson.type);
		formData.append("pricePerNight", formDataJson.pricePerNight.toString());
		formData.append("starRating", formDataJson.starRating.toString());
		formData.append("adultCount", formDataJson.adultCount.toString());
		formData.append("childCount", formDataJson.childCount.toString());

		formDataJson.facilities.forEach((fal, index) => {
			formData.append(`facilities[${index}]`, fal);
		});

		if (formDataJson.imageUrls) {
			formDataJson.imageUrls.forEach((url, index) => {
				formData.append(`imageUrls[${index}]`, url);
			});
		}

		Array.from(formDataJson.imageFiles).forEach((imgFile) => {
			formData.append("imageFiles", imgFile);
		});

		onSave(formData);
	});

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={onSubmit} className="mt-10 flex flex-col gap-10 max-w-full sm:max-w-xl mx-auto">
				<DetailSection />
				<TypeSection />
				<FacilitySection />
				<GuestSection />
				<ImageSection />

				<div className="flex justify-end py-5 relative">
					<button
						type="submit"
						className="text-xl disabled:cursor-not-allowed disabled:bg-gray-300 py-2.5 w-full bg-indigo-600 text-white hover:bg-indigo-500 font-bold"
						disabled={isLoading}>
						{hotel ? "Update Hotel" : "Add Hotel"}
					</button>
					{isLoading && (
						<span className="absolute inline-block w-5 h-5 mr-3 rounded-full animate-spin border-[3px] border-gray-400 border-t-black right-2 top-1/2 -mt-2.5"></span>
					)}
				</div>
			</form>
		</FormProvider>
	);
};

export default ManageHotelForm;
