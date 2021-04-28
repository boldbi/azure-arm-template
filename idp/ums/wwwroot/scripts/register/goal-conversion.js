var isBoldBiBranding = "";
var analyticsTrackingEnabled = "";
var googleAnalyticsSendTo = "";

$(document).ready(function () {
    isBoldBiBranding = $("meta[name='is_boldbi_branding']").attr("content").toLowerCase() == "true";
    analyticsTrackingEnabled = $("meta[name='analytics_tracking:enabled']").attr("content").toLowerCase() == "true";
    googleAnalyticsSendTo = $("meta[name='google_analytics:send_to']").attr("content");

    if (isNewTenant && isBoldBIOnPremise) {
        ////Trigger google tracking for page visit
        triggerGoogleAnalyticsOnRegistrationVisit();

        ////Trigger google tracking for page complete
        triggerGoogleAnalyticsOnRegistrationComplete();
    }
    
    window.location.href = downloadUrl;

});

////Trigger google Analytics
function triggerGoogleAnalyticsOnRegistrationVisit() {
    if (isBoldBiBranding && analyticsTrackingEnabled) {
        if (isCloudRegistration) {
            gtag('event', 'Tenant Registration', {
                'event_category': 'Bold BI',
                'event_label': 'Bold BI Tenant Registration'
            });
        }
        else if (isReportsCloudRegistration) {
            gtag('event', 'Tenant Registration', {
                'event_category': 'Bold Reports',
                'event_label': 'Bold Reports Tenant Registration'
            });
        }
        else {
            if (isEmbedPlan) {
                gtag('event', 'Embedded BI On-Premise Registration', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Embedded BI On-Premise Registration'
                });
            } else {
                gtag('event', 'On-Premise Registration', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI On-Premise Registration'
                });
            }
        }

        gtag_report_conversion();
    }
}

function triggerGoogleAnalyticsOnRegistrationComplete() {
    if (isBoldBiBranding && analyticsTrackingEnabled) {
        if (isCloudRegistration) {
            gtag('event', 'Tenant Registration Complete', {
                'event_category': 'Bold BI',
                'event_label': 'Bold BI Tenant Registration Complete'
            });
            boldBIOpportunity();
        }
        else if (isReportsCloudRegistration) {
            gtag('event', 'Tenant Registration Complete', {
                'event_category': 'Bold Reports',
                'event_label': 'Bold Reports Tenant Registration Complete'
            });
        }
        else {
            if (isEmbedPlan) {
                gtag('event', 'Embedded BI On-Premise Registration Complete', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Embedded BI On-Premise Registration Complete'
                });
            } else {
                gtag('event', 'On-Premise Registration Complete', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI On-Premise Registration Complete'
                });
            }

            boldBIOpportunity();
        }

        gtag_report_conversion();
    }
}

function gtag_report_conversion(url) {
    var callback = function () {
        if (typeof (url) !== 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': googleAnalyticsSendTo,
        'event_callback': callback
    });
    return false;
}

function boldBIOpportunity() {
    gtag('event', 'Opportunity', {
        'event_category': 'Bold BI',
        'event_label': 'Bold BI Opportunity'
    });
}