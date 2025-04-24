import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const TermsAndConditionsPage = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 font-sans">
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-6 text-center">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Last Updated: April 23, 2025
          </p>

          <div className="prose prose-lg max-w-4xl mx-auto text-gray-700">
            <p>
              Welcome to our Service Booking Platform ("we," "us," or "our"). These Terms and Conditions ("Terms") govern your use of our website, mobile applications, and related services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">1. Acceptance of Terms</h2>
            <p>
              By creating an account, booking a service, or interacting with the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy. These Terms constitute a legally binding agreement between you and us.
            </p>
            <p>
              We reserve the right to modify these Terms at any time. Updates will be posted on this page with a revised "Last Updated" date. Continued use of the Service after changes indicates your acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use the Service. By using the Service, you represent that you have the legal capacity to enter into these Terms. Minors are prohibited from using the Service, and we do not knowingly collect data from individuals under 13.
            </p>
            <p>
              Business owners must be registered entities or individuals legally authorized to provide services. False representations of eligibility may result in account termination.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">3. Account Registration</h2>
            <p>
              To use certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6">
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
            </ul>
            <p>
              You are responsible for all activities that occur under your account. We reserve the right to suspend or terminate accounts for violation of these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">4. Booking Services</h2>
            <p>
              The Service allows you to book services from registered business owners. By booking a service, you agree to:
            </p>
            <ul className="list-disc pl-6">
              <li>Pay the listed price, including any applicable taxes or fees, at the time of booking.</li>
              <li>Honor the scheduled appointment time and provide reasonable notice for cancellations.</li>
              <li>Comply with the business owner’s service policies (e.g., arrival times, preparation requirements).</li>
            </ul>
            <p>
              All bookings are subject to availability. We are not liable for cancellations or delays caused by business owners, though we will assist in rescheduling or refunds where applicable.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">5. Payments and Refunds</h2>
            <p>
              Payments are processed through our third-party payment gateway. You agree to:
            </p>
            <ul className="list-disc pl-6">
              <li>Provide valid payment information for all transactions.</li>
              <li>Be charged the full amount upon booking confirmation.</li>
              <li>Review cancellation policies, which vary by service (e.g., 24-hour notice for full refunds).</li>
            </ul>
            <p>
              Refunds are issued at our discretion or as required by law. Disputes must be raised within 7 days of the service date. We are not responsible for chargebacks or disputes handled by payment providers.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">6. Cancellation and No-Show Policy</h2>
            <p>
              Cancellations must be made through the Service at least 24 hours before the scheduled time, unless otherwise specified by the business owner. No-shows or late cancellations may incur a fee, up to 100% of the service cost, at the business owner’s discretion.
            </p>
            <p>
              We reserve the right to cancel bookings due to unforeseen circumstances (e.g., business owner unavailability), with a full refund or rescheduling option provided.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">7. User Conduct</h2>
            <p>
              You agree not to use the Service for:
            </p>
            <ul className="list-disc pl-6">
              <li>Illegal activities or violations of local laws.</li>
              <li>Harassment, defamation, or abusive behavior toward other users or business owners.</li>
              <li>Attempting to circumvent security measures or access unauthorized areas.</li>
              <li>Posting false or misleading information about services or bookings.</li>
            </ul>
            <p>
              Violations may result in account suspension, legal action, or reporting to authorities.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">8. Intellectual Property</h2>
            <p>
              All content on the Service, including text, graphics, logos, and software, is our property or licensed to us and protected by copyright and trademark laws. You may not:
            </p>
            <ul className="list-disc pl-6">
              <li>Reproduce, distribute, or modify content without permission.</li>
              <li>Use our trademarks or branding for commercial purposes.</li>
              <li>Scrap or extract data for use outside the Service.</li>
            </ul>
            <p>
              Business owners retain rights to their service descriptions and images, subject to our usage rights for platform operations.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">9. Limitation of Liability</h2>
            <p>
              We provide the Service on an "as-is" and "as-available" basis. We are not liable for:
            </p>
            <ul className="list-disc pl-6">
              <li>Errors, interruptions, or downtime of the Service.</li>
              <li>Quality, safety, or performance of services provided by business owners.</li>
              <li>Indirect damages, including lost profits or data, arising from Service use.</li>
            </ul>
            <p>
              Our total liability will not exceed the amount you paid us in the last 12 months. This limitation applies to the fullest extent permitted by law.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">10. Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms will be governed by the laws of the State of New York, USA. You agree to:
            </p>
            <ul className="list-disc pl-6">
              <li>Attempt to resolve issues informally within 30 days.</li>
              <li>Submit unresolved disputes to binding arbitration if informal resolution fails.</li>
              <li>Waive the right to a jury trial or class action lawsuit.</li>
            </ul>
            <p>
              Arbitration will be conducted by a neutral arbitrator under the rules of the American Arbitration Association.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">11. Termination</h2>
            <p>
              We may terminate or suspend your account at our discretion for breach of these Terms, including non-payment or misconduct. Upon termination:
            </p>
            <ul className="list-disc pl-6">
              <li>You will lose access to the Service and your account data.</li>
              <li>Outstanding payments remain due and payable.</li>
              <li>We are not obligated to refund unused services.</li>
            </ul>
            <p>
              You may terminate your account by contacting us, subject to any outstanding obligations.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of New York, USA, without regard to conflict of law principles. Any legal action must be brought in the courts of New York County.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">13. Contact Us</h2>
            <p>
              For questions about these Terms, contact us at:
            </p>
            <ul className="list-disc pl-6">
              <li>Email: support@yourdomain.com</li>
              <li>Phone: +1-800-555-1234</li>
              <li>Address: 123 Service Lane, Suite 100, New York, NY 10001, USA</li>
            </ul>

            <p className="mt-8 text-sm text-gray-500">
              These Terms and Conditions were last updated on April 23, 2025, and are effective as of that date.
            </p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default TermsAndConditionsPage;