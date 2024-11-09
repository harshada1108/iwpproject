// src/About.js
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#E8F4FD] flex items-center justify-center p-4"> {/* Light Blue Background */}
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg border border-[#6FBF6B] transition-transform transform hover:scale-105 hover:shadow-2xl"> {/* White with Green Border */}
        <h1 className="relative text-4xl md:text-5xl font-bold text-[#003A70] mb-6 text-center group"> {/* Dark Blue Text */}
          About Us
          <span className="absolute left-0 bottom-0 w-full h-1 bg-[#004E87] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" /> {/* Blue Underline */}
        </h1>
        <p className="text-[#4A4A4A] mb-4 text-lg"> {/* Gray Text */}
          Welcome to our pharmaceutical company! We are dedicated to providing high-quality health products and services to our clients.
          Our team works tirelessly to ensure that we deliver exceptional value and outstanding customer satisfaction.
        </p>

        <h2 className="text-3xl font-semibold text-[#005A7A] mb-4"> {/* Medium Blue Text */}
          Our Mission
        </h2>
        <p className="text-[#5A5A5A] mb-4"> {/* Darker Gray Text */}
          Our mission is to enhance the quality of life in our community by offering innovative and effective healthcare solutions.
          We believe in transparency, integrity, and excellence in all that we do.
        </p>

        <h2 className="text-3xl font-semibold text-[#005A7A] mb-4"> {/* Medium Blue Text */}
          Our Team
        </h2>
        <p className="text-[#5A5A5A] mb-4"> {/* Darker Gray Text */}
          Our team is comprised of dedicated professionals, including pharmacists, researchers, and healthcare specialists,
          who are passionate about improving patient outcomes and providing the best care possible.
        </p>

        <h2 className="text-3xl font-semibold text-[#005A7A] mb-4"> {/* Medium Blue Text */}
          Contact Us
        </h2>
        <p className="text-[#5A5A5A] mb-4"> {/* Darker Gray Text */}
          If you have any questions or need more information, feel free to reach out to us at 
          <a href="mailto:contact@pharmaceuticalcompany.com" className="text-[#007BFF] underline"> contact@pharmaceuticalcompany.com</a>. {/* Bright Blue Link */}
          We look forward to assisting you!
        </p>
      </div>
    </div>
  );
};

export default About;