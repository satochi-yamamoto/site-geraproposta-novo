import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProposalGeneratorPage from './proposal/ProposalGeneratorPage'
import ProposalResultPage from './proposal/ProposalResultPage'

const ProposalPage = () => {
  return (
    <Routes>
      <Route index element={<ProposalGeneratorPage />} />
      <Route path="resultado" element={<ProposalResultPage />} />
    </Routes>
  )
}

export default ProposalPage
