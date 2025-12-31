import React from 'react';
import { Shield, Eye, Cookie, Database, Mail, Lock } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-burgundy-900 text-white py-16">
        <div className="container-max">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-serif">Privacy Policy</h1>
            </div>
            <p className="text-lg text-gray-200 max-w-3xl">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-300 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-navy dark:prose-invert max-w-none">
            {/* Information We Collect */}
            <div className="flex items-center gap-3 mb-6 mt-8">
              <Database className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Information We Collect
              </h2>
            </div>
            
            <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
              Information You Provide
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-3">
              We collect information that you voluntarily provide to us, including email address when subscribing to our newsletter, search queries and browsing preferences, bookmarks and saved content if you create an account, and feedback and correspondence you send to us.
            </p>

            <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4 mt-8">
              Information Automatically Collected
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-12">
              When you use our service, we automatically collect certain information including browser type and version, operating system and device information, IP address and general location, pages visited and time spent on our site, and referral sources and exit pages.
            </p>

            {/* How We Use Information */}
            <div className="flex items-center gap-3 mb-6 mt-12">
              <Eye className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                How We Use Your Information
              </h2>
            </div>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
              We use the information we collect to provide, maintain, and improve our services. Specifically, we use your information to deliver our newsletter and educational content, personalize your experience and improve our website, respond to your inquiries and provide customer support, analyze usage patterns and optimize our content, ensure the security and integrity of our platform, and comply with legal obligations and protect our rights.
            </p>

            {/* Cookies and Tracking */}
            <div className="flex items-center gap-3 mb-6 mt-12">
              <Cookie className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Cookies and Tracking Technologies
              </h2>
            </div>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
              We use cookies and similar technologies to enhance your browsing experience.
            </p>
            
            <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
              Essential Cookies
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
              These cookies are necessary for the website to function properly, including 
              remembering your theme preferences and maintaining your session.
            </p>

            <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
              Analytics Cookies
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
              We use analytics cookies to understand how visitors interact with our website, 
              helping us improve our content and user experience.
            </p>

            <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
              Managing Cookies
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-12">
              You can control cookies through your browser settings. However, disabling 
              certain cookies may affect the functionality of our website.
            </p>

            {/* Data Sharing */}
            <div className="flex items-center gap-3 mb-6 mt-12">
              <Lock className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Information Sharing and Disclosure
              </h2>
            </div>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances: with your explicit consent, to comply with legal obligations or court orders, to protect our rights, property, or safety, or that of our users, with service providers who assist in operating our website under strict confidentiality agreements, or in connection with a business transfer or merger.
            </p>

            {/* Data Security */}
            <div className="flex items-center gap-3 mb-6 mt-12">
              <Shield className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Data Security
              </h2>
            </div>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
              We implement appropriate technical and organizational measures to protect 
              your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, regular security assessments and updates, access controls and authentication measures, secure hosting and backup procedures, and staff training on data protection practices.
            </p>

            {/* Your Rights */}
            <div className="flex items-center gap-3 mb-6 mt-12">
              <Mail className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Your Rights and Choices
              </h2>
            </div>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6">
              You have the following rights regarding your personal information: the right to access and request a copy of the personal information we hold about you, the right to correction of inaccurate or incomplete information, the right to deletion of your personal information, the right to portability and transfer of your data to another service, the right to object to certain processing of your information, and the right to withdraw consent for newsletter subscriptions at any time.
            </p>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-12">
              To exercise these rights, please contact us at privacy@annodomini.org. 
              We will respond to your request within 30 days.
            </p>

            {/* Contact Information */}
            <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-6 mt-12">
              Contact Us About Privacy
            </h2>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us at <strong>privacy@annodomini.org</strong> with the subject line "Privacy Policy Inquiry".
            </p>
            
            <p className="text-sm text-navy-600 dark:text-navy-400">
              We are committed to resolving any privacy concerns promptly and transparently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;