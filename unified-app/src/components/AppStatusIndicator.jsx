import React from 'react';
import { CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Componente para exibir status de uma aplicação
 */
const AppStatusIndicator = ({ isOnline, lastChecked, onRecheck, compact = false }) => {
	const getStatusConfig = () => {
		if (isOnline === null) {
			return {
				icon: Clock,
				color: 'text-yellow-400',
				bgColor: 'bg-yellow-400/20',
				text: 'Verificando...',
				description: 'Aguarde enquanto verificamos o status'
			};
		}
		
		if (isOnline) {
			return {
				icon: CheckCircle,
				color: 'text-green-400',
				bgColor: 'bg-green-400/20',
				text: 'Online',
				description: 'Aplicação funcionando normalmente'
			};
		}
		
		return {
			icon: XCircle,
			color: 'text-red-400',
			bgColor: 'bg-red-400/20',
			text: 'Offline',
			description: 'Aplicação temporariamente indisponível'
		};
	};

	const config = getStatusConfig();
	const StatusIcon = config.icon;

	if (compact) {
		return (
			<div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bgColor}`}>
				<StatusIcon className={`h-4 w-4 ${config.color}`} />
				<span className={`text-sm font-medium ${config.color}`}>
					{config.text}
				</span>
			</div>
		);
	}

	return (
		<div className={`rounded-lg p-4 ${config.bgColor} border border-slate-700`}>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<StatusIcon className={`h-6 w-6 ${config.color}`} />
					<div>
						<p className={`font-semibold ${config.color}`}>
							{config.text}
						</p>
						<p className="text-sm text-slate-400">
							{config.description}
						</p>
						{lastChecked && (
							<p className="text-xs text-slate-500 mt-1">
								Última verificação: {lastChecked.toLocaleTimeString()}
							</p>
						)}
					</div>
				</div>
				
				{onRecheck && (
					<Button
						variant="ghost"
						size="sm"
						onClick={onRecheck}
						className={`${config.color} hover:bg-white/10`}
					>
						<RefreshCw className="h-4 w-4" />
					</Button>
				)}
			</div>
		</div>
	);
};

export default AppStatusIndicator;
