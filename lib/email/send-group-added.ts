import { Resend } from 'resend'

const FROM = 'MockMate <noreply@updates.mockmateapp.com>'

/** Characters before the message is truncated in the email preview */
const MESSAGE_TRUNCATE_AT = 280

function buildHtml(params: {
  recipientName: string
  examTitle: string
  addedByName: string
  dashboardUrl: string
  signupUrl: string
  groupMessage?: string | null
}): string {
  // Build the creator message block — only when a message exists
  let creatorMessageBlock = ''
  if (params.groupMessage && params.groupMessage.trim()) {
    const raw = params.groupMessage.trim()
    const isLong = raw.length > MESSAGE_TRUNCATE_AT
    // Escape HTML special chars so the message renders safely
    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

    const preview = isLong
      ? escape(raw.slice(0, MESSAGE_TRUNCATE_AT).trimEnd()) + '&hellip;'
      : escape(raw)

    const seeMoreLink = isLong
      ? `<p style="margin:10px 0 0;">
           <a href="${params.dashboardUrl}" style="font-size:13px;font-weight:600;color:#166534;text-decoration:underline;">
             Read full message &rarr;
           </a>
         </p>`
      : ''

    creatorMessageBlock = `
          <!-- Creator message -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px 20px;">
                <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#166534;">
                  Message from ${params.addedByName}
                </p>
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.65;white-space:pre-wrap;">
                  ${preview}
                </p>
                ${seeMoreLink}
              </td>
            </tr>
          </table>`
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You've been added to a MockMate group</title>
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
                  <td style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:32px 32px 28px;text-align:center;">
                    <p style="margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Group Invitation</p>
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">You&apos;ve been added to a group!</h1>
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

                    <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
                      <strong>${params.addedByName}</strong> has added you to a MockMate group for:
                    </p>

                    <!-- Exam title highlight -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:16px 20px;text-align:center;">
                          <p style="margin:0;font-size:17px;font-weight:600;color:#0369a1;">${params.examTitle}</p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.6;">
                      Take the timed exam just to see where you stand and get immediate Anki/Quizlet-generated cards based off wrong questions, plus feedback on what topics to focus on before test day. You can choose whether or not to reveal your score to your friends!
                    </p>

                    ${creatorMessageBlock}

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="text-align:center;">
                          <a href="${params.dashboardUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:13px 32px;border-radius:8px;">
                            Go to my dashboard
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- No account notice -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;">
                          <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
                            <strong>Don&apos;t have an account yet?</strong> Create a free account at
                            <a href="${params.signupUrl}" style="color:#b45309;text-decoration:underline;">${params.signupUrl}</a>
                            using <strong>this exact email address</strong> to access the shared exam.
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px 32px 24px;border-top:1px solid #f1f5f9;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;">
                      Sent by MockMate &middot; You were added to a group by ${params.addedByName}
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

export async function sendGroupAddedEmails(
  recipients: { name: string; email: string }[],
  params: {
    examTitle: string
    addedByName: string
    groupMessage?: string | null
  },
): Promise<void> {
  console.log('[email:group-added] sendGroupAddedEmails called', {
    recipientCount: recipients.length,
    examTitle: params.examTitle,
    addedBy: params.addedByName,
    hasGroupMessage: !!(params.groupMessage),
    hasApiKey: !!process.env.RESEND_API_KEY,
    from: FROM,
  })

  if (!process.env.RESEND_API_KEY) {
    console.warn('[email:group-added] skipping — RESEND_API_KEY not set')
    return
  }

  const validRecipients = recipients.filter(
    (r) => r.name.trim() && r.email.trim() && r.email.includes('@'),
  )

  console.log(
    '[email:group-added] valid recipients:',
    validRecipients.map((r) => r.email),
  )

  if (validRecipients.length === 0) {
    console.log('[email:group-added] skipping — no valid recipients after filtering')
    return
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mockmateapp.com').replace(
    /\/$/,
    '',
  )
  const resend = new Resend(process.env.RESEND_API_KEY)

  const results = await Promise.allSettled(
    validRecipients.map((r) =>
      resend.emails.send({
        from: FROM,
        to: r.email,
        subject: `You've been added to a MockMate group — ${params.examTitle}`,
        html: buildHtml({
          recipientName: r.name,
          examTitle: params.examTitle,
          addedByName: params.addedByName,
          dashboardUrl: `${siteUrl}/dashboard`,
          signupUrl: `${siteUrl}/signup`,
          groupMessage: params.groupMessage,
        }),
      }),
    ),
  )

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      console.log(`[email:group-added] sent to ${validRecipients[i].email}:`, result.value)
    } else {
      console.error(
        `[email:group-added] FAILED to send to ${validRecipients[i].email}:`,
        result.reason,
      )
    }
  })

  const failedCount = results.filter((r) => r.status === 'rejected').length
  if (failedCount > 0) {
    console.warn(
      `[email:group-added] ${failedCount} of ${validRecipients.length} sends failed`,
    )
  }
}
