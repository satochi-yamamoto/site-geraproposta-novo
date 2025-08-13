import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

function Footer() {
	return (
		<footer className="glass-effect border-t border-slate-800 mt-20">
			<div className="container mx-auto px-4 py-12">
				<div className="grid md:grid-cols-4 gap-8">
					{/* Logo e descrição */}
					<div className="md:col-span-2">
						<Link to="/" className="flex items-center mb-4">
							<img 
								src="/images/logo-horizontal.svg" 
								alt="Geradocumentos.com.br" 
								className="h-8 w-auto"
							/>
						</Link>
						<p className="text-slate-400 text-sm mb-4 max-w-md">
							Transforme sua carreira com documentos profissionais criados por Inteligência Artificial. 
							Currículos e propostas comerciais de qualidade profissional em minutos.
						</p>
						<div className="flex space-x-4">
							<a 
								href="https://facebook.com/geradocumentos" 
								target="_blank" 
								rel="noopener noreferrer"
								className="text-slate-400 hover:text-blue-400 transition-colors"
							>
								<Facebook className="h-5 w-5" />
							</a>
							<a 
								href="https://instagram.com/geradocumentos" 
								target="_blank" 
								rel="noopener noreferrer"
								className="text-slate-400 hover:text-blue-400 transition-colors"
							>
								<Instagram className="h-5 w-5" />
							</a>
							<a 
								href="https://linkedin.com/company/geradocumentos" 
								target="_blank" 
								rel="noopener noreferrer"
								className="text-slate-400 hover:text-blue-400 transition-colors"
							>
								<Linkedin className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Ferramentas */}
					<div>
						<h4 className="font-semibold text-white mb-4">Ferramentas</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link to="/curriculo-ia" className="text-slate-400 hover:text-blue-400 transition-colors">
									Currículo com IA
								</Link>
							</li>
							<li>
								<Link to="/gera-proposta" className="text-slate-400 hover:text-blue-400 transition-colors">
									Gerador de Propostas
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h4 className="font-semibold text-white mb-4">Legal</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link to="/politica-privacidade" className="text-slate-400 hover:text-blue-400 transition-colors">
									Política de Privacidade
								</Link>
							</li>
							<li>
								<Link to="/termos-uso" className="text-slate-400 hover:text-blue-400 transition-colors">
									Termos de Uso
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-slate-800 mt-8 pt-8 text-center">
					<p className="text-slate-400 text-sm">
						© {new Date().getFullYear()} Geradocumentos.com.br. Todos os direitos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
