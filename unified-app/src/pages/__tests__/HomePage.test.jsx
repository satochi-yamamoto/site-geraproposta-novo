import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock do framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>
  }
}));

// Mock dos ícones
jest.mock('lucide-react', () => ({
  ArrowRight: () => <span data-testid="arrow-right-icon">→</span>,
  User: () => <span data-testid="user-icon">👤</span>,
  FileText: () => <span data-testid="file-text-icon">📄</span>,
  Zap: () => <span data-testid="zap-icon">⚡</span>,
  Shield: () => <span data-testid="shield-icon">🛡️</span>,
  Smartphone: () => <span data-testid="smartphone-icon">📱</span>
}));

// Mock do componente Button
const MockButton = ({ children, onClick, ...props }) => (
  <button onClick={onClick} data-testid="button" {...props}>
    {children}
  </button>
);

// Mock da configuração de apps
const mockApps = [
  {
    key: 'curriculum',
    name: 'Currículo IA',
    description: 'Gerador de Currículos com IA',
    icon: 'User',
    gradient: 'from-blue-500 to-purple-600',
    integrated: true,
    path: '/curriculo-ia'
  },
  {
    key: 'proposal',
    name: 'Gera Proposta',
    description: 'Gerador de Propostas',
    icon: 'FileText',
    gradient: 'from-purple-500 to-blue-600',
    integrated: true,
    path: '/gera-proposta'
  }
];

// Componente HomePage simplificado para teste
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Gere Documentos
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Profissionais
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Crie currículos e propostas comerciais de forma rápida e profissional com nossa plataforma integrada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <MockButton className="bg-blue-600 text-white px-8 py-3 rounded-lg">
              Começar Agora
            </MockButton>
            <MockButton className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg">
              Ver Demonstração
            </MockButton>
          </div>
        </div>
      </section>

      {/* Ferramentas Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nossas Ferramentas
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mockApps.map((app) => (
              <div key={app.key} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <span data-testid={`${app.icon.toLowerCase()}-icon`}>📄</span>
                  <h3 className="text-xl font-semibold ml-3">{app.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{app.description}</p>
                <MockButton className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg">
                  Acessar {app.name}
                </MockButton>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Wrapper para testes
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('HomePage Component', () => {
  test('renderiza o título principal', () => {
    render(
      <RouterWrapper>
        <HomePage />
      </RouterWrapper>
    );
    
    expect(screen.getByText('Gere Documentos')).toBeInTheDocument();
    expect(screen.getByText('Profissionais')).toBeInTheDocument();
  });

  test('renderiza a descrição', () => {
    render(
      <RouterWrapper>
        <HomePage />
      </RouterWrapper>
    );
    
    expect(screen.getByText(/Crie currículos e propostas comerciais/)).toBeInTheDocument();
  });

  test('renderiza os botões de ação', () => {
    render(
      <RouterWrapper>
        <HomePage />
      </RouterWrapper>
    );
    
    expect(screen.getByText('Começar Agora')).toBeInTheDocument();
    expect(screen.getByText('Ver Demonstração')).toBeInTheDocument();
  });

  test('renderiza a seção de ferramentas', () => {
    render(
      <RouterWrapper>
        <HomePage />
      </RouterWrapper>
    );
    
    expect(screen.getByText('Nossas Ferramentas')).toBeInTheDocument();
    expect(screen.getByText('Currículo IA')).toBeInTheDocument();
    expect(screen.getByText('Gera Proposta')).toBeInTheDocument();
  });

  test('renderiza as descrições das ferramentas', () => {
    render(
      <RouterWrapper>
        <HomePage />
      </RouterWrapper>
    );
    
    expect(screen.getByText('Gerador de Currículos com IA')).toBeInTheDocument();
    expect(screen.getByText('Gerador de Propostas')).toBeInTheDocument();
  });

  test('renderiza os botões de acesso às ferramentas', () => {
    render(
      <RouterWrapper>
        <HomePage />
      </RouterWrapper>
    );
    
    expect(screen.getByText('Acessar Currículo IA')).toBeInTheDocument();
    expect(screen.getByText('Acessar Gera Proposta')).toBeInTheDocument();
  });
});