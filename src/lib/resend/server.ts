import { Resend } from 'resend';
import { getOptionLabel, getOptionLabels } from '../option-labels';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Missing Resend environment variable: RESEND_API_KEY is required'
    );
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
    throw new Error(
      'Missing Resend environment variables: RESEND_FROM_EMAIL and LEAD_NOTIFICATION_EMAIL are required'
    );
  }

  const resend = getResendClient();

  const formatArr = (arr?: string[]) =>
    arr && arr.length > 0 ? escapeHtml(getOptionLabels(arr).join(', ')) : '';

  const html = `
    <h2>New project request</h2>
    <p><strong>ID:</strong> ${escapeHtml(lead.id)}</p>
    <p><strong>Name:</strong> ${escapeHtml(lead.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    ${lead.phoneOrChannel ? `<p><strong>Phone:</strong> ${escapeHtml(lead.phoneOrChannel)}</p>` : ''}
    ${lead.companyName ? `<p><strong>Company:</strong> ${escapeHtml(lead.companyName)}</p>` : ''}
    <p><strong>Project type:</strong> ${escapeHtml(getOptionLabel(lead.projectType))}</p>
    <p><strong>Project title:</strong> ${escapeHtml(lead.projectTitle)}</p>
    <p><strong>Description:</strong></p>
    <p>${escapeHtml(lead.ideaDescription).replace(/\n/g, '<br>')}</p>
    ${lead.timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(getOptionLabel(lead.timeline))}</p>` : ''}
    ${lead.budgetRange ? `<p><strong>Budget:</strong> ${escapeHtml(getOptionLabel(lead.budgetRange))}</p>` : ''}
    ${lead.projectStatus ? `<p><strong>Project status:</strong> ${escapeHtml(getOptionLabel(lead.projectStatus))}</p>` : ''}
    ${formatArr(lead.requiredFeatures) ? `<p><strong>Features:</strong> ${formatArr(lead.requiredFeatures)}</p>` : ''}
    ${formatArr(lead.technicalNeeds) ? `<p><strong>Technical needs:</strong> ${formatArr(lead.technicalNeeds)}</p>` : ''}
    ${formatArr(lead.integrations) ? `<p><strong>Integrations:</strong> ${formatArr(lead.integrations)}</p>` : ''}
    ${lead.createdAt ? `<p><strong>Submitted at:</strong> ${escapeHtml(lead.createdAt)}</p>` : ''}
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New project request: ${escapeHtml(lead.projectTitle || lead.projectType)}`,
      html,
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send lead notification email:', error);
    throw error;
  }
}
