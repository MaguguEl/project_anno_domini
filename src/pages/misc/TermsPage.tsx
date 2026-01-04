import React from 'react';
import { FileText, Scale, AlertTriangle, Users, Globe, Shield } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-navy-900 min-h-screen pb-6 sm:pb-8 md:pb-12">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container-max px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-2 sm:mb-3 md:mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                Terms of Service
              </h1>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-burgundy-100 leading-relaxed max-w-3xl">
              Please read these terms carefully before using Anno Domini: Church History Explorer. 
              By accessing our website, you agree to be bound by these terms.
            </p>
            <p className="text-xs text-gray-300 mt-3 sm:mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-6 sm:py-8 md:py-12 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-navy dark:prose-invert max-w-none">
            {/* Acceptance of Terms */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 mt-6 sm:mt-8">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Acceptance of Terms
              </h2>
            </div>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              By accessing and using Anno Domini: Church History Explorer ("the Service"), 
              you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              If you do not agree to abide by the above, please do not use this service. 
              We reserve the right to modify these terms at any time, and such modifications 
              will be effective immediately upon posting.
            </p>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-8 sm:mb-12">
              Your continued use of the Service following the posting of changes to these 
              terms will constitute your acceptance of those changes.
            </p>

            {/* Use of Service */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 mt-8 sm:mt-12">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Use of Service
              </h2>
            </div>
            
            <h3 className="text-lg sm:text-xl font-serif text-navy-800 dark:text-navy-100 mb-3 sm:mb-4">
              Permitted Uses
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              You may use our Service for educational and research purposes, personal study and enrichment, academic citation and reference with proper attribution, and non-commercial sharing of content with appropriate credit.
            </p>

            <h3 className="text-lg sm:text-xl font-serif text-navy-800 dark:text-navy-100 mb-3 sm:mb-4">
              Prohibited Uses
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-8 sm:mb-12">
              You may not use our Service to violate any applicable laws or regulations, infringe upon intellectual property rights, distribute malicious software or engage in harmful activities, attempt to gain unauthorized access to our systems, use automated tools to scrape or download content in bulk, or misrepresent the source or authorship of our content.
            </p>

            {/* Intellectual Property */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 mt-8 sm:mt-12">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Intellectual Property Rights
              </h2>
            </div>
            
            <h3 className="text-lg sm:text-xl font-serif text-navy-800 dark:text-navy-100 mb-3 sm:mb-4">
              Our Content
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              The Service and its original content, features, and functionality are and 
              will remain the exclusive property of Anno Domini and its licensors. 
              The Service is protected by copyright, trademark, and other laws.
            </p>

            <h3 className="text-lg sm:text-xl font-serif text-navy-800 dark:text-navy-100 mb-3 sm:mb-4">
              Primary Sources
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              Many historical documents and texts featured on our platform are in the 
              public domain. However, our compilation, organization, and presentation 
              of these materials is protected by copyright.
            </p>

            <h3 className="text-lg sm:text-xl font-serif text-navy-800 dark:text-navy-100 mb-3 sm:mb-4">
              External Sources
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-8 sm:mb-12">
              We provide links to external sources and repositories. These materials 
              are subject to the copyright and usage terms of their respective owners. 
              Please respect the intellectual property rights of all content creators.
            </p>

            {/* User Accounts */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 mt-8 sm:mt-12">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                User Accounts and Responsibilities
              </h2>
            </div>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              When you create an account with us, you must provide information that is 
              accurate, complete, and current at all times. You are responsible for safeguarding your account password and login credentials, all activities that occur under your account, notifying us immediately of any unauthorized use of your account, and ensuring your contact information remains current.
            </p>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-8 sm:mb-12">
              We reserve the right to refuse service, terminate accounts, or cancel 
              subscriptions at our sole discretion, particularly for violations of these terms.
            </p>

            {/* Disclaimers */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 mt-8 sm:mt-12">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Disclaimers and Limitations
              </h2>
            </div>
            
            <h3 className="text-lg sm:text-xl font-serif text-navy-800 dark:text-navy-100 mb-3 sm:mb-4">
              Educational Purpose
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              The information on this Service is provided for educational and informational 
              purposes only. While we strive for accuracy, we make no warranties about the 
              completeness, reliability, or accuracy of this information.
            </p>

            <h3 className="text-lg sm:text-xl font-serif text-navy-800 dark:text-navy-100 mb-3 sm:mb-4">
              Historical Interpretation
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              Historical events and figures are presented based on available scholarly 
              sources. Different historians may interpret events differently, and we 
              encourage users to consult multiple sources for comprehensive understanding.
            </p>

            <h3 className="text-lg sm:text-xl font-serif text-navy-800 dark:text-navy-100 mb-3 sm:mb-4">
              External Links
            </h3>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-8 sm:mb-12">
              Our Service may contain links to external websites. We are not responsible 
              for the content, privacy policies, or practices of these external sites.
            </p>

            {/* Limitation of Liability */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 mt-8 sm:mt-12">
              <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Limitation of Liability
              </h2>
            </div>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              In no event shall Anno Domini, its directors, employees, partners, agents, 
              suppliers, or affiliates be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including without limitation, loss of 
              profits, data, use, goodwill, or other intangible losses, resulting from 
              your use of the Service.
            </p>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-8 sm:mb-12">
              Some jurisdictions do not allow the exclusion of certain warranties or 
              the exclusion or limitation of liability for consequential or incidental 
              damages. Accordingly, some of the above limitations may not apply to you.
            </p>

            {/* Governing Law */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 mt-8 sm:mt-12">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 m-0">
                Governing Law and Jurisdiction
              </h2>
            </div>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              These Terms shall be interpreted and governed by the laws of the jurisdiction 
              in which Anno Domini operates, without regard to its conflict of law provisions.
            </p>
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-8 sm:mb-12">
              Any disputes arising from these terms or your use of the Service will be 
              resolved through binding arbitration or in the courts of competent jurisdiction.
            </p>

            {/* Contact Information */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4 sm:mb-6 mt-8 sm:mt-12">
              Questions About These Terms
            </h2>
            
            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-3 sm:mb-4">
              If you have any questions about these Terms of Service, please contact us at <strong>legal@annodomini.org</strong> with the subject line "Terms of Service Inquiry".
            </p>
            
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
              We will respond to your inquiry within 5 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;