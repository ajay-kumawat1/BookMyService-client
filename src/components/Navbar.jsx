const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center p-4 px-70 shadow-md bg-white">
        <div className="text-xl font-bold text-[#ef830f]">BookMyService</div>
        <ul className="flex space-x-6 text-[#6d6d6d]">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#portfolio">Portfolio</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <button className="bg-[#ef830f] text-white px-4 py-2 rounded-lg">
          Get in Touch
        </button>
      </nav>
    </>
  );
};

export default Navbar;
