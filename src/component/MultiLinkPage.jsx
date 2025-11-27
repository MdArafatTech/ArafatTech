// src/pages/MultiLinkPage.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaWhatsapp, FaTelegram, FaFacebook, FaPhone, FaEnvelope } from "react-icons/fa";

export default function MultiLinkPage() {
  const [searchParams] = useSearchParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const cardId = searchParams.get("id");
    const allCardData = JSON.parse(localStorage.getItem("idCardData") || "{}");
    if (cardId && allCardData[cardId]) {
      setCard(allCardData[cardId]);
    }
  }, [searchParams]);

  if (!card) return <p className="text-center mt-10">No contact info found!</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">{card.name || "My Contact Info"}</h2>
      <p className="mb-6">{card.role}</p>
      <div className="flex flex-col gap-3 text-center">
        {card.phone && (
          <a href={`tel:${card.phone}`} className="flex items-center gap-2 justify-center text-blue-600 hover:underline">
            <FaPhone /> {card.phone}
          </a>
        )}
        {card.email && (
          <a href={`mailto:${card.email}`} className="flex items-center gap-2 justify-center text-red-600 hover:underline">
            <FaEnvelope /> {card.email}
          </a>
        )}
        {card.whatsapp && (
          <a href={`https://wa.me/${card.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 justify-center text-green-600 hover:underline">
            <FaWhatsapp /> WhatsApp
          </a>
        )}
        {card.telegram && (
          <a href={`https://t.me/${card.telegram}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 justify-center text-blue-500 hover:underline">
            <FaTelegram /> Telegram
          </a>
        )}
        {card.facebook && (
          <a href={card.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 justify-center text-blue-700 hover:underline">
            <FaFacebook /> Facebook
          </a>
        )}
      </div>
    </div>
  );
}
