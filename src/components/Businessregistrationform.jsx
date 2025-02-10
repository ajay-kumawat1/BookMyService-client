const Businessregistrationform = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[700px]">
        <h2 className="text-2xl font-semibold mb-6">Register Your Business</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Business Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <textarea
          placeholder="Services Offered"
          className="w-full p-3 border rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4"
        ></textarea>

        <div className="mb-6">
          <p className="font-medium mb-2">Availability</p>
          <div className="flex gap-4">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day) => (
                <label key={day} className="flex items-center gap-1">
                  <input type="checkbox" className="hidden" />
                  <span className="w-4 h-4 border rounded-md bg-orange-500 block"></span>
                  <span className="text-gray-700">{day}</span>
                </label>
              )
            )}
          </div>
        </div>

        <button className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-orange-600 transition-all">
          Submit Registration
        </button>
      </div>
    </div>
  );
};

export default Businessregistrationform;
