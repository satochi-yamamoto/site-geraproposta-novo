/**
 * Utilitários para tratamento de erros e logs
 */

export class AppError extends Error {
	constructor(message, code = 'GENERIC_ERROR', context = {}) {
		super(message);
		this.name = 'AppError';
		this.code = code;
		this.context = context;
		this.timestamp = new Date().toISOString();
	}
}

export const logError = (error, context = {}) => {
	// Only log errors in development mode
	if (import.meta.env.DEV) {
		console.error('App Error:', {
			message: error.message,
			code: error.code || 'UNKNOWN',
			context: { ...context, ...error.context },
			timestamp: error.timestamp || new Date().toISOString(),
			stack: error.stack
		});
	}
};

export const handleAsyncError = (asyncFn) => {
	return async (...args) => {
		try {
			return await asyncFn(...args);
		} catch (error) {
			logError(error);
			throw error;
		}
	};
};

export const withErrorBoundary = (Component, fallback = null) => {
	return function ErrorBoundaryWrapper(props) {
		try {
			return <Component {...props} />;
		} catch (error) {
			logError(error, { component: Component.name, props });
			return fallback || (
				<div className="text-center p-8">
					<p className="text-red-400">Algo deu errado. Tente recarregar a página.</p>
				</div>
			);
		}
	};
};
