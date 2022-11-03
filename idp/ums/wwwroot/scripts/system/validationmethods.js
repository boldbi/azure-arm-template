$(document).ready(function () {

    //user account validation methods
    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.TM.App.LocalizationContent.EnterName);

    $.validator.addMethod("additionalSpecialCharValidation", function (value, element) {
        if (/^[a-zA-Z_0-9`~!\$\^()=\-\.\{\} ]+$/.test(value) || value === "") {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value);
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("hasWhiteSpace", function (value, element) {
        return /\s/.test(value);
    }, window.TM.App.LocalizationContent.HasSpace);

    $.validator.addMethod("isValidUser", function (value, element) {
        return isValidUserName(value)
    }, window.TM.App.LocalizationContent.UsernameInvalidChar);

    $.validator.addMethod("isValidUsername", function (value, element) {
        return IsValidUsername(value);
    }, window.TM.App.LocalizationContent.InvalidUsername);

    $.validator.addMethod("isValidUsernameLength", function (value, element) {
        return IsValidUsernameLength(value);
    }, window.TM.App.LocalizationContent.UsernameExceeds);

    $.validator.addMethod("isValidEmail", function (value, element) {
        return IsEmail(value);
    }, window.TM.App.LocalizationContent.EnterValidEmail);

    //database validation methods

    $.validator.addMethod("isValidPrefix", function (value, element) {
        if (/^[a-zA-Z\_]+$/g.test(value) || value === "") {
            return true;
        } else {
            return false;
        }
    }, window.TM.App.LocalizationContent.AvoidNumberSpace);

    $.validator.addMethod("isValidDatabaseName", function (value, element) {
        if (/^[a-zA-Z_0-9@~!#\$\^&()+=\-,\.\/\{\} ]+$/.test(value) && !/^[\s]+|[\s]+$/g.test(value)) {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " (<>%*?\":`;'[]|\\) " + window.TM.App.LocalizationContent.AvoidLeadingTrailingSpace);

    $.validator.addMethod("sqlUsernamevalidation", function (value, element) {
        if (/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\\',\.\/\{\}\|:<>\? ]+$/.test(value) && !/^[\s]/g.test(value)) {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " (\";) " + window.TM.App.LocalizationContent.AvoidLeadingSpace);

    $.validator.addMethod("isValidCredentials", function (value, element) {
        return /^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\\',\.\/\{\}\|:<>\? ]+$/.test(value);
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " (\";)");



    $.validator.addMethod("mySqlCredentials", function (value, element) {
        if ((/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\\',\.\/\{\}\|\":<>\? ]+$/.test(value) && !/^[\s]+|[\s]+$/g.test(value)) || value === "") {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " ; " + window.TM.App.LocalizationContent.MySqlAvoidLeadingTrailingSpace);

    $.validator.addMethod("oraclePasswordValidation", function (value, element) {
        if (/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\,\.\/\{\}\|:<>\? ]+$/.test(value) && !/^[\s]+|[\s]+$/g.test(value)) {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " (';\") " + window.TM.App.LocalizationContent.OracleAvoidLeadingTrailingSpace);

    $.validator.addMethod("oracleUsernameValidation", function (value, element) {
        if (/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\,\.\/\{\}\|:<>\? ]+$/.test(value)) {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " (';\")");

    $.validator.addMethod("additionalSpecialCharValidation", function (value, element) {
        if (/^[a-zA-Z_0-9`~!\$\^()=\-\.\{\} ]+$/.test(value) || value === "") {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("postgresqlUsernamevalidation", function (value, element) {
        if (/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\',\.\/\{\}\|:<>\? ]+$/.test(value) && !/^[\s]+|[\s]+$/g.test(value)) {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " (\"\\;) " + window.TM.App.LocalizationContent.PostgresqlAvoidLeadingTrailingSpace);

    $.validator.addMethod("isValidPostgresqlCredentials", function (value, element) {
        return /^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\',\.\/\{\}\|:<>\? ]+$/.test(value);
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " (\"\\;)");

    $.validator.addMethod("isValidPortNumber", function (value, element) {
        return /^\d{1,5}$/.test(value) && value < 65536 && !/^[\s]/g.test(value);
    }, window.TM.App.LocalizationContent.IsValidPort);


    //storage validation
    $.validator.addMethod("IsValidEndPoint", function (value, element) {
        return IsValidEndPoint(value);
    }, window.TM.App.LocalizationContent.EndPoint);

    $.validator.addMethod("IsCustomEndpoint", function (value, element) {
        return IsCustomEndPoint(value, element);
    }, window.TM.App.LocalizationContent.IsValidCustomEndPoint);
    $.validator.addMethod("IsValidCustomEndPoint", function (value, element) {
        return IsValidCustomEndPoint(value, element);
    }, window.TM.App.LocalizationContent.IsValidCustomEndPoint);


    //site configuration validation
    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, "Please enter the name.");

    $.validator.addMethod("isDomainRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.TM.App.LocalizationContent.Urlvalidator);

    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    }, "Please avoid special characters.");

    $.validator.addMethod("isValidIdentifier", function (value, element) {
        return IsValidIdentifier(value);
    }, "Please avoid special characters.");

    $.validator.addMethod("isValidUrl", function (value, element) {
        return isValidUrl(value);
        var givenUrl = $("#input-domain").val();
        var url = parseURL(givenUrl);
        if (isValidUrl(value) == false || parseInt(url.port) > 65535)
            return false;
        else
            return true;
    }, window.TM.App.LocalizationContent.DomainValidator);
});

function isValidUserName(userName) {
    if (isKeyUp) {
        return true;
    }
    else {
        var filter = /^[A-Za-z0-9][A-Za-z0-9]*([._-][A-Za-z0-9]+){0,3}$/;
        return filter.test(userName);
    }

}

function IsValidEndPoint(domainName) {
    var filter = /(?:http)s?:\/\/(?:(?!.*\d[\/?:])[a-z0-9\-._~%]+|(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\[[a-z0-9\-._~%!$&'()*+,;=:]+\])(?::\d+)?(?:[\/?][\-A-Z0-9+&@#\/%?=~_|$!:,.;]*)?/i;
    if (filter.test(domainName)) {
        return true;
    } else {
        return false;
    }
}

function IsCustomEndPoint(fieldValue, element) {
    var connectionType = $("input[name='Connection']:checked").val();
    if (connectionType == "customendpoint") {
        if (fieldValue == "")
            return false;
        else
            return true;
    }
    else
        return false;
}

function IsValidCustomEndPoint(fieldValue, element) {
    var connectionType = $("input[name='Connection']:checked").val();
    var accountname = $("#txt-accountname").val();
    if (connectionType == "customendpoint") {
        var accountName = $("#txt-accountname").val();
        var elementDomainName = $(element).val().split(".");
        var subdomain = elementDomainName.shift();
        var sndleveldomain = subdomain.split("//");
        if (sndleveldomain[1] != accountname)
            return false;
        else
            return true;
    }
    else
        return false;
}

function IsValidIdentifier(inputString) {
    var regex = /^[a-zA-Z0-9-]+$/;
    return regex.test(inputString) || inputString == "";
}