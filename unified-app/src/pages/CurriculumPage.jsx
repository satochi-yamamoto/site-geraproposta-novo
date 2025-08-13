import React from 'react';
import { User } from 'lucide-react';
import AppLauncher from '@/components/AppLauncher';

function CurriculumPage() {
	const curriculumUrl = process.env.NODE_ENV === 'development' 
		? 'http://localhost:3001' 
		: 'https://curriculo-ia.geradocumentos.com.br';

	return (
		<AppLauncher
			appName="Currículo IA"
			appUrl={curriculumUrl}
			description="Gerador de Currículos com Inteligência Artificial"
			icon={<User className="h-12 w-12 text-white" />}
		/>
	);
}

export default CurriculumPage;
