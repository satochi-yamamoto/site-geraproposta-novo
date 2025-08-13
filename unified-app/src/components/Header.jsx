import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Currículo IA', href: '/curriculo-ia' },
		{ name: 'Gera Proposta', href: '/gera-proposta' },
		{ name: 'Como Funciona', href: '/#como-funciona' },
		{ name: 'Benefícios', href: '/#beneficios' },
	];

	return (
		<header className="glass-effect sticky top-0 z-50 border-b border-slate-800">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center py-4">
					{/* Logo */}
					<Link to="/" className="flex items-center">
						<img 
							src="/images/logo-horizontal.svg" 
							alt="Geradocumentos.com.br - Documentos Profissionais com IA" 
							className="h-10 w-auto"
						/>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className={`text-sm font-medium transition-colors hover:text-blue-400 ${
									location.pathname === item.href
										? 'text-blue-400'
										: 'text-slate-300'
								}`}
							>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Mobile menu button */}
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</Button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<nav className="md:hidden py-4 border-t border-slate-800">
						<div className="flex flex-col space-y-4">
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className={`text-sm font-medium transition-colors hover:text-blue-400 ${
										location.pathname === item.href
											? 'text-blue-400'
											: 'text-slate-300'
									}`}
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}
						</div>
					</nav>
				)}
			</div>
		</header>
	);
}

export default Header;
