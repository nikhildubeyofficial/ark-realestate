/** Credence-style WhatsApp inquiry (replace with your business number if needed). */
export const INQUIRE_WHATSAPP_E164 = "971588919223";

export function buildInquireWhatsAppUrl(payload: {
  propertyTitle: string;
  slug: string;
  location: string;
  price: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}): string {
  const lines = [
    "Hello, I'm interested in a property on Ark Vision.",
    `Property: ${payload.propertyTitle}`,
    `Ref: ${payload.slug}`,
    `Location: ${payload.location}`,
    `Price: ${payload.price}`,
  ];
  if (payload.name) lines.push(`Name: ${payload.name}`);
  if (payload.email) lines.push(`Email: ${payload.email}`);
  if (payload.phone) lines.push(`Phone: ${payload.phone}`);
  if (payload.message) lines.push(`Message: ${payload.message}`);
  const text = lines.join("\n");
  return `https://wa.me/${INQUIRE_WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
}
