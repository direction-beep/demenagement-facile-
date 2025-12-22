(function () {
    function showNotice(form, targetSelector, message) {
        var target = targetSelector ? document.querySelector(targetSelector) : null;
        if (!target) {
            target = form.querySelector('.spam-guard-notice');
            if (!target) {
                target = document.createElement('div');
                target.className = 'spam-guard-notice';
                form.insertBefore(target, form.firstChild);
            }
        }
        target.textContent = message;
        target.setAttribute('role', 'alert');
        target.setAttribute('aria-live', 'assertive');
    }

    function setupForm(form) {
        var honeypot = form.querySelector('[data-spam-guard-honeypot]');
        if (honeypot) {
            honeypot.value = '';
        }

        var targetSelector = form.getAttribute('data-spam-guard-target');
        var startTime = Date.now();

        form.addEventListener('submit', function (event) {
            if (honeypot && honeypot.value && honeypot.value.trim() !== '') {
                event.preventDefault();
                return false;
            }

            var elapsed = Date.now() - startTime;
            var minDelay = 2000; // 2 seconds

            if (elapsed < minDelay) {
                event.preventDefault();
                showNotice(form, targetSelector, 'Merci de patienter une seconde avant d\'envoyer votre message.');
                return false;
            }

            var elapsedField = form.querySelector('[data-spam-guard-elapsed]');
            if (elapsedField) {
                elapsedField.value = Math.round(elapsed / 1000).toString();
            }

            return true;
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var forms = document.querySelectorAll('form[data-spam-guard="true"]');
        forms.forEach(setupForm);
    });
})();

