/**
 * =============================================================================
 *  PROJECT       : ROTIS - Rotis Tech (Private) Limited
 *  FILE          : src/pages/LinguaBridgeSolution.tsx
 *  DESCRIPTION   : Product page - LinguaBridge real-time multilingual
 *                  communication platform. Mirrors the RotisSolution.tsx
 *                  pattern (FeatureShowcase + Core Pillars grid) for visual
 *                  and structural consistency with the flagship product page.
 * -----------------------------------------------------------------------------
 *  DEVELOPED BY  : dotwasi
 *  CEO & OWNER   : Usman Yaseen
 * -----------------------------------------------------------------------------
 *  COPYRIGHT (c) 2026 Rotis Tech (Private) Limited. All Rights Reserved.
 *
 *  This source code is the confidential and proprietary property of
 *  Rotis Tech (Private) Limited. Unauthorized copying, modification,
 *  distribution, or use of this file, via any medium, is strictly
 *  prohibited without prior written permission from the owner.
 * =============================================================================
 */

import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import React from 'react';

// Reused verbatim from RotisSolution.tsx for visual/structural consistency.
const FeatureShowcase = ({ feature, isReversed }: { feature: any, isReversed: boolean }) => {
  const flexDirection = isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row';

  return (
    <div className={`flex flex-col ${flexDirection} items-center bg-gray-800/40 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50`}>
      <div className="lg:w-1/2 w-full">
        <img src={feature.image} alt={feature.title} className="w-full h-64 lg:h-full object-cover object-center transition-transform duration-300 hover:scale-105" />
      </div>
      <div className="lg:w-1/2 w-full p-8 lg:p-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-brand-primary flex-shrink-0">{feature.icon}</span>
          <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
        <ul className="space-y-2">
          {feature.benefits.map((benefit: string) => (
            <li key={benefit} className="flex items-center gap-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-secondary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PillarCard = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 hover:border-brand-primary hover:-translate-y-1 flex items-center gap-4">
        <div className="text-brand-primary text-3xl">{icon}</div>
        <h3 className="text-md font-bold text-white">{title}</h3>
    </div>
);

const LinguaBridgeSolution = () => {
    const solutions = [
        {
            title: "Speech-to-Speech Translation",
            description: "Turn any call or meeting into a conversation everyone can follow. LinguaBridge listens, translates, and speaks back in natural, human-sounding voices — in real time, in 60+ languages, with no dedicated interpreter required.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>,
            image: "/images/lingua-speech-translation.svg",
            benefits: ["Natural, Human-Like Voice Output", "Works On Any Call or Meeting", "Sub-Second Response Time", "60+ Languages Supported"]
        },
        {
            title: "Live Captions & Subtitles",
            description: "Give every attendee a front-row seat, regardless of what language they speak. LinguaBridge streams real-time captions for meetings, webinars, and live events — each viewer reading along in their own language.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>,
            image: "/images/lingua-live-captions.svg",
            benefits: ["Multi-Language Live Subtitles", "Built for Webinars & Town Halls", "Searchable, Exportable Transcripts", "Accessible By Design"]
        },
        {
            title: "Multi-Language Chat",
            description: "Every message, translated the instant it's sent. LinguaBridge drops directly into the chat, helpdesk, and CRM tools your team already runs on — so customers type in their language and your team reads in theirs.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>,
            image: "/images/lingua-multilang-chat.svg",
            benefits: ["Inline, Automatic Translation", "Embeds In Your Existing Chat Stack", "Full Conversation History Preserved", "No Copy-Pasting, Ever"]
        },
    ];

    const pillarFeatures = [
        { title: "Enterprise-Grade Security", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg> },
        { title: "GDPR & EU Data Residency", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg> },
        { title: "CRM & Helpdesk Integrations", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg> },
        { title: "Developer-Friendly API", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> },
        { title: "Real-Time Analytics Dashboard", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
        { title: "24/7 Global Availability", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { title: "Custom Terminology & Glossaries", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> },
        { title: "Dedicated Onboarding Support", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg> },
    ];

    return (
        <div>
            <div className="text-center mb-20">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">LinguaBridge — Real-Time Multilingual Communication</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-primary">
                    Break the language barrier in every call, meeting, and conversation. LinguaBridge translates speech, captions, and chat instantly — so your team and your customers always understand each other.
                </p>
            </div>

            <div className="space-y-16">
                {solutions.map((solution, index) => (
                    <motion.div
                        key={solution.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        <FeatureShowcase feature={solution} isReversed={index % 2 !== 0} />
                    </motion.div>
                ))}
            </div>

            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="mt-24"
            >
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-brand-secondary">Core Pillars of the LinguaBridge Platform</h2>
                     <p className="mt-2 text-gray-400 max-w-2xl mx-auto">Enterprise-grade foundations built for global teams, from security to seamless integrations.</p>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillarFeatures.map(feature => <PillarCard key={feature.title} {...feature} />)}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="mt-24 text-center bg-gray-800/40 border border-gray-700/50 rounded-xl py-16 px-6"
            >
                <h2 className="text-3xl font-bold text-white">Ready to see LinguaBridge in action?</h2>
                <p className="mt-3 text-gray-300 max-w-xl mx-auto">Get a live walkthrough tailored to your team, or reach out with questions about integration and pricing.</p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <NavLink
                        to="/trial-demo"
                        className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-sky-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Request a Demo
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-brand-secondary bg-transparent border-2 border-brand-secondary hover:bg-brand-secondary hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                        Contact Us
                    </NavLink>
                </div>
            </motion.section>
        </div>
    );
};

export default LinguaBridgeSolution;
