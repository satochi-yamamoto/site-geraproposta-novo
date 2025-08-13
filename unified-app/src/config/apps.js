/**
 * Configuração centralizada das aplicações
 */

export const APP_CONFIG = {
	curriculum: {
		name: 'Currículo IA',
		description: 'Gerador de Currículos com Inteligência Artificial',
		url: {
			development: 'http://localhost:3001',
			production: 'https://curriculo-ia.geradocumentos.com.br'
		},
		path: '/curriculo-ia',
		icon: 'User',
		gradient: 'from-blue-500 to-purple-600',
		color: 'blue'
	},
	
	proposal: {
		name: 'Gera Proposta',
		description: 'Gerador de Propostas para MEIs e Freelancers',
		url: {
			development: 'http://localhost:3002',
			production: 'https://gerador-propostas.geradocumentos.com.br'
		},
		path: '/gera-proposta',
		icon: 'FileText',
		gradient: 'from-purple-500 to-blue-600',
		color: 'purple'
	}
};

export const getAppUrl = (appKey) => {
	const app = APP_CONFIG[appKey];
	if (!app) return null;
	
	return process.env.NODE_ENV === 'development' 
		? app.url.development 
		: app.url.production;
};

export const getAllApps = () => {
	return Object.entries(APP_CONFIG).map(([key, config]) => ({
		key,
		...config,
		currentUrl: getAppUrl(key)
	}));
};
