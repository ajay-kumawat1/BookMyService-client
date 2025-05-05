import { useState } from 'react';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        toast.success(data.message || 'Message sent successfully!');
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              <p>Thank you for your message! We'll get back to you soon.</p>
              <button
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all"
                onClick={() => setSuccess(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-3 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-orange-400"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all disabled:bg-orange-300 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
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