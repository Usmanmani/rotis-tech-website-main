/**
 * =============================================================================
 *  PROJECT       : ROTIS - Rotis Tech (Private) Limited
 *  FILE          : src/pages/Home.tsx
 *  DESCRIPTION   : Landing page - hero section and company introduction.
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

// ========================================================================
// START OF FILE: src/pages/Home.tsx (CORRECTED POP-UP LOGIC)
// ========================================================================

import React, { useState, useEffect } from 'react'; // useEffect is crucial
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import SurveyModal from '../components/SurveyModal';

const StatCard = ({ value, label, icon, delay = 0 }: { value: string, label: string, icon: React.ReactNode, delay?: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay * 0.2 }}
            className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 flex items-center space-x-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary"
        >
            <div className="text-brand-primary text-4xl">{icon}</div>
            <div>
                <div className="text-4xl font-bold text-white">{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
            </div>
        </motion.div>
    );
};

const Home = () => {
    const [isSurveyOpen, setIsSurveyOpen] = useState(false);
    
    // --- CORRECTED AUTOMATIC POP-UP LOGIC ---
    useEffect(() => {
        // Check if the user has already been shown the survey during this browser session
        const surveyShown = sessionStorage.getItem('surveyShown');

        // If the flag is not set, then show the survey
        if (!surveyShown) {
            // Set up a timer to open the modal after 5 seconds
            const timerId = setTimeout(() => {
                setIsSurveyOpen(true);
                // Set the flag in session storage so it doesn't show again
                sessionStorage.setItem('surveyShown', 'true');
            }, 5000); // 5000 milliseconds = 5 seconds

            // This is a cleanup function. If the user navigates away from the page
            // before 5 seconds, it will cancel the timer.
            return () => clearTimeout(timerId);
        }
    }, []); // The empty dependency array [] ensures this effect runs only once when the component first mounts.

    const chartData = [
        { name: 'Projects', value: 14 },
        { name: 'Sales Value', value: 6260.55 },
        { name: 'Revenue', value: 298.55 },
    ];
    
    return (
        <div className="space-y-24">
            <AnimatePresence>
                {isSurveyOpen && <SurveyModal onClose={() => setIsSurveyOpen(false)} />}
            </AnimatePresence>

            <section className="min-h-[70vh] flex items-center justify-center text-center -mt-16 bg-grid-pattern">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 p-8 rounded-lg"
                 >
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                        Driving the <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">Fourth Industrial Revolution</span> in Hospitality Automation.
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
                        Pioneering intelligent solutions for the UK's evolving hospitality industry with our flagship project, ROTIS.
                    </p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                         <NavLink 
                            to="/solution-rotis"
                            className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-sky-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Discover ROTIS
                        </NavLink>
                        <button 
                            onClick={() => setIsSurveyOpen(true)}
                            className="relative w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-brand-secondary bg-transparent border-2 border-brand-secondary hover:bg-brand-secondary hover:text-white transition-all duration-300 transform hover:scale-105 overflow-hidden"
                        >
                            <span className="absolute top-0 right-0 bg-brand-secondary text-white text-xs font-bold px-2 py-0.5 rounded-bl-md">NEW</span>
                            Take Our 3-Min Survey
                        </button>
                    </motion.div>
                </motion.div>
            </section>
            
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold text-center mb-12 text-white">Project Milestones & Key Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <StatCard 
                        value="14" 
                        label="Active Deployments" 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                        delay={0}
                    />
                    <StatCard 
                        value="$6.2k" 
                        label="Total Sales Value (Pilot)" 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
                        delay={1}
                    />
                     <StatCard 
                        value="$298k" 
                        label="Projected Annual Revenue" 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                        delay={2}
                    />
                </div>
                <div className="bg-gray-800/50 p-8 rounded-lg shadow-lg border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-4">Dashboard Analytics Snapshot</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4a5568' }}
                                labelStyle={{ color: '#f9fafb' }}
                            />
                            <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;