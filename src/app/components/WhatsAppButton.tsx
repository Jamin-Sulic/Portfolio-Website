import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  label?: string;
}

export default function WhatsAppButton({
  phoneNumber = "41787193115",
  label = "WhatsApp",
}: WhatsAppButtonProps) {
  const href = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700"
    >
      <MessageCircle size={18} />
      {label}
    </a>
  );
}
