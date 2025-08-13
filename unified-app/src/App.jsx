import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Import pages
import HomePage from '@/pages/HomePage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';

// Import components
import Layout from '@/components/Layout';

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/curriculo-ia/*" element={<div className="container mx-auto px-4 py-12 text-center"><h1 className="text-3xl font-bold">Currículo IA App</h1><p className="text-slate-300 mt-4">Em breve integração completa</p></div>} />
					<Route path="/gera-proposta/*" element={<div className="container mx-auto px-4 py-12 text-center"><h1 className="text-3xl font-bold">Gera Proposta App</h1><p className="text-slate-300 mt-4">Em breve integração completa</p></div>} />
					<Route path="/politica-privacidade" element={<PrivacyPolicy />} />
					<Route path="/termos-uso" element={<TermsOfService />} />
				</Routes>
				<Analytics />
				<SpeedInsights />
			</Layout>
		</Router>
	);
}

export default App;
