import type { Metadata } from 'next'
import { LegalLayout, LegalSection, LegalP, LegalList } from '@/components/shared/legal-layout'

export const metadata: Metadata = {
  title: 'Refund Policy — MockMate',
}

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="June 30, 2026">
      <LegalSection title="Overview">
        <LegalP>
          MockMate offers a limited refund policy for subscription purchases. Please read this policy carefully before subscribing.
        </LegalP>
      </LegalSection>

      <LegalSection title="Free Tier">
        <LegalP>
          MockMate offers a free tier that does not require payment information. If you are using a free account, this refund policy does not apply.
        </LegalP>
      </LegalSection>

      <LegalSection title="Subscription Refunds">
        <LegalP>
          If you are not satisfied with your MockMate subscription, you may request a refund within <strong>7 days</strong> of your initial purchase or renewal. Refund requests submitted after 7 days of the charge date will not be approved.
        </LegalP>
        <LegalP>
          To request a refund, email us at{' '}
          <a href="mailto:ranvi.contact@gmail.com" className="text-indigo-600 hover:underline">ranvi.contact@gmail.com</a>{' '}
          with the subject line "Refund Request" and include:
        </LegalP>
        <LegalList items={[
          'Your account email address',
          'The date of the charge',
          'The reason for your refund request',
        ]} />
        <LegalP>
          We will review your request within 5 business days and notify you of our decision. Approved refunds will be credited to your original payment method within 5–10 business days depending on your bank or card issuer.
        </LegalP>
      </LegalSection>

      <LegalSection title="Non-Refundable Situations">
        <LegalP>Refunds will not be provided in the following cases:</LegalP>
        <LegalList items={[
          'Refund requests submitted more than 7 days after the charge date',
          'Accounts that have been terminated or suspended due to violation of our Terms of Service',
          'Partial subscription periods (we do not provide prorated refunds for unused time)',
          'Charges for add-on features or one-time purchases that have already been used or consumed',
          'Cases where we determine the refund request is fraudulent or abusive',
        ]} />
      </LegalSection>

      <LegalSection title="Cancellation">
        <LegalP>
          You may cancel your subscription at any time from your account settings or by contacting support. Cancellation stops future billing but does not generate a refund for the current billing period. You will retain access to paid features until the end of your current subscription period.
        </LegalP>
      </LegalSection>

      <LegalSection title="Disputes">
        <LegalP>
          If you believe you were charged incorrectly, please contact us at{' '}
          <a href="mailto:ranvi.contact@gmail.com" className="text-indigo-600 hover:underline">ranvi.contact@gmail.com</a>{' '}
          before initiating a chargeback with your payment provider. We will work with you to resolve billing issues promptly. Initiating a chargeback without first contacting us may result in account suspension.
        </LegalP>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <LegalP>
          MockMate reserves the right to modify this Refund Policy at any time. Changes will be effective upon posting to this page. Purchases made before a policy change are subject to the policy in effect at the time of purchase.
        </LegalP>
      </LegalSection>

      <LegalSection title="Contact">
        <LegalP>
          For refund requests or billing questions, contact us at{' '}
          <a href="mailto:ranvi.contact@gmail.com" className="text-indigo-600 hover:underline">
            ranvi.contact@gmail.com
          </a>.
        </LegalP>
      </LegalSection>
    </LegalLayout>
  )
}
