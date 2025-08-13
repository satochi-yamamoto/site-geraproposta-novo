import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Code, Briefcase, Zap, Target, Star, Users, CheckCircle } from 'lucide-react';
import { getAllApps } from '@/config/apps';

function HomePage() {
	const apps = getAllApps();
	
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative py-20 lg:py-32 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
				<div className="container mx-auto px-4 relative z-10">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center lg:text-left"
						>
							<h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text">
								Gere documentos profissionais com Inteligência Artificial
							</h1>
							<p className="text-xl text-slate-300 mb-8 leading-relaxed">
								Ferramentas especializadas para criar currículos otimizados para área de tecnologia e propostas comerciais profissionais. Rápido, moderno e otimizado para recrutadores tech.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								{apps.slice(0, 2).map((app) => (
									<Button 
										key={app.key}
										asChild 
										size="lg" 
										className={`${app.key === 'curriculum' ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'border-slate-600 hover:bg-slate-800'}`}
										variant={app.key === 'curriculum' ? 'default' : 'outline'}
									>
										<Link to={app.path}>
											{app.key === 'curriculum' ? <Code className="mr-2 h-5 w-5" /> : <Briefcase className="mr-2 h-5 w-5" />}
											{app.key === 'curriculum' ? 'Criar Currículo Tech' : 'Gerar Proposta'}
										</Link>
									</Button>
								))}
							</div>
						</motion.div>
						
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="hidden lg:block"
						>
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
								<img 
									src="/images/document-creation-illustration.svg" 
									alt="Criação de documentos com IA" 
									className="relative z-10 w-full max-w-lg mx-auto floating-animation"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Tools Section */}
			<section id="ferramentas" className="py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl font-bold mb-6 text-slate-100">Ferramentas Especializadas</h2>
						<p className="text-xl text-slate-300 max-w-3xl mx-auto">
							Soluções com IA para profissionais de tecnologia e empresários modernos.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Currículo IA */}
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.1 }}
							viewport={{ once: true }}
							className="glass-effect rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
						>
							<div className="text-center mb-6">
								<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
									<Code className="h-8 w-8 text-white" />
								</div>
								<h3 className="text-2xl font-bold text-slate-100 mb-4">Currículo para Tech</h3>
								<p className="text-slate-300 leading-relaxed">
									Crie currículos otimizados para área de tecnologia. Templates modernos, otimizados para ATS e focados em habilidades técnicas para programadores e desenvolvedores.
								</p>
							</div>
							<Button asChild className="w-full">
								<Link to="/curriculo-ia">Criar Currículo</Link>
							</Button>
						</motion.div>

						{/* Gera Proposta */}
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
							className="glass-effect rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
						>
							<div className="text-center mb-6">
								<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
									<Briefcase className="h-8 w-8 text-white" />
								</div>
								<h3 className="text-2xl font-bold text-slate-100 mb-4">Gerador de Propostas</h3>
								<p className="text-slate-300 leading-relaxed">
									Gere propostas comerciais profissionais para MEI e freelancers. Personalize, visualize e baixe em PDF otimizado com design moderno.
								</p>
							</div>
							<Button asChild className="w-full">
								<Link to="/gera-proposta">Gerar Proposta</Link>
							</Button>
						</motion.div>

						{/* Política de Privacidade */}
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							viewport={{ once: true }}
							className="glass-effect rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
						>
							<div className="text-center mb-6">
								<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
									<FileText className="h-8 w-8 text-white" />
								</div>
								<h3 className="text-2xl font-bold text-slate-100 mb-4">Políticas e Termos</h3>
								<p className="text-slate-300 leading-relaxed">
									Documentos legais claros e compreensíveis. Políticas de privacidade e termos de uso adaptados ao seu negócio digital.
								</p>
							</div>
							<Button asChild variant="outline" className="w-full">
								<Link to="/politica-privacidade">Ver Documentos</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section id="beneficios" className="py-20 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl font-bold mb-6 text-slate-100">Por que escolher nossas ferramentas?</h2>
						<p className="text-xl text-slate-300 max-w-3xl mx-auto">
							Desenvolvidas especificamente para profissionais de tecnologia que precisam de documentos de alta qualidade.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{ icon: Zap, title: "Rápido e Eficiente", desc: "Gere documentos em minutos, não horas" },
							{ icon: Target, title: "Otimizado para Tech", desc: "Focado em profissionais de tecnologia" },
							{ icon: Star, title: "Alta Qualidade", desc: "Templates profissionais e modernos" },
							{ icon: CheckCircle, title: "Totalmente Gratuito", desc: "Sem custos ocultos ou limitações" }
						].map((benefit, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="text-center"
							>
								<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
									<benefit.icon className="h-8 w-8 text-white" />
								</div>
								<h3 className="text-xl font-bold text-slate-100 mb-2">{benefit.title}</h3>
								<p className="text-slate-300">{benefit.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl font-bold mb-6 text-slate-100">Feedback da Comunidade Tech</h2>
						<p className="text-xl text-slate-300 max-w-3xl mx-auto">
							Desenvolvedores e profissionais de tecnologia que já usaram nossas ferramentas.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								quote: "O Currículo IA me ajudou a conseguir meu emprego dos sonhos. O recrutador elogiou a estrutura e clareza do meu currículo.",
								author: "Carlos Silva",
								role: "Desenvolvedor Front-end"
							},
							{
								quote: "Como freelancer, o Gera Proposta mudou meu jogo. Agora fecho contratos com propostas profissionais em minutos.",
								author: "Ana Oliveira",
								role: "Designer Gráfica Freelancer"
							},
							{
								quote: "Finalmente uma ferramenta que cria políticas de privacidade compreensíveis e adaptadas ao meu negócio.",
								author: "Roberto Santos",
								role: "Empreendedor Digital"
							}
						].map((testimonial, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								viewport={{ once: true }}
								className="glass-effect rounded-2xl p-8"
							>
								<p className="text-slate-300 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
								<div className="flex items-center">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
										<Users className="h-6 w-6 text-white" />
									</div>
									<div>
										<h4 className="font-bold text-slate-100">{testimonial.author}</h4>
										<p className="text-slate-400 text-sm">{testimonial.role}</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20">
				<div className="container mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl font-bold mb-6 text-slate-100">Pronto para criar seus documentos com IA?</h2>
						<p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
							Experimente agora mesmo nossas ferramentas e economize horas de trabalho.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
								<Link to="/curriculo-ia">Criar Currículo</Link>
							</Button>
							<Button asChild variant="outline" size="lg" className="border-slate-600 hover:bg-slate-800">
								<Link to="/gera-proposta">Gerar Proposta</Link>
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}

export default HomePage;
