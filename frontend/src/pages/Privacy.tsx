
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Database, Lock } from "lucide-react";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-semibold text-wood-800 mb-4">Privacy Policy</h1>
          <Separator className="mx-auto w-24 mb-6 bg-wood-400" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Royal Traders is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>
        </div>

        {/* Privacy highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Shield className="h-12 w-12 text-wood-700 mb-4" />
            <h3 className="font-medium text-lg mb-2">Data Security</h3>
            <p className="text-gray-600">
              We implement a variety of security measures to maintain the safety of your personal information.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Eye className="h-12 w-12 text-wood-700 mb-4" />
            <h3 className="font-medium text-lg mb-2">Transparency</h3>
            <p className="text-gray-600">
              We are clear about what data we collect and how we use it to provide you with better service.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Database className="h-12 w-12 text-wood-700 mb-4" />
            <h3 className="font-medium text-lg mb-2">Data Minimization</h3>
            <p className="text-gray-600">
              We only collect the information that's necessary to provide our services to you.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Lock className="h-12 w-12 text-wood-700 mb-4" />
            <h3 className="font-medium text-lg mb-2">Your Control</h3>
            <p className="text-gray-600">
              You have the right to access, correct, or delete your personal information at any time.
            </p>
          </div>
        </div>

        {/* Policy details */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="prose max-w-none text-gray-600">
            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">Information We Collect</h2>
              <p className="mb-3">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Create an account</li>
                <li>Place an order</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact customer service</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              
              <p className="mt-4 mb-3">
                This information may include:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Name, email address, postal address, and phone number</li>
                <li>Payment information (credit card details are processed by our secure payment processors)</li>
                <li>Order history and preferences</li>
                <li>Communication preferences</li>
              </ul>
              
              <p className="mt-4">
                We also automatically collect certain information when you visit our website, including:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-3">
                <li>IP address and device information</li>
                <li>Browsing behavior and interactions with our website</li>
                <li>Referring websites or sources</li>
                <li>Location information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">How We Use Your Information</h2>
              <p className="mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about orders, products, services, and promotional offers</li>
                <li>Update our records and maintain your account</li>
                <li>Improve our website, products, and services</li>
                <li>Personalize your experience and deliver content relevant to your interests</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Comply with our legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">Cookies and Tracking Technologies</h2>
              <p>
                We use cookies, web beacons, and similar technologies to track activity on our website and to understand how you interact with our services. You can control cookies through your browser settings and other tools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">Sharing Your Information</h2>
              <p className="mb-3">
                We may share your information with:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Service providers who perform services on our behalf (payment processing, shipping, etc.)</li>
                <li>Professional advisors (lawyers, auditors, accountants)</li>
                <li>Government entities when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">Your Rights and Choices</h2>
              <p className="mb-3">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your information</li>
                <li>Restriction or objection to certain processing activities</li>
                <li>Portability of your information</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">Data Retention</h2>
              <p>
                We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying legal, accounting, or reporting requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-wood-800 mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </section>
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p>Last updated: April 15, 2023</p>
          <p className="mt-4">
            If you have any questions about this Privacy Policy, please contact us at privacy@royaltraders.com or at the address below:
          </p>
          <p className="mt-2">
            Royal Traders<br />
            123 Woodland Drive<br />
            Timber City, TC 12345
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
