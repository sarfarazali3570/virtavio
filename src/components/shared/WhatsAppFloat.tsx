'use client';

import Image from 'next/image';
import wp_img from '../../images/wp_img.png';

export default function WhatsAppFloat() {
  const whatsappNumber = '918910364760'; // Include country code
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi!%20I%20need%20help%20with%20a%20project.%20Can%20you%20assist%20me?`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-8 left-8 z-[100] flex items-center justify-center w-14 h-14 hover:scale-110 transition-all duration-300"
    >
      <Image
        src={wp_img}
        alt="WhatsApp"
        width={56}
        height={56}
        priority
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </a>
  );
}
