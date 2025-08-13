import React from 'react';
import { ExternalLink, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRedirect } from '@/hooks/useRedirect';
import { useUrlValidator } from '@/hooks/useUrlValidator';
import AppStatusIndicator from './AppStatusIndicator';

/**
 * Componente reutilizável para páginas de redirecionamento de aplicações
 */
const AppRedirectPage = ({ 
	appName, 
	appUrl, 
	description, 
	icon: IconComponent, 
	gradient = 'from-blue-500 to-purple-600',
	color = 'blue' 
}) => {
	const { isRedirecting, countdown, redirectNow, openInNewTab, goBack } = useRedirect(appUrl);
	const { isOnline, lastChecked, recheck } = useUrlValidator(appUrl);

	if (isRedirecting) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<Loader2 className={`h-12 w-12 animate-spin text-${color}-400 mx-auto mb-4`} />
					<h2 className="text-xl font-semibold mb-2">Redirecionando para {appName}...</h2>
					<p className="text-slate-400">Aguarde, você será redirecionado automaticamente</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="max-w-2xl mx-auto text-center">
				{/* Header da aplicação */}
				<div className="mb-8">
					<div className={`w-24 h-24 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
						<IconComponent className="h-12 w-12 text-white" />
					</div>
					<h1 className="text-4xl font-bold mb-4">{appName}</h1>
					<p className="text-xl text-slate-300 mb-6">{description}</p>
				</div>

				{/* Status da aplicação */}
				<div className="mb-6">
					<AppStatusIndicator
						isOnline={isOnline}
						lastChecked={lastChecked}
						onRecheck={recheck}
					/>
				</div>

				{/* Card de ações */}
				<div className="glass-effect rounded-2xl p-8 space-y-6">
					<h2 className="text-2xl font-semibold mb-6">Acessar Aplicação</h2>
					
					{isOnline === false ? (
						<div className="text-center p-6">
							<p className="text-slate-300 mb-4">
								A aplicação está temporariamente indisponível.
							</p>
							<Button 
								onClick={recheck}
								variant="outline"
								size="lg"
							>
								Tentar Novamente
							</Button>
						</div>
					) : (
						<>
							<p className="text-slate-300 mb-6">
								Você será redirecionado automaticamente em <span className={`font-bold text-${color}-400`}>{countdown}</span> segundos, ou escolha uma opção abaixo:
							</p>
							
							{/* Botões de ação */}
							<div className="grid gap-4">
								<Button 
									onClick={redirectNow}
									size="lg" 
									className="w-full h-16 text-lg"
									disabled={isOnline === false}
								>
									<IconComponent className="h-6 w-6 mr-3" />
									Ir para {appName}
								</Button>

								<Button 
									onClick={openInNewTab}
									variant="outline" 
									size="lg" 
									className="w-full h-12"
									disabled={isOnline === false}
								>
									<ExternalLink className="h-5 w-5 mr-2" />
									Abrir em Nova Aba
								</Button>

								<Button 
									onClick={goBack}
									variant="ghost" 
									size="lg" 
									className="w-full h-12"
								>
									<ArrowLeft className="h-5 w-5 mr-2" />
									Voltar à Homepage
								</Button>
							</div>
						</>
					)}

					{/* Informações da URL */}
					<div className="text-sm text-slate-400 pt-4 border-t border-slate-700">
						<p>URL: <code className={`bg-slate-800 px-2 py-1 rounded text-${color}-400`}>{appUrl}</code></p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppRedirectPage;
