import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestHotelCard from "../components/LatestHotelCard";
import Loader from "../components/Loader";

const Home = () => {
	const { data: hotels, isLoading } = useQuery("fetchHotels", () => apiClient.fetchHotels());

	const topRowHotels = hotels?.slice(0, 2) || [];
	const bottomRowHotels = hotels?.slice(2) || [];

	return (
		<div className="space-y-3 pb-20">
			<div className="text-left w-full">
				<h2 className="text-3xl font-bold text-slate-700">Latest Staycations</h2>
				<p className="text-slate-500">Most recent destinations added by our hosts</p>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<div className="grid gap-4">
					<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
						{topRowHotels.map((hotel) => (
							<LatestHotelCard key={hotel._id} hotel={hotel} />
						))}
					</div>
					<div className="grid md:grid-cols-3 gap-4">
						{bottomRowHotels.map((hotel) => (
							<LatestHotelCard key={hotel._id} hotel={hotel} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
