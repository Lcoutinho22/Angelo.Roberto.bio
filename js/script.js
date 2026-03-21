document.addEventListener('DOMContentLoaded', () => {
    initThemeManager();
    initFAQAccordion();
    initFormHandler();
    initPlanButtons();
    initShareManager();
    initLangManager();
});

/**
 * Handles Light/Dark Theme Switching
 */
function initThemeManager() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const icon = themeBtn ? themeBtn.querySelector('i') : null;
    const body = document.body;
    const logoImg = document.getElementById('logo-img');
    
    // Initial check on load
    if (localStorage.getItem('theme-ar') === 'light') {
        body.classList.add('light-theme');
        if (icon) icon.classList.replace('fa-sun', 'fa-moon');
        if (logoImg) logoImg.src = './image/logo-branca.jpeg';
    } else {
        // Default is dark mode
        if (logoImg) logoImg.src = './image/logo-preta.jpeg';
    }

    // Toggle event listener
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            
            if (isLight) {
                if (icon) icon.classList.replace('fa-sun', 'fa-moon');
                if (logoImg) logoImg.src = './Image/logo-branca.jpeg';
                localStorage.setItem('theme-ar', 'light');
            } else {
                if (icon) icon.classList.replace('fa-moon', 'fa-sun');
                if (logoImg) logoImg.src = './Image/logo-preta.jpeg';
                localStorage.setItem('theme-ar', 'dark');
            }
        });
    }
}

/**
 * Attaches events to plan buttons
 */
function initPlanButtons() {
    const planButtons = document.querySelectorAll('.plan-btn');
    planButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planName = e.target.getAttribute('data-plan') || 'Plano';
            const msg = `Olá Ângelo Roberto! Me interessei pelo plano: *${planName}*. Poderia me passar mais detalhes?`;
            openWhatsApp(msg);
        });
    });
}

/**
 * Form Submission handling
 */
function initFormHandler() {
    const submitBtn = document.getElementById('btn-submit-anamnesis');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const plano = document.getElementById('planSelect').value;
            const nome = document.getElementById('clientName').value.trim();
            const idade = document.getElementById('clientAge').value.trim();
            const nivel = document.getElementById('levelSelect').value;
            const saude = document.getElementById('healthInput').value.trim() || 'Nenhuma restrição relatada.';
            const objetivo = document.getElementById('goalInput').value.trim();
            
            if (!nome || !idade || !objetivo) {
                alert('Por favor, preencha Nome, Idade e Objetivo.');
                return;
            }
            
            const msg = `Olá Ângelo Roberto! Preenchi a aplicação:\n\n*--- DADOS ---*\n*Nome:* ${nome}\n*Idade:* ${idade} anos\n*Nível:* ${nivel}\n*Plano de Interesse:* ${plano}\n\n*--- SAÚDE ---*\n${saude}\n\n*--- OBJETIVO ---*\n${objetivo}\n\nAguardo análise!`;
            openWhatsApp(msg);
        });
    }
}

/**
 * FAQ Accordion logic
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if(otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });
                item.classList.toggle('active');
                const isActive = item.classList.contains('active');
                toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            });
        }
    });
}

/**
 * Helper to open WhatsApp URL safely
 */
function openWhatsApp(message) {
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/556993923619?text=${encodedMsg}`, '_blank');
}

/**
 * Handles Share Button and Dropdown
 */
function initShareManager() {
    const shareBtn = document.getElementById('share-toggle-btn');
    const shareDropdown = document.getElementById('share-dropdown');
    
    if (shareBtn && shareDropdown) {
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            shareDropdown.classList.toggle('active');
            shareBtn.classList.toggle('active');
        });

        // Fechar click fora
        document.addEventListener('click', (e) => {
            if (!shareBtn.contains(e.target) && !shareDropdown.contains(e.target)) {
                shareDropdown.classList.remove('active');
                shareBtn.classList.remove('active');
            }
        });

        // Configurar URLs de compartilhamento
        const shareLinks = shareDropdown.querySelectorAll('.share-link');
        shareLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const network = link.getAttribute('data-share');
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                let shareUrl = '';

                switch (network) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://api.whatsapp.com/send?text=${title} - ${url}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                    case 'tiktok':
                        // Fallback para TikTok (copiar link)
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            alert('Link copiado para compartilhar no TikTok!');
                        });
                        return;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
}

/**
 * Handles Language Dropdown
 */
function initLangManager() {
    const langBtn = document.getElementById('lang-toggle-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
            langBtn.classList.toggle('active');
        });

        // Fechar click fora
        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
                langBtn.classList.remove('active');
            }
        });

        // Seleção de idioma
        const langLinks = langDropdown.querySelectorAll('.lang-link');
        langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                langLinks.forEach(l => l.classList.remove('active-lang'));
                link.classList.add('active-lang');
                
                // Fecha o menu após escolher
                langDropdown.classList.remove('active');
                langBtn.classList.remove('active');
            });
        });
    }
}