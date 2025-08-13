import React from 'react';
import { FileText } from 'lucide-react';
import AppRedirectPage from '@/components/AppRedirectPage';
import { APP_CONFIG, getAppUrl } from '@/config/apps';

function ProposalPage() {
	const appConfig = APP_CONFIG.proposal;
	const appUrl = getAppUrl('proposal');

	return (
		<AppRedirectPage
			appName={appConfig.name}
			appUrl={appUrl}
			description={appConfig.description}
			icon={FileText}
			gradient={appConfig.gradient}
			color={appConfig.color}
		/>
	);
}

export default ProposalPage;
