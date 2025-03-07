const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="text-center py-12 bg-orange-500 text-white">
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-lg">We&apos;d love to hear from you! Reach out for inquiries, collaborations, or just to say hi.</p>
      </section>

      {/* Contact Form & Info */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-8 lg:p-16">
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400" required />
            <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400" required />
            <input type="text" placeholder="Subject" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400" required />
            <textarea placeholder="Your Message" className="w-full p-3 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-orange-400" required></textarea>
            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="w-full lg:w-1/3 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Contact Details</h2>
          <p className="mb-4"><strong>📍 Address:</strong> 123 Business Street, Your City</p>
          <p className="mb-4"><strong>📞 Phone:</strong> +1 234 567 890</p>
          <p className="mb-4"><strong>✉️ Email:</strong> info@yourbusiness.com</p>
          <p className="mb-4"><strong>⏰ Working Hours:</strong> Mon - Fri, 9AM - 6PM</p>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-orange-500 hover:text-orange-600">LinkedIn</a>
            <a href="#" className="text-orange-500 hover:text-orange-600">Twitter</a>
            <a href="#" className="text-orange-500 hover:text-orange-600">Facebook</a>
          </div>
        </div>
      </div>

      {/* Google Map Embed (Optional) */}
      <div className="w-full h-64 mt-8">
        <iframe
          title="Business Location"
          className="w-full h-full border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.052684703222!2d-122.4194154846798!3d37.77492977975985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809cbaabb0bf%3A0x57c85a86d5cf9d9e!2sYour%20Business%20Location!5e0!3m2!1sen!2sus!4v1661364129576!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;