import React, { useState } from "react";
import { LogIn, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import{ useUserStore} from "../stores/useUserStore"
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const {login,loading} =useUserStore()
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
    setFormData({
      email:"",
      password:""
    })
  };

  const fields = [
    {
      id: "email",
      label: "Email",
      placeholder: "example@example.com",
      type: "email",
      icon: <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />,
    },
    {
      id: "password",
      label: "Password",
      placeholder: "********",
      type: "password",
      icon: <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />,
    },
  ];

  return (
    <div className="flex flex-col justify-center py-17 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Login here
        </h2>

        <motion.div
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-[#1c1c1e] py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-300"
                  >
                    {field.label}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      required
                      id={field.id}
                      value={formData[field.id]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.id]: e.target.value })
                      }
                      className="block w-full pl-10 pr-4 py-3 bg-white text-black border border-gray-600 rounded-md shadow-sm placeholder:text-black focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                      placeholder={field.placeholder}
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer flex items-center justify-center py-3 px-6 bg-black text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader
                      className="mr-2 h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                    Login
                  </div>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm  text-white">
              Don't you have a accound click here to
              <Link
                to="/signup"
                className="font-medium text-white mx-2 hover:text-gray-500"
              >
                sign up <ArrowRight className="inline h-4 w-4" />
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
