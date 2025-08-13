import React, { useEffect, useRef } from 'react';

function ProposalPage() {
	const iframeRef = useRef(null);

	useEffect(() => {
		// Carrega a aplicação de propostas em um iframe
		if (iframeRef.current) {
			// Em desenvolvimento, aponta para localhost:3002
			// Em produção, apontará para o deploy da aplicação
			const proposalUrl = process.env.NODE_ENV === 'development' 
				? 'http://localhost:3002' 
				: 'https://gera-proposta.geradocumentos.com.br';
			
			iframeRef.current.src = proposalUrl;
		}
	}, []);

	return (
		<div className="fixed inset-0 top-16 bottom-0">
			<iframe
				ref={iframeRef}
				className="w-full h-full border-0"
				title="Gera Proposta - Gerador de Propostas Comerciais com IA"
				sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
				allow="clipboard-read; clipboard-write"
			/>
		</div>
	);
}

export default ProposalPage;
