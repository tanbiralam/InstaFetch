const Navbar = () => {


  return (
    <nav className="py-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-3xl font-bold bg-clip-text text-transparent bg-[#4F4A45]">
          InstaFetch
        </a>

        <ul className="flex gap-6">
          <li>
            <a href="https://github.com/tanbiralam/InstaFetch" target="_blank" className="bg-clip-text text-transparent bg-[#4F4A45] hover:text-black">Contribute</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
