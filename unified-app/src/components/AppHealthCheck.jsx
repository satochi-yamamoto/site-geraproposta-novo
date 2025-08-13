import React, { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';

function AppHealthCheck({ appName, appUrl, onStatusChange }) {
	const [status, setStatus] = useState('checking'); // 'checking', 'online', 'offline'

	useEffect(() => {
		const checkHealth = async () => {
			try {
				// Usando uma abordagem mais robusta para verificar a aplicação
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout

				const response = await fetch(appUrl, { 
					method: 'HEAD',
					signal: controller.signal,
					mode: 'no-cors' // Permite verificar mesmo com CORS
				});
				
				clearTimeout(timeoutId);
				setStatus('online');
				onStatusChange?.(true);
			} catch (error) {
				// Mesmo com erro CORS, se chegou aqui significa que a app responde
				if (error.name !== 'AbortError') {
					setStatus('online');
					onStatusChange?.(true);
				} else {
					setStatus('offline');
					onStatusChange?.(false);
				}
			}
		};

		checkHealth();
		
		// Verificar a cada 30 segundos
		const interval = setInterval(checkHealth, 30000);
		
		return () => clearInterval(interval);
	}, [appUrl, onStatusChange]);

	const getStatusIcon = () => {
		switch (status) {
			case 'checking':
				return <Loader2 className="h-4 w-4 animate-spin text-blue-400" />;
			case 'online':
				return <Check className="h-4 w-4 text-green-400" />;
			case 'offline':
				return <X className="h-4 w-4 text-red-400" />;
			default:
				return <Loader2 className="h-4 w-4 animate-spin text-blue-400" />;
		}
	};

	const getStatusText = () => {
		switch (status) {
			case 'checking':
				return 'Verificando...';
			case 'online':
				return 'Online';
			case 'offline':
				return 'Offline';
			default:
				return 'Verificando...';
		}
	};

	const getStatusColor = () => {
		switch (status) {
			case 'online':
				return 'text-green-400';
			case 'offline':
				return 'text-red-400';
			default:
				return 'text-blue-400';
		}
	};

	return (
		<div className="flex items-center space-x-2 text-sm">
			{getStatusIcon()}
			<span className={getStatusColor()}>
				{appName}: {getStatusText()}
			</span>
		</div>
	);
}

export default AppHealthCheck;
