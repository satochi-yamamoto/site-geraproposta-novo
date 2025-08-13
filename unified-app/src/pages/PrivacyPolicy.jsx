import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Eye, Lock } from 'lucide-react';

function PrivacyPolicy() {
	return (
		<div className="container mx-auto px-4 py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-4xl mx-auto"
			>
				<div className="text-center mb-12">
					<Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
					<h1 className="text-4xl font-bold mb-4">Política de Privacidade</h1>
					<p className="text-xl text-slate-300">
						Transparência total sobre como protegemos seus dados
					</p>
				</div>

				<div className="glass-effect rounded-2xl p-8 space-y-8">
					<section>
						<div className="flex items-center mb-4">
							<Eye className="h-6 w-6 text-blue-400 mr-3" />
							<h2 className="text-2xl font-semibold">Coleta de Informações</h2>
						</div>
						<div className="text-slate-300 space-y-4">
							<p>
								Coletamos apenas as informações necessárias para fornecer nossos serviços de criação de currículos e propostas comerciais:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Informações pessoais fornecidas voluntariamente (nome, email, experiência profissional)</li>
								<li>Dados técnicos necessários para o funcionamento das ferramentas de IA</li>
								<li>Informações de uso para melhorar nossos serviços</li>
							</ul>
						</div>
					</section>

					<section>
						<div className="flex items-center mb-4">
							<Lock className="h-6 w-6 text-blue-400 mr-3" />
							<h2 className="text-2xl font-semibold">Uso das Informações</h2>
						</div>
						<div className="text-slate-300 space-y-4">
							<p>
								Utilizamos suas informações exclusivamente para:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Gerar documentos profissionais personalizados</li>
								<li>Melhorar a qualidade de nossos algoritmos de IA</li>
								<li>Fornecer suporte técnico quando necessário</li>
								<li>Comunicar atualizações importantes sobre nossos serviços</li>
							</ul>
						</div>
					</section>

					<section>
						<div className="flex items-center mb-4">
							<Shield className="h-6 w-6 text-blue-400 mr-3" />
							<h2 className="text-2xl font-semibold">Proteção de Dados</h2>
						</div>
						<div className="text-slate-300 space-y-4">
							<p>
								Implementamos medidas de segurança rigorosas:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Criptografia de ponta a ponta para todos os dados</li>
								<li>Armazenamento seguro em servidores protegidos</li>
								<li>Acesso restrito apenas a pessoal autorizado</li>
								<li>Monitoramento contínuo de segurança</li>
							</ul>
						</div>
					</section>

					<section>
						<div className="flex items-center mb-4">
							<FileText className="h-6 w-6 text-blue-400 mr-3" />
							<h2 className="text-2xl font-semibold">Seus Direitos</h2>
						</div>
						<div className="text-slate-300 space-y-4">
							<p>
								Você tem direito a:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Acessar todos os dados que temos sobre você</li>
								<li>Solicitar correção de informações incorretas</li>
								<li>Excluir seus dados de nossos sistemas</li>
								<li>Revogar o consentimento a qualquer momento</li>
							</ul>
						</div>
					</section>

					<section className="border-t border-slate-700 pt-6">
						<h3 className="text-lg font-semibold mb-3">Contato</h3>
						<p className="text-slate-300">
							Para exercer seus direitos ou esclarecer dúvidas sobre nossa política de privacidade, 
							entre em contato conosco através do email: <span className="text-blue-400">privacidade@geradocumentos.com.br</span>
						</p>
					</section>

					<section className="border-t border-slate-700 pt-6">
						<p className="text-sm text-slate-400">
							Esta política foi atualizada em {new Date().toLocaleDateString('pt-BR')} e está em conformidade com a LGPD (Lei Geral de Proteção de Dados).
						</p>
					</section>
				</div>
			</motion.div>
		</div>
	);
}

export default PrivacyPolicy;
