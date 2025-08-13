import React, { useEffect, useState } from 'react';
import { User, ExternalLink, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CurriculumPage() {
	const [redirecting, setRedirecting] = useState(false);
	const curriculumUrl = process.env.NODE_ENV === 'development' 
		? 'http://localhost:3001' 
		: 'https://curriculo-ia.geradocumentos.com.br';

	const handleRedirect = () => {
		setRedirecting(true);
		// Redireciona para a aplicação
		setTimeout(() => {
			window.location.href = curriculumUrl;
		}, 1000);
	};

	const handleNewTab = () => {
		window.open(curriculumUrl, '_blank', 'noopener,noreferrer');
	};

	const handleGoBack = () => {
		window.history.back();
	};

	// Auto-redireciona após 3 segundos se o usuário não escolher
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
					<Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
					<h2 className="text-xl font-semibold mb-2">Redirecionando para Currículo IA...</h2>
					<p className="text-slate-400">Aguarde, você será redirecionado automaticamente</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="max-w-2xl mx-auto text-center">
				<div className="mb-8">
					<div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
						<User className="h-12 w-12 text-white" />
					</div>
					<h1 className="text-4xl font-bold mb-4">Currículo IA</h1>
					<p className="text-xl text-slate-300 mb-6">Gerador de Currículos com Inteligência Artificial</p>
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
							<User className="h-6 w-6 mr-3" />
							Ir para Currículo IA
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
						<p>URL: <code className="bg-slate-800 px-2 py-1 rounded text-blue-400">{curriculumUrl}</code></p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CurriculumPage;
