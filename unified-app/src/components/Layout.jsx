import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<Header />
			<main className="flex-1">
				{children}
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
