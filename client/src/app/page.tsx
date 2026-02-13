import React from 'react';
import Navigation from '../components/LandingPage_Component/Navigation';
import Hero from '../components/LandingPage_Component/Hero';
import TrustedPartners from '../components/LandingPage_Component/TrustedPartners';
import DigitalSignature from '../components/LandingPage_Component/DigitalSignature';
import CompetitionSection from '../components/LandingPage_Component/CompetitionSection';
import CuratedRoles from '../components/LandingPage_Component/CuratedRoles';
import IntegrationEcosystem from '../components/LandingPage_Component/IntegrationEcosystem';
import DeveloperAPI from '../components/LandingPage_Component/DeveloperAPI';
import Pricing from '../components/LandingPage_Component/Pricing';
import Footer from '../components/LandingPage_Component/Footer';

export default function HomePage() {
  return (
    <div className="text-zinc-400 antialiased selection:bg-white selection:text-black">
      <div className="noise-bg"></div>

      <Navigation />
      <Hero />
      <TrustedPartners />
      <DigitalSignature />
      <CompetitionSection />
      <CuratedRoles />
      <IntegrationEcosystem />
      <Pricing />
      <Footer />
    </div>
  );
}