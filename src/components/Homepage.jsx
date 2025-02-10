const Homepage = () => {
  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="flex justify-between items-center px-12 py-16 m-3]">
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-bold text-black leading-tight">
            Discover and Book <br /> Expert Services for Your Business
          </h1>
          <p className="text-lg text-gray-700">
            Welcome to{" "}
            <span className="font-semibold text-[#ef830f]">ServiceConnect</span>
            , where businesses showcase services and clients find what they
            need. Our platform streamlines booking and management for seamless
            transactions.
          </p>
          <button
            className="px-6 py-3 bg-[#ef830f] text-white font-semibold rounded-lg shadow-lg 
      transition-transform transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        <div className="w-1/2 flex justify-center">
          <img
            src="../images/hero-section-image.png"
            alt="Business Services"
            className="w-[450px] h-[300px] rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Business Categories */}
      <section className="flex justify-center flex-wrap gap-4 py-8">
        {[
          "Plumbing",
          "Photography",
          "Catering",
          "Cleaning",
          "Event Planning",
          "Landscaping",
          "Home Repairs",
        ].map((service, index) => (
          <button
            key={index}
            className="relative px-6 py-3 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-md 
        bg-[#ef830f] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-[#e56000] 
        before:transition-all before:duration-300 hover:before:w-full"
          >
            <span className="relative z-10">{service}</span>
          </button>
        ))}
      </section>

      {/* Explore Services */}
      <section className="px-12 py-16 ">
        <h2 className="text-2xl font-bold text-black text-center">
          Explore a Variety of Tailored Services for Your Business Needs.
        </h2>
        <div className="w-full h-64 mt-6 flex items-center justify-center">
          {/* Background Dotted Pattern */}
          <div className="absolute left-46 w-36 h-36 bg-[url('../public/images/dottedimage.png')] bg-cover"></div>

          {/* Main Image with Oval Mask */}
          <div className="w-2/3 h-full overflow-hidden rounded-[120px] relative">
            <img
              src="../public/images/largeimage.png"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Label */}
          <div className="absolute right-50 bg-orange-500 text-white px-6 py-4 rounded-lg font-semibold">
            Efficiency
          </div>
        </div>
      </section>

      {/* Browse Services */}
      <section className="px-12 py-16">
        <h2 className="text-3xl font-bold text-black mb-6">Browse Services</h2>

        <div className="grid grid-cols-3 gap-6">
          {[
            "Marketing",
            "Design",
            "Consulting",
            "Technology",
            "Finance",
            "Legal",
          ].map((service, index) => (
            <div
              key={service}
              className="bg-[#e5c8a5] p-6 rounded-lg shadow-md flex items-center space-x-4 
        hover:bg-[#ef830f] hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span className="text-xl font-bold">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
              <span className="text-lg font-medium">{service}</span>
            </div>
          ))}
        </div>

        <button
          className="mt-8 bg-[#ef830f] text-white px-6 py-3 rounded-lg text-lg font-semibold 
    hover:bg-[#e56f00] transition-all duration-300"
        >
          Show All
        </button>
      </section>

      {/* Recent Projects */}
      <section className="px-12 py-16 ">
        <h2 className="text-3xl font-bold text-black mb-6">Recent Projects</h2>

        <div className="grid grid-cols-3 gap-20">
          {[
            "Local Catering Services",
            "Legal Consultancy",
            "Tourism Marketing",
            "Financial Advisory",
            "Business Consulting",
          ].map((project, index) => (
            <div
              key={index}
              className="bg-[#f2e2ce] p-6 rounded-lg shadow-md transform transition-all duration-300 
        hover:scale-105 hover:shadow-xl hover:bg-[#e5c8a5] cursor-pointer"
            >
              {/* Image Placeholder with Loading Animation */}
              <div
                className="w-full h-40 bg-gray-300 flex items-center justify-center mb-4 
          animate-pulse rounded-lg"
              >
                <span className="text-gray-500">Loading Image...</span>
              </div>

              <h3 className="text-lg font-bold text-black">{project}</h3>

              <button
                className="mt-3 bg-[#ef830f] text-white px-5 py-2 rounded-lg font-semibold 
          hover:bg-[#e56f00] transition-all duration-300"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
