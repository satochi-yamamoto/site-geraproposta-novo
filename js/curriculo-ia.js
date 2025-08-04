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
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'resume_step', {
                        'event_category': 'engagement',
                        'event_label': `Step ${nextStepNum}`
                    });
                }
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
    
    // Add experience fields
    const addExperienciaBtn = document.getElementById('add-experiencia');
    const experienciasContainer = document.getElementById('experiencias-container');
    let expCount = 1;
    
    addExperienciaBtn.addEventListener('click', function() {
        expCount++;
        const newExp = document.createElement('div');
        newExp.className = 'experiencia-item';
        newExp.innerHTML = `
            <hr>
            <div class="form-group">
                <label for="empresa${expCount}">Empresa</label>
                <input type="text" id="empresa${expCount}" name="experiencias[${expCount-1}][empresa]" required>
            </div>
            <div class="form-group">
                <label for="cargo${expCount}">Cargo</label>
                <input type="text" id="cargo${expCount}" name="experiencias[${expCount-1}][cargo]" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="inicio${expCount}">Data de Início</label>
                    <input type="month" id="inicio${expCount}" name="experiencias[${expCount-1}][inicio]" required>
                </div>
                <div class="form-group">
                    <label for="fim${expCount}">Data de Término</label>
                    <input type="month" id="fim${expCount}" name="experiencias[${expCount-1}][fim]">
                </div>
            </div>
            <div class="form-group">
                <label for="descricao${expCount}">Descrição das Atividades</label>
                <textarea id="descricao${expCount}" name="experiencias[${expCount-1}][descricao]" rows="3" required></textarea>
            </div>
            <button type="button" class="btn btn-small remove-experiencia">Remover Experiência</button>
        `;
        
        experienciasContainer.appendChild(newExp);
        
        // Add event listener to new remove button
        newExp.querySelector('.remove-experiencia').addEventListener('click', function() {
            experienciasContainer.removeChild(newExp);
        });
    });
    
    // Add education fields
    const addFormacaoBtn = document.getElementById('add-formacao');
    const formacoesContainer = document.getElementById('formacoes-container');
    let formCount = 1;
    
    addFormacaoBtn.addEventListener('click', function() {
        formCount++;
        const newForm = document.createElement('div');
        newForm.className = 'formacao-item';
        newForm.innerHTML = `
            <hr>
            <div class="form-group">
                <label for="instituicao${formCount}">Instituição de Ensino</label>
                <input type="text" id="instituicao${formCount}" name="formacoes[${formCount-1}][instituicao]" required>
            </div>
            <div class="form-group">
                <label for="curso${formCount}">Curso</label>
                <input type="text" id="curso${formCount}" name="formacoes[${formCount-1}][curso]" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="inicio-formacao${formCount}">Data de Início</label>
                    <input type="month" id="inicio-formacao${formCount}" name="formacoes[${formCount-1}][inicio]" required>
                </div>
                <div class="form-group">
                    <label for="fim-formacao${formCount}">Data de Término</label>
                    <input type="month" id="fim-formacao${formCount}" name="formacoes[${formCount-1}][fim]">
                </div>
            </div>
            <button type="button" class="btn btn-small remove-formacao">Remover Formação</button>
        `;
        
        formacoesContainer.appendChild(newForm);
        
        // Add event listener to new remove button
        newForm.querySelector('.remove-formacao').addEventListener('click', function() {
            formacoesContainer.removeChild(newForm);
        });
    });
    
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
    const resumeForm = document.getElementById('resume-form');
    resumeForm.addEventListener('submit', function(e) {
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
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'resume_generated', {
                        'event_category': 'conversion',
                        'event_label': 'Resume Generated'
                    });
                }
                
                // Show success message and download options
                alert('Seu currículo foi gerado com sucesso! Em breve você será redirecionado para a página de download.');
                
                // Reset form button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // In a real scenario, you would redirect to the download page
                // window.location.href = '/download-resume?generated=true';
            }, 2000);
        }
    });
    
    // Auto-fill sample data for demo purposes (remove in production)
    if (window.location.href.includes('demo=true')) {
        document.getElementById('nome').value = 'Maria da Silva';
        document.getElementById('email').value = 'maria.silva@email.com';
        document.getElementById('telefone').value = '(11) 98765-4321';
        document.getElementById('cidade').value = 'São Paulo, SP';
        document.getElementById('linkedin').value = 'https://linkedin.com/in/mariasilva';
        document.getElementById('objetivo').value = 'Busco uma posição como Desenvolvedora Front-end onde possa aplicar minhas habilidades em HTML, CSS e JavaScript em projetos desafiadores que necessitem de soluções criativas e eficientes.';
        document.getElementById('empresa1').value = 'Tech Solutions Ltda';
        document.getElementById('cargo1').value = 'Desenvolvedora Front-end Júnior';
        document.getElementById('inicio1').value = '2020-01';
        document.getElementById('fim1').value = '2022-05';
        document.getElementById('descricao1').value = 'Desenvolvimento de interfaces web responsivas utilizando HTML5, CSS3 e JavaScript. Participação ativa no processo de design e implementação de novas funcionalidades. Trabalho em equipe utilizando metodologias ágeis.';
        document.getElementById('instituicao1').value = 'Universidade de São Paulo';
        document.getElementById('curso1').value = 'Bacharelado em Ciência da Computação';
        document.getElementById('inicio-formacao1').value = '2016-02';
        document.getElementById('fim-formacao1').value = '2019-12';
        
        // Check some skills
        document.querySelector('input[value="HTML5"]').checked = true;
        document.querySelector('input[value="CSS3"]').checked = true;
        document.querySelector('input[value="JavaScript"]').checked = true;
        document.querySelector('input[value="Git"]').checked = true;
        document.querySelector('input[value="Inglês Intermediário"]').checked = true;
        document.querySelector('input[value="Trabalho em equipe"]').checked = true;
        document.querySelector('input[value="Comunicação"]').checked = true;
    }
});
