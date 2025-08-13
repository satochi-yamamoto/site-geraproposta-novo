import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, FileText, ArrowLeft, Copy } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

function CurriculumResultPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [curriculoData, setCurriculoData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('curriculoData');
    if (data) {
      setCurriculoData(JSON.parse(data));
    } else {
      navigate('/curriculo-ia');
    }
  }, [navigate]);

  const handleDownloadPDF = () => {
    // Simulação de download
    toast({
      title: "Download iniciado",
      description: "Seu currículo está sendo baixado..."
    });
  };

  const handleCopyContent = () => {
    if (curriculoData?.generatedContent) {
      navigator.clipboard.writeText(curriculoData.generatedContent);
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "Conteúdo do currículo copiado para a área de transferência"
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNewCurriculo = () => {
    localStorage.removeItem('curriculoData');
    navigate('/curriculo-ia');
  };

  if (!curriculoData) {
    return null;
  }

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <CheckCircle className="relative w-24 h-24 text-green-400" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Currículo Gerado</span>
            <br />
            <span className="text-white">com Sucesso!</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Seu currículo profissional está pronto! Você pode baixar, copiar ou fazer modificações.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button 
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl"
          >
            <Download className="w-5 h-5 mr-2" />
            Baixar PDF
          </Button>

          <Button 
            onClick={handleCopyContent}
            variant="outline"
            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-8 py-3 text-lg font-semibold rounded-xl"
          >
            <Copy className="w-5 h-5 mr-2" />
            {copied ? 'Copiado!' : 'Copiar Conteúdo'}
          </Button>

          <Button 
            onClick={handleNewCurriculo}
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-800 px-8 py-3 text-lg font-semibold rounded-xl"
          >
            <FileText className="w-5 h-5 mr-2" />
            Novo Currículo
          </Button>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Preview do Currículo</h2>
            <Button 
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="prose prose-invert max-w-none">
              <div 
                className="text-gray-300 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ 
                  __html: curriculoData.generatedContent
                    .replace(/###\s+(.+)/g, '<h3 class="text-xl font-bold text-white mb-3 mt-6">$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                    .replace(/^\*\s+(.+)/gm, '<li class="ml-4">$1</li>')
                    .replace(/📧|📱/g, '<span class="text-blue-400">$&</span>')
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Features Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 text-center"
        >
          <div className="glass-effect rounded-xl p-6">
            <FileText className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Formato PDF</h3>
            <p className="text-gray-400 text-sm">
              Currículo em formato PDF profissional, pronto para envio
            </p>
          </div>
          
          <div className="glass-effect rounded-xl p-6">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Otimizado</h3>
            <p className="text-gray-400 text-sm">
              Layout moderno e otimizado para sistemas de recrutamento
            </p>
          </div>
          
          <div className="glass-effect rounded-xl p-6">
            <Download className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Download Rápido</h3>
            <p className="text-gray-400 text-sm">
              Baixe imediatamente ou copie o conteúdo para editar
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CurriculumResultPage;
