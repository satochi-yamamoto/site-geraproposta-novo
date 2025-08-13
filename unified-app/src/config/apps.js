/**
 * Configuração centralizada das aplicações
 */

export const APP_CONFIG = {
	curriculum: {
		name: 'Currículo IA',
		description: 'Gerador de Currículos com Inteligência Artificial',
		url: {
			development: '/curriculo-ia', // Agora é integrado
			production: '/curriculo-ia'   // Também integrado em produção
		},
		path: '/curriculo-ia',
		icon: 'User',
		gradient: 'from-blue-500 to-purple-600',
		color: 'blue',
		integrated: true // Marca como integrado
	},
	
	proposal: {
		name: 'Gera Proposta',
		description: 'Gerador de Propostas para MEIs e Freelancers',
		url: {
			development: '/gera-proposta', // Agora é integrado
			production: '/gera-proposta'   // Também integrado em produção
		},
		path: '/gera-proposta',
		icon: 'FileText',
		gradient: 'from-purple-500 to-blue-600',
		color: 'purple',
		integrated: true // Marca como integrado
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

export const isAppIntegrated = (appKey) => {
	return APP_CONFIG[appKey]?.integrated || false;
};
