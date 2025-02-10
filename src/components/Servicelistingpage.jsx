const Servicelistingpage = () => {
  const services = [
    {
      name: "Glamour Salon",
      description: "Haircuts, Styling, and Spa Services",
      availability: "9 AM - 7 PM",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Sweet Tooth Bakery",
      description: "Cakes, Pastries, and Custom Orders",
      availability: "7 AM - 8 PM",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Auto Master Garage",
      description: "Car Repairs, Maintenance, and Services",
      availability: "8 AM - 6 PM",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Elite Fitness",
      description: "Gym, Personal Training, and Yoga",
      availability: "6 AM - 10 PM",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Pet Care Hub",
      description: "Veterinary Services and Pet Grooming",
      availability: "9 AM - 6 PM",
      image: "https://via.placeholder.com/80",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#e5c8a5] p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Service Type</label>
          <select className="w-full p-2 border rounded-lg">
            <option>All</option>
          </select>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4" />
            <span>Open Now</span>
          </label>
        </div>
      </div>

      {/* Service Listings */}
      <div className="w-3/4 p-6 ml-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex items-center mb-6"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-20 h-20 rounded-full mr-6"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-gray-500">Available: {service.availability}</p>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      {/* <footer className="fixed bottom-0 w-full bg-[#e5c8a5] py-4 text-center rounded-t-lg shadow-md">
        <h3 className="font-semibold">Contact Us</h3>
        <p>Email: <a href="mailto:support@servicenow.com" className="underline">support@servicenow.com</a></p>
        <p>Phone: +1 234 567 890</p>
      </footer> */}
    </div>
  );
};

export default Servicelistingpage;
