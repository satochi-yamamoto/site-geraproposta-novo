document.addEventListener('DOMContentLoaded', function() {
    // Form steps navigation
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const nextStepNum = this.getAttribute('data-next');
            const nextStep = document.querySelector(`.form-step[data-step="${nextStepNum}"]`);
            
            // Validate current step before proceeding
            if (validateStep(currentStep)) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
                scrollToStep(nextStep);
                
                // Track step progress
                gtag('event', 'proposal_step', {
                    'event_category': 'engagement',
                    'event_label': `Step ${nextStepNum}`
                });
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStepNum = this.getAttribute('data-prev');
            const prevStep = document.querySelector(`.form-step[data-step="${prevStepNum}"]`);
            
            currentStep.classList.remove('active');
            prevStep.classList.add('active');
            scrollToStep(prevStep);
        });
    });
    
    function validateStep(step) {
        const inputs = step.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios antes de continuar.');
        }
        
        return isValid;
    }
    
    function scrollToStep(step) {
        window.scrollTo({
            top: step.offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    // Set default dates
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    
    document.getElementById('proposal-date').valueAsDate = today;
    document.getElementById('valid-until').valueAsDate = nextMonth;
    
    // Add service fields
    const addServiceBtn = document.getElementById('add-service');
    const servicesContainer = document.getElementById('services-container');
    let serviceCount = 1;
    
    addServiceBtn.addEventListener('click', function() {
        serviceCount++;
        const newService = document.createElement('div');
        newService.className = 'service-item';
        newService.innerHTML = `
            <hr>
            <div class="form-row">
                <div class="form-group">
                    <label for="service${serviceCount}">Serviço/Item</label>
                    <input type="text" id="service${serviceCount}" name="services[${serviceCount-1}][name]" required>
                </div>
                <div class="form-group">
                    <label for="quantity${serviceCount}">Quantidade</label>
                    <input type="number" id="quantity${serviceCount}" name="services[${serviceCount-1}][quantity]" min="1" value="1">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="unit-price${serviceCount}">Preço Unitário (R$)</label>
                    <input type="number" id="unit-price${serviceCount}" name="services[${serviceCount-1}][unit_price]" step="0.01" min="0" required>
                </div>
                <div class="form-group">
                    <label for="total-price${serviceCount}">Total (R$)</label>
                    <input type="number" id="total-price${serviceCount}" name="services[${serviceCount-1}][total_price]" step="0.01" readonly>
                </div>
            </div>
            <div class="form-group">
                <label for="description${serviceCount}">Descrição</label>
                <textarea id="description${serviceCount}" name="services[${serviceCount-1}][description]" rows="2"></textarea>
            </div>
            <button type="button" class="btn btn-small remove-service">Remover Serviço</button>
        `;
        
        servicesContainer.appendChild(newService);
        
        // Add event listeners to new service inputs
        const quantityInput = newService.querySelector(`#quantity${serviceCount}`);
        const unitPriceInput = newService.querySelector(`#unit-price${serviceCount}`);
        const totalPriceInput = newService.querySelector(`#total-price${serviceCount}`);
        
        function calculateTotal() {
            const quantity = parseFloat(quantityInput.value) || 0;
            const unitPrice = parseFloat(unitPriceInput.value) || 0;
            totalPriceInput.value = (quantity * unitPrice).toFixed(2);
        }
        
        quantityInput.addEventListener('input', calculateTotal);
        unitPriceInput.addEventListener('input', calculateTotal);
        
        // Add event listener to remove button
        newService.querySelector('.remove-service').addEventListener('click', function() {
            servicesContainer.removeChild(newService);
        });
    });
    
    // Calculate totals for initial service
    const initialQuantity = document.getElementById('quantity1');
    const initialUnitPrice = document.getElementById('unit-price1');
    const initialTotal = document.getElementById('total-price1');
    
    function calculateInitialTotal() {
        const quantity = parseFloat(initialQuantity.value) || 0;
        const unitPrice = parseFloat(initialUnitPrice.value) || 0;
        initialTotal.value = (quantity * unitPrice).toFixed(2);
    }
    
    initialQuantity.addEventListener('input', calculateInitialTotal);
    initialUnitPrice.addEventListener('input', calculateInitialTotal);
    
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // Close all answers first
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
                ans.previousElementSibling.classList.remove('active');
            });
            
            // Toggle current answer if it wasn't open
            if (!isOpen) {
                answer.style.display = 'block';
                this.classList.add('active');
            }
        });
    });
    
    // Form submission
    const proposalForm = document.getElementById('proposal-form');
    proposalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate last step
        if (validateStep(document.querySelector('.form-step.active'))) {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Gerando...';
            
            // Simulate API call (in a real scenario, this would call your backend)
            setTimeout(() => {
                // Track form completion
                gtag('event', 'proposal_generated', {
                    'event_category': 'conversion',
                    'event_label': 'Proposal Generated'
                });
                
                // Show success message and download options
                alert('Sua proposta foi gerada com sucesso! Em breve você será redirecionado para a página de download.');
                
                // Reset form button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // In a real scenario, you would redirect to the download page
                // window.location.href = '/download-proposal?generated=true';
            }, 2000);
        }
    });
    
    // Auto-fill sample data for demo purposes (remove in production)
    if (window.location.href.includes('demo=true')) {
        document.getElementById('proposal-title').value = 'Proposta de Serviços de Desenvolvimento Web';
        document.getElementById('your-company').value = 'Web Solutions Ltda';
        document.getElementById('client-company').value = 'ABC Comércio';
        document.getElementById('project-description').value = 'Desenvolvimento de um site institucional responsivo com aproximadamente 5 páginas (Home, Sobre, Serviços, Portfólio e Contato), integração com redes sociais e formulário de contato funcional.';
        document.getElementById('project-objectives').value = 'Criar uma presença online profissional para a ABC Comércio, aumentando sua visibilidade e facilitando o contato com clientes potenciais.';
        document.getElementById('deliverables').value = '- Site responsivo com 5 páginas\n- Integração com Facebook e Instagram\n- Formulário de contato com envio para e-mail\n- Painel administrativo para atualização de conteúdo básico\n- Hospedagem por 12 meses\n- Suporte técnico por 3 meses';
        document.getElementById('project-scope').value = 'INCLUÍDO:\n- Design responsivo\n- Desenvolvimento front-end\n- Integração com redes sociais\n- Formulário de contato\n- Hospedagem e domínio por 1 ano\n\nNÃO INCLUÍDO:\n- Conteúdo textual (textos devem ser fornecidos pelo cliente)\n- Fotografias profissionais\n- SEO avançado';
        document.getElementById('timeline').value = '1. Planejamento e aprovação do design: 1 semana\n2. Desenvolvimento do site: 2 semanas\n3. Revisões e ajustes: 1 semana\n4. Entrega final: 4ª semana';
        document.getElementById('service1').value = 'Desenvolvimento do Site';
        document.getElementById('unit-price1').value = '2500.00';
        document.getElementById('description1').value = 'Desenvolvimento completo do site institucional com todas as funcionalidades acordadas.';
        document.getElementById('payment-terms').value = '50% no aceite da proposta (R$ 1.250,00)\n50% na entrega do projeto (R$ 1.250,00)';
        document.getElementById('terms-conditions').value = '1. Garantia de 3 meses para correção de bugs funcionais.\n2. Alterações de escopo após aprovação podem gerar custos adicionais.\n3. O conteúdo textual e imagens devem ser fornecidos pelo cliente em até 7 dias após aprovação do layout.\n4. Todas as informações trocadas durante o projeto são confidenciais.';
        document.getElementById('acceptance').value = 'Esta proposta será considerada aceita mediante assinatura e retorno deste documento ou mediante depósito do valor da primeira parcela. O projeto terá início após confirmação do pagamento da primeira parcela.';
        
        // Calculate initial total
        calculateInitialTotal();
    }
});
