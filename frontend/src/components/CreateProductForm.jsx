import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["Headphones", "Laptops", "Watches", "Printers", "Gaming", "Monitors"];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
      
    } catch (error) {
      console.error("Error creating product", error);
    
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const fields = [
    {
      id: "name",
      label: "Product Name",
      type: "text",
      as: "input",
      required: true,
    },
    {
      id: "description",
      label: "Description",
      as: "textarea",
      rows: 3,
      required: true,
    },
    {
      id: "price",
      label: "Price",
      type: "number",
      as: "input",
      step: "0.01",
      required: true,
    },
  ];

  return (
<motion.div
  className='bg-white text-gray-800 shadow-lg rounded-2xl p-8 mb-8 max-w-xl mx-auto'
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h2 className='text-2xl font-semibold mb-6 text-black'>Create New Product</h2>

  <form onSubmit={handleSubmit} className='space-y-5'>
    {fields.map(({ id, label, as, ...rest }) => (
      <div key={id}>
        <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
          {label}
        </label>
        {as === "textarea" ? (
          <textarea
            id={id}
            name={id}
            value={newProduct[id]}
            onChange={(e) => setNewProduct({ ...newProduct, [id]: e.target.value })}
            className='mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 
            text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
            {...rest}
          />
        ) : (
          <input
            id={id}
            name={id}
            value={newProduct[id]}
            onChange={(e) => setNewProduct({ ...newProduct, [id]: e.target.value })}
            className='mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 
            text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
            {...rest}
          />
        )}
      </div>
    ))}

    {/* Category */}
    <div>
      <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-1'>
        Category
      </label>
      <select
        id='category'
        name='category'
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        className='block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 
        text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
        required
      >
        <option value=''>Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    {/* Image Upload */}
    <div className='mt-1 flex items-center'>
      <input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
      <label
        htmlFor='image'
        className='cursor-pointer bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 
        rounded-md shadow-sm text-sm leading-4 font-medium hover:bg-gray-200 focus:outline-none 
        focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
      >
        <Upload className='h-5 w-5 inline-block mr-2' />
        Upload Image
      </label>
      {newProduct.image && <span className='ml-3 text-sm text-gray-500'>Image uploaded</span>}
    </div>

    {/* Submit */}
    <button
      type='submit'
      className='w-full flex justify-center items-center py-2 px-4 border border-transparent 
      rounded-md shadow-sm text-sm font-medium text-white bg-[#1c1c1e] hover:bg-black 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50'
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
          Loading...
        </>
      ) : (
        <>
          <PlusCircle className='mr-2 h-5 w-5' />
          Create Product
        </>
      )}
    </button>
  </form>
</motion.div>

  );
};

export default CreateProductForm;
