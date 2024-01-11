import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
	hotel: HotelType;
	key: string;
};
const LatestHotelCard = ({ hotel }: Props) => {
	return (
		<Link
			className="relative h-[300px] lg:h-[300px] cursor-pointer overflow-hidden rounded-md"
			to={`/detail/${hotel._id}`}>
			<div className="h-[300px]">
				<img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" alt="hotel image" />
			</div>
			<div className="absolute bottom-0 py-2 px-4 bg-black/40 w-full rounded-b-md">
				<span className="text-white font-semibold tracking-tight text-lg">{hotel.name}</span>
			</div>
		</Link>
	);
};

export default LatestHotelCard;
