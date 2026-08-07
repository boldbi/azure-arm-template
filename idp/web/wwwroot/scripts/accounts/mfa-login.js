$(document).ready(function () {

    var loginEmail = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom e-account',
        floatLabelType: 'Always',
        created: function () {
            loginEmail.focusIn();
        }
    });
    loginEmail.appendTo('#login-MfaVerification');
});

$(document).on("keyup", "#login-MfaVerification", function () {
    $("#error-password").css("display", "none");
});

