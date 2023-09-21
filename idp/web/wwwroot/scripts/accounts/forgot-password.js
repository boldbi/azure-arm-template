$(document).ready(function () {
    
    var outlineEmail = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom e-account',
        floatLabelType: 'Auto',
    });
    outlineEmail.appendTo('#key-input');
    if (document.getElementById("key-input") != null) {
        outlineEmail.focusIn();
        document.getElementById("key-input").ej2_instances[0].value = localStorage.getItem(window.location.hostname + "_email");
    }
    localStorage.removeItem(window.location.hostname + "_email");
    $("#forgot-password-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) $(element).valid();
            else true;
        },
        onfocusout: function (element) {
            $(element).valid();
        },
        rules: {
            "userName": {
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest(".forgot-form-input-field").addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest(".forgot-form-input-field").removeClass("has-error");
            $(element).parent().find("p.validation-holder").html("");
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("p.validation-holder").html(error);
        },
        messages: {
            "userName": {
                required: window.Server.App.LocalizationContent.LoginUsernameEmailValidator
            }
        }
    });
});

function ForgotValidate() {
    var isValidForm = $('#forgot-password-form').valid();
    isValidForm ? showWaitingPopup('body') : hideWaitingPopup('body');
    return isValidForm;
}