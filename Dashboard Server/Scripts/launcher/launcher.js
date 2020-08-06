//Default State
var isSupported = false;
var type = "";

function result() {
    if (!isSupported) {
        window.location = designerUrl;
    }
}

//Add or update user designer mapping 

//Handle Click on Launch button
function launchApplication(url) {

    (/edge/i).test(navigator.userAgent) ? launchIE(url) :
           (/opr/i.test(navigator.userAgent) || "opera" in window) ? launchOpera(url) :
             (/chrome/i).test(navigator.appVersion) ? launchChrome(url) :
               (/safari/i).test(navigator.userAgent) ? launchSafari(url) :
                 (/firefox/i).test(navigator.userAgent) ? launchMozilla(url) :
                   (/trident/i).test(navigator.userAgent) ? launchIE(url) : "";

}


//Handle IE
function launchIE(url) {

    if (navigator.msLaunchUri) {
        navigator.msLaunchUri(url, msLaunchUriSuccess, msLaunchNoHandler);
    }
    else {
        var myWindow = window.open("", "", "width=0,height=0");
        myWindow.document.write("<iframe src='" + url + "></iframe>");
        setTimeout(function () {
            try {
                myWindow.location.href;
                isSupported = true;
            } catch (e) {
                //Handle Exception
            }

            if (isSupported) {
                myWindow.setTimeout("window.close()", 100);
            } else {
                myWindow.close();
            }
            result();
        }, 100)

    }
}

function msLaunchUriSuccess() {
    isSupported = true;
    result();
}

function msLaunchNoHandler() {
    isSupported = false;
    result();
}
//Handle Firefox
function launchMozilla(url) {

    iFrame = $('#hiddeniframe')[0];
    isSupported = false;

    //Set iframe.src and handle exception
    try {
        iFrame.contentWindow.location.href = url;
        isSupported = true;
        result();
    } catch (e) {
        if (e.name == "NS_ERROR_UNKNOWN_PROTOCOL") {
            isSupported = false;
            result();
        }
    }
}

//Handle Chrome
function launchChrome(url) {

    var protcolEl = $("#applauncherinputhidden")[0];

    isSupported = false;

    protcolEl.focus();
    console.log($($("#applauncherinputhidden")[0]).is(":focus"));

    protcolEl.onblur = function () {
        isSupported = true;
    };

    //when remember me check box selected
    window.onblur = function () {
        isSupported = true;
        console.log("blur");
    }

    //will trigger onblur
    location.href = url;

    //Note: timeout could vary as per the browser version, have a higher value
    setTimeout(function () {
        console.log($($("#applauncherinputhidden")[0]).is(":focus"));
        protcolEl.onblur = null;
        window.onblur = null;
        result()
    }, 2000);
}

function launchSafari(url) {

    isSupported = false;
   var iFrame = $('#hiddeniframe')[0];
   window.onblur = function () {
        isSupported = true;
        console.log("blur");
    }
    //will trigger onblur

    iFrame.contentWindow.location.href = url;

    //Note: timeout could vary as per the browser version, have a higher value
    setTimeout(function () {
        window.onblur = null;
        result()
    }, 4000);
}

function launchOpera(url) {


    var iFrame = $('#hiddeniframe')[0];
    var protcolEl = $('#applauncherinputhidden')[0];
    isSupported = false;

    protcolEl.focus();
    protcolEl.onblur = function () {
        isSupported = true;
    }
    window.onblur = function () {
        isSupported = true;
        console.log("blur");
    }
    //will trigger onblur
    iFrame.contentWindow.location.href = url;

    setTimeout(function () {
        console.log($($("#applauncherinputhidden")[0]).is(":focus"));
        protcolEl.onblur = null;
        window.onblur = null;
        result()
    }, 2000);

    //Note: timeout could vary as per the browser version, have a higher value

}

$(document).on("click", "#launcher", function (e) {
    if (i_am_ie9) {
        e.preventDefault();
        messageBox("su-info", window.Server.App.LocalizationContent.Information, window.Server.App.LocalizationContent.UnableToLaunchdesigner + " <a href='" + designerInstallationHelpUrl + "'>" + window.Server.App.LocalizationContent.LinkContent + "</a> " + window.Server.App.LocalizationContent.OpenDashboardDesigner, "success", function () {
            onCloseMessageBox();
        });
    }
    else {
        var designerArgument = $(this).children("#designerArgument").html();
        var registryvalue = $("#DesignerName").val() + ":" + designerArgument;
        launchApplication(registryvalue);
    }
});