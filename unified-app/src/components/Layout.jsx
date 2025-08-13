import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
	const location = useLocation();
	
	// Não mostrar footer nas páginas das aplicações
	const hideFooter = location.pathname.startsWith('/curriculo-ia') || 
	                   location.pathname.startsWith('/gera-proposta');

	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<Header />
			<main className="flex-1">
				{children}
			</main>
			{!hideFooter && <Footer />}
		</div>
	);
}

export default Layout;
