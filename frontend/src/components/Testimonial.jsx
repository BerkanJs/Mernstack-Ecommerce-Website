import React from 'react';
import TestimonialSlider from './TestimonialSlider';
import Hero from './Hero';

const Testimonial = () => {


  return (
<section className="section py-10">
  <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
    <div className="flex flex-col-reverse lg:flex-row lg:gap-x-12 gap-y-8 items-center">
    
      <div className="w-full lg:w-1/2">
        <h2 className="title mb-6 text-2xl sm:text-3xl font-bold text-center lg:text-left tracking-wider">
          What Our Customers Say
        </h2>
        <TestimonialSlider />
      </div>

      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
        <Hero />
      </div>
    </div>
  </div>
</section>


  );
};

export default Testimonial;
