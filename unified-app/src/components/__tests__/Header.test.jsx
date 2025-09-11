import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Header from '../Header';

// Mock dos ícones lucide-react
jest.mock('lucide-react', () => ({
  Menu: () => <span data-testid="menu-icon">Menu</span>,
  X: () => <span data-testid="x-icon">X</span>
}));

// Mock do componente Button
jest.mock('../ui/button', () => ({
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} data-testid="button" {...props}>
      {children}
    </button>
  )
}));

// Wrapper para React Router
const RouterWrapper = ({ children, initialEntries = ['/'] }) => (
  <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
);

describe('Header Component', () => {
  it('renderiza o logo corretamente', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    const logo = screen.getByAltText(/Geradocumentos.com.br/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo-horizontal.svg');
  });

  it('renderiza todos os itens de navegação desktop', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Currículo IA')).toBeInTheDocument();
    expect(screen.getByText('Gera Proposta')).toBeInTheDocument();
    expect(screen.getByText('Como Funciona')).toBeInTheDocument();
    expect(screen.getByText('Benefícios')).toBeInTheDocument();
  });

  it('aplica classe ativa para a página atual', () => {
    render(
      <RouterWrapper initialEntries={['/curriculo-ia']}>
        <Header />
      </RouterWrapper>
    );
    
    const curriculoLink = screen.getAllByText('Currículo IA')[0]; // Pega o primeiro (desktop)
    expect(curriculoLink).toHaveClass('text-blue-400');
  });

  it('renderiza o botão do menu mobile', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    const menuButton = screen.getByTestId('button');
    expect(menuButton).toBeInTheDocument();
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('abre e fecha o menu mobile ao clicar no botão', async () => {
    const user = userEvent.setup();
    
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    const menuButton = screen.getByTestId('button');
    
    // Menu inicialmente fechado
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();
    
    // Abre o menu
    await user.click(menuButton);
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
    
    // Fecha o menu
    await user.click(menuButton);
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('fecha o menu mobile ao clicar em um link', async () => {
    const user = userEvent.setup();
    
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    const menuButton = screen.getByTestId('button');
    
    // Abre o menu
    await user.click(menuButton);
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
    
    // Clica em um link do menu mobile
    const mobileLinks = screen.getAllByText('Home');
    const mobileHomeLink = mobileLinks[1]; // O segundo é do menu mobile
    await user.click(mobileHomeLink);
    
    // Menu deve fechar
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('renderiza links com href corretos', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Currículo IA/i })).toHaveAttribute('href', '/curriculo-ia');
    expect(screen.getByRole('link', { name: /Gera Proposta/i })).toHaveAttribute('href', '/gera-proposta');
  });

  it('aplica classes CSS corretas', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('glass-effect', 'sticky', 'top-0', 'z-50');
  });

  it('logo é um link para a home', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    const logoLink = screen.getByRole('link', { name: /Geradocumentos.com.br/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('navegação desktop está oculta em mobile', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    const desktopNav = screen.getAllByText('Home')[0].closest('nav');
    expect(desktopNav).toHaveClass('hidden', 'md:flex');
  });

  it('botão do menu mobile está oculto em desktop', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );
    
    const menuButton = screen.getByTestId('button');
    expect(menuButton).toHaveClass('md:hidden');
  });
});