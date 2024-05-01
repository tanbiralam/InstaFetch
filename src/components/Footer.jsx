
const Footer = () => {
  return (
    <div className="shadow-lg rounded-md  text-white py-7 bg-[#fff] flex flex-col justify-center items-center mt-4">
      <div className="container mx-auto px-4">
        {/* Logo and Description */}
        <div className="text-center md:text-left mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-black">InstaFetch</h3>
          <p className="text-sm text-black">
            Your Open-Source Gateway to Effortless Instagram Media Downloads.
          </p>
          <p className="text-sm text-black">Made with ❤️ by Tanbir</p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between items-center mb-6">
          {/* Copyright Section */}
          <div className="text-xs  text-black">
            &copy; {new Date().getFullYear()} Tanbir Alam. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
