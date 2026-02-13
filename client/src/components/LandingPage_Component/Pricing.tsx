import React from 'react';

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  highlighted?: boolean;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Cadet',
    price: '$0',
    period: '/mo',
    features: [
      'Basic Profile',
      '3 Job Applications',
      'Community Access'
    ],
    buttonText: 'Current Plan',
    buttonStyle: 'w-full py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors text-sm'
  },
  {
    name: 'Voyager',
    price: '$29',
    period: '/mo',
    features: [
      'Verified Badge',
      'Unlimited Applications',
      'Salary Insights',
      'Priority Support'
    ],
    buttonText: 'Upgrade Now',
    buttonStyle: 'w-full py-3 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors text-sm font-medium',
    highlighted: true,
    badge: 'Most Popular'
  },
  {
    name: 'Fleet',
    price: 'Custom',
    features: [
      'Dedicated Recruiter',
      'Team Dashboard',
      'API Access'
    ],
    buttonText: 'Contact Sales',
    buttonStyle: 'w-full py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors text-sm'
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="max-w-[1600px] mx-auto px-4 md:px-8 py-32 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-medium text-white tracking-tight mb-4">Membership Tiers</h2>
        <p className="text-zinc-500 text-sm">Invest in your career trajectory.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {pricingTiers.map((tier, index) => (
          <div 
            key={index}
            className={`glass-card p-8 rounded-2xl relative ${
              tier.highlighted 
                ? 'border border-white/20 bg-white/5 transform md:-translate-y-4 shadow-2xl shadow-purple-900/20' 
                : 'border border-white/5 opacity-80 hover:opacity-100 transition-opacity'
            }`}
          >
            {tier.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {tier.badge}
              </div>
            )}
            <div className={`text-sm uppercase tracking-widest font-medium mb-4 ${
              tier.highlighted ? 'text-indigo-400' : 'text-zinc-400'
            }`}>
              {tier.name}
            </div>
            <div className={`font-semibold mb-6 ${
              tier.highlighted ? 'text-4xl' : 'text-3xl'
            } text-white`}>
              {tier.price} 
              {tier.period && <span className="text-base font-normal text-zinc-600">{tier.period}</span>}
            </div>
            <ul className={`space-y-4 mb-8 text-sm ${
              tier.highlighted ? 'text-zinc-300' : 'text-zinc-400'
            }`}>
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex gap-3">
                  <svg 
                    className={`w-5 h-5 ${tier.highlighted ? 'text-indigo-400' : 'text-white'}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className={tier.buttonStyle}>
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
