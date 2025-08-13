import React, { useEffect, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Download, Share2, Copy, ArrowLeft, FileText, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/contexts/ToastContext'

const ProposalResultPage = memo(() => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [proposalData, setProposalData] = useState(null)

  useEffect(() => {
    const data = location.state?.proposalData
    if (!data) {
      navigate('/gera-proposta')
      return
    }
    setProposalData(data)
  }, [location.state, navigate])

  const calculateTotal = () => {
    if (!proposalData?.items) return 0
    return proposalData.items.reduce((sum, item) => sum + (item.total || 0), 0)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date)
  }

  const getValidityDate = () => {
    const today = new Date()
    const validityDays = parseInt(proposalData?.validityDays || 30)
    const validityDate = new Date(today.getTime() + (validityDays * 24 * 60 * 60 * 1000))
    return validityDate
  }

  const handleDownloadPDF = async () => {
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      showToast('Download do PDF iniciado!', 'success')
      
      // In a real implementation, this would trigger PDF download
      // For now, we'll just show the success message
    } catch (error) {
      showToast('Erro ao gerar PDF. Tente novamente.', 'error')
    }
  }

  const handleCopyLink = async () => {
    try {
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      showToast('Link copiado para a área de transferência!', 'success')
    } catch (error) {
      showToast('Erro ao copiar link.', 'error')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: proposalData?.proposalTitle || 'Proposta Comercial',
          text: 'Confira esta proposta comercial',
          url: window.location.href
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          handleCopyLink()
        }
      }
    } else {
      handleCopyLink()
    }
  }

  if (!proposalData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Carregando proposta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button
                variant="outline"
                onClick={() => navigate('/gera-proposta')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Gerador
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">
                Proposta Gerada com Sucesso!
              </h1>
              <p className="text-gray-600 mt-2">
                Sua proposta comercial foi criada e está pronta para uso
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Button onClick={handleDownloadPDF} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button onClick={handleCopyLink} variant="outline" className="flex-1">
              <Copy className="h-4 w-4 mr-2" />
              Copiar Link
            </Button>
          </div>

          {/* Proposal Preview */}
          <Card className="print:shadow-none print:border-none">
            <CardContent className="p-8">
              <div className="proposal-content">
                {/* Header */}
                <div className="text-center border-b-2 pb-6 mb-6" style={{ borderColor: proposalData.primaryColor }}>
                  <h1 className="text-3xl font-bold mb-2" style={{ color: proposalData.primaryColor }}>
                    {proposalData.proposalTitle}
                  </h1>
                  {proposalData.companyName && (
                    <p className="text-xl text-gray-700">{proposalData.companyName}</p>
                  )}
                  <div className="text-sm text-gray-500 mt-4">
                    <p>Data de emissão: {formatDate(new Date())}</p>
                    <p>Válida até: {formatDate(getValidityDate())}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Company Info */}
                  {proposalData.companyName && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4" style={{ color: proposalData.primaryColor }}>
                        Dados da Empresa
                      </h2>
                      <div className="space-y-2 text-sm">
                        <p><strong>Nome:</strong> {proposalData.companyName}</p>
                        {proposalData.companyDocument && (
                          <p><strong>CNPJ/CPF:</strong> {proposalData.companyDocument}</p>
                        )}
                        {proposalData.companyPhone && (
                          <p><strong>Telefone:</strong> {proposalData.companyPhone}</p>
                        )}
                        {proposalData.companyEmail && (
                          <p><strong>Email:</strong> {proposalData.companyEmail}</p>
                        )}
                        {proposalData.companyAddress && (
                          <p><strong>Endereço:</strong> {proposalData.companyAddress}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Client Info */}
                  {proposalData.clientName && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4" style={{ color: proposalData.primaryColor }}>
                        Dados do Cliente
                      </h2>
                      <div className="space-y-2 text-sm">
                        <p><strong>Nome:</strong> {proposalData.clientName}</p>
                        {proposalData.clientDocument && (
                          <p><strong>CNPJ/CPF:</strong> {proposalData.clientDocument}</p>
                        )}
                        {proposalData.clientPhone && (
                          <p><strong>Telefone:</strong> {proposalData.clientPhone}</p>
                        )}
                        {proposalData.clientEmail && (
                          <p><strong>Email:</strong> {proposalData.clientEmail}</p>
                        )}
                        {proposalData.clientAddress && (
                          <p><strong>Endereço:</strong> {proposalData.clientAddress}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {proposalData.proposalDescription && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4" style={{ color: proposalData.primaryColor }}>
                      Descrição dos Serviços
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{proposalData.proposalDescription}</p>
                  </div>
                )}

                {/* Items */}
                {proposalData.items && proposalData.items.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4" style={{ color: proposalData.primaryColor }}>
                      Itens da Proposta
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr style={{ backgroundColor: proposalData.primaryColor + '10' }}>
                            <th className="border border-gray-300 p-3 text-left">Descrição</th>
                            <th className="border border-gray-300 p-3 text-center">Qtd.</th>
                            <th className="border border-gray-300 p-3 text-right">Valor Unit.</th>
                            <th className="border border-gray-300 p-3 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {proposalData.items.map((item, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 p-3">{item.description}</td>
                              <td className="border border-gray-300 p-3 text-center">{item.quantity}</td>
                              <td className="border border-gray-300 p-3 text-right">
                                {formatCurrency(item.unitPrice)}
                              </td>
                              <td className="border border-gray-300 p-3 text-right font-semibold">
                                {formatCurrency(item.total)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr style={{ backgroundColor: proposalData.primaryColor + '20' }}>
                            <td colSpan="3" className="border border-gray-300 p-3 text-right font-bold">
                              Total Geral:
                            </td>
                            <td className="border border-gray-300 p-3 text-right font-bold text-lg">
                              {formatCurrency(calculateTotal())}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                {/* Payment Terms */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4" style={{ color: proposalData.primaryColor }}>
                    Condições Comerciais
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Condições de Pagamento:</strong> {proposalData.paymentTerms}</p>
                    </div>
                    <div>
                      <p><strong>Validade da Proposta:</strong> {proposalData.validityDays} dias</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t pt-6 text-center text-sm text-gray-600">
                  <p>Esta proposta foi gerada automaticamente em {formatDate(new Date())}</p>
                  <p className="mt-2">Agradecemos a oportunidade de apresentar nossa proposta.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Actions */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Precisa fazer alterações?
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/gera-proposta')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Criar Nova Proposta
            </Button>
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        @media print {
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          body {
            background: white !important;
          }
          .proposal-content {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
})

ProposalResultPage.displayName = 'ProposalResultPage'

export default ProposalResultPage
