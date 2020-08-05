$(document).ready(function () {

    $("#key-input").val(localStorage.getItem(window.location.hostname + "_email"));
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
            "key": {
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
            "key": {
                required: window.IdP.App.LocalizationContent.EmailValidator
            }
        }
    });
});

function ForgotValidate() {
    var isValidForm = $('#forgot-password-form').valid();
    isValidForm ? $("body").ejWaitingPopup("show") : $("body").ejWaitingPopup("hide");
    return isValidForm;
}