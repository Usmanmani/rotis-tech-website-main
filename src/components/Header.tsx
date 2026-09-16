/**
 * =============================================================================
 *  PROJECT       : ROTIS - Rotis Tech (Private) Limited
 *  FILE          : src/components/Header.tsx
 *  DESCRIPTION   : Site-wide navigation header with links to all main pages.
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

import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const RotisLogo = () => (
    <div className="flex items-center space-x-3">
        <div className="w-20 h-12 flex-shrink-0">
            {/* This now points to your local image file */}
            <img src="/assets/rotis-logo.png" alt="Rotis Tech Logo" />
        </div>
        <div className="text-white">
            <h1 className="text-2xl font-bold">Rotis Tech</h1>
            <p className="text-xs text-gray-400">(Private) Limited</p>
        </div>
    </div>
);

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about-company' },
    { name: 'Solutions', children: [
        { name: 'ROTIS Platform', path: '/solution-rotis' },
        { name: 'LinguaBridge', path: '/solution-linguabridge' },
    ] },
    { name: 'My Impact', path: '/portfolio-impact' },
    { name: 'Tech Stack', path: '/tech-stack' },
    { name: 'Services', path: '/core-services' },
    { name: 'Contact', path: '/contact' },
    { name: 'AI Expertise', path: '/ai-expertise' },
    { name: 'Acclaim', path: '/acclaim-visa' },
    { name: 'Trial/Demo', path: '/trial-demo' },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const location = useLocation();

    const activeLinkClass = "bg-brand-primary text-white";
    const inactiveLinkClass = "text-gray-300 hover:bg-gray-700 hover:text-white";
    
    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isActive ? activeLinkClass : inactiveLinkClass}`;

    const isChildActive = (children: { path: string }[]) =>
        children.some(child => child.path === location.pathname);
        
    return (
        <nav className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-brand-primary/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <NavLink to="/">
                            <RotisLogo />
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-2">
                           {navLinks.slice(0, 7).map(link => (
                               link.children ? (
                                   <div key={link.name} className="relative" onMouseEnter={() => setOpenMenu(link.name)} onMouseLeave={() => setOpenMenu(null)}>
                                       <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center ${isChildActive(link.children) ? activeLinkClass : inactiveLinkClass}`}>
                                           <span>{link.name}</span>
                                           <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                       </button>
                                       <AnimatePresence>
                                       {openMenu === link.name && (
                                           <motion.div
                                               initial={{ opacity: 0, y: -10 }}
                                               animate={{ opacity: 1, y: 0 }}
                                               exit={{ opacity: 0, y: -10 }}
                                               className="absolute left-0 top-full pt-2 w-56 z-20 origin-top-left"
                                           >
                                               <div className="bg-gray-800 rounded-md shadow-lg py-1">
                                                {link.children.map(child => (
                                                    <NavLink key={child.name} to={child.path} className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'text-brand-primary' : 'text-gray-300'} hover:bg-gray-700`} onClick={() => setOpenMenu(null)}>
                                                        {child.name}
                                                    </NavLink>
                                                ))}
                                                </div>
                                           </motion.div>
                                       )}
                                       </AnimatePresence>
                                   </div>
                               ) : (
                                   <NavLink key={link.name} to={link.path} className={getLinkClass}>
                                       {link.name}
                                   </NavLink>
                               )
                           ))}
                           <div className="relative" onMouseEnter={() => setOpenMenu('More')} onMouseLeave={() => setOpenMenu(null)}>
                                <button className={`${inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center`}>
                                    <span>More</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <AnimatePresence>
                                {openMenu === 'More' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 top-full pt-2 w-48 z-20 origin-top-right"
                                    >
                                        <div className="bg-gray-800 rounded-md shadow-lg py-1">
                                         {navLinks.slice(7).map(link => (
                                             <NavLink key={link.name} to={link.path as string} className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'text-brand-primary' : 'text-gray-300'} hover:bg-gray-700`} onClick={() => setOpenMenu(null)}>
                                                 {link.name}
                                             </NavLink>
                                         ))}
                                         </div>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                           link.children ? (
                               <div key={link.name}>
                                   <div className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">{link.name}</div>
                                   {link.children.map(child => (
                                       <NavLink key={child.name} to={child.path} className={({isActive}) => `block ml-3 px-3 py-2 rounded-md text-base font-medium border-l-2 border-gray-700 pl-4 ${isActive ? activeLinkClass : inactiveLinkClass}`} onClick={() => setIsOpen(false)}>
                                           {child.name}
                                       </NavLink>
                                   ))}
                               </div>
                           ) : (
                               <NavLink key={link.name} to={link.path} className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? activeLinkClass : inactiveLinkClass}`} onClick={() => setIsOpen(false)}>
                                   {link.name}
                               </NavLink>
                           )
                        ))}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </nav>
    );
};

export default Header; // <-- THIS IS THE CRUCIAL LINE