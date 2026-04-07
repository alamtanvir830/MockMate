import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Update this to your verified Resend sender domain before going live.
// In development you can use 'onboarding@resend.dev' to send only to
// the address that owns the Resend account.
const FROM = 'onboarding@resend.dev'

export interface ResultsEmailData {
  examTitle: string
  subject: string
  studentName: string
  score: number
  totalMarks: number
  percentage: number
  correctCount: number
  incorrectCount: number
  submittedAt: string
}

function buildHtml(data: ResultsEmailData, friendName: string): string {
  const scoreColor =
    data.percentage >= 80 ? '#10b981' : data.percentage >= 60 ? '#f59e0b' : '#ef4444'

  const formattedDate = new Date(data.submittedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exam Results — ${data.examTitle}</title>
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
                    <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Practice exam result</p>
                    <h1 style="margin:0 0 4px;font-size:22px;font-weight:700;color:#ffffff;">${data.examTitle}</h1>
                    <p style="margin:0;font-size:14px;color:#94a3b8;">${data.subject} &middot; ${formattedDate}</p>

                    <!-- Score ring placeholder — big number -->
                    <div style="margin:24px auto 0;width:96px;height:96px;border-radius:50%;border:6px solid ${scoreColor};display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);">
                      <span style="font-size:28px;font-weight:700;color:${scoreColor};">${data.percentage}%</span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Body -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:28px 32px;">

                    <p style="margin:0 0 20px;font-size:15px;color:#374151;">
                      Hi ${friendName}, <strong>${data.studentName}</strong> just completed a mock exam and you&apos;re listed as an accountability friend.
                    </p>

                    <!-- Stats row -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="width:33%;text-align:center;padding:16px 8px;background:#f8fafc;border-radius:12px;">
                          <p style="margin:0;font-size:22px;font-weight:700;color:#111827;">${data.score}/${data.totalMarks}</p>
                          <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">Marks</p>
                        </td>
                        <td style="width:4%;"></td>
                        <td style="width:33%;text-align:center;padding:16px 8px;background:#ecfdf5;border-radius:12px;">
                          <p style="margin:0;font-size:22px;font-weight:700;color:#059669;">${data.correctCount}</p>
                          <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">Correct</p>
                        </td>
                        <td style="width:4%;"></td>
                        <td style="width:33%;text-align:center;padding:16px 8px;background:#fef2f2;border-radius:12px;">
                          <p style="margin:0;font-size:22px;font-weight:700;color:#dc2626;">${data.incorrectCount}</p>
                          <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">Incorrect</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;line-height:1.6;">
                      ${
                        data.percentage >= 80
                          ? `${data.studentName} is well prepared — great result!`
                          : data.percentage >= 60
                          ? `${data.studentName} is making good progress. A bit more revision could push that score higher.`
                          : `${data.studentName} still has some ground to cover. Now is a great time to reach out and offer encouragement.`
                      }
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px 32px 24px;border-top:1px solid #f1f5f9;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;">
                      Sent by MockMate &middot; You were added as an accountability friend by ${data.studentName}
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

export async function sendResultsToFriends(
  friends: { name: string; email: string }[],
  data: ResultsEmailData,
): Promise<void> {
  const validFriends = friends.filter(
    (f) => f.name.trim() && f.email.trim() && f.email.includes('@'),
  )
  if (validFriends.length === 0) return

  await Promise.allSettled(
    validFriends.map((friend) =>
      resend.emails.send({
        from: FROM,
        to: friend.email,
        subject: `${data.studentName} scored ${data.percentage}% on ${data.examTitle}`,
        html: buildHtml(data, friend.name),
      }),
    ),
  )
  // allSettled — one failed send does not block others
}
