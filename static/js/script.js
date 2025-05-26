document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const symptomForm = document.getElementById('symptomForm');
    if (symptomForm) {
        symptomForm.addEventListener('submit', function(e) {
            const symptom1 = document.getElementById('symptom1').value;
            const symptom2 = document.getElementById('symptom2').value;
            const symptom3 = document.getElementById('symptom3').value;
            
            if (!symptom1 && !symptom2 && !symptom3) {
                e.preventDefault();
                showNotification('Please select at least one symptom', 'error');
            }
        });
    }
    
    // Signup form validation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                e.preventDefault();
                showNotification('Passwords do not match', 'error');
            }
        });
    }
    
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (type === 'text') {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Custom select styling
    const selects = document.querySelectorAll('.custom-select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = 'var(--primary)';
            } else {
                this.style.borderColor = 'var(--gray-300)';
            }
        });
    });
    
    // Print functionality for results page
    const printButton = document.getElementById('printResult');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-info-circle';
        
        const text = document.createElement('span');
        text.textContent = message;
        
        notification.appendChild(icon);
        notification.appendChild(text);
        
        document.body.appendChild(notification);
        
        // Animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // Add this CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.error {
            border-left: 4px solid #e53e3e;
        }
        
        .notification.info {
            border-left: 4px solid var(--primary);
        }
        
        .notification i {
            font-size: 1.25rem;
            color: var(--primary);
        }
        
        .notification.error i {
            color: #e53e3e;
        }
        
        @media print {
            header, footer, .user-menu, .result-actions, .next-steps {
                display: none !important;
            }
            
            body, .page-wrapper {
                background: white !important;
            }
            
            .result-card {
                box-shadow: none !important;
                border: 1px solid #eee;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add subtle animations to elements as they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .fade-in-delayed');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Check if element is in viewport
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.animationPlayState = 'running';
            }
        });
    };
    
    // Run on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add loading animation for form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            if (this.checkValidity()) {
                // Create and show loading overlay
                const loadingOverlay = document.createElement('div');
                loadingOverlay.className = 'loading-overlay';
                
                const spinner = document.createElement('div');
                spinner.className = 'spinner';
                
                const loadingText = document.createElement('p');
                loadingText.textContent = 'Processing...';
                
                loadingOverlay.appendChild(spinner);
                loadingOverlay.appendChild(loadingText);
                document.body.appendChild(loadingOverlay);
                
                // Add loading overlay styles
                const loadingStyle = document.createElement('style');
                loadingStyle.textContent = `
                    .loading-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(255, 255, 255, 0.8);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                        backdrop-filter: blur(5px);
                    }
                    
                    .spinner {
                        width: 50px;
                        height: 50px;
                        border: 5px solid rgba(44, 123, 229, 0.2);
                        border-radius: 50%;
                        border-top-color: var(--primary);
                        animation: spin 1s linear infinite;
                        margin-bottom: 1rem;
                    }
                    
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(loadingStyle);
            }
        });
    });
});