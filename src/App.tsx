/**
 * =============================================================================
 *  PROJECT       : ROTIS - Rotis Tech (Private) Limited
 *  FILE          : src/App.tsx
 *  DESCRIPTION   : Root application component - defines all client-side routes (React Router).
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

import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutCompany from './pages/AboutCompany';
import RotisSolution from './pages/RotisSolution';
import LinguaBridgeSolution from './pages/LinguaBridgeSolution';
import PortfolioImpact from './pages/PortfolioImpact';
import TechStack from './pages/TechStack';
import CoreServices from './pages/CoreServices';
import AiExpertise from './pages/AiExpertise';
import AcclaimVisa from './pages/AcclaimVisa';
import Contact from './pages/Contact';
import TrialDemo from './pages/TrialDemo';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-company" element={<AboutCompany />} />
          <Route path="solution-rotis" element={<RotisSolution />} />
          <Route path="solution-linguabridge" element={<LinguaBridgeSolution />} />
          <Route path="portfolio-impact" element={<PortfolioImpact />} />
          <Route path="tech-stack" element={<TechStack />} />
          <Route path="core-services" element={<CoreServices />} />
          <Route path="ai-expertise" element={<AiExpertise />} />
          <Route path="acclaim-visa" element={<AcclaimVisa />} />
          <Route path="contact" element={<Contact />} />
          <Route path="trial-demo" element={<TrialDemo />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;