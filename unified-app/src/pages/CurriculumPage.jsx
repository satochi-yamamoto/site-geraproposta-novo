import React from 'react';
import { User } from 'lucide-react';
import AppRedirectPage from '@/components/AppRedirectPage';
import { APP_CONFIG, getAppUrl } from '@/config/apps';

function CurriculumPage() {
	const appConfig = APP_CONFIG.curriculum;
	const appUrl = getAppUrl('curriculum');

	return (
		<AppRedirectPage
			appName={appConfig.name}
			appUrl={appUrl}
			description={appConfig.description}
			icon={User}
			gradient={appConfig.gradient}
			color={appConfig.color}
		/>
	);
}

export default CurriculumPage;
