document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        
        const nameValid = validateName();
        const emailValid = validateEmail();
        const messageValid = validateMessage();
        
        if (nameValid && emailValid && messageValid) {
            alert('Форма успешно отправлена!');
            form.reset();
        }
    });
    
    function validateName() {
        const nameInput = document.getElementById('name');
        const errorElement = document.getElementById('nameError');
        
        if (nameInput.value.trim().length < 2) {
            errorElement.textContent = 'Имя должно содержать минимум 2 символа';
            nameInput.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const errorElement = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailInput.value)) {
            errorElement.textContent = 'Пожалуйста, введите корректный email';
            emailInput.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateMessage() {
        const messageInput = document.getElementById('message');
        const errorElement = document.getElementById('messageError');
        
        if (messageInput.value.trim().length < 10) {
            errorElement.textContent = 'Сообщение должно содержать минимум 10 символов';
            messageInput.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputs = document.querySelectorAll('input, textarea');
        
        errorElements.forEach(el => el.textContent = '');
        inputs.forEach(input => input.classList.remove('error'));
    }
    
    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('message').addEventListener('input', validateMessage);
});