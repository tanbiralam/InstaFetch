import Lottie from 'react-lottie';
import animationData from '../json/Animation - 1714403621425.json'; 
const Navbar = () => {
  return (
    <nav className="py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
            }}
            style={{ width: 50, height: 50 }} // Adjust width and height as needed
          />
          <a
            href="/"
            className="text-3xl font-bold bg-clip-text text-transparent bg-[#4F4A45] relative ml-2"
          >
            InstaFetch
          </a>
        </div>
        <ul className="flex gap-6">
          <li>
            <a
              href="https://github.com/tanbiralam/InstaFetch"
              target="_blank"
              rel="noreferrer"
              className="bg-clip-text text-transparent bg-[#4F4A45] hover:text-black"
            >
              Contribute
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
