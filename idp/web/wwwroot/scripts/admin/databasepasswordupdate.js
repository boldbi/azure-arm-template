// DatabasePasswordUpdate.js
document.addEventListener('DOMContentLoaded', function () {
    var initialMessage = (window.dbRecovery && window.dbRecovery.initialMessage) ? window.dbRecovery.initialMessage : "";
    var initialStatus = (window.dbRecovery && window.dbRecovery.initialStatus) ? window.dbRecovery.initialStatus : "";
    var postRedirect = (window.dbRecovery && window.dbRecovery.postRedirect) ? window.dbRecovery.postRedirect : "";

    if (!initialMessage) {
        return;
    }

    showRecoveryMessage({
        title: postRedirect ? getLocalizedContent('DatabaseConnectionUpdated') : (initialStatus === 'error' ? getLocalizedContent('DatabaseError') : getLocalizedContent('DatabaseConnection')),
        message: initialMessage,
        icon: initialStatus === 'error' ? 'su-warning-alt' : 'su-tick',
        okText: postRedirect ? getLocalizedContent('LoginText') : getLocalizedContent('OKButton'),
        onOk: postRedirect ? function () { window.location.href = postRedirect; } : null
    });
});

(function () {
    var form = document.getElementById('db-recovery-form');
    var testBtn = document.getElementById('db-test-connection');
    if (!form || !testBtn) {
        return;
    }

    testBtn.addEventListener('click', function (e) {
        e.preventDefault();

        var tokenInput = form.querySelector('input[name="__RequestVerificationToken"]');
        var token = tokenInput ? tokenInput.value : '';
        var testUrl = (window.dbRecovery && window.dbRecovery.testUrl) ? window.dbRecovery.testUrl : '';

        fetch(testUrl, {
            method: 'POST',
            credentials: 'same-origin',
            headers: token ? { 'RequestVerificationToken': token } : {},
            body: new FormData(form)
        }).then(function (response) {
            return response.json().then(function (data) {
                return {
                    statusCode: response.status,
                    data: data
                };
            });
        }).then(function (result) {
            if (result.statusCode === 409 && result.data && result.data.redirectUrl) {
                window.location.href = result.data.redirectUrl;
                return;
            }

            showRecoveryMessage({
                title: result.data && result.data.success ? getLocalizedContent('DatabaseConnection') : getLocalizedContent('DatabaseError'),
                message: result.data && result.data.message ? result.data.message : getLocalizedContent('DatabaseConnectionFailed'),
                icon: result.data && result.data.success ? 'su-tick' : 'su-warning-alt',
                okText: getLocalizedContent('OKButton')
            });
        }).catch(function () {
            showRecoveryMessage({
                title: getLocalizedContent('DatabaseError'),
                message: getLocalizedContent('TestConnectionFailedNetworkError'),
                icon: 'su-warning-alt',
                okText: getLocalizedContent('OKButton')
            });
        });
    });
})();

function showRecoveryMessage(options) {
    if (typeof messageBox !== 'function' || !document.getElementById('messageBox') || !document.getElementById('messageBox').ej2_instances || !document.getElementById('messageBox').ej2_instances.length) {
        return;
    }

    var title = options && options.title ? options.title : getLocalizedContent('DatabaseConnection');
    var message = options && options.message ? options.message : '';
    var icon = options && options.icon ? options.icon : 'su-tick';
    var okText = options && options.okText ? options.okText : getLocalizedContent('OKButton');
    var onOk = options && typeof options.onOk === 'function' ? options.onOk : null;

    messageBox(
        icon,
        title,
        message.replace(/\r\n|\n/g, '<br/>'),
        'success',
        function () {
            onCloseMessageBox();
            if (onOk) {
                onOk();
            }
        },
        null,
        '450px',
        'auto',
        '280px'
    );

    var dialog = document.getElementById('messageBox');
    var okButton = dialog ? dialog.querySelector('.secondary-button') : null;
    if (okButton) {
        okButton.value = okText;
    }
}

function getLocalizedContent(key) {
    var localizationContent = window.Server && window.Server.App && window.Server.App.LocalizationContent
        ? window.Server.App.LocalizationContent
        : {};

    return localizationContent[key] || '';
}

(function () {
    var toggleButtons = document.querySelectorAll('.password-toggle');
    if (!toggleButtons.length) {
        return;
    }

    toggleButtons.forEach(function (toggleButton) {
        toggleButton.addEventListener('click', function () {
            var passwordInput = toggleButton.parentElement ? toggleButton.parentElement.querySelector('input[type="password"], input[type="text"]') : null;
            if (!passwordInput) {
                return;
            }

            var isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            toggleButton.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
        });
    });
})();
