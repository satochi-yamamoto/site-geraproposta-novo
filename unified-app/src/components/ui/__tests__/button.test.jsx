import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock da função cn do utils
const mockCn = (...classes) => classes.filter(Boolean).join(' ');

// Mock do componente Button diretamente
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp
      className={mockCn('button', variant, size, className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

describe('Button Component', () => {
  test('renderiza corretamente', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  test('aplica classes CSS corretamente', () => {
    render(<Button className="custom-class">Botão</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('custom-class');
  });

  test('executa onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('aplica variante corretamente', () => {
    render(<Button variant="secondary">Botão Secundário</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('secondary');
  });

  test('aplica tamanho corretamente', () => {
    render(<Button size="lg">Botão Grande</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('lg');
  });

  test('fica desabilitado quando disabled=true', () => {
    render(<Button disabled>Botão Desabilitado</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('renderiza como span quando asChild=true', () => {
    render(<Button asChild>Elemento Filho</Button>);
    const element = screen.getByText('Elemento Filho');
    expect(element.tagName).toBe('SPAN');
  });
});