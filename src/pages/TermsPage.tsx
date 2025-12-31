import React from 'react';
import { FileText, Scale, AlertTriangle, Users, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-burgundy-900 text-white py-16">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-8 h-8" />
              <h1 className="text-4xl font-serif">Terms of Service</h1>
            </div>
            <p className="text-lg text-gray-200 max-w-3xl">
              Please read these terms carefully before using Anno Domini: Church History Explorer. 
              By accessing our website, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-gray-300 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Acceptance of Terms */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Acceptance of Terms
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                By accessing and using Anno Domini: Church History Explorer ("the Service"), 
                you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                If you do not agree to abide by the above, please do not use this service. 
                We reserve the right to modify these terms at any time, and such modifications 
                will be effective immediately upon posting.
              </p>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                Your continued use of the Service following the posting of changes to these 
                terms will constitute your acceptance of those changes.
              </p>
            </div>
          </motion.section>

          {/* Use of Service */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Use of Service
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Permitted Uses
              </h3>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4">
                You may use our Service for:
              </p>
              <ul className="list-disc pl-6 text-navy-700 dark:text-navy-300 space-y-2 mb-6">
                <li>Educational and research purposes</li>
                <li>Personal study and enrichment</li>
                <li>Academic citation and reference (with proper attribution)</li>
                <li>Non-commercial sharing of content with appropriate credit</li>
              </ul>

              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Prohibited Uses
              </h3>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4">
                You may not use our Service to:
              </p>
              <ul className="list-disc pl-6 text-navy-700 dark:text-navy-300 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Distribute malicious software or engage in harmful activities</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to scrape or download content in bulk</li>
                <li>Misrepresent the source or authorship of our content</li>
              </ul>
            </div>
          </motion.section>

          {/* Intellectual Property */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Intellectual Property Rights
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Our Content
              </h3>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                The Service and its original content, features, and functionality are and 
                will remain the exclusive property of Anno Domini and its licensors. 
                The Service is protected by copyright, trademark, and other laws.
              </p>

              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Primary Sources
              </h3>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                Many historical documents and texts featured on our platform are in the 
                public domain. However, our compilation, organization, and presentation 
                of these materials is protected by copyright.
              </p>

              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                External Sources
              </h3>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                We provide links to external sources and repositories. These materials 
                are subject to the copyright and usage terms of their respective owners. 
                Please respect the intellectual property rights of all content creators.
              </p>
            </div>
          </motion.section>

          {/* User Accounts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                User Accounts and Responsibilities
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                When you create an account with us, you must provide information that is 
                accurate, complete, and current at all times. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-navy-700 dark:text-navy-300 space-y-2 mb-6">
                <li>Safeguarding your account password and login credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
                <li>Ensuring your contact information remains current</li>
              </ul>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                We reserve the right to refuse service, terminate accounts, or cancel 
                subscriptions at our sole discretion, particularly for violations of these terms.
              </p>
            </div>
          </motion.section>

          {/* Disclaimers */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Disclaimers and Limitations
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Educational Purpose
              </h3>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                The information on this Service is provided for educational and informational 
                purposes only. While we strive for accuracy, we make no warranties about the 
                completeness, reliability, or accuracy of this information.
              </p>

              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Historical Interpretation
              </h3>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                Historical events and figures are presented based on available scholarly 
                sources. Different historians may interpret events differently, and we 
                encourage users to consult multiple sources for comprehensive understanding.
              </p>

              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                External Links
              </h3>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                Our Service may contain links to external websites. We are not responsible 
                for the content, privacy policies, or practices of these external sites.
              </p>
            </div>
          </motion.section>

          {/* Limitation of Liability */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Limitation of Liability
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                In no event shall Anno Domini, its directors, employees, partners, agents, 
                suppliers, or affiliates be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of 
                profits, data, use, goodwill, or other intangible losses, resulting from 
                your use of the Service.
              </p>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                Some jurisdictions do not allow the exclusion of certain warranties or 
                the exclusion or limitation of liability for consequential or incidental 
                damages. Accordingly, some of the above limitations may not apply to you.
              </p>
            </div>
          </motion.section>

          {/* Governing Law */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Governing Law and Jurisdiction
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                These Terms shall be interpreted and governed by the laws of the jurisdiction 
                in which Anno Domini operates, without regard to its conflict of law provisions.
              </p>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                Any disputes arising from these terms or your use of the Service will be 
                resolved through binding arbitration or in the courts of competent jurisdiction.
              </p>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-burgundy-50 dark:bg-navy-700 rounded-lg p-8"
          >
            <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
              Questions About These Terms
            </h2>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-navy-700 dark:text-navy-300">
              <p><strong>Email:</strong> legal@annodomini.org</p>
              <p><strong>Subject Line:</strong> Terms of Service Inquiry</p>
            </div>
            <p className="text-sm text-navy-600 dark:text-navy-400 mt-4">
              We will respond to your inquiry within 5 business days.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;