const Businessregistrationform = () => {
  return (
    <div className="flex justify-center items-center h-full  p-4 my-5 ">
      <div className="bg-gray-50 p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-orange-500">
          Register Your Business
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Business Name */}
          <input
            type="text"
            placeholder="Business Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Owner Name */}
          <input
            type="text"
            placeholder="Owner Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Phone Number */}
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Website URL */}
          <input
            type="url"
            placeholder="Website URL (optional)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Business Type */}
          <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300">
            <option value="">Select Business Type</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Retail">Retail</option>
            <option value="Service">Service</option>
            <option value="Consulting">Consulting</option>
            <option value="Other">Other</option>
          </select>

          {/* Operating Hours */}
          <input
            type="text"
            placeholder="Operating Hours (e.g., 9 AM - 5 PM)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Social Media Link */}
          <input
            type="url"
            placeholder="Social Media Link (optional)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Business Address (Full Width) */}
          <textarea
            placeholder="Business Address"
            className="w-full p-3 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 md:col-span-2"
          ></textarea>

          {/* Services Offered (Full Width) */}
          <textarea
            placeholder="Services Offered"
            className="w-full p-3 border rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 md:col-span-2"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-orange-600 transition-all md:col-span-2"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default Businessregistrationform;
