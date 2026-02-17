import React from 'react';

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { title: 'Explore', href: '#' },
      { title: 'Jobs', href: '#' },
      { title: 'Hackathons', href: '#' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { title: 'Documentation', href: '#' },
      { title: 'API', href: '#' },
      { title: 'Community', href: '#' }
    ]
  }
];

const socialLinks = [
  { title: 'Twitter', href: '#' },
  { title: 'GitHub', href: '#' },
  { title: 'Discord', href: '#' }
];

const Footer: React.FC = () => {
  return (
    <footer className="mt-32 border-t border-zinc-900 bg-black pt-20 pb-40">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <a href="#" className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mb-6">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
                <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeWidth="1.5" />
              </svg>
            </a>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              RiseUp is the operating system for your career. Designed for the ambitious, built for the extraordinary.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-medium mb-6">{section.title}</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h4 className="text-white font-medium mb-6">Stay updated</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="email@address.com"
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-zinc-600 flex-1"
              />
              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors">
                Sub
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
          <div>© 2024 RiseUp Inc.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-zinc-400">
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
