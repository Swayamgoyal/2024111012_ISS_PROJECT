document.addEventListener('DOMContentLoaded', function() {
    // Get all forms with validation
    const forms = document.querySelectorAll('form[data-validate="true"]');
    
    forms.forEach(form => {
        const formFields = form.querySelectorAll('input, textarea, select');
        const submitButton = form.querySelector('[type="submit"]');
        
        // Add validation on blur for each form field
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(field);
            });
            
            // Clear error on input
            field.addEventListener('input', function() {
                const errorElement = field.parentElement.querySelector('.field-error');
                if (errorElement) {
                    errorElement.remove();
                }
                field.classList.remove('invalid');
            });
        });
        
        // Validate on form submission
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            formFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = form.querySelector('.invalid');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Show form error message
                showFormError(form, 'Please fix the errors above.');
            }
        });
    });
    
    // Field validation function
    function validateField(field) {
        // Remove existing error message
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        field.classList.remove('invalid');
        
        // Required validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // URL validation
        if (field.type === 'url' && field.value.trim()) {
            try {
                new URL(field.value.trim());
            } catch (e) {
                showError(field, 'Please enter a valid URL');
                return false;
            }
        }
        
        // Min length validation
        if (field.hasAttribute('minlength') && field.value.trim()) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (field.value.length < minLength) {
                showError(field, `Please enter at least ${minLength} characters`);
                return false;
            }
        }
        
        // Max length validation
        if (field.hasAttribute('maxlength') && field.value.trim()) {
            const maxLength = parseInt(field.getAttribute('maxlength'));
            if (field.value.length > maxLength) {
                showError(field, `Please enter no more than ${maxLength} characters`);
                return false;
            }
        }
        
        // Pattern validation
        if (field.hasAttribute('pattern') && field.value.trim()) {
            const pattern = new RegExp(field.getAttribute('pattern'));
            if (!pattern.test(field.value)) {
                showError(field, field.getAttribute('data-pattern-message') || 'Please match the requested format');
                return false;
            }
        }
        
        // Custom validation based on data attributes
        if (field.hasAttribute('data-validate-function') && field.value.trim()) {
            const funcName = field.getAttribute('data-validate-function');
            if (typeof window[funcName] === 'function') {
                const isValid = window[funcName](field.value);
                if (!isValid) {
                    showError(field, field.getAttribute('data-validate-message') || 'Invalid input');
                    return false;
                }
            }
        }
        
        return true;
    }
    
    // Show field error
    function showError(field, message) {
        field.classList.add('invalid');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        field.parentElement.appendChild(errorElement);
    }
    
    // Show form error
    function showFormError(form, message) {
        let formError = form.querySelector('.form-error');
        
        if (!formError) {
            formError = document.createElement('div');
            formError.className = 'form-error';
            form.prepend(formError);
        }
        
        formError.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        formError.style.opacity = '0';
        
        // Animate in
        setTimeout(() => {
            formError.style.opacity = '1';
        }, 10);
    }
    
    // Add CSS for validation styling
    const style = document.createElement('style');
    style.textContent = `
        .field-error {
            color: var(--nova-pink);
            font-size: 14px;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
            animation: shake 0.3s ease-in-out;
        }
        
        .form-error {
            background-color: rgba(255, 94, 148, 0.1);
            border-left: 4px solid var(--nova-pink);
            color: var(--nova-pink);
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 0 10px 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: opacity 0.3s ease;
        }
        
        .invalid {
            border-color: var(--nova-pink) !important;
            box-shadow: 0 0 0 2px rgba(255, 94, 148, 0.2) !important;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});
