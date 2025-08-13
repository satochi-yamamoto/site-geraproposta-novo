import { useState, useEffect, useCallback } from 'react';

/**
 * Hook customizado para gerenciar redirecionamento com delay
 */
export const useRedirect = (url, delay = 5000, autoRedirect = true) => {
	const [isRedirecting, setIsRedirecting] = useState(false);
	const [countdown, setCountdown] = useState(Math.ceil(delay / 1000));

	// Função para redirecionar imediatamente
	const redirectNow = useCallback(() => {
		if (!url) return;
		
		setIsRedirecting(true);
		setTimeout(() => {
			window.location.href = url;
		}, 1000);
	}, [url]);

	// Função para abrir em nova aba
	const openInNewTab = useCallback(() => {
		if (!url) return;
		window.open(url, '_blank', 'noopener,noreferrer');
	}, [url]);

	// Função para voltar
	const goBack = useCallback(() => {
		window.history.back();
	}, []);

	// Efeito para contagem regressiva e redirecionamento automático
	useEffect(() => {
		if (!autoRedirect || isRedirecting) return;

		const interval = setInterval(() => {
			setCountdown(prev => {
				if (prev <= 1) {
					clearInterval(interval);
					redirectNow();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [autoRedirect, isRedirecting, redirectNow]);

	return {
		isRedirecting,
		countdown,
		redirectNow,
		openInNewTab,
		goBack
	};
};
