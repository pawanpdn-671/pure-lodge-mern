import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import TypeSection from "./TypeSection";
import FacilitySection from "./FacilitySection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";

export type HotelFormData = {
	name: string;
	city: string;
	country: string;
	description: string;
	type: string;
	pricePerNight: string;
	starRating: string;
	facilities: string[];
	imageFiles: FileList;
	adultCount: number;
	childCount: number;
};

const ManageHotelForm = () => {
	const formMethods = useForm<HotelFormData>();
	const { handleSubmit } = formMethods;

	const onSubmit = handleSubmit((formData: HotelFormData) => {
		console.log(formData);
	});

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={onSubmit} className="mt-10 flex flex-col gap-10 max-w-full sm:max-w-xl mx-auto">
				<DetailSection />
				<TypeSection />
				<FacilitySection />
				<GuestSection />
				<ImageSection />

				<div className="flex justify-end py-5">
					<button
						type="submit"
						className="text-xl py-2.5 w-full bg-indigo-600 text-white hover:bg-indigo-500 font-bold">
						Add Hotel
					</button>
				</div>
			</form>
		</FormProvider>
	);
};

export default ManageHotelForm;
