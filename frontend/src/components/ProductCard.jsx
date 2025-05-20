import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Lütfen sepete ürün eklemek için giriş yapın", { _id: "login" });
			return;
		} else {
			addToCart(product);
		}
	};

	return (
		<div className='flex flex-col justify-between w-full min-h-[520px] overflow-hidden rounded-2xl border border-[#2c2c2e] bg-[#1c1c1e] shadow-md transition-transform hover:scale-[1.02]'>
			<div className='relative mx-3 mt-3 flex items-center justify-center h-[300px] overflow-hidden rounded-xl bg-[#2c2c2e]'>
				<Link to={`/product/${product._id}`}>
					<img
						className='object-contain w-full h-full'
						src={product.image}
						alt={product.name}
					/>
				</Link>
			</div>

			<div className='flex flex-col justify-between h-full px-5 pb-5 text-white'>
				<h5 className='mt-4 text-lg font-semibold tracking-tight text-white'>{product.name}</h5>

				<div className='mt-2 mb-4 flex items-center justify-between'>
					<span className='text-2xl font-bold text-gray-200'>${product.price}</span>
				</div>

				<button
					className='flex items-center justify-center w-full rounded-lg bg-[#2c2c2e] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3a3a3c] focus:outline-none focus:ring-2 focus:ring-gray-500'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={20} className='mr-2' />
					Sepete Ekle
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
