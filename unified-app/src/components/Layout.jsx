import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
	const location = useLocation();
	
	// Não mostrar header e footer nas páginas das aplicações quando em modo iframe
	const isAppPage = location.pathname.startsWith('/curriculo-ia') || 
	                  location.pathname.startsWith('/gera-proposta');
	
	// Verificar se estamos no modo iframe (seria passado via query param ou state)
	const isIframeMode = new URLSearchParams(location.search).has('iframe');

	if (isAppPage && isIframeMode) {
		// Modo iframe completo - sem header/footer
		return (
			<div className="min-h-screen bg-slate-950 text-white">
				{children}
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<Header />
			<main className="flex-1">
				{children}
			</main>
			{!isAppPage && <Footer />}
		</div>
	);
}

export default Layout;
