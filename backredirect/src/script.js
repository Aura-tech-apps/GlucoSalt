// Contador regressivo
function startCountdown() {
    let minutes = 13;
    let seconds = 0;
    
    const countdownElement = document.getElementById('countdown');
    
    const timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                // Tempo esgotado
                countdownElement.textContent = '00:00';
                countdownElement.style.color = '#ff4444';
                countdownElement.style.animation = 'pulse 1s infinite';
                
                // Mostrar mensagem de tempo esgotado
                showTimeExpiredMessage();
                clearInterval(timer);
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        // Formatar o tempo
        const displayMinutes = minutes.toString().padStart(2, '0');
        const displaySeconds = seconds.toString().padStart(2, '0');
        countdownElement.textContent = `${displayMinutes}:${displaySeconds}`;
        
        // Sincronizar timer final - ambos os contadores mostram o mesmo tempo
        const finalCountdown = document.getElementById('final-countdown');
        if (finalCountdown) {
            finalCountdown.textContent = `${displayMinutes}:${displaySeconds}`;
        }
        
        // Mudar cor quando estiver acabando o tempo
        if (minutes < 2) {
            countdownElement.style.color = '#ff9800';
        }
        if (minutes < 1) {
            countdownElement.style.color = '#f44336';
        }
    }, 1000);
}

// Función para mostrar mensaje cuando el tiempo se agote
function showTimeExpiredMessage() {
    const header = document.querySelector('.header');
    const expiredMessage = document.createElement('div');
    expiredMessage.className = 'expired-message';
    expiredMessage.innerHTML = `
        <div class="expired-content">
            <h3>⏰ ¡Tiempo agotado!</h3>
            <p>El portal ahora está cerrado.</p>
        </div>
    `;
    
    header.appendChild(expiredMessage);
    
    // Agregar estilos para el mensaje
    const style = document.createElement('style');
    style.textContent = `
        .expired-message {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: linear-gradient(45deg, #578AD6, #205493);
            color: #ffffff;
            text-align: center;
            padding: 20px;
            border-top: 2px solid #205493;
            animation: slideDown 0.5s ease-out;
        }
        
        .expired-content h3 {
            margin-bottom: 10px;
            font-size: 20px;
        }
        
        @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Animaciones de scroll suave
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Función para scroll suave hacia el CTA final
function scrollToFinalCTA() {
    const finalCTA = document.getElementById('final-cta');
    if (finalCTA) {
        finalCTA.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Agregar efecto de destacado
        finalCTA.style.transform = 'scale(1.05)';
        finalCTA.style.boxShadow = '0 0 30px rgba(46, 125, 50, 0.6)';
        
        setTimeout(() => {
            finalCTA.style.transform = '';
            finalCTA.style.boxShadow = '';
        }, 2000);
    }
}

// Agregar eventos de clic en los botones CTA
function addButtonEvents() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto de clic con partículas
            createClickEffect(this);
            
            // Efecto de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            
            // Aquí puedes agregar la lógica de redirección o formulario
            console.log('Botón clicado:', this.textContent);
            
            // Ejemplo: mostrar modal o redireccionar
            showActionModal(this.textContent);
        });
    });
}

// Criar efeito de partículas ao clicar
function createClickEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 50 + Math.random() * 30;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1000);
    }
}

// Modal de acción (ejemplo)
function showActionModal(buttonText) {
    // Crear modal simple
    const modal = document.createElement('div');
    modal.className = 'action-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Acción Detectada</h3>
            <p>Hiciste clic en: "${buttonText}"</p>
            <p>Redirigiendo...</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Estilos del modal
    const style = document.createElement('style');
    style.textContent = `
        .action-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
            background: linear-gradient(135deg, #578AD6, #205493);
            color: #ffffff;
            padding: 40px;
            border-radius: 20px;
            border: 3px solid #205493;
            text-align: center;
            max-width: 500px;
            position: relative;
            animation: scaleIn 0.3s ease-out;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: #ffffff;
        }
        
        .close-modal:hover {
            color: #E6F0FA;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Cerrar modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Cerrar modal haciendo clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 3000);
}

// Efeitos de hover nos elementos
function addHoverEffects() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
            
            // Adicionar brilho sutil
            if (this.classList.contains('special-condition') || 
                this.classList.contains('final-offer')) {
                this.style.boxShadow = '0 15px 40px rgba(255, 215, 0, 0.2)';
            }
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Adicionar efeitos especiais para elementos interativos
    addInteractiveEffects();
}

// Adicionar efeitos especiais para elementos interativos
function addInteractiveEffects() {
    // Efeito para checkmarks
    const checkmarks = document.querySelectorAll('.checkmark');
    checkmarks.forEach(checkmark => {
        checkmark.addEventListener('click', function() {
            this.style.transform = 'scale(1.3) rotate(10deg)';
            this.style.color = '#FFA500';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.color = '#FFD700';
            }, 300);
        });
    });
    
    // Efeito para depoimentos
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('click', function() {
            this.style.transform = 'scale(1.02) translateX(15px)';
            this.style.borderLeftColor = '#FFA500';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.borderLeftColor = '#FFD700';
            }, 500);
        });
    });
}

// Animações de entrada ao scroll
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Adicionar efeito de destaque para elementos importantes
                if (entry.target.classList.contains('special-condition') || 
                    entry.target.classList.contains('final-offer')) {
                    addHighlightEffect(entry.target);
                }
                
            }
        });
    }, observerOptions);
    
    // Observar todas as seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Adicionar efeito de destaque para seções importantes
function addHighlightEffect(element) {
    element.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.3)';
    element.style.borderColor = 'rgba(255, 215, 0, 0.6)';
    
    setTimeout(() => {
        element.style.boxShadow = '';
        element.style.borderColor = '';
    }, 2000);
}


// Função para adicionar efeito de partículas no fundo
function addParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);
    
    // Criar partículas
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
    
    // Estilos das partículas
    const style = document.createElement('style');
    style.textContent = `
        .particle-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            animation: float 6s infinite linear;
        }
        
        @keyframes float {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Criar partícula individual
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posição aleatória
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    container.appendChild(particle);
    
    // Remover e recriar partícula após animação
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, 10000);
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar contador
    startCountdown();
    
    // Adicionar eventos nos botões
    addButtonEvents();
    
    // Adicionar efeitos de hover
    addHoverEffects();
    
    // Adicionar animações de scroll
    addScrollAnimations();
    
    // Adicionar efeito de partículas
    addParticleEffect();
    
    // Adicionar classe de carregamento
    document.body.classList.add('loaded');
});

// Adicionar estilos de carregamento
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Función para inicializar el carrusel de testimonios
function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonial-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const cards = carousel.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    
    // Función auxiliar para obtener configuración según el tamaño de pantalla
    function getScreenConfig() {
        const width = window.innerWidth;
        let cardsPerView = 1;
        
        if (width > 768) {
            cardsPerView = 3; // Desktop
        } else if (width > 480) {
            cardsPerView = 2; // Tablet
        }
        
        return {
            cardsPerView,
            totalSlides: Math.ceil(totalCards / cardsPerView)
        };
    }
    
    // Crear dots de navegación
    function createDots() {
        dotsContainer.innerHTML = '';
        const { totalSlides } = getScreenConfig();
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Actualizar posición del carrusel
    function updateCarousel() {
        const { cardsPerView, totalSlides } = getScreenConfig();
        
        // Ajustar índice si es necesario
        if (currentIndex >= totalSlides) {
            currentIndex = totalSlides - 1;
        }
        
        const translateX = -currentIndex * (100 / cardsPerView);
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar dots activos
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Ir a slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Siguiente slide
    function nextSlide() {
        const { totalSlides } = getScreenConfig();
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    // Slide anterior
    function prevSlide() {
        const { totalSlides } = getScreenConfig();
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play (opcional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Pausar auto-play al hacer hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Inicializar
    createDots();
    updateCarousel();
    startAutoPlay();
    
    // Pausar auto-play cuando la ventana no está visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
    
    // Redimensionar ventana
    window.addEventListener('resize', function() {
        createDots();
        updateCarousel();
    });
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialCarousel();
});
