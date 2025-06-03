import React, { useEffect, useState } from "react";
import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import {motion} from "framer-motion"


import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";
const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
 
];
const AdminPage = () => {
  const [activeTab,setActiveTab]=useState("create");
  const {fetchAllProducts}=useProductStore()

  useEffect(()=>{
	fetchAllProducts()

  },[fetchAllProducts])
  return (


<div className="min-h-screen bg-[#1c1c1e] text-white relative overflow-hidden mt-8">
  <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row">
    {/* Sol tarafta Tablar */}
    <div className="w-full lg:w-1/4 mr-8 lg:mr-0 mb-8 lg:mb-0">
      <div className="flex flex-col">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 mb-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? "bg-[#2c2c2e] text-white shadow-sm"
                : "bg-[#3a3a3c] text-gray-300 hover:bg-[#4a4a4c]"
            }`}
          >
            <tab.icon className="mr-2 h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>

    {/* Sağ tarafta içerik */}
    <div className="w-full lg:w-3/4">
      {activeTab === "create" && <CreateProductForm />}
      {activeTab === "products" && <ProductsList />}

    </div>
  </div>
</div>



  )
  
  










  
};

export default AdminPage;
