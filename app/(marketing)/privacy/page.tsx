import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalLayout, LegalSection, LegalP, LegalList } from '@/components/shared/legal-layout'

export const metadata: Metadata = {
  title: 'Privacy Policy — MockMate',
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 30, 2026">
      <LegalSection title="1. Information We Collect">
        <LegalP>We collect the following categories of information when you use MockMate:</LegalP>
        <LegalList items={[
          'Account information: name, email address, and password (hashed) when you register',
          'Exam data: answers you submit, scores, performance analytics, and AI feedback generated from your results',
          'User-uploaded content: notes, syllabi, or other materials you upload to create custom exams',
          'Usage data: pages visited, features used, session duration, and device/browser information',
          'Payment information: billing details processed securely by our payment provider (we do not store full card numbers)',
          'Communications: messages you send to our support team',
        ]} />
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <LegalP>We use the information we collect to:</LegalP>
        <LegalList items={[
          'Provide, maintain, and improve the MockMate service',
          'Generate AI-powered performance feedback and personalized practice recommendations',
          'Process payments and manage your subscription',
          'Send transactional emails (account confirmation, receipts) and product updates',
          'Analyze usage patterns to improve features and fix bugs',
          'Enforce our Terms of Service and protect against fraud or abuse',
          'Comply with legal obligations',
        ]} />
        <LegalP>
          We do not sell your personal information to third parties. We do not use your exam content or performance data for advertising.
        </LegalP>
      </LegalSection>

      <LegalSection title="3. AI Processing of Your Data">
        <LegalP>
          When you use AI-powered features (such as AI Performance Feedback on SAT practice results), your exam performance data is sent to an AI provider to generate a response. This data includes your answers, scores, and domain-level performance breakdown. We do not include personally identifiable information such as your name or email in AI prompts.
        </LegalP>
        <LegalP>
          See our <Link href="/ai-disclosure" className="text-indigo-600 hover:underline">AI Disclosure</Link> for full details on how AI is used and its limitations.
        </LegalP>
      </LegalSection>

      <LegalSection title="4. Data Storage and Security">
        <LegalP>
          Your data is stored using industry-standard security measures including encryption in transit (TLS) and at rest. Exam results and practice data are currently stored in your browser's local storage for performance and privacy reasons — this means your results are private to your device.
        </LegalP>
        <LegalP>
          While we implement reasonable security measures, no method of transmission or storage is 100% secure. We cannot guarantee absolute security of your data.
        </LegalP>
      </LegalSection>

      <LegalSection title="5. Cookies and Tracking">
        <LegalP>
          MockMate uses cookies and similar technologies to maintain your session, remember your preferences, and analyze Service usage. You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of the Service.
        </LegalP>
        <LegalP>
          We use analytics tools to understand how users interact with MockMate. These tools may collect anonymized usage data.
        </LegalP>
      </LegalSection>

      <LegalSection title="6. Third-Party Services">
        <LegalP>We share data with third-party service providers only as necessary to operate the Service, including:</LegalP>
        <LegalList items={[
          'Payment processors (for billing and subscription management)',
          'AI API providers (to generate practice feedback)',
          'Authentication and database infrastructure providers',
          'Analytics services (for anonymized usage statistics)',
        ]} />
        <LegalP>
          All third-party providers are contractually required to protect your data and use it only for the purposes we specify.
        </LegalP>
      </LegalSection>

      <LegalSection title="7. Data Retention">
        <LegalP>
          We retain your account information for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it for legal or compliance purposes.
        </LegalP>
        <LegalP>
          Practice exam data stored in your browser (local storage) is controlled entirely by you and can be cleared at any time through your browser settings.
        </LegalP>
      </LegalSection>

      <LegalSection title="8. Children's Privacy">
        <LegalP>
          MockMate is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us immediately at{' '}
          <a href="mailto:support@mockmate.app" className="text-indigo-600 hover:underline">support@mockmate.app</a>{' '}
          and we will delete it promptly.
        </LegalP>
        <LegalP>
          Users between 13 and 17 must have parental or guardian consent to use the Service.
        </LegalP>
      </LegalSection>

      <LegalSection title="9. Your Privacy Rights">
        <LegalP>Depending on your location, you may have the right to:</LegalP>
        <LegalList items={[
          'Access the personal data we hold about you',
          'Correct inaccurate or incomplete data',
          'Request deletion of your personal data',
          'Object to or restrict certain processing of your data',
          'Receive a portable copy of your data',
          'Withdraw consent for data processing (where processing is based on consent)',
        ]} />
        <LegalP>
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:support@mockmate.app" className="text-indigo-600 hover:underline">support@mockmate.app</a>.
        </LegalP>
      </LegalSection>

      <LegalSection title="10. Data Deletion Requests">
        <LegalP>
          You can request deletion of your MockMate account and associated personal data at any time. To request deletion:
        </LegalP>
        <LegalList items={[
          'Email support@mockmate.app with the subject line "Data Deletion Request"',
          'Include the email address associated with your account',
          'We will process your request within 30 days and confirm deletion by email',
        ]} />
        <LegalP>
          Note: Exam data stored in your browser (local storage) is not on our servers and must be cleared by you directly through your browser settings.
        </LegalP>
      </LegalSection>

      <LegalSection title="11. Changes to This Policy">
        <LegalP>
          We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page and, where appropriate, by email. Your continued use of the Service after changes are posted constitutes acceptance of the updated policy.
        </LegalP>
      </LegalSection>

      <LegalSection title="Contact Us">
        <LegalP>
          For privacy-related questions or concerns, contact us at{' '}
          <a href="mailto:support@mockmate.app" className="text-indigo-600 hover:underline">
            support@mockmate.app
          </a>.
        </LegalP>
      </LegalSection>
    </LegalLayout>
  )
}
