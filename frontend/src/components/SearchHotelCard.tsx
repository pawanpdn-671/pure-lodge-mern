import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
	key: number;
	hotel: HotelType;
};

const SearchHotelCard = ({ hotel }: Props) => {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
			<div className="w-full h-[300px]">
				<img src={hotel.imageUrls[0]} alt={hotel.name} className="w-full h-full object-cover object-center" />
			</div>
			<div className="grid grid-rows-[1fr_2fr_1fr]">
				<div>
					<div className="flex items-center">
						<span className="flex">
							{Array.from({ length: hotel.starRating })?.map((n) => (
								<AiFillStar key={n} className="fill-yellow-400" />
							))}
						</span>
						<span className="ml-1 text-xm">{hotel.type}</span>
					</div>
					<Link
						to={`/detail/${hotel._id}`}
						className="text-2xl font-semibold cursor-pointer mt-2 hover:text-gray-500">
						{hotel.name}
					</Link>
				</div>
				<div>
					<div className="line-clamp-4">{hotel.description}</div>
				</div>
				<div className="grid grid-cols-2 items-end whitespace-nowrap">
					<div className="flex gap-1 items-center">
						{hotel.facilities.slice(0, 3)?.map((facility, idx) => (
							<span className="bg-slate-200 p-2 rounded-lg font-semibold text-xs whitespace-nowrap" key={idx}>
								{facility}
							</span>
						))}
						<span className="text-sm font-semibold">
							{hotel.facilities.length > 3 && ` +${hotel.facilities.length - 3} more`}
						</span>
					</div>
					<div className="flex flex-col items-end gap-4">
						<span className="font-bold text-lg">
							₹{hotel.pricePerNight}/<span className="text-sm font-normal"> night</span>
						</span>
						<Link
							to={`/detail/${hotel._id}`}
							className="bg-indigo-600 text-white h-full py-1.5 px-5 font-semibold text-xl max-w-fit hover:bg-indigo-500">
							View More
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchHotelCard;
