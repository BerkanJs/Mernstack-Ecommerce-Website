import React from "react";
import NewsLetter from "../assets/IMG/NewsLetter.webp";
import CouponBox from '../components/CouponBox';
import { FaShieldAlt, FaTools, FaTags } from "react-icons/fa";
import Testimonial from "../components/Testimonial";

const policies = [
  {
    title: "Security Policy",
    description:
      "We prioritize the security of your personal data with industry-standard encryption and regular system updates. Your privacy and safety are our top concern.",
    icon: <FaShieldAlt className="text-black w-8 h-8" />,
  },
  {
    title: "Maintenance Policy",
    description:
      "Our website undergoes regular maintenance to improve performance and security. We will notify you in advance about any planned downtime.",
    icon: <FaTools className="text-black w-8 h-8" />,
  },
  {
    title: "Pricing Policy",
    description:
      "We offer transparent pricing with no hidden fees. Prices may change based on stock, location, or promotions.",
    icon: <FaTags className="text-black w-8 h-8" />,
  },
];

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-20 bg-white min-h-screen">
      <div className="text-4xl font-extrabold text-center pt-8 border-t border-gray-300 tracking-wider text-black">
        <h3>About Us</h3>
      </div>

      <div className="my-14 flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 h-[400px] md:h-[450px] relative rounded-lg overflow-hidden shadow-lg">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={NewsLetter}
            alt="Newsletter Image"
          />
        </div>
        <div className="flex flex-col justify-center gap-8 md:w-1/2 text-gray-700 tracking-wide leading-relaxed text-lg">
          <p>
            Welcome! Your ultimate destination for the latest in <span className="font-semibold text-indigo-600">tech innovation</span>. We offer a wide range of high-quality gadgets, electronics, and accessories designed to enhance your lifestyle. Shop with confidence and stay ahead with cutting-edge products at unbeatable prices.
          </p>
          <p>
            At <span className="font-semibold text-indigo-600">E-Commerce</span>, we are passionate about bringing you the best in technology. From smartphones to smart home devices, we provide a seamless shopping experience with top-notch customer service. Explore our collection and discover the future of tech, delivered to your door.
          </p>
          <b className="text-black text-xl tracking-wide uppercase mb-2">Our Mission</b>
          <p>
            Our passion lies in bringing the latest and most innovative technology to your fingertips. We believe in the power of technology to transform everyday life, making it more efficient, enjoyable, and connected. From cutting-edge gadgets to essential accessories, we’re dedicated to offering products that enhance your lifestyle. Our team is committed to providing an exceptional shopping experience, ensuring quality, value, and customer satisfaction with every purchase. We’re here to help you stay ahead of the curve and discover the future of technology today.
          </p>
        </div>
      </div>

      <div className="text-3xl font-bold text-center py-6 text-black tracking-widest uppercase">
        <h3>Choose Us</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 px-4 md:px-0">
        {policies.map(({ title, description, icon }, idx) => (
          <div
            key={idx}
            className="border  border-gray-300 rounded-xl px-8 py-8 flex flex-col gap-6 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <div className="flex items-center gap-4 ">
              {icon}
              <b className="text-black text-lg tracking-wide">{title}</b>
            </div>
            <p className="text-gray-600 text-base leading-relaxed tracking-wide">{description}</p>
          </div>
        ))}
      </div>
      <Testimonial/>

      <CouponBox />
    </div>
  );
};

export default AboutPage;
