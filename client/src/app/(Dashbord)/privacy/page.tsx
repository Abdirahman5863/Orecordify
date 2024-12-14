export default function PrivacyPolicy() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Privacy Policy for Orecordify</h1>
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <section className=" p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <h3 className="font-semibold">1.1 Personal Information</h3>
          <ul className="list-disc list-inside">
            <li>Create an account: name, email address, phone number, business name.</li>
            <li>Interact with customer support.</li>
          </ul>
          <h3 className="font-semibold">1.2 Business and App Usage Data</h3>
          <ul className="list-disc list-inside">
            <li>Inventory details: item names, SKU, quantity, and pricing.</li>
            <li>Customer information: names, contact details, and transaction history.</li>
            <li>Order details: order ID, product names, quantities, and status.</li>
            <li>Analytics data: revenue, order volume, and customer trends.</li>
          </ul>
          <h3 className="font-semibold">1.3 Automatically Collected Data</h3>
          <ul className="list-disc list-inside">
            <li>Device information: IP address, browser type, operating system.</li>
            <li>App usage metrics: feature usage, session duration.</li>
          </ul>
        </section>
        <section className=" p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <h3 className="font-semibold">2.1 To Provide and Improve Services</h3>
          <ul className="list-disc list-inside">
            <li>Facilitate app functionality like inventory and order management.</li>
            <li>Enhance app performance based on user behavior and feedback.</li>
          </ul>
          <h3 className="font-semibold">2.2 Communication</h3>
          <ul className="list-disc list-inside">
            <li>Send notifications for order updates and low stock alerts.</li>
            <li>Respond to support requests and provide assistance.</li>
          </ul>
          <h3 className="font-semibold">2.3 Security and Compliance</h3>
          <ul className="list-disc list-inside">
            <li>Protect data through encryption and secure hosting.</li>
            <li>Comply with legal and regulatory requirements.</li>
          </ul>
        </section>
        <section className=" p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">3. Data Sharing and Disclosure</h2>
          <h3 className="font-semibold">3.1 Third-Party Services</h3>
          <p>
            Trusted third-party services may assist with hosting, analytics, and communication.
          </p>
          <h3 className="font-semibold">3.2 Legal Obligations</h3>
          <p>
            We may disclose information to comply with laws, prevent fraud, or ensure user safety.
          </p>
        </section>
        <section className=" p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>
            Security measures include encryption, system updates, and access restrictions.
            However, no system is completely secure. Please secure your account credentials.
          </p>
        </section>
        <section className=" p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
          <ul className="list-disc list-inside">
            <li>Access and correct your data.</li>
            <li>Export data like inventory, orders, and customers.</li>
            <li>Request account and data deletion.</li>
          </ul>
        </section>
        <section className=" p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies for session management and analytics. Adjust your preferences via browser settings.
          </p>
        </section>
        <section className=" p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">7. Changes to This Privacy Policy</h2>
          <p>
            Updates will be posted here with a revised effective date. Continued use of the app constitutes acceptance.
          </p>
        </section>
        <section className=" p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            If you have questions or concerns, contact us at:
            <strong> support@orecordify.com</strong>
          </p>
        </section>
      </div>
    </div>
  );
}
