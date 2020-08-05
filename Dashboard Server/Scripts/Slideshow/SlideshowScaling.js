function applyScalingFactor(iframes) {
    var scalingFactor = this.getScalingFactor($(window).height(), $(window).width());
    for (i = 0; i < iframes.length; i++) {
        if (i != 0 && i !=  iframes.length -1) {
            $(iframes[i]).css({
                '-ms-zoom': scalingFactor,
                '-moz-transform': 'scale(' + scalingFactor + ')',
                '-moz-transform-origin': '0 0',
                '-o-transform': 'scale(' + scalingFactor + ')',
                '-o-transform-origin': '0 0',
                '-webkit-transform': 'scale(' + scalingFactor + ')',
                '-webkit-transform-origin': '0 0',
                height: $(window).height() / scalingFactor,
                width: $(window).width() / scalingFactor
            });
        }
    }
}

function getScalingFactor(currentLayoutHeight, currentLayoutWidth) {
    var baseDashboardHeight = 768;
    var baseDashboardWidth = 1366;
    var mobileWidth = 768;
    var scalingFactor;
    if (currentLayoutWidth > mobileWidth) {
        var scalingwidth = currentLayoutWidth / baseDashboardWidth;
        var scalingHeight = currentLayoutHeight / baseDashboardHeight;
        if (currentLayoutWidth > baseDashboardWidth) {
            scalingFactor = Math.min(scalingwidth, scalingHeight);
        } else {
            scalingFactor = 1;
        }
    } else {
        scalingFactor = 1;
    }
    return scalingFactor > 1 ? scalingFactor : 1;
}