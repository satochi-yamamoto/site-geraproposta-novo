import React, { useState } from 'react';
import { ExternalLink, Loader2, RefreshCw, Monitor, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppHealthCheck from './AppHealthCheck';

function AppLauncher({ appName, appUrl, description, icon }) {
	const [loadingMethod, setLoadingMethod] = useState(null);
	const [appOnline, setAppOnline] = useState(null);

	const handleIframeLoad = () => {
		setLoadingMethod('iframe');
	};

	const handleDirectAccess = () => {
		setLoadingMethod('redirect');
		// Aguarda um pouco para mostrar o loading, depois redireciona
		setTimeout(() => {
			window.location.href = appUrl;
		}, 1000);
	};

	const handleNewTab = () => {
		window.open(appUrl, '_blank', 'noopener,noreferrer');
	};

	if (loadingMethod === 'redirect') {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
					<h2 className="text-xl font-semibold mb-2">Redirecionando...</h2>
					<p className="text-slate-400">Você será redirecionado para {appName}</p>
				</div>
			</div>
		);
	}

	if (loadingMethod === 'iframe') {
		return (
			<div className="flex flex-col h-screen">
				{/* Barra de status */}
				<div className="bg-slate-900/50 border-b border-slate-700 px-4 py-2 flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<span className="text-sm font-medium">{appName}</span>
						<AppHealthCheck 
							appName={appName} 
							appUrl={appUrl} 
							onStatusChange={setAppOnline} 
						/>
					</div>
					<div className="flex items-center space-x-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleNewTab}
							title="Abrir em nova aba"
						>
							<ExternalLink className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setLoadingMethod(null)}
							title="Voltar"
						>
							Voltar
						</Button>
					</div>
				</div>
				
				{/* Iframe da aplicação */}
				<div className="flex-1">
					<iframe
						src={appUrl}
						className="w-full h-full border-0"
						title={`${appName} - ${description}`}
						sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads allow-top-navigation"
						allow="clipboard-read; clipboard-write; fullscreen"
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="max-w-2xl mx-auto text-center">
				<div className="mb-8">
					<div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
						{icon || <ExternalLink className="h-12 w-12 text-white" />}
					</div>
					<h1 className="text-4xl font-bold mb-4">{appName}</h1>
					<p className="text-xl text-slate-300 mb-6">{description}</p>
					
					{/* Status da aplicação */}
					<div className="flex justify-center mb-8">
						<AppHealthCheck 
							appName="Status" 
							appUrl={appUrl} 
							onStatusChange={setAppOnline} 
						/>
					</div>
				</div>

				<div className="glass-effect rounded-2xl p-8 space-y-6">
					<h2 className="text-2xl font-semibold mb-6">Como você gostaria de acessar?</h2>
					
					<div className="grid gap-4">
						<Button 
							onClick={handleIframeLoad}
							size="lg" 
							className="w-full h-16 text-lg"
							disabled={appOnline === false}
						>
							<Monitor className="h-6 w-6 mr-3" />
							Carregar Aqui (Integrado)
							{appOnline === false && <span className="ml-2 text-xs">(Indisponível)</span>}
						</Button>

						<Button 
							onClick={handleDirectAccess}
							variant="outline" 
							size="lg" 
							className="w-full h-16 text-lg"
							disabled={appOnline === false}
						>
							<Globe className="h-6 w-6 mr-3" />
							Ir para a Aplicação
							{appOnline === false && <span className="ml-2 text-xs">(Indisponível)</span>}
						</Button>

						<Button 
							onClick={handleNewTab}
							variant="ghost" 
							size="lg" 
							className="w-full h-12"
						>
							<ExternalLink className="h-5 w-5 mr-2" />
							Abrir em Nova Aba
						</Button>
					</div>

					{appOnline === false && (
						<div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-6">
							<h3 className="font-semibold text-red-400 mb-2">Aplicação Offline</h3>
							<p className="text-sm text-red-300">
								A aplicação não está rodando no momento. Certifique-se de que ela está iniciada na porta correta.
							</p>
							<div className="mt-3 text-xs text-red-400">
								<strong>Para desenvolvedores:</strong> Execute `npm run dev` na pasta da aplicação.
							</div>
						</div>
					)}

					<div className="text-sm text-slate-400 pt-4 border-t border-slate-700">
						<p>URL: <code className="bg-slate-800 px-2 py-1 rounded text-blue-400">{appUrl}</code></p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AppLauncher;
