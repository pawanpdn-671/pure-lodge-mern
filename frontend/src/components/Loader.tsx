import { RiLoader3Fill } from "react-icons/ri";

const Loader = () => {
	return (
		<div className="flex w-full justify-center py-10 bg-white">
			<RiLoader3Fill className={"animate-spin text-slate-600 w-10 h-10"} />
		</div>
	);
};

export default Loader;
