import { useState, useCallback } from 'react';
import { logError, AppError } from '@/lib/errorHandling.jsx';

/**rt { useState, useEffect, useCallback } from 'react';
import { logError, AppError } from '@/lib/errorHandling';

/**
 * Hook para verificar se uma URL está acessível
 */
export const useUrlValidator = (url, checkInterval = 30000) => {
	const [isOnline, setIsOnline] = useState(null); // null = loading, true = online, false = offline
	const [lastChecked, setLastChecked] = useState(null);
	const [error, setError] = useState(null);

	const checkUrl = useCallback(async (urlToCheck) => {
		if (!urlToCheck) {
			setIsOnline(false);
			setError(new AppError('URL não fornecida', 'INVALID_URL'));
			return;
		}

		try {
			setError(null);
			
			// Verificação simplificada para desenvolvimento local
			if (urlToCheck.includes('localhost')) {
				// Para localhost, assumimos que está online se chegamos até aqui
				setIsOnline(true);
				setLastChecked(new Date());
				return;
			}

			// Para URLs de produção, fazer verificação real
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 5000);

			await fetch(urlToCheck, {
				method: 'HEAD',
				signal: controller.signal,
				mode: 'no-cors'
			});

			clearTimeout(timeoutId);
			setIsOnline(true);
			setLastChecked(new Date());
		} catch (error) {
			if (error.name === 'AbortError') {
				setError(new AppError('Timeout na verificação', 'TIMEOUT', { url: urlToCheck }));
			} else {
				setError(new AppError('Falha na verificação da URL', 'FETCH_ERROR', { url: urlToCheck, originalError: error.message }));
			}
			
			logError(error, { url: urlToCheck, context: 'useUrlValidator' });
			setIsOnline(false);
			setLastChecked(new Date());
		}
	}, []);

	useEffect(() => {
		if (!url) return;

		// Verificação inicial
		checkUrl(url);

		// Verificação periódica apenas em produção
		if (process.env.NODE_ENV === 'production') {
			const interval = setInterval(() => {
				checkUrl(url);
			}, checkInterval);

			return () => clearInterval(interval);
		}
	}, [url, checkInterval, checkUrl]);

	return {
		isOnline,
		lastChecked,
		error,
		recheck: () => checkUrl(url)
	};
};
