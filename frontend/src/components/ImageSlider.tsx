import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type SwiperType from "swiper";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface ImageSliderProps {
	urls: string[];
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
	const [swiper, setSwiper] = useState<null | SwiperType>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const [slideConfig, setSlideConfig] = useState({
		isBeginning: true,
		isEnd: activeIndex === (urls.length ?? 0) - 1,
	});

	useEffect(() => {
		swiper?.on("slideChange", ({ activeIndex }) => {
			setActiveIndex(activeIndex);
			setSlideConfig({
				isBeginning: activeIndex === 0,
				isEnd: activeIndex === (urls.length ?? 0) - 1,
			});
		});
	}, [swiper, urls]);

	const activeStyles =
		"active:scale=[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 h-12 w-12 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";

	const inActiveStyles = "hidden text-gray-400";

	return (
		<div className="group h-[400px] lg:h-[800px] relative bg-zinc-100 overflow-hidden max-h-full max-w-full rounded-xl ">
			<div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
				<button
					onClick={(e) => {
						e.preventDefault();
						swiper?.slideNext();
					}}
					className={`
               ${activeStyles} right-3 transition
               ${slideConfig.isEnd ? inActiveStyles : ""}
               ${!slideConfig.isEnd ? "hover:bg-primary-300 text-primary-800 opacity-100" : ""}
             `}
					aria-label="next image">
					<BiChevronRight className="h-8 w-8 text-zinc-700" />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						swiper?.slidePrev();
					}}
					className={`
               ${activeStyles} left-3 transition
               ${slideConfig.isBeginning ? inActiveStyles : ""}
               ${!slideConfig.isBeginning ? "hover:bg-primary-300 text-primary-800 opacity-100" : ""}
             `}
					aria-label="next image">
					<BiChevronLeft className="h-8 w-8 text-zinc-700" />
				</button>
			</div>

			<Swiper
				pagination={{
					renderBullet: (_, className) => {
						return `<span class="rounded-full transition ${className}"></span>`;
					},
				}}
				allowTouchMove={true}
				onSwiper={(swiper) => setSwiper(swiper)}
				spaceBetween={50}
				modules={[Pagination]}
				slidesPerView={1}
				className="h-full w-full">
				{urls?.map((url, i) => (
					<SwiperSlide key={i} className="-z-10 relative flex-grow !h-full w-full">
						<img
							loading="eager"
							className="z-10 select-none h-full w-full !object-cover"
							src={url}
							alt="room image"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ImageSlider;
