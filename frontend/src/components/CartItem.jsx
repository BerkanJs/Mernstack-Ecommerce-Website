import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
<div className="rounded-xl border border-gray-700 bg-[#1c1c1e] p-4 shadow-sm md:p-6">
  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
    
    {/* Product Image */}
    <div className="shrink-0 md:order-1">
      <img
        className="h-20 w-20 md:h-28 md:w-28 rounded-lg object-cover"
        src={item.image}
        alt={item.name}
      />
    </div>

    {/* Quantity Controls + Price */}
    <div className="flex items-center justify-between gap-4 md:order-3 md:justify-end">
      <div className="flex items-center gap-2">
        <button
          className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-600 bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
        >
          <Minus size={14} />
        </button>
        <span className="text-sm font-medium text-white">{item.quantity}</span>
        <button
          className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-600 bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="text-end md:order-4 md:w-28">
        <p className="text-base font-semibold text-white">${item.price}</p>
      </div>
    </div>

    {/* Product Info + Actions */}
    <div className="w-full min-w-0 flex-1 space-y-3 md:order-2 md:max-w-md">
      <p className="text-base font-semibold text-white hover:text-gray-300 hover:underline transition">
        {item.name}
      </p>
      <p className="text-sm text-gray-400">{item.description}</p>

      <div className="flex items-center gap-3">
        <button
          className="inline-flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-300 hover:underline transition"
          onClick={() => removeFromCart(item._id)}
        >
          <Trash size={14} />
          Remove
        </button>
      </div>
    </div>
  </div>
</div>

	);
};
export default CartItem;
