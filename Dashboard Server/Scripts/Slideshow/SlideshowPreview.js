var slideObj;
var _delay = setInterval(delayCheck, 500);
var canHideControl = true;
var canShowControl = false;
var isFullscreensupported = true;
var currentSlideIndex = 0;
var inAutoPlay = false;

$(document).ready(function () {
    jQuery.support.cors = true;
    $(".content-container-fluid").show();
    createSlider();
    slideObj = $("#sliderContent").data("ejRotator");
    //window.document.addEventListener('onSwipeDetected', onSwipeHandler, false)
    
    slideObj._wrapper.on("mouseenter mousemove", function () {
        if (canShowControl) {
            $('#controls-container').show();
            clearInterval(_delay);
            _delay = setInterval(delayCheck, 5000);
        }
    });

    if (document.addEventListener) {
        document.addEventListener('webkitfullscreenchange', fullscreenExitHandler, false);
        document.addEventListener('mozfullscreenchange', fullscreenExitHandler, false);
        document.addEventListener('fullscreenchange', fullscreenExitHandler, false);
        document.addEventListener('MSFullscreenChange', fullscreenExitHandler, false);
    }

    var iframes = document.getElementsByTagName("iframe");
    if (applyScaling) {
        applyScalingFactor(iframes);
    }   
});

$(document).on('dashboardRenderComplete', function () {
    if (!inAutoPlay) {
        $("#layout-body-loader-icon").remove();
        inAutoPlay = true;
        if (sources.length > 1) {
            slideObj._autoPlay();
        }        
    }
});

function onSwipeHandler(e) {
    if (e.detail.type == "swipeLeft") {
        $("#slide-next").click();
    } else if (e.detail.type == "swipeRight") {
        $("#slide-previous").click();
    }
}

function createSlider() {
    $("#sliderContent").ejRotator({
        isResponsive: false,
        slideWidth: window.innerWidth,
        slideHeight: window.innerHeight,
        frameSpace: "0px",
        displayItemsCount: "1",
        navigateSteps: "1",
        orientation: ej.Orientation.Horizontal,
        pagerPosition: ej.Rotator.PagerPosition.BottomLeft,
        enabled: true,
        enableAutoPlay: false,
        allowKeyboardNavigation: true,
        showPlayButton: false,
        showNavigateButton: false,
        showPager: false,
        animationType: "slowSlide",
        delay: loopInterval * 1000,
        change: "onChange",
        create: "onCreate"
    });
}

function onCreate(args) {
    $("#pager").text(1 + " of " + sources.length);
    var firstFrame = $(this.element.children("li:not(.clone)")[0]).find("iframe");
    firstFrame.attr("src", sources[0]);
    var iframe = document.getElementById(firstFrame.attr("id"));
    iframe.onload = function() {
        $('#controls-container').show();
        canShowControl = true;
    }
    $(this.element.children("li:not(.clone)")[1]).find("iframe").attr("src", sources[1]);
}

function onChange(args) {
    currentSlideIndex = slideObj._prevIndex;
    $("#pager").text((args.activeItemIndex + 1) + " of " + sources.length);
    bubbleIframeMouseMove($(this.element.children("li:not(.clone)")[args.activeItemIndex]).find("iframe"));
    if ($(this.element.children("li:not(.clone)")[args.activeItemIndex]).find("iframe").attr("src") == "") {
        $(this.element.children("li:not(.clone)")[args.activeItemIndex]).find("iframe").attr("src", sources[args.activeItemIndex]);
    }
    
    if (args.activeItemIndex == sources.length - 1) {
        var iframe = $(this.element.children("li:not(.clone)")[0]).find("iframe");
        if (iframe.attr("src") == "") {
            iframe.attr("src", sources[0]);
        } else {
            var frame = document.getElementById(iframe.attr("id"));
            if (frame.contentWindow.RefreshDashobardData !== undefined) {
                try {
                    frame.contentWindow.RefreshDashobardData();
                } catch (ex) {
                    //ignore
                }
            }
        }
    } else {
        var iframe = $(this.element.children("li:not(.clone)")[args.activeItemIndex]).next().find("iframe");
        if (iframe.attr("src") == "") {
            iframe.attr("src", sources[args.activeItemIndex + 1]);
        } else {
            var frame = document.getElementById(iframe.attr("id"));
            if (frame.contentWindow.RefreshDashobardData !== undefined) {
                try {
                    frame.contentWindow.RefreshDashobardData();
                } catch (ex) {
                    //ignore
                }
            }
        }
    }
}

$(document).on("mouseenter mouseover", "#controls-container", function () {
    if (canShowControl) {
        $("#controls-container").stop(true, true).fadeIn();
        canHideControl = false;  
    }
});

$(document).on("mouseleave", "#controls-container", function () {
    canHideControl = true;
    clearInterval(_delay);
    _delay = setInterval(delayCheck, 5000);
});

$(window).resize(function () {
    $("#sliderContent").ejRotator({ slideHeight: window.innerHeight, slideWidth: window.innerWidth });
});

$(document).on("click", "#slide-previous", function () {
    slideObj.slidePrevious();
    AutoPlay();
});

$(document).on("click", "#slide-play-pause", function () {
    if ($(this).hasClass('play')) {
        $(this).removeClass('play');
        $(this).addClass('pause');
        slideObj.play();
        inAutoPlay = true;
    } else {
        $(this).removeClass('pause');
        $(this).addClass('play');
        slideObj.pause();
        inAutoPlay = false;
    }
});

$(document).on("click", "#slide-next", function () {
    slideObj.slideNext();
    AutoPlay();
});

$(document).on("click", "#slide-maximize", function () {
    currentSlideIndex = slideObj._prevIndex;
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else {
            isFullscreensupported = false;
            if ("ActiveXObject" in window) {
                var wscript = new ActiveXObject("Wscript.shell");
                wscript.SendKeys("{F11}");
                setTimeout(function () {
                    if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
                        $("#slide-maximize").removeClass("su-maximize-1");
                        $("#slide-maximize").addClass("su-minimize");
                    } else {
                        $("#slide-maximize").removeClass("su-minimize");
                        $("#slide-maximize").addClass("su-maximize-1");
                    }
                }, 400);
            }
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    slideObj.gotoIndex(currentSlideIndex);
    $(".cover-iframe").focus();
    AutoPlay();

    setTimeout(function () {
        var iframes = document.getElementsByTagName("iframe");
        if (applyScaling) {
            applyScalingFactor(iframes);
        }   
    }, 2000);
});

$(document).on('keyup', function (e) {
    if (canShowControl) {
        var showControl = false;
        if (e.which == 32) {
            e.preventDefault();
            showControl = true;
            $("#slide-play-pause").click();
        } else if (e.which == 37) {
            showControl = true;
            $("#slide-previous").click();
        } else if (e.which == 39) {
            showControl = true;
            $("#slide-next").click();
        }

        if (showControl) {
            $('#controls-container').hide().show();
            clearInterval(_delay);
            _delay = setInterval(delayCheck, 5000);
        }    
    }
});

$(document).on("click", ".ctrl-btn", function (e) {
    $(".ripple").remove();
    var posX = $(this).offset().left,
        posY = $(this).offset().top,
        buttonWidth = $(this).width(),
        buttonHeight = $(this).height();

    $(this).prepend("<span class='ripple'></span>");
    if (buttonWidth >= buttonHeight) {
        buttonHeight = buttonWidth;
    } else {
        buttonWidth = buttonHeight;
    }

    $(".ripple").css({
        width: buttonWidth,
        height: buttonHeight,
        top: '20px',
        left: '20px'
    }).addClass("rippleEffect");
});

function AutoPlay() {
    if (inAutoPlay) {
        setTimeout(function () {
            if (inAutoPlay) {
                slideObj.play();
            }
        }, 3000);
    }
}

function delayCheck() {
    if (canHideControl) {
        $('#controls-container').fadeOut(2000);
    }
}

function fullscreenExitHandler() {
    slideObj.gotoIndex(currentSlideIndex);
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        $("#slide-maximize").removeClass("su-minimize");
        $("#slide-maximize").addClass("su-maximize-1");
    } else {
        $("#slide-maximize").removeClass("su-maximize-1");
        $("#slide-maximize").addClass("su-minimize");
    }

    AutoPlay();
}

function bubbleIframeMouseMove(frame) {
    var iframe = document.getElementById(frame.attr("id"))
    var existingOnMouseMove = iframe.contentWindow.onmousemove;
    iframe.contentWindow.onmousemove = function (e) {
        if (existingOnMouseMove) existingOnMouseMove(e);
        var evt = document.createEvent("MouseEvents");
        var boundingClientRect = iframe.getBoundingClientRect();
        evt.initMouseEvent(
            "mousemove",
            true,
            false,
            window,
            e.detail,
            e.screenX,
            e.screenY,
            e.clientX + boundingClientRect.left,
            e.clientY + boundingClientRect.top,
            e.ctrlKey,
            e.altKey,
            e.shiftKey,
            e.metaKey,
            e.button,
            null
        );

        iframe.dispatchEvent(evt);
    };
}