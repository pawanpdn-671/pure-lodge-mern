type Props = {
	selectedPrice?: number;
	onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
	return (
		<div>
			<h4 className="text-base font-semibold mb-2">Max Price</h4>
			<select
				className="p-2 border rounded-md w-full outline-none"
				value={selectedPrice}
				onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}>
				<option value="">Select Max Price</option>
				{[500, 1000, 5000, 10000, 20000, 40000, 50000, 80000, 100000].map((price, index) => (
					<option key={index} value={price}>
						{price}
					</option>
				))}
			</select>
		</div>
	);
};

export default PriceFilter;
