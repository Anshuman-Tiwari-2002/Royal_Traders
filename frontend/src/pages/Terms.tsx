
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-semibold text-wood-800 mb-4">Terms & Conditions</h1>
          <Separator className="mx-auto w-24 mb-6 bg-wood-400" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our website or purchasing our products.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="prose max-w-none text-gray-600">
            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Royal Traders' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-5 my-4 space-y-1">
                <li>Modify or copy the materials;</li>
                <li>Use the materials for any commercial purpose;</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server;</li>
                <li>Remove any copyright or proprietary notations from the materials.</li>
              </ul>
              <p>
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by Royal Traders at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">3. Disclaimer</h2>
              <p>
                The materials on Royal Traders' website are provided on an 'as is' basis. Royal Traders makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="mt-3">
                Further, Royal Traders does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">4. Limitations</h2>
              <p>
                In no event shall Royal Traders or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Royal Traders' website, even if Royal Traders or a Royal Traders authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on Royal Traders' website could include technical, typographical, or photographic errors. Royal Traders does not warrant that any of the materials on its website are accurate, complete, or current. Royal Traders may make changes to the materials contained on its website at any time without notice. However, Royal Traders does not make any commitment to update the materials.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">6. Links</h2>
              <p>
                Royal Traders has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Royal Traders of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium text-wood-800 mb-4">7. Modifications</h2>
              <p>
                Royal Traders may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-wood-800 mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </section>
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p>Last updated: April 15, 2023</p>
          <p className="mt-2">
            If you have any questions about these Terms & Conditions, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
