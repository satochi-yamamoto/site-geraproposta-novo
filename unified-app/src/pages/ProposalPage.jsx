import React, { useEffect, useState } from 'react';
import { FileText, ExternalLink, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ProposalPage() {
	const [redirecting, setRedirecting] = useState(false);
	const proposalUrl = process.env.NODE_ENV === 'development' 
		? 'http://localhost:3002' 
		: 'https://gerador-propostas.geradocumentos.com.br';

	const handleRedirect = () => {
		setRedirecting(true);
		// Redireciona para a aplicação
		setTimeout(() => {
			window.location.href = proposalUrl;
		}, 1000);
	};

	const handleNewTab = () => {
		window.open(proposalUrl, '_blank', 'noopener,noreferrer');
	};

	const handleGoBack = () => {
		window.history.back();
	};

	// Auto-redireciona após 5 segundos se o usuário não escolher
	useEffect(() => {
		const timer = setTimeout(() => {
			handleRedirect();
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	if (redirecting) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<Loader2 className="h-12 w-12 animate-spin text-purple-400 mx-auto mb-4" />
					<h2 className="text-xl font-semibold mb-2">Redirecionando para Gera Proposta...</h2>
					<p className="text-slate-400">Aguarde, você será redirecionado automaticamente</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="max-w-2xl mx-auto text-center">
				<div className="mb-8">
					<div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
						<FileText className="h-12 w-12 text-white" />
					</div>
					<h1 className="text-4xl font-bold mb-4">Gera Proposta</h1>
					<p className="text-xl text-slate-300 mb-6">Gerador de Propostas para MEIs e Freelancers</p>
				</div>

				<div className="glass-effect rounded-2xl p-8 space-y-6">
					<h2 className="text-2xl font-semibold mb-6">Acessar Aplicação</h2>
					<p className="text-slate-300 mb-6">
						Você será redirecionado automaticamente em 5 segundos, ou escolha uma opção abaixo:
					</p>
					
					<div className="grid gap-4">
						<Button 
							onClick={handleRedirect}
							size="lg" 
							className="w-full h-16 text-lg"
						>
							<FileText className="h-6 w-6 mr-3" />
							Ir para Gera Proposta
						</Button>

						<Button 
							onClick={handleNewTab}
							variant="outline" 
							size="lg" 
							className="w-full h-12"
						>
							<ExternalLink className="h-5 w-5 mr-2" />
							Abrir em Nova Aba
						</Button>

						<Button 
							onClick={handleGoBack}
							variant="ghost" 
							size="lg" 
							className="w-full h-12"
						>
							<ArrowLeft className="h-5 w-5 mr-2" />
							Voltar à Homepage
						</Button>
					</div>

					<div className="text-sm text-slate-400 pt-4 border-t border-slate-700">
						<p>URL: <code className="bg-slate-800 px-2 py-1 rounded text-purple-400">{proposalUrl}</code></p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProposalPage;
