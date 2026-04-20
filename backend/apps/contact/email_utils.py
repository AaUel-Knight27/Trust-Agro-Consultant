from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.conf import settings
from decouple import config

def send_contact_notification(submission):
    """Send email notification when a contact form is submitted."""
    if not config('SEND_EMAIL_NOTIFICATIONS', default=False, cast=bool):
        return

    api_key = config('SENDGRID_API_KEY', default='')
    if not api_key:
        return

    subject = f"New Contact Form Submission: {submission.subject}"

    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #15803d; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0;">New Contact Submission</h2>
        <p style="color: #dcfce7; margin: 5px 0 0;">Trust Agro Consult Website</p>
      </div>
      <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 140px;">Full Name:</td>
            <td style="padding: 8px 0; color: #111827;">{submission.full_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
            <td style="padding: 8px 0; color: #111827;">
              <a href="mailto:{submission.email}" style="color: #15803d;">{submission.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
            <td style="padding: 8px 0; color: #111827;">{submission.phone or 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
            <td style="padding: 8px 0; color: #111827;">{submission.subject}</td>
          </tr>
        </table>
        <div style="margin-top: 16px;">
          <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Message:</p>
          <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb; color: #374151; line-height: 1.6;">
            {submission.message}
          </div>
        </div>
      </div>
      <div style="background: #f3f4f6; padding: 16px; border-radius: 0 0 8px 8px; text-align: center;">
        <a href="https://your-backend.onrender.com/admin/contact/contactsubmission/"
           style="background: #15803d; color: white; padding: 10px 20px; border-radius: 6px;
                  text-decoration: none; font-size: 14px;">
          View in Admin Panel
        </a>
      </div>
    </div>
    """

    message = Mail(
        from_email=config('CONTACT_EMAIL_FROM'),
        to_emails=config('CONTACT_EMAIL_TO'),
        subject=subject,
        html_content=html_content,
    )

    try:
        sg = SendGridAPIClient(api_key)
        sg.send(message)
    except Exception as e:
        print(f"Email notification failed: {e}")
        # Never raise — a failed email should not break the API response
