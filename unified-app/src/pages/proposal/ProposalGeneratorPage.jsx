import React, { useState, useEffect, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Share2, Eye, EyeOff, Building, User, FileText as FileTextIcon, Package, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/contexts/ToastContext'
import { useNavigate } from 'react-router-dom'

const USAGE_LIMIT = 5

const ProposalGeneratorPage = memo(() => {
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [showPreview, setShowPreview] = useState(true)
  const [usageCount, setUsageCount] = useState(0)
  const [activeTab, setActiveTab] = useState('company')
  
  const [formData, setFormData] = useState({
    // Dados da empresa
    companyName: '',
    companyDocument: '',
    companyPhone: '',
    companyEmail: '',
    companyAddress: '',
    companyLogo: null,
    
    // Dados do cliente
    clientName: '',
    clientDocument: '',
    clientPhone: '',
    clientEmail: '',
    clientAddress: '',
    
    // Proposta
    proposalTitle: 'Proposta Comercial',
    proposalDescription: '',
    validityDays: '30',
    paymentTerms: 'À vista',
    
    // Serviços/Produtos
    items: [
      { description: '', quantity: 1, unitPrice: 0, total: 0 }
    ],
    
    // Personalização
    primaryColor: '#3b82f6',
    secondaryColor: '#f1f5f9',
    fontSize: '14',
    template: 'modern'
  })

  // Load usage count from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('proposalUsageCount')
    if (saved) {
      setUsageCount(parseInt(saved, 10))
    }
  }, [])

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const addItem = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]
    }))
  }, [])

  const removeItem = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }, [])

  const updateItem = useCallback((index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.items]
      newItems[index] = { ...newItems[index], [field]: value }
      
      // Calculate total if quantity or unitPrice changed
      if (field === 'quantity' || field === 'unitPrice') {
        newItems[index].total = newItems[index].quantity * newItems[index].unitPrice
      }
      
      return { ...prev, items: newItems }
    })
  }, [])

  const calculateTotal = useCallback(() => {
    return formData.items.reduce((sum, item) => sum + (item.total || 0), 0)
  }, [formData.items])

  const isFormValid = useCallback(() => {
    return (
      formData.companyName &&
      formData.clientName &&
      formData.proposalTitle &&
      formData.items.some(item => item.description && item.quantity > 0 && item.unitPrice > 0)
    )
  }, [formData])

  const handleGenerate = useCallback(async () => {
    if (usageCount >= USAGE_LIMIT) {
      showToast('Limite de uso atingido! Entre em contato para continuar usando.', 'error')
      return
    }

    if (!isFormValid()) {
      showToast('Preencha todos os campos obrigatórios.', 'error')
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newUsageCount = usageCount + 1
      setUsageCount(newUsageCount)
      localStorage.setItem('proposalUsageCount', newUsageCount.toString())

      showToast('Proposta gerada com sucesso!', 'success')
      
      // Navigate to result page with form data
      navigate('/gera-proposta/resultado', { 
        state: { proposalData: formData }
      })
    } catch (error) {
      showToast('Erro ao gerar proposta. Tente novamente.', 'error')
    }
  }, [formData, usageCount, isFormValid, showToast, navigate])

  const nextTab = useCallback(() => {
    const tabs = ['company', 'client', 'proposal', 'items', 'customization']
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }, [activeTab])

  const prevTab = useCallback(() => {
    const tabs = ['company', 'client', 'proposal', 'items', 'customization']
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }, [activeTab])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Gerador de Propostas Comerciais
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Crie propostas profissionais para seus clientes de forma rápida e eficiente
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>Usos restantes: {USAGE_LIMIT - usageCount}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Dados da Proposta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="company" className="text-xs">
                        <Building className="h-4 w-4 mr-1" />
                        Empresa
                      </TabsTrigger>
                      <TabsTrigger value="client" className="text-xs">
                        <User className="h-4 w-4 mr-1" />
                        Cliente
                      </TabsTrigger>
                      <TabsTrigger value="proposal" className="text-xs">
                        <FileTextIcon className="h-4 w-4 mr-1" />
                        Proposta
                      </TabsTrigger>
                      <TabsTrigger value="items" className="text-xs">
                        <Package className="h-4 w-4 mr-1" />
                        Itens
                      </TabsTrigger>
                      <TabsTrigger value="customization" className="text-xs">
                        <Palette className="h-4 w-4 mr-1" />
                        Visual
                      </TabsTrigger>
                    </TabsList>

                    {/* Company Tab */}
                    <TabsContent value="company" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="companyName">Nome da Empresa *</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => updateFormData('companyName', e.target.value)}
                            placeholder="Minha Empresa LTDA"
                          />
                        </div>
                        <div>
                          <Label htmlFor="companyDocument">CNPJ/CPF</Label>
                          <Input
                            id="companyDocument"
                            value={formData.companyDocument}
                            onChange={(e) => updateFormData('companyDocument', e.target.value)}
                            placeholder="00.000.000/0001-00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="companyPhone">Telefone</Label>
                          <Input
                            id="companyPhone"
                            value={formData.companyPhone}
                            onChange={(e) => updateFormData('companyPhone', e.target.value)}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                        <div>
                          <Label htmlFor="companyEmail">Email</Label>
                          <Input
                            id="companyEmail"
                            type="email"
                            value={formData.companyEmail}
                            onChange={(e) => updateFormData('companyEmail', e.target.value)}
                            placeholder="contato@minhaempresa.com"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="companyAddress">Endereço</Label>
                        <Textarea
                          id="companyAddress"
                          value={formData.companyAddress}
                          onChange={(e) => updateFormData('companyAddress', e.target.value)}
                          placeholder="Rua, número, bairro, cidade - CEP"
                          rows={2}
                        />
                      </div>
                    </TabsContent>

                    {/* Client Tab */}
                    <TabsContent value="client" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="clientName">Nome do Cliente *</Label>
                          <Input
                            id="clientName"
                            value={formData.clientName}
                            onChange={(e) => updateFormData('clientName', e.target.value)}
                            placeholder="Cliente LTDA"
                          />
                        </div>
                        <div>
                          <Label htmlFor="clientDocument">CNPJ/CPF</Label>
                          <Input
                            id="clientDocument"
                            value={formData.clientDocument}
                            onChange={(e) => updateFormData('clientDocument', e.target.value)}
                            placeholder="00.000.000/0001-00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="clientPhone">Telefone</Label>
                          <Input
                            id="clientPhone"
                            value={formData.clientPhone}
                            onChange={(e) => updateFormData('clientPhone', e.target.value)}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                        <div>
                          <Label htmlFor="clientEmail">Email</Label>
                          <Input
                            id="clientEmail"
                            type="email"
                            value={formData.clientEmail}
                            onChange={(e) => updateFormData('clientEmail', e.target.value)}
                            placeholder="cliente@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="clientAddress">Endereço</Label>
                        <Textarea
                          id="clientAddress"
                          value={formData.clientAddress}
                          onChange={(e) => updateFormData('clientAddress', e.target.value)}
                          placeholder="Rua, número, bairro, cidade - CEP"
                          rows={2}
                        />
                      </div>
                    </TabsContent>

                    {/* Proposal Tab */}
                    <TabsContent value="proposal" className="space-y-4">
                      <div>
                        <Label htmlFor="proposalTitle">Título da Proposta *</Label>
                        <Input
                          id="proposalTitle"
                          value={formData.proposalTitle}
                          onChange={(e) => updateFormData('proposalTitle', e.target.value)}
                          placeholder="Proposta Comercial"
                        />
                      </div>
                      <div>
                        <Label htmlFor="proposalDescription">Descrição</Label>
                        <Textarea
                          id="proposalDescription"
                          value={formData.proposalDescription}
                          onChange={(e) => updateFormData('proposalDescription', e.target.value)}
                          placeholder="Descrição dos serviços oferecidos..."
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="validityDays">Validade (dias)</Label>
                          <Input
                            id="validityDays"
                            type="number"
                            value={formData.validityDays}
                            onChange={(e) => updateFormData('validityDays', e.target.value)}
                            placeholder="30"
                          />
                        </div>
                        <div>
                          <Label htmlFor="paymentTerms">Condições de Pagamento</Label>
                          <Select
                            value={formData.paymentTerms}
                            onValueChange={(value) => updateFormData('paymentTerms', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="À vista">À vista</SelectItem>
                              <SelectItem value="30 dias">30 dias</SelectItem>
                              <SelectItem value="30/60 dias">30/60 dias</SelectItem>
                              <SelectItem value="30/60/90 dias">30/60/90 dias</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Items Tab */}
                    <TabsContent value="items" className="space-y-4">
                      <div className="space-y-4">
                        {formData.items.map((item, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Item {index + 1}</h4>
                              {formData.items.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeItem(index)}
                                >
                                  Remover
                                </Button>
                              )}
                            </div>
                            <div>
                              <Label>Descrição *</Label>
                              <Textarea
                                value={item.description}
                                onChange={(e) => updateItem(index, 'description', e.target.value)}
                                placeholder="Descrição do serviço/produto"
                                rows={2}
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label>Quantidade *</Label>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                                  min="1"
                                />
                              </div>
                              <div>
                                <Label>Valor Unitário *</Label>
                                <Input
                                  type="number"
                                  value={item.unitPrice}
                                  onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                                  min="0"
                                  step="0.01"
                                />
                              </div>
                              <div>
                                <Label>Total</Label>
                                <Input
                                  value={item.total.toFixed(2)}
                                  readOnly
                                  className="bg-gray-50"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button onClick={addItem} variant="outline" className="w-full">
                          Adicionar Item
                        </Button>
                        
                        <div className="text-right text-lg font-semibold">
                          Total Geral: R$ {calculateTotal().toFixed(2)}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Customization Tab */}
                    <TabsContent value="customization" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="primaryColor">Cor Principal</Label>
                          <Input
                            id="primaryColor"
                            type="color"
                            value={formData.primaryColor}
                            onChange={(e) => updateFormData('primaryColor', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="template">Template</Label>
                          <Select
                            value={formData.template}
                            onValueChange={(value) => updateFormData('template', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="modern">Moderno</SelectItem>
                              <SelectItem value="classic">Clássico</SelectItem>
                              <SelectItem value="minimal">Minimalista</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={prevTab}
                      disabled={activeTab === 'company'}
                    >
                      Anterior
                    </Button>
                    <div className="flex gap-2">
                      {activeTab !== 'customization' ? (
                        <Button onClick={nextTab}>
                          Próximo
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleGenerate}
                          disabled={!isFormValid() || usageCount >= USAGE_LIMIT}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Gerar Proposta
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Pré-visualização
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {showPreview && (
                  <CardContent>
                    <div className="border rounded-lg p-4 bg-white min-h-96 text-sm">
                      <div className="text-center border-b pb-4 mb-4">
                        <h2 className="text-xl font-bold" style={{ color: formData.primaryColor }}>
                          {formData.proposalTitle || 'Proposta Comercial'}
                        </h2>
                        {formData.companyName && (
                          <p className="text-gray-600 mt-2">{formData.companyName}</p>
                        )}
                      </div>
                      
                      {formData.clientName && (
                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Cliente:</h3>
                          <p>{formData.clientName}</p>
                        </div>
                      )}
                      
                      {formData.proposalDescription && (
                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Descrição:</h3>
                          <p className="text-gray-700">{formData.proposalDescription}</p>
                        </div>
                      )}
                      
                      {formData.items.some(item => item.description) && (
                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Itens:</h3>
                          <div className="space-y-2">
                            {formData.items.filter(item => item.description).map((item, index) => (
                              <div key={index} className="flex justify-between items-center border-b pb-2">
                                <div>
                                  <p className="font-medium">{item.description}</p>
                                  <p className="text-sm text-gray-600">
                                    {item.quantity}x R$ {item.unitPrice.toFixed(2)}
                                  </p>
                                </div>
                                <span className="font-semibold">R$ {item.total.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="text-right mt-4 pt-2 border-t">
                            <span className="text-lg font-bold" style={{ color: formData.primaryColor }}>
                              Total: R$ {calculateTotal().toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500 mt-6 pt-4 border-t">
                        <p>Proposta válida por {formData.validityDays} dias</p>
                        <p>Condições: {formData.paymentTerms}</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
})

ProposalGeneratorPage.displayName = 'ProposalGeneratorPage'

export default ProposalGeneratorPage
