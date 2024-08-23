window.addEventListener("DOMContentLoaded", (event) => {
    // Adding class on megamenu drop button click
    var megamenuDropbtn = document.getElementsByClassName("megamenu-dropbtn");
    megamenuDropbtn[0].addEventListener("click", function () {
        this.classList.toggle("megamenu-clicked");
    });

    // Wizard Form 
    const stepsCount = document.querySelectorAll('.step-count');
    const formSteps = document.querySelectorAll('.form-step');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const categoryInputs = document.querySelectorAll('.category');
    const reviewSummary = document.getElementById('review-summary');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPhone = /^[0-9]{10}$/;

    const showStep = (step) => {
        formSteps.forEach((formStep, index) => {
            formStep.classList.toggle('active', index === step);
            formStep.style.transform = index === step ? 'translateX(0)' : (index < step ? 'translateX(-100%)' : 'translateX(100%)');
        });
        stepsCount.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index === step);
        });
        if (step === 2) {
            updateReviewSummary();
        }
    };

    const updateReviewSummary = () => {
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const selectedCategories = Array.from(categoryInputs)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value)
            .join(', ');

        reviewSummary.innerHTML = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Categories:</strong> ${selectedCategories}</p>
            `;
    };

    const validateStep1 = () => {
        let isValid = true;
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;

        if (!name) {
            document.getElementById('name-error').textContent = 'Name is required.';
            isValid = false;
        } else {
            document.getElementById('name-error').textContent = '';
        }

        if (!regexEmail.test(email)) {
            document.getElementById('email-error').textContent = 'Invalid email address.';
            isValid = false;
        } else {
            document.getElementById('email-error').textContent = '';
        }

        if (!regexPhone.test(phone)) {
            document.getElementById('phone-error').textContent = 'Invalid phone number. Should be 10 digits.';
            isValid = false;
        } else {
            document.getElementById('phone-error').textContent = '';
        }

        return isValid;
    };

    const validateStep2 = () => {
        const selectedCategories = Array.from(categoryInputs).filter(checkbox => checkbox.checked).length;
        if (selectedCategories === 0) {
            document.getElementById('categories-error').textContent = 'Select at least one category.';
            return false;
        } else {
            document.getElementById('categories-error').textContent = '';
            return true;
        }
    };

    document.getElementById('next-to-step-2').addEventListener('click', () => {
        if (validateStep1()) {
            showStep(1);
        }
    });

    document.getElementById('prev-to-step-1').addEventListener('click', () => {
        showStep(0);
    });

    document.getElementById('next-to-step-3').addEventListener('click', () => {
        if (validateStep2()) {
            showStep(2);
        }
    });

    document.getElementById('prev-to-step-2').addEventListener('click', () => {
        showStep(1);
    });

    document.getElementById('wizard-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted successfully!');
    });

    showStep(0);
});