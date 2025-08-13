import React from 'react';
import { Briefcase } from 'lucide-react';
import AppLauncher from '@/components/AppLauncher';

function ProposalPage() {
	const proposalUrl = process.env.NODE_ENV === 'development' 
		? 'http://localhost:3002' 
		: 'https://gera-proposta.geradocumentos.com.br';

	return (
		<AppLauncher
			appName="Gera Proposta"
			appUrl={proposalUrl}
			description="Gerador de Propostas Comerciais com IA"
			icon={<Briefcase className="h-12 w-12 text-white" />}
		/>
	);
}

export default ProposalPage;
