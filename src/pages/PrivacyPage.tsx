import React from 'react';
import { Shield, Eye, Cookie, Database, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPage: React.FC = () => {
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
              <Shield className="w-8 h-8" />
              <h1 className="text-4xl font-serif">Privacy Policy</h1>
            </div>
            <p className="text-lg text-gray-200 max-w-3xl">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
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
          {/* Information We Collect */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Information We Collect
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Information You Provide
              </h3>
              <ul className="list-disc pl-6 text-navy-700 dark:text-navy-300 space-y-2 mb-6">
                <li>Email address when subscribing to our newsletter</li>
                <li>Search queries and browsing preferences</li>
                <li>Bookmarks and saved content (if you create an account)</li>
                <li>Feedback and correspondence you send to us</li>
              </ul>

              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Information Automatically Collected
              </h3>
              <ul className="list-disc pl-6 text-navy-700 dark:text-navy-300 space-y-2">
                <li>Browser type and version</li>
                <li>Operating system and device information</li>
                <li>IP address and general location</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referral sources and exit pages</li>
              </ul>
            </div>
          </motion.section>

          {/* How We Use Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                How We Use Your Information
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                We use the information we collect to provide, maintain, and improve our services:
              </p>
              <ul className="list-disc pl-6 text-navy-700 dark:text-navy-300 space-y-2">
                <li>To deliver our newsletter and educational content</li>
                <li>To personalize your experience and improve our website</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To analyze usage patterns and optimize our content</li>
                <li>To ensure the security and integrity of our platform</li>
                <li>To comply with legal obligations and protect our rights</li>
              </ul>
            </div>
          </motion.section>

          {/* Cookies and Tracking */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Cookies and Tracking Technologies
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                We use cookies and similar technologies to enhance your browsing experience:
              </p>
              
              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Essential Cookies
              </h3>
              <p className="text-navy-700 dark:text-navy-300 mb-4">
                These cookies are necessary for the website to function properly, including 
                remembering your theme preferences and maintaining your session.
              </p>

              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Analytics Cookies
              </h3>
              <p className="text-navy-700 dark:text-navy-300 mb-4">
                We use analytics cookies to understand how visitors interact with our website, 
                helping us improve our content and user experience.
              </p>

              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Managing Cookies
              </h3>
              <p className="text-navy-700 dark:text-navy-300">
                You can control cookies through your browser settings. However, disabling 
                certain cookies may affect the functionality of our website.
              </p>
            </div>
          </motion.section>

          {/* Data Sharing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Information Sharing and Disclosure
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-navy-700 dark:text-navy-300 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>To protect our rights, property, or safety, or that of our users</li>
                <li>With service providers who assist in operating our website (under strict confidentiality agreements)</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </div>
          </motion.section>

          {/* Data Security */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Data Security
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                We implement appropriate technical and organizational measures to protect 
                your personal information against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc pl-6 text-navy-700 dark:text-navy-300 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure hosting and backup procedures</li>
                <li>Staff training on data protection practices</li>
              </ul>
            </div>
          </motion.section>

          {/* Your Rights */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300">
                Your Rights and Choices
              </h2>
            </div>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-navy-700 dark:text-navy-300 space-y-2 mb-6">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to certain processing of your information</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for newsletter subscriptions at any time</li>
              </ul>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                To exercise these rights, please contact us at privacy@annodomini.org. 
                We will respond to your request within 30 days.
              </p>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-burgundy-50 dark:bg-navy-700 rounded-lg p-8"
          >
            <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
              Contact Us About Privacy
            </h2>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="space-y-2 text-navy-700 dark:text-navy-300">
              <p><strong>Email:</strong> privacy@annodomini.org</p>
              <p><strong>Subject Line:</strong> Privacy Policy Inquiry</p>
            </div>
            <p className="text-sm text-navy-600 dark:text-navy-400 mt-4">
              We are committed to resolving any privacy concerns promptly and transparently.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;