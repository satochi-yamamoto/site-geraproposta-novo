import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Import pages
import HomePage from '@/pages/HomePage';
import CurriculumPage from '@/pages/CurriculumPage';
import ProposalPage from '@/pages/ProposalPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';

// Import components
import Layout from '@/components/Layout';
import { ToastProvider } from '@/contexts/ToastContext';

function App() {
	return (
		<ToastProvider>
			<Router>
				<Layout>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/curriculo-ia/*" element={<CurriculumPage />} />
						<Route path="/gera-proposta/*" element={<ProposalPage />} />
						<Route path="/politica-privacidade" element={<PrivacyPolicy />} />
						<Route path="/termos-uso" element={<TermsOfService />} />
					</Routes>
					<Analytics />
					<SpeedInsights />
				</Layout>
			</Router>
		</ToastProvider>
	);
}

export default App;
