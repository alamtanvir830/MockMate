import { Resend } from 'resend'

const FROM = 'MockMate <noreply@updates.mockmateapp.com>'

function buildHtml(params: {
  recipientName: string
  examTitle: string
  isGroupExam: boolean
  examUrl: string
}): string {
  const contextLine = params.isGroupExam
    ? 'The shared group exam is now open — it&apos;s time to take your attempt.'
    : 'Your mock exam is now open and ready to take.'

  const ctaLabel = params.isGroupExam ? 'Take the group exam' : 'Take the exam now'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your exam is now open — ${params.examTitle}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:24px;text-align:center;">
              <span style="font-size:20px;font-weight:700;color:#111827;">Mock<span style="color:#10b981;">Mate</span></span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.06);overflow:hidden;">

              <!-- Header band -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#064e3b,#065f46);padding:32px 32px 28px;text-align:center;">
                    <p style="margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6ee7b7;">
                      ${params.isGroupExam ? 'Group Exam' : 'Mock Exam'}
                    </p>
                    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#ffffff;">Your exam is now open</h1>
                    <p style="margin:0;font-size:15px;color:#a7f3d0;">${params.examTitle}</p>
                  </td>
                </tr>
              </table>

              <!-- Body -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:28px 32px;">

                    <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
                      Hi ${params.recipientName},
                    </p>

                    <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
                      ${contextLine}
                    </p>

                    <!-- Exam unlock indicator -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="background:#ecfdf5;border:1px solid #6ee7b7;border-radius:10px;padding:14px 18px;">
                          <p style="margin:0;font-size:13px;color:#065f46;line-height:1.5;">
                            &#10003;&nbsp; <strong>${params.examTitle}</strong> is now unlocked and available on your dashboard.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                      <tr>
                        <td style="text-align:center;">
                          <a href="${params.examUrl}" style="display:inline-block;background:#059669;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:13px 32px;border-radius:8px;">
                            ${ctaLabel}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0;font-size:13px;color:#9ca3af;text-align:center;line-height:1.5;">
                      Good luck! Log in to MockMate to begin your attempt.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px 32px 24px;border-top:1px solid #f1f5f9;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;">
                      Sent by MockMate &middot; Exam unlock notification
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function sendExamOpenEmails(
  recipients: { name: string; email: string }[],
  params: {
    examTitle: string
    examId: string
    isGroupExam: boolean
    isCreator: boolean
  },
): Promise<void> {
  console.log('[email:exam-open] sendExamOpenEmails called', {
    recipientCount: recipients.length,
    examTitle: params.examTitle,
    examId: params.examId,
    isGroupExam: params.isGroupExam,
    isCreator: params.isCreator,
    hasApiKey: !!process.env.RESEND_API_KEY,
    from: FROM,
  })

  if (!process.env.RESEND_API_KEY) {
    console.warn('[email:exam-open] skipping — RESEND_API_KEY not set')
    return
  }

  const validRecipients = recipients.filter(
    (r) => r.name.trim() && r.email.trim() && r.email.includes('@'),
  )

  console.log(
    '[email:exam-open] valid recipients:',
    validRecipients.map((r) => r.email),
  )

  if (validRecipients.length === 0) {
    console.log('[email:exam-open] skipping — no valid recipients after filtering')
    return
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mockmateapp.com').replace(
    /\/$/,
    '',
  )

  // Creator goes to their exam detail; recipients go to the shared exam page
  const examUrl = params.isCreator
    ? `${siteUrl}/exams/${params.examId}`
    : `${siteUrl}/exams/${params.examId}/shared`

  const resend = new Resend(process.env.RESEND_API_KEY)

  const results = await Promise.allSettled(
    validRecipients.map((r) =>
      resend.emails.send({
        from: FROM,
        to: r.email,
        subject: `Your exam is now open — ${params.examTitle}`,
        html: buildHtml({
          recipientName: r.name,
          examTitle: params.examTitle,
          isGroupExam: params.isGroupExam,
          examUrl,
        }),
      }),
    ),
  )

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      console.log(`[email:exam-open] sent to ${validRecipients[i].email}:`, result.value)
    } else {
      console.error(
        `[email:exam-open] FAILED to send to ${validRecipients[i].email}:`,
        result.reason,
      )
    }
  })

  const failedCount = results.filter((r) => r.status === 'rejected').length
  if (failedCount > 0) {
    console.warn(`[email:exam-open] ${failedCount} of ${validRecipients.length} sends failed`)
  }
}
