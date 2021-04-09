var timeoutFunction;
$(document).ready(function () {
    $('#circle').circleProgress({
        value: 0,
        size: 400,
        fill: "#0970FF",
        startAngle: Math.PI * 1.5,
        thickness: 8,
        lineCap: 'round',
        emptyThickness: 2,
        emptyFill: "#E3E3E3",
        arcCoef: 1
    });

    var progressNotifier = $.connection.progressHub;
    progressNotifier.client.sendMessage = function (message) {
        var signalrValue = message.replace('%', '');
        var circleValue = $('#circle').circleProgress('value');
        if ((signalrValue / 100) > circleValue) {
            $('#circle').circleProgress('value', signalrValue / 100);
        }

        if (signalrValue == "37") {
            timeoutRunner();
        }

        if (signalrValue == "100") {
            triggerGoogleAnalyticsOnDeployComplete();
            clearTimeout(timeoutFunction);
        }
    };

    $.connection.hub.start().done(function () {
        setTimeout(function () {
            progressNotifier.server.addTenantGroup(tenantInfoId);
            $('#circle').circleProgress('value', 0.18);
            $.ajax({
                type: "POST",
                url: deployTenantUrl,
                data: { tenantInfoId: tenantInfoId, planId: planId },
                success: function (result) {
                    window.location.href = result.Value;
                }
            });
        }, 2000);

        $('#circle').circleProgress('value', 0.05);
    });

    triggerGoogleAnalyticsOnDeployVisit();
});

$.circleProgress.defaults.getEmptyThickness = function () {
    return typeof this.emptyThickness != 'undefined' ? this.emptyThickness : this.getThickness();
};

$.circleProgress.defaults.drawEmptyArc = function (v) {
    var ctx = this.ctx,
        r = this.radius,
        t = this.getThickness(),
        et = this.getEmptyThickness(),
        c = this.arcCoef,
        a = this.startAngle + (1 - c) * Math.PI;

    v = Math.max(0, Math.min(1, v));

    if (v < 1) {
        ctx.save();
        ctx.beginPath();

        if (v <= 0) {
            ctx.arc(r, r, r - t / 2, a, a + 2 * c * Math.PI);
        } else {
            if (!this.reverse) {
                ctx.arc(r, r, r - t / 2, a + 2 * c * Math.PI * v, a + 2 * c * Math.PI);
            } else {
                ctx.arc(r, r, r - t / 2, a, a + 2 * c * (1 - v) * Math.PI);
            }
        }

        ctx.lineWidth = et;
        ctx.lineCap = this.lineCap;
        ctx.strokeStyle = this.emptyFill;
        ctx.stroke();
        ctx.restore();
    }
};

function timeoutRunner() {
    timeoutFunction = setTimeout(function () {
        var circleValue = $('#circle').circleProgress('value');
        $('#circle').circleProgress('value', circleValue + 0.01);
        timeoutRunner();
    }, 3000);
}

////Trigger google Analytics
function triggerGoogleAnalyticsOnDeployVisit() {
    if (isBoldBiBranding && analyticsTrackingEnabled) {
        if (isEmbedPlan) {
            gtag('event', 'Embedded BI Cloud Deploy', {
                'event_category': 'Bold BI',
                'event_label': 'Bold BI Embedded BI Cloud Deploy'
            });
        } else if (isBoldBICloudRegistration) {
            gtag('event', 'Tenant Deploy', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Tenant Deploy'
                });
        } else {
            gtag('event', 'Tenant Deploy',{
                    'event_category': 'Bold Reports',
                    'event_label': 'Bold Reports Tenant Deploy'
                });
        }

        gtag_report_conversion();
    }
}

function triggerGoogleAnalyticsOnDeployComplete() {
    if (isBoldBiBranding && analyticsTrackingEnabled) {
        if (isEmbedPlan) {
            gtag('event', 'Embedded BI Cloud Deploy Complete', {
                'event_category': 'Bold BI',
                'event_label': 'Bold BI Embedded BI Cloud Deploy Complete'
            });
        } else if (isBoldBICloudRegistration) {
            gtag('event', 'Tenant Deploy Complete', {
                'event_category': 'Bold BI',
                'event_label': 'Bold BI Tenant Deploy Complete'
            });
        } else  {
            gtag('event', 'Tenant Deploy Complete', {
                'event_category': 'Bold Reports',
                'event_label': 'Bold Reports Tenant Deploy Complete'
            });
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