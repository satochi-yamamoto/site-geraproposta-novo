import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileCheck, Users, AlertTriangle } from 'lucide-react';

function TermsOfService() {
	return (
		<div className="container mx-auto px-4 py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-4xl mx-auto"
			>
				<div className="text-center mb-12">
					<Scale className="h-16 w-16 text-blue-400 mx-auto mb-4" />
					<h1 className="text-4xl font-bold mb-4">Termos de Uso</h1>
					<p className="text-xl text-slate-300">
						Condições claras para o uso de nossos serviços
					</p>
				</div>

				<div className="glass-effect rounded-2xl p-8 space-y-8">
					<section>
						<div className="flex items-center mb-4">
							<FileCheck className="h-6 w-6 text-blue-400 mr-3" />
							<h2 className="text-2xl font-semibold">Aceitação dos Termos</h2>
						</div>
						<div className="text-slate-300 space-y-4">
							<p>
								Ao utilizar nossos serviços, você concorda com estes termos de uso. Se não concordar com qualquer parte destes termos, 
								não utilize nossos serviços.
							</p>
						</div>
					</section>

					<section>
						<div className="flex items-center mb-4">
							<Users className="h-6 w-6 text-blue-400 mr-3" />
							<h2 className="text-2xl font-semibold">Uso dos Serviços</h2>
						</div>
						<div className="text-slate-300 space-y-4">
							<p>
								Nossos serviços são destinados ao uso profissional e educacional. Você concorda em:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Fornecer informações verdadeiras e precisas</li>
								<li>Não utilizar os serviços para atividades ilegais</li>
								<li>Respeitar os direitos de propriedade intelectual</li>
								<li>Não tentar comprometer a segurança dos sistemas</li>
							</ul>
						</div>
					</section>

					<section>
						<div className="flex items-center mb-4">
							<FileCheck className="h-6 w-6 text-blue-400 mr-3" />
							<h2 className="text-2xl font-semibold">Propriedade Intelectual</h2>
						</div>
						<div className="text-slate-300 space-y-4">
							<p>
								Os documentos gerados são de sua propriedade, porém:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Mantemos direitos sobre nossos algoritmos e tecnologia</li>
								<li>Templates e formatos são licenciados para seu uso</li>
								<li>Não reivindicamos propriedade sobre suas informações pessoais</li>
								<li>Você pode usar os documentos gerados livremente</li>
							</ul>
						</div>
					</section>

					<section>
						<div className="flex items-center mb-4">
							<Scale className="h-6 w-6 text-blue-400 mr-3" />
							<h2 className="text-2xl font-semibold">Limitações de Responsabilidade</h2>
						</div>
						<div className="text-slate-300 space-y-4">
							<p>
								Nossos serviços são fornecidos "como estão". Não garantimos:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Que os documentos garantam sucesso profissional</li>
								<li>Disponibilidade ininterrupta dos serviços</li>
								<li>Ausência completa de erros nos documentos gerados</li>
								<li>Adequação para todas as situações específicas</li>
							</ul>
						</div>
					</section>

					<section>
						<div className="flex items-center mb-4">
							<AlertTriangle className="h-6 w-6 text-blue-400 mr-3" />
							<h2 className="text-2xl font-semibold">Suspensão e Rescisão</h2>
						</div>
						<div className="text-slate-300 space-y-4">
							<p>
								Reservamos o direito de suspender ou encerrar o acesso aos nossos serviços em caso de:
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Violação destes termos de uso</li>
								<li>Uso fraudulento ou abusivo dos serviços</li>
								<li>Atividades que prejudiquem outros usuários</li>
								<li>Necessidades de manutenção ou atualização</li>
							</ul>
						</div>
					</section>

					<section>
						<div className="flex items-center mb-4">
							<Scale className="h-6 w-6 text-blue-400 mr-3" />
							<h2 className="text-2xl font-semibold">Lei Aplicável</h2>
						</div>
						<div className="text-slate-300 space-y-4">
							<p>
								Estes termos são regidos pela legislação brasileira. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
							</p>
						</div>
					</section>

					<section className="border-t border-slate-700 pt-6">
						<h3 className="text-lg font-semibold mb-3">Alterações nos Termos</h3>
						<p className="text-slate-300">
							Podemos atualizar estes termos periodicamente. Alterações significativas serão comunicadas por email ou 
							através de avisos em nosso site. O uso continuado após as alterações constitui aceitação dos novos termos.
						</p>
					</section>

					<section className="border-t border-slate-700 pt-6">
						<h3 className="text-lg font-semibold mb-3">Contato</h3>
						<p className="text-slate-300">
							Para dúvidas sobre estes termos, entre em contato: <span className="text-blue-400">legal@geradocumentos.com.br</span>
						</p>
					</section>

					<section className="border-t border-slate-700 pt-6">
						<p className="text-sm text-slate-400">
							Termos atualizados em {new Date().toLocaleDateString('pt-BR')} - Versão 1.0
						</p>
					</section>
				</div>
			</motion.div>
		</div>
	);
}

export default TermsOfService;
