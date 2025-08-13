import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CurriculumGeneratorPage from './curriculum/CurriculumGeneratorPage';
import CurriculumResultPage from './curriculum/CurriculumResultPage';

function CurriculumPage() {
	return (
		<Routes>
			<Route index element={<CurriculumGeneratorPage />} />
			<Route path="resultado" element={<CurriculumResultPage />} />
		</Routes>
	);
}

export default CurriculumPage;
