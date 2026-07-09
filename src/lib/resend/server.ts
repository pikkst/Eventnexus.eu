import { Resend } from 'resend';

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Resend environment variable: RESEND_API_KEY');
  }
  return new Resend(apiKey);
}

export async function sendLeadNotificationEmail(lead: {
  id: string;
  fullName: string;
  email: string;
  phoneOrChannel?: string;
  companyName?: string;
  projectType: string;
  projectTitle: string;
  ideaDescription: string;
  timeline?: string;
  budgetRange?: string;
  projectStatus?: string;
  requiredFeatures?: string[];
  technicalNeeds?: string[];
  integrations?: string[];
  createdAt?: string;
}) {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new Error('Missing Resend environment variables: RESEND_FROM_EMAIL and LEAD_NOTIFICATION_EMAIL are required');
  }

  const resend = getResendClient();

  const subject = `New project request: ${lead.projectTitle || lead.projectType}`;

  const html = `
    <h2>New project request</h2>
    <p><strong>ID:</strong> ${lead.id}</p>
    <p><strong>Name:</strong> ${lead.fullName}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    ${lead.phoneOrChannel ? `<p><strong>Phone:</strong> ${lead.phoneOrChannel}</p>` : ''}
    ${lead.companyName ? `<p><strong>Company:</strong> ${lead.companyName}</p>` : ''}
    <p><strong>Project type:</strong> ${lead.projectType}</p>
    <p><strong>Project title:</strong> ${lead.projectTitle}</p>
    <p><strong>Description:</strong></p>
    <p>${lead.ideaDescription.replace(/\n/g, '<br>')}</p>
    ${lead.timeline ? `<p><strong>Timeline:</strong> ${lead.timeline}</p>` : ''}
    ${lead.budgetRange ? `<p><strong>Budget:</strong> ${lead.budgetRange}</p>` : ''}
    ${lead.projectStatus ? `<p><strong>Project status:</strong> ${lead.projectStatus}</p>` : ''}
    ${lead.requiredFeatures && lead.requiredFeatures.length > 0 ? `<p><strong>Features:</strong> ${lead.requiredFeatures.join(', ')}</p>` : ''}
    ${lead.technicalNeeds && lead.technicalNeeds.length > 0 ? `<p><strong>Technical needs:</strong> ${lead.technicalNeeds.join(', ')}</p>` : ''}
    ${lead.integrations && lead.integrations.length > 0 ? `<p><strong>Integrations:</strong> ${lead.integrations.join(', ')}</p>` : ''}
    ${lead.createdAt ? `<p><strong>Submitted at:</strong> ${lead.createdAt}</p>` : ''}
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      html,
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send lead notification email:', error);
    throw error;
  }
}
