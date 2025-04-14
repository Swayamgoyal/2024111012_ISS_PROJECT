/**
 * Form Validation Module
 * Validates form inputs and provides feedback
 * @author Swayam Goyal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all forms on page
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        initializeForm(form);
    });
    
    /**
     * Initialize a form with validation
     * @param {HTMLFormElement} form - Form to initialize
     */
    function initializeForm(form) {
        // Add novalidate attribute to disable browser's native validation
        form.setAttribute('novalidate', '');
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isValid = validateForm(form);
            
            if (isValid) {
                // Show loading state on submit button
                const submitButton = form.querySelector('[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Log form submission for assignment
                console.log(`${new Date().toISOString()}, submit, form:${form.id || 'unnamed'}`);
                
                // Simulate form submission (replace with actual submission code)
                setTimeout(() => {
                    // Reset form
                    form.reset();
                    
                    // Reset validation states
                    clearValidationStates(form);
                    
                    // Restore submit button
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                    
                    // Show success message
                    if (typeof window.showNotification === 'function') {
                        window.showNotification('Form submitted successfully!', 'success');
                    }
                }, 1500);
            }
        });
        
        // Add validation on blur for each field
        const fields = form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            // Skip submit buttons and hidden fields
            if (field.type === 'submit' || field.type === 'hidden') return;
            
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on input
            field.addEventListener('input', function() {
                // Remove error state but don't validate yet
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                    
                    // Remove error message
                    const errorElement = this.parentElement.querySelector('.error-message');
                    if (errorElement) {
                        errorElement.remove();
                    }
                }
            });
        });
    }
    
    /**
     * Validate an entire form
     * @param {HTMLFormElement} form - Form to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateForm(form) {
        const fields = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        fields.forEach(field => {
            // Skip submit buttons and hidden fields
            if (field.type === 'submit' || field.type === 'hidden') return;
            
            // Validate field and update overall validity
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    /**
     * Validate a single form field
     * @param {HTMLElement} field - Field to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateField(field) {
        // Clear previous validation state
        field.classList.remove('is-valid');
        field.classList.remove('is-invalid');
        
        // Remove previous error message
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        // Get field value
        const value = field.value.trim();
        
        // Check if required field is empty
        if (field.hasAttribute('required') && value === '') {
            showError(field, 'This field is required');
            return false;
        }
        
        // Validate based on field type or data attributes
        let isValid = true;
        let errorMessage = '';
        
        switch (field.type) {
            case 'email':
                isValid = validateEmail(value);
                errorMessage = 'Please enter a valid email address';
                break;
                
            case 'tel':
                isValid = validatePhone(value);
                errorMessage = 'Please enter a valid phone number';
                break;
                
            case 'url':
                isValid = validateUrl(value);
                errorMessage = 'Please enter a valid URL';
                break;
                
            case 'password':
                // Check for minimum length
                const minLength = field.getAttribute('minlength') || 8;
                isValid = value.length >= minLength;
                errorMessage = `Password must be at least ${minLength} characters`;
                break;
        }
        
        // Check pattern attribute
        if (field.hasAttribute('pattern') && value !== '') {
            const pattern = new RegExp(field.getAttribute('pattern'));
            isValid = pattern.test(value);
            errorMessage = field.getAttribute('data-error-message') || 'Please match the requested format';
        }
        
        // Custom validation based on data-validate attribute
        if (field.hasAttribute('data-validate')) {
            const validateType = field.getAttribute('data-validate');
            
            switch (validateType) {
                case 'alphanumeric':
                    isValid = /^[a-zA-Z0-9]+$/.test(value);
                    errorMessage = 'Only letters and numbers allowed';
                    break;
                    
                case 'letters-only':
                    isValid = /^[a-zA-Z]+$/.test(value);
                    errorMessage = 'Only letters allowed';
                    break;
                    
                case 'numbers-only':
                    isValid = /^[0-9]+$/.test(value);
                    errorMessage = 'Only numbers allowed';
                    break;
            }
        }
        
        // Show error or success
        if (!isValid && value !== '') {
            showError(field, errorMessage);
            return false;
        } else if (value !== '') {
            // Only show success state if field is not empty
            field.classList.add('is-valid');
        }
        
        return true;
    }
    
    /**
     * Display error message for a field
     * @param {HTMLElement} field - Field with error
     * @param {string} message - Error message
     */
    function showError(field, message) {
        // Add error class
        field.classList.add('is-invalid');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Add error message after the field
        field.parentElement.appendChild(errorElement);
    }
    
    /**
     * Clear all validation states in a form
     * @param {HTMLFormElement} form - Form to clear
     */
    function clearValidationStates(form) {
        // Remove validation classes
        form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
            field.classList.remove('is-valid');
            field.classList.remove('is-invalid');
        });
        
        // Remove error messages
        form.querySelectorAll('.error-message').forEach(error => {
            error.remove();
        });
    }
    
    /**
     * Validate email address
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
    
    /**
     * Validate phone number
     * @param {string} phone - Phone to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validatePhone(phone) {
        // Basic validation for international phone numbers
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(phone);
    }
    
    /**
     * Validate URL
     * @param {string} url - URL to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // Add validation styles if not already in stylesheet
    if (!document.getElementById('form-validation-styles')) {
        const style = document.createElement('style');
        style.id = 'form-validation-styles';
        style.textContent = `
            .form-group {
                position: relative;
                margin-bottom: 20px;
            }
            
            .is-valid {
                border-color: #41e9c3 !important;
            }
            
            .is-invalid {
                border-color: #ff5e94 !important;
            }
            
            .error-message {
                color: #ff5e94;
                font-size: 12px;
                margin-top: 5px;
                animation: fadeIn 0.2s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
});
