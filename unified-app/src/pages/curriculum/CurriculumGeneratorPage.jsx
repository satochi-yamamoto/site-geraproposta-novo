import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TagInput } from '@/components/curriculum/TagInput';
import { useToast } from '@/hooks/useToast';
import { FileText, Sparkles, Zap, Target } from 'lucide-react';

function CurriculumGeneratorPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cargoDesejado: '',
    email: '',
    telefone: '',
    tecnologias: [],
    experiencias: '',
    formacao: ''
  });

  const handleTecnologiasChange = (tecnologias) => {
    setFormData(prev => ({ ...prev, tecnologias }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.nomeCompleto.trim() || !formData.cargoDesejado.trim() || 
        !formData.email.trim() || !formData.telefone.trim() || 
        formData.tecnologias.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const prompt = `Crie um currículo para um profissional de tecnologia com base nas seguintes informações. Formate a saída em Markdown, utilizando títulos (###) para as seções e listas com marcadores (*) para itens.

**Nome:** ${formData.nomeCompleto}
**Cargo Desejado:** ${formData.cargoDesejado}
**Email:** ${formData.email}
**Telefone:** ${formData.telefone}
**Tecnologias:** ${formData.tecnologias.join(', ')}
**Experiência:** ${formData.experiencias}
**Formação:** ${formData.formacao}

O currículo deve incluir as seguintes seções:
1. **Resumo Profissional:** Um parágrafo conciso e impactante.
2. **Tecnologias:** Uma lista de tecnologias mencionadas.
3. **Experiência Profissional:** Baseado nas experiências fornecidas.
4. **Formação:** Baseado na formação fornecida.
5. **Projetos:** Se mencionado nas experiências.

Mantenha um tom profissional e moderno, destacando as competências técnicas e adequado para o mercado de tecnologia brasileiro.`;

      // Simulação de API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      const generatedContent = `### ${formData.nomeCompleto}
**${formData.cargoDesejado}**

📧 ${formData.email} | 📱 ${formData.telefone}

### Resumo Profissional
Profissional de tecnologia especializado em ${formData.cargoDesejado.toLowerCase()}, com experiência em ${formData.tecnologias.slice(0, 3).join(', ')}. Focado em desenvolver soluções inovadoras e eficientes que agregam valor ao negócio.

### Tecnologias
${formData.tecnologias.map(tech => `* ${tech}`).join('\n')}

### Experiência Profissional
${formData.experiencias || 'Experiência em desenvolvimento de software e soluções tecnológicas.'}

### Formação
${formData.formacao || 'Formação em área relacionada à tecnologia.'}

### Projetos
* Desenvolvimento de aplicações web modernas
* Implementação de soluções escaláveis
* Otimização de performance e código`;

      const curriculoCompleto = {
        ...formData,
        generatedContent: generatedContent
      };

      localStorage.setItem('curriculoData', JSON.stringify(curriculoCompleto));

      toast({
        title: "Sucesso!",
        description: "Seu currículo foi gerado com sucesso!"
      });

      navigate('/curriculo-ia/resultado');
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: `Ocorreu um erro ao gerar o currículo: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <FileText className="relative w-16 h-16 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Gerador de Currículos</span>
            <br />
            <span className="text-white">com IA</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Crie currículos profissionais para área de tecnologia usando inteligência artificial. 
            Rápido, moderno e otimizado para recrutadores tech.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>IA Avançada</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Geração Rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-400" />
              <span>Foco em Tech</span>
            </div>
          </div>
        </motion.div>

        {/* Formulário */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }} 
          className="glass-effect rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-white font-medium">
                  Nome Completo *
                </Label>
                <Input 
                  id="nome" 
                  type="text" 
                  placeholder="Seu nome completo" 
                  value={formData.nomeCompleto} 
                  onChange={e => setFormData(prev => ({ ...prev, nomeCompleto: e.target.value }))} 
                  className="bg-white/5 border-white/20 text-white placeholder-white/60" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargo" className="text-white font-medium">
                  Cargo Desejado *
                </Label>
                <Input 
                  id="cargo" 
                  type="text" 
                  placeholder="Ex: Desenvolvedor Frontend, DevOps Engineer..." 
                  value={formData.cargoDesejado} 
                  onChange={e => setFormData(prev => ({ ...prev, cargoDesejado: e.target.value }))} 
                  className="bg-white/5 border-white/20 text-white placeholder-white/60" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email *
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={formData.email} 
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                  className="bg-white/5 border-white/20 text-white placeholder-white/60" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-white font-medium">
                  Telefone *
                </Label>
                <Input 
                  id="telefone" 
                  type="tel" 
                  placeholder="(11) 99999-9999" 
                  value={formData.telefone} 
                  onChange={e => setFormData(prev => ({ ...prev, telefone: e.target.value }))} 
                  className="bg-white/5 border-white/20 text-white placeholder-white/60" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white font-medium">
                Tecnologias que Domina *
              </Label>
              <TagInput 
                value={formData.tecnologias} 
                onChange={handleTecnologiasChange} 
                placeholder="Digite uma tecnologia e pressione Enter" 
              />
              <p className="text-sm text-gray-400">
                Ex: React, Node.js, Python, Docker, AWS, etc.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experiencias" className="text-white font-medium">
                Últimas Experiências Profissionais
              </Label>
              <Textarea 
                id="experiencias" 
                placeholder="Descreva suas últimas experiências profissionais, projetos relevantes, conquistas..." 
                value={formData.experiencias} 
                onChange={e => setFormData(prev => ({ ...prev, experiencias: e.target.value }))} 
                className="bg-white/5 border-white/20 text-white placeholder-white/60 min-h-32" 
                rows={6} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="formacao" className="text-white font-medium">
                Formação
              </Label>
              <Textarea 
                id="formacao" 
                placeholder="Inclua sua formação, curso superior em tecnologia, na universidade XXX concluído no 2º semestre de 2024" 
                value={formData.formacao} 
                onChange={e => setFormData(prev => ({ ...prev, formacao: e.target.value }))} 
                className="bg-white/5 border-white/20 text-white placeholder-white/60 min-h-32" 
                rows={4} 
              />
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Gerando Currículo...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    Gerar Currículo com IA
                  </div>
                )}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.6 }} 
          className="grid md:grid-cols-3 gap-6 text-center"
        >
          <div className="glass-effect rounded-xl p-6">
            <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">IA Avançada</h3>
            <p className="text-gray-400 text-sm">Utilizamos IA para criar currículos únicos e profissionais</p>
          </div>
          
          <div className="glass-effect rounded-xl p-6">
            <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Geração Rápida</h3>
            <p className="text-gray-400 text-sm">
              Seu currículo fica pronto em segundos, formatado e otimizado
            </p>
          </div>
          
          <div className="glass-effect rounded-xl p-6">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Foco em Tech</h3>
            <p className="text-gray-400 text-sm">
              Especializado em profissionais de tecnologia e desenvolvimento
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CurriculumGeneratorPage;
