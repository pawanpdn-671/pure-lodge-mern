import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../context/AppContext";

const EditHotel = () => {
	const { id } = useParams();
	const { showToast } = useAppContext();

	const { data: hotel } = useQuery("fetchMyHotelById", () => apiClient.fetchMyHotelById(id || ""), {
		enabled: !!id,
	});

	const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
		onSuccess: () => {
			showToast({
				message: "Hotel successfully updated",
				type: "SUCCESS",
			});
		},
		onError: () => {
			showToast({
				message: "Error while updating Hotel",
				type: "ERROR",
			});
		},
	});

	const handleSave = (hotelFormData: FormData) => {
		mutate(hotelFormData);
	};

	return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />;
};

export default EditHotel;
