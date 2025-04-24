import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicyPage = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 font-sans">
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-6 text-center">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Last Updated: April 23, 2025
          </p>

          <div className="prose prose-lg max-w-4xl mx-auto text-gray-700">
            <p>
              Welcome to our Service Booking Platform ("we," "us," or "our"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, mobile applications, and related services (collectively, the "Service"). By accessing or using the Service, you agree to the terms of this Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">1. Information We Collect</h2>
            <p>
              We collect various types of information to provide and improve our Service. This includes:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Personal Information:</strong> When you register an account, book a service, or contact us, we may collect your name, email address, phone number, address, and payment information.</li>
              <li><strong>Service-Related Data:</strong> Information about the services you book, including service type, date, time, location, and business owner details.</li>
              <li><strong>Usage Data:</strong> Details about how you interact with the Service, such as IP address, browser type, pages visited, and time spent on the site.</li>
              <li><strong>Device Information:</strong> Data from your device, including operating system, unique device identifiers, and mobile network information.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your experience and analyze usage patterns.</li>
            </ul>
            <p>
              We may also collect information you provide voluntarily, such as feedback, reviews, or inquiries submitted through the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">2. How We Use Your Information</h2>
            <p>
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6">
              <li>To provide, operate, and maintain the Service, including processing your bookings and coordinating with business owners.</li>
              <li>To improve and personalize your experience, such as recommending services based on your preferences.</li>
              <li>To communicate with you about your account, bookings, or updates to the Service.</li>
              <li>To send promotional offers, newsletters, or marketing materials (with your consent, where required).</li>
              <li>To ensure the security of the Service and prevent fraud or unauthorized access.</li>
              <li>To comply with legal obligations and enforce our Terms of Service.</li>
            </ul>
            <p>
              We may aggregate or anonymize your data for analytical purposes, such as understanding usage trends or improving platform features, without identifying you personally.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">3. How We Share Your Information</h2>
            <p>
              We do not sell your personal information to third parties. However, we may share it in the following circumstances:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>With Business Owners:</strong> To facilitate service bookings, we share relevant details (e.g., name, contact info, booking details) with the business owner providing the service.</li>
              <li><strong>With Service Providers:</strong> We may engage third-party vendors (e.g., payment processors, analytics providers) to assist with operating the Service, subject to confidentiality agreements.</li>
              <li><strong>For Legal Reasons:</strong> We may disclose information if required by law, to protect our rights, or to investigate potential violations of our policies.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the successor entity.</li>
            </ul>
            <p>
              We implement strict measures to ensure that any shared data is used only for the intended purpose and is protected accordingly.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">4. Data Security</h2>
            <p>
              We prioritize the security of your information and employ industry-standard measures to protect it, including:
            </p>
            <ul className="list-disc pl-6">
              <li>Encryption of sensitive data, such as payment information, during transmission and storage.</li>
              <li>Regular security assessments and updates to our systems and software.</li>
              <li>Access controls to limit who can view or process your data within our organization.</li>
              <li>Monitoring for suspicious activities to detect and prevent unauthorized access.</li>
            </ul>
            <p>
              While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but will notify you of any breaches affecting your data as required by law.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">5. Your Rights and Choices</h2>
            <p>
              You have certain rights regarding your personal information, depending on your location and applicable laws:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Access:</strong> You can request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> You can ask us to correct inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> You may request the deletion of your data, subject to legal retention requirements.</li>
              <li><strong>Restriction:</strong> You can request that we limit the processing of your data under certain conditions.</li>
              <li><strong>Objection:</strong> You can object to the processing of your data for marketing purposes.</li>
              <li><strong>Data Portability:</strong> You may request your data in a structured, machine-readable format.</li>
            </ul>
            <p>
              To exercise these rights, contact us at privacy@yourdomain.com. We may require verification of your identity before processing your request. You can also opt out of marketing emails by clicking the unsubscribe link in those messages.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">6. Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, including providing the Service, complying with legal obligations, and resolving disputes. Specific retention periods include:
            </p>
            <ul className="list-disc pl-6">
              <li>Account information: Retained for the duration of your account plus 7 years for tax purposes.</li>
              <li>Booking data: Kept for 5 years after the booking date to handle disputes or refunds.</li>
              <li>Marketing data: Retained until you unsubscribe or for 2 years of inactivity.</li>
            </ul>
            <p>
              After these periods, we will securely delete or anonymize your data to prevent further use.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">7. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries outside your region, including those with different data protection laws. We ensure that such transfers comply with applicable regulations, such as using Standard Contractual Clauses approved by the European Commission.
            </p>
            <p>
              If you are located in the European Economic Area (EEA), we rely on legal mechanisms to protect your data during international transfers. You can contact us for more details on these safeguards.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">8. Children’s Privacy</h2>
            <p>
              Our Service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If we learn that we have collected such data, we will delete it promptly and notify the appropriate authorities if required.
            </p>
            <p>
              Parents or guardians who believe their child has provided information should contact us at privacy@yourdomain.com to request deletion.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on this page with a revised "Last Updated" date.
            </p>
            <p>
              We encourage you to review this policy periodically. Your continued use of the Service after changes indicates your acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-500">10. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
            </p>
            <ul className="list-disc pl-6">
              <li>Email: privacy@yourdomain.com</li>
              <li>Phone: +1-800-555-1234</li>
              <li>Address: 123 Service Lane, Suite 100, New York, NY 10001, USA</li>
            </ul>
            <p>
              You may also file a complaint with a data protection authority in your jurisdiction if you believe your rights have been violated.
            </p>

            <p className="mt-8 text-sm text-gray-500">
              This Privacy Policy was last updated on April 23, 2025, and is effective as of that date.
            </p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default PrivacyPolicyPage;