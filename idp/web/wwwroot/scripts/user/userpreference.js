var isKeyUp = false;
var userDetails;
$(document).ready(function () {
    dropDownListInitialization('#language', window.Server.App.LocalizationContent.Language);
    dropDownListInitialization('#model-language', window.Server.App.LocalizationContent.DataLanguage);
    document.getElementById("language").ej2_instances[0].value = selectedApplicationLanguageValue;
    document.getElementById("language").ej2_instances[0].text = selectedApplicationLanguageText;
    document.getElementById("model-language").ej2_instances[0].value = selectedDataLanguageValue;
    document.getElementById("model-language").ej2_instances[0].text = selectedDataLanguageText;
    createWaitingPopup('content-area');
});

$(document).on("click", "#language-cancel-button", function (e) {
    window.location.href = "profile";
});

function SaveUserPreference() {
    $("#success-message").html("");
    var language = typeof (document.getElementById("language").ej2_instances[0].value) === "undefined" ? "en-us" : document.getElementById("language").ej2_instances[0].value;
    if ($("#lang_tag").val() !== document.getElementById("language").ej2_instances[0].value || document.getElementById("model-language").ej2_instances[0].value !== $("#model-language").val()) {
        showWaitingPopup('content-area');
        doAjaxPost('POST',
            updateUserPreferenceUrl,
            {
                returnurl: $("#hidden-return-url").val(),
                languageSettings: language,
                modelLanguageSettings: document.getElementById("model-language").ej2_instances[0].value
            },
            function (result) {
                if (result.Data.status) {
                    if (result.Data.isTenantUserLanguage) {
                        $("#tenant-hidden-form-post").attr("action", result.Data.returnUrl);
                        $("#token").attr("value", result.Data.token);
                        $("#tenant-hidden-form-post").submit();
                    } else {
                        hideWaitingPopup('content-area');
                        SuccessAlert(window.Server.App.LocalizationContent.UpdateAccountPreference, result.Data.value, 7000);
                        location.reload();
                    }
                } else {
                    hideWaitingPopup('content-area');
                    WarningAlert(window.Server.App.LocalizationContent.UpdateAccountPreference, result.Data.value, result.Message, 7000);
                    location.reload();
                }
            }
        );

        $("#language-cancel-button").css("display", "none");
        $("#language-cancel-link-button").css("display", "none");
    }
}
