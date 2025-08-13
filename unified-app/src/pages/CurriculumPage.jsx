import React, { useEffect, useRef } from 'react';

function CurriculumPage() {
	const iframeRef = useRef(null);

	useEffect(() => {
		// Carrega a aplicação do currículo em um iframe
		if (iframeRef.current) {
			// Em desenvolvimento, aponta para localhost:3001
			// Em produção, apontará para o deploy da aplicação
			const curriculumUrl = process.env.NODE_ENV === 'development' 
				? 'http://localhost:3001' 
				: 'https://curriculo-ia.geradocumentos.com.br';
			
			iframeRef.current.src = curriculumUrl;
		}
	}, []);

	return (
		<div className="fixed inset-0 top-16 bottom-0">
			<iframe
				ref={iframeRef}
				className="w-full h-full border-0"
				title="Currículo IA - Gerador de Currículos com Inteligência Artificial"
				sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
				allow="clipboard-read; clipboard-write"
			/>
		</div>
	);
}

export default CurriculumPage;
