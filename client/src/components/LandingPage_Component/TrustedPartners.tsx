import React from 'react';

const partners = ['Stripe', 'Vercel', 'Linear', 'OpenAI', 'Figma', 'Raycast', 'Midjourney'];

const TrustedPartners: React.FC = () => {
  return (
    <div className="w-full border-y border-white/5 py-12 overflow-hidden bg-black/50 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-8 mb-8 flex justify-between items-end">
        <h2 className="text-sm text-zinc-500 uppercase tracking-[0.2em]">Trusted Partners</h2>
      </div>
      <div className="flex gap-16 px-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 overflow-x-auto no-scrollbar">
        {partners.map((partner, index) => (
          <div key={index} className="text-2xl font-semibold text-white tracking-tighter shrink-0">
            {partner}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedPartners;
