var prevTenantIdentifier = "";

$(document).ready(function () {
    $('#enable-ssl').change(function () {
        if (isBoldReportsTenantType()) {
            if ($("#tenant-identifier").val() == "") {
                $(".site-default-text").html("").html(boldReportsPath);
            }
            else {
                $(".site-default-text").html("").html(boldReportsUrl + $("#tenant-identifier").val());
            }
            $(".site-domain").html($("#enable-ssl").val() + "://" + $("#input-domain").val());
            $(".site-id-name").html("");
        }
        else {
            if ($("#tenant-identifier").val() == "") {
                $(".site-default-text").html("").html(boldBiPath);
            }
            else {
                $(".site-default-text").html("").html(boldBIUrl + $("#tenant-identifier").val());
            }
            $(".site-domain").html($("#enable-ssl").val() + "://" + $("#input-domain").val());
            $(".site-id-name").html("");
        }

        $(".site-url").attr("data-content", $(".site-domain").html() + $(".site-default-text").text());
    });

    $(document).on("keyup", "#tenant-identifier", function (event) {
        if (isBoldReportsTenantType()) {
            $(".site-default-text").html("").html(boldReportsUrl);
        }
        else {
            $(".site-default-text").html("").html(boldBIUrl);
        }

        $(".site-id-name").html($(this).val());
        $(".site-domain").html($("#enable-ssl").val() + "://" + $("#input-domain").val());
        $(".site-url").attr("data-content", $(".site-domain").html() + $(".site-default-text").text() + $(".site-id-name").text());
    });

    $(document).on("change keyup", "#input-domain", function (event) {
        if (actionType.toLowerCase() == "edit") {
            if (isBoldReportsTenantType()) {
                if ($("#tenant-identifier").val() == "") {
                    $(".site-default-text").html("").html(boldReportsPath);
                }
                else {
                    $(".site-default-text").html("").html(boldReportsUrl + $("#tenant-identifier").val());
                }
                $(".site-id-name").html("");
            }
            else {
                if ($("#tenant-identifier").val() == "") {
                    $(".site-default-text").html("").html(boldBiPath);
                }
                else {
                    $(".site-default-text").html("").html(boldBIUrl + $("#tenant-identifier").val());
                }
                $(".site-id-name").html("");
            }
            $(".site-domain").html($("#enable-ssl").val() + "://" + $("#input-domain").val());
            $(".site-url").attr("data-content", $(".site-domain").html() + $(".site-default-text").text());
        }
        else {
            $(".site-domain").html($("#enable-ssl").val() + "://" + $("#input-domain").val());
            $(".site-url").attr("data-content", $(".site-domain").html() + $(".site-default-text").text() + $(".site-id-name").text());
        }
        $("#tenant-identifier-validation-error").css("display", "none");
        $("#tenant-identifier-empty-validation-error").css("display", "none");
        $("#domain-validation-error").css("display", "none");
        $("#enable-ssl").css("margin-bottom", "5px");
        $("#domain-validation-error").html("");
        $(".empty-validation-error").css("padding-bottom", "0px");
        $(".identifier-info").css("padding-top", "20px");
    });

    $(document).on("change", "input[name=identifier]", function () {
        if ($('input[name="identifier"]').prop("checked")) {
            if (actionType.toLowerCase() == "edit") {
                if (isBoldReportsTenantType()) {
                    $(".site-default-text").html("").html(boldReportsPath);
                }
                else {
                    $(".site-default-text").html("").html(boldBiPath);
                }
                $(".site-domain").html($("#enable-ssl").val() + "://" + $("#input-domain").val());
                $(".site-url").attr("data-content", $(".site-domain").html() + $(".site-default-text").text());
            }
            else {
                if (isBoldReportsTenantType()) {
                    $(".site-default-text").html("").html(boldReportsPath);
                }
                else {
                    $(".site-default-text").html("").html(boldBiPath);
                }
                $(".site-url").attr("data-content", $(".site-domain").html() + $(".site-default-text").text());
            }
            prevTenantIdentifier = $("#tenant-identifier").val();
            $("#tenant-identifier").val("");
            $("#tenant-identifier").attr("disabled", true);
            $("#tenant-identifier-validation-error").css("display", "none");
            $("#tenant-identifier").parent(".e-float-input").removeClass("e-error");
            $("#input-domain").closest("div").removeClass("has-error");
            $(".identifier-info").css("padding-top", "20px");
            $(".site-id-name").html("");
        }
        else {
            $("#tenant-identifier").attr("disabled", false);
            $("#tenant-identifier-empty-validation-error").css("display", "none");
            $("#tenant-identifier-empty-validation-error").html("");
            if (actionType.toLowerCase() == "edit") {
                if (haveTenantIdentifier == false) {
                    if ($("#tenant-identifier").val() != "") {
                        $("#tenant-identifier").attr("disabled", false);
                    }
                }
                else {
                    $("#tenant-identifier").val(prevTenantIdentifier);
                    $("#tenant-identifier-validation-error").css("display", "none");
                    $("#tenant-identifier").attr("disabled", true);
                }
                if (haveTenantIdentifier == false) {
                    if (isBoldReportsTenantType()) {
                        $(".site-default-text").html("").html(boldReportsUrl);
                    }
                    else {
                        $(".site-default-text").html("").html(boldBIUrl);
                    }
                    $(".site-domain").html($("#enable-ssl").val() + "://" + $("#input-domain").val());
                    $(".site-id-name").html("");
                    $(".site-url").attr("data-content", $(".site-domain").html() + "/" + $(".site-default-text").text() + "/" + $(".site-id-name").html());
                }
                else {
                    if (isBoldReportsTenantType()) {
                        $(".site-default-text").html("").html(boldReportsUrl);
                    }
                    else {
                        $(".site-default-text").html("").html(boldBIUrl);
                    }
                    $(".site-domain").html($("#enable-ssl").val() + "://" + $("#input-domain").val());
                    $(".site-id-name").html(prevTenantIdentifier);
                    $(".site-url").attr("data-content", $(".site-domain").html() + "/" + $(".site-default-text").text() + "/" + $(".site-id-name").html());
                }
            }
        }
    });

    $("#input-domain").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            domainname: {
                IsRequired: true,
                isValidUrl: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
        },
        messages: {
            domainname: {
                IsRequired: window.Server.App.LocalizationContent.Urlvalidator,
                isValidUrl: window.Server.App.LocalizationContent.DomainValidator
            }
        }
    });

    $("#tenant-identifier").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            tenantidentifier: {
                isRequired: true,
                isValidIdentifier: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
        },
        messages: {
            tenantidentifier: {
                isRequired: window.Server.App.LocalizationContent.SiteIdentifierValidator,
                isValidIdentifier: window.Server.App.LocalizationContent.AvoidSpecailCharacters
            }
        }
    });

    $("#tenant-name").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            tenantname: {
                required: true,
                isValidName: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
        },
        messages: {
            tenantname: {
                required: window.Server.App.LocalizationContent.SiteNameValidator,
                isValidName: window.Server.App.LocalizationContent.AvoidSpecailCharacters
            }
        }
    });

    $("#tenant-registration-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            tenantname: {
                isRequired: true,
                isValidName: true,
                maxlength: 255
            },
            tenantidentifier: {
                required: true,
                isValidIdentifier: true,
                maxlength: 64
            },
            domainname: {
                isDomainRequired: true,
                isValidUrl: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").css("display", "block");
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").html(error.html());
        },
        messages: {
            tenantname: {
                isRequired: window.Server.App.LocalizationContent.SiteNameValidator,
                isValidName: window.Server.App.LocalizationContent.AvoidSpecailCharacters,
                maxlength: window.Server.App.LocalizationContent.SiteValidation
            },
            tenantidentifier: {
                required: window.Server.App.LocalizationContent.SiteIdentifierValidator,
                isValidIdentifier: window.Server.App.LocalizationContent.AvoidSpecailCharacters,
                maxlength: window.Server.App.LocalizationContent.SiteIdentifierValidation
            },
            messages: {
                domainname: {
                    isDomainRequired: window.Server.App.LocalizationContent.Urlvalidator,
                    isValidUrl: window.Server.App.LocalizationContent.DomainValidator
                }
            }
        }
    });
});

function changeTenantType(args) {
    if (actionType != null && actionType != undefined && actionType.toLowerCase() != "edit") {
        $("#change-master").prop("checked", false);
        if (isBoldReportsTenantType()) {
            item = "reports";
            $("#enable-ssl").val(reportScheme);
            $("#input-domain").val(reportDomain);
            if (isBoldReportsTenantType()) {
                $(".get-data-security").css("display", "inline");
                $("#selection-data-security").css("display", "inline");
                $(".selector").addClass("selector-alignment");
                $(".select-intermediate-database").html(window.Server.App.LocalizationContent.SiteDataStore);
            }
            else {
                $(".get-data-security").css("display", "none");
                $("#selection-data-security").css("display", "none");
                $(".selector").removeClass("selector-alignment");
            }

            $(".reports-branding").css("display", "inline");
            $(".bi-branding").css("display", "none");
            $(".select-storage").html(window.Server.App.LocalizationContent.SelectStorage);
            $("#header-description").html(window.Server.App.LocalizationContent.BoldReportsMultiTenancy);
            $("#master-site-description").html(window.Server.App.LocalizationContent.MasterSiteDescription.format("reports", "reports"));
            if (useSiteIdentifierEnable) {
                $(".site-default-text").html("").html(boldReportsUrl);
            }
            else {
                $(".site-default-text").html("").html(boldReportsPath);
            }
            if (isCommonLogin) {
                document.getElementById("branding-type").ej2_instances[0].list.querySelectorAll('li')[1].style.display = "block";
                document.getElementById("branding-type").ej2_instances[0].list.querySelectorAll('li')[0].style.display = "none";
            }

            document.getElementById("branding-type").ej2_instances[0].value = reportsProductname;
            $(".isolation-part").addClass("hide");
            if (isBoldReportsTenantType()) {
                $(".attribute-part-bi").addClass("hide");
                $(".attribute-part-report").removeClass("hide");
            }
            $(".data-security-note").html(window.Server.App.LocalizationContent.BoldReportsDataSecurityNote);
        }
        else {
            item = "dashboards";
            $("#enable-ssl").val(biScheme);
            $("#input-domain").val(biDomain);
            $(".get-data-security").css("display", "inline");
            $("#selection-data-security").css("display", "inline");
            $(".selector").addClass("selector-alignment");
            $(".reports-branding").css("display", "none");
            $(".bi-branding").css("display", "inline");
            $(".select-intermediate-database").html(window.Server.App.LocalizationContent.SiteDataStore);
            $(".select-storage").html(window.Server.App.LocalizationContent.SelectStorage);
            $("#header-description").html(window.Server.App.LocalizationContent.BoldBiMultiTenancy);
            $("#master-site-description").html(window.Server.App.LocalizationContent.MasterSiteDescription.format("reports", "reports"));
            if (useSiteIdentifierEnable) {
                $(".site-default-text").html("").html(boldBIUrl);
            }
            else {
                $(".site-default-text").html("").html(boldBiPath);
            }

            if (isCommonLogin) {
                document.getElementById("branding-type").ej2_instances[0].list.querySelectorAll('li')[0].style.display = "block";
                document.getElementById("branding-type").ej2_instances[0].list.querySelectorAll('li')[1].style.display = "none";
            }
            document.getElementById("branding-type").ej2_instances[0].value = biProductname;
            $(".isolation-part").removeClass("hide");
            if (isBoldReportsTenantType()) {
                $(".attribute-part-bi").removeClass("hide");
                $(".attribute-part-report").addClass("hide");
            }
            $(".data-security-note").html(window.Server.App.LocalizationContent.BoldBIDataSecurityNote);
        }
    }
}