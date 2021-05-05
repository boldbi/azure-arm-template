/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.2.0",d.prototype.close=function(b){function c(){f.detach().trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",c).emulateTransitionEnd(150):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.2.0",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),d[e](null==f[b]?this.options[b]:f[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b).on("keydown.bs.carousel",a.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.2.0",c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},c.prototype.keydown=function(a){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.to=function(b){var c=this,d=this.getItemIndex(this.$active=this.$element.find(".item.active"));return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=e[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:g});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,f&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(e)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:g});return a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one("bsTransitionEnd",function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger(m)),f&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(b=!b),e||d.data("bs.collapse",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};c.VERSION="3.2.0",c.DEFAULTS={toggle:!0},c.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},c.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var c=a.Event("show.bs.collapse");if(this.$element.trigger(c),!c.isDefaultPrevented()){var d=this.$parent&&this.$parent.find("> .panel > .in");if(d&&d.length){var e=d.data("bs.collapse");if(e&&e.transitioning)return;b.call(d,"hide"),e||d.data("bs.collapse",null)}var f=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[f](0),this.transitioning=1;var g=function(){this.$element.removeClass("collapsing").addClass("collapse in")[f](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return g.call(this);var h=a.camelCase(["scroll",f].join("-"));this.$element.one("bsTransitionEnd",a.proxy(g,this)).emulateTransitionEnd(350)[f](this.$element[0][h])}}},c.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},c.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var d=a.fn.collapse;a.fn.collapse=b,a.fn.collapse.Constructor=c,a.fn.collapse.noConflict=function(){return a.fn.collapse=d,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(c){var d,e=a(this),f=e.attr("data-target")||c.preventDefault()||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),g=a(f),h=g.data("bs.collapse"),i=h?"toggle":e.data(),j=e.attr("data-parent"),k=j&&a(j);h&&h.transitioning||(k&&k.find('[data-toggle="collapse"][data-parent="'+j+'"]').not(e).addClass("collapsed"),e[g.hasClass("in")?"addClass":"removeClass"]("collapsed")),b.call(g,i)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.2.0",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f+', [role="menu"], [role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.2.0",c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(c.$body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one("bsTransitionEnd",function(){c.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(300):c.$element.trigger("focus").trigger(e)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;if(this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;e?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(150):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var f=function(){c.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",f).emulateTransitionEnd(150):f()}else b&&b()},c.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.2.0",c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var c=a.contains(document.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!c)return;var d=this,e=this.tip(),f=this.getUID(this.type);this.setContent(),e.attr("id",f),this.$element.attr("aria-describedby",f),this.options.animation&&e.addClass("fade");var g="function"==typeof this.options.placement?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,h=/\s?auto?\s?/i,i=h.test(g);i&&(g=g.replace(h,"")||"top"),e.detach().css({top:0,left:0,display:"block"}).addClass(g).data("bs."+this.type,this),this.options.container?e.appendTo(this.options.container):e.insertAfter(this.$element);var j=this.getPosition(),k=e[0].offsetWidth,l=e[0].offsetHeight;if(i){var m=g,n=this.$element.parent(),o=this.getPosition(n);g="bottom"==g&&j.top+j.height+l-o.scroll>o.height?"top":"top"==g&&j.top-o.scroll-l<0?"bottom":"right"==g&&j.right+k>o.width?"left":"left"==g&&j.left-k<o.left?"right":g,e.removeClass(m).addClass(g)}var p=this.getCalculatedOffset(g,j,k,l);this.applyPlacement(p,g);var q=function(){d.$element.trigger("shown.bs."+d.type),d.hoverState=null};a.support.transition&&this.$tip.hasClass("fade")?e.one("bsTransitionEnd",q).emulateTransitionEnd(150):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=k.left?2*k.left-e+i:2*k.top-f+j,m=k.left?"left":"top",n=k.left?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(l,d[0][n],m)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one("bsTransitionEnd",b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName;return a.extend({},"function"==typeof c.getBoundingClientRect?c.getBoundingClientRect():null,{scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop(),width:d?a(window).width():b.outerWidth(),height:d?a(window).height():b.outerHeight()},d?{top:0,left:0}:b.offset())},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.2.0",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").empty()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.2.0",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.2.0",c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.closest("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},c.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one("bsTransitionEnd",e).emulateTransitionEnd(150):e(),f.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(c){c.preventDefault(),b.call(a(this),"show")})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.2.0",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=a(document).height(),d=this.$target.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=b-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){null!=this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:b-this.$element.height()-h}))}}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},d.offsetBottom&&(d.offset.bottom=d.offsetBottom),d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
/*!
 * Bootstrap-select v1.6.3 (http://silviomoreto.github.io/bootstrap-select/)
 *
 * Copyright 2013-2014 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
!function (e) { "use strict"; function t(e, t) { return e.toUpperCase().indexOf(t.toUpperCase()) > -1 } Object.keys || (Object.keys = function (e, n, r) { r = []; for (n in e) r.hasOwnProperty.call(e, n) && r.push(n); return r }); function i(t) { var i = [{ re: /[\xC0-\xC6]/g, ch: "A" }, { re: /[\xE0-\xE6]/g, ch: "a" }, { re: /[\xC8-\xCB]/g, ch: "E" }, { re: /[\xE8-\xEB]/g, ch: "e" }, { re: /[\xCC-\xCF]/g, ch: "I" }, { re: /[\xEC-\xEF]/g, ch: "i" }, { re: /[\xD2-\xD6]/g, ch: "O" }, { re: /[\xF2-\xF6]/g, ch: "o" }, { re: /[\xD9-\xDC]/g, ch: "U" }, { re: /[\xF9-\xFC]/g, ch: "u" }, { re: /[\xC7-\xE7]/g, ch: "c" }, { re: /[\xD1]/g, ch: "N" }, { re: /[\xF1]/g, ch: "n" }]; return e.each(i, function () { t = t.replace(this.re, this.ch) }), t } function n(e) { var t = { "&": "&", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" }, i = "(?:" + Object.keys(t).join("|") + ")", n = new RegExp(i), s = new RegExp(i, "g"), o = null == e ? "" : "" + e; return n.test(o) ? o.replace(s, function (e) { return t[e] }) : o } function s(t, i) { var n = arguments, s = t, t = n[0], i = n[1];[].shift.apply(n), "undefined" == typeof t && (t = s); var a, l = this.each(function () { var s = e(this); if (s.is("select")) { var l = s.data("selectpicker"), d = "object" == typeof t && t; if (l) { if (d) for (var r in d) d.hasOwnProperty(r) && (l.options[r] = d[r]) } else { var c = e.extend({}, o.DEFAULTS, e.fn.selectpicker.defaults || {}, s.data(), d); s.data("selectpicker", l = new o(this, c, i)) } "string" == typeof t && (a = l[t] instanceof Function ? l[t].apply(l, n) : l.options[t]) } }); return "undefined" != typeof a ? a : l } e.expr[":"].icontains = function (i, n, s) { return t(e(i).text(), s[3]) }, e.expr[":"].aicontains = function (i, n, s) { return t(e(i).data("normalizedText") || e(i).text(), s[3]) }; var o = function (t, i, n) { n && (n.stopPropagation(), n.preventDefault()), this.$element = e(t), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = i, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = o.prototype.val, this.render = o.prototype.render, this.refresh = o.prototype.refresh, this.setStyle = o.prototype.setStyle, this.selectAll = o.prototype.selectAll, this.deselectAll = o.prototype.deselectAll, this.destroy = o.prototype.remove, this.remove = o.prototype.remove, this.show = o.prototype.show, this.hide = o.prototype.hide, this.init() }; o.VERSION = "1.6.3", o.DEFAULTS = { noneSelectedText: "Nothing selected", noneResultsText: "No results match", countSelectedText: function (e) { return 1 == e ? "{0} item selected" : "{0} items selected" }, maxOptionsText: function (e, t) { var i = []; return i[0] = 1 == e ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", i[1] = 1 == t ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)", i }, selectAllText: "Select All", deselectAllText: "Deselect All", multipleSeparator: ", ", style: "btn-default", size: "auto", title: null, selectedTextFormat: "values", width: !1, container: !1, hideDisabled: !1, showSubtext: !1, showIcon: !0, showContent: !0, dropupAuto: !0, header: !1, liveSearch: !1, actionsBox: !1, iconBase: "glyphicon", tickIcon: "glyphicon-ok", maxOptions: !1, mobile: !1, selectOnTab: !1, dropdownAlignRight: !1, searchAccentInsensitive: !1 }, o.prototype = { constructor: o, init: function () { var t = this, i = this.$element.attr("id"); this.$element.hide(), this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement), this.$menu = this.$newElement.find("> .dropdown-menu"), this.$button = this.$newElement.find("> button"), this.$searchbox = this.$newElement.find("input"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof i && (this.$button.attr("data-id", i), e('label[for="' + i + '"]').click(function (e) { e.preventDefault(), t.$button.focus() })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.liHeight(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile() }, createDropdown: function () { var t = this.multiple ? " show-tick" : "", i = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "", n = this.autofocus ? " autofocus" : "", s = this.$element.parents().hasClass("form-group-lg") ? " btn-lg" : this.$element.parents().hasClass("form-group-sm") ? " btn-sm" : "", o = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "", a = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="input-block-level form-control" autocomplete="off" /></div>' : "", l = this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-block"><button class="actions-btn bs-select-all btn btn-sm btn-default">' + this.options.selectAllText + '</button><button class="actions-btn bs-deselect-all btn btn-sm btn-default">' + this.options.deselectAllText + "</button></div></div>" : "", d = '<div class="btn-group bootstrap-select' + t + i + '"><button type="button" class="btn dropdown-toggle selectpicker' + s + '" data-toggle="dropdown"' + n + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + o + a + l + '<ul class="dropdown-menu inner selectpicker" role="menu"></ul></div></div>'; return e(d) }, createView: function () { var e = this.createDropdown(), t = this.createLi(); return e.find("ul").append(t), e }, reloadLi: function () { this.destroyLi(); var e = this.createLi(); this.$menu.find("ul").append(e) }, destroyLi: function () { this.$menu.find("li").remove() }, createLi: function () { var t = this, s = [], o = 0, a = function (e, t, i) { return "<li" + ("undefined" != typeof i ? ' class="' + i + '"' : "") + ("undefined" != typeof t | null === t ? ' data-original-index="' + t + '"' : "") + ">" + e + "</li>" }, l = function (e, s, o, a) { var l = i(n(e)); return '<a tabindex="0"' + ("undefined" != typeof s ? ' class="' + s + '"' : "") + ("undefined" != typeof o ? ' style="' + o + '"' : "") + ("undefined" != typeof a ? 'data-optgroup="' + a + '"' : "") + ' data-normalized-text="' + l + '">' + e + '<span class="' + t.options.iconBase + " " + t.options.tickIcon + ' check-mark"></span></a>' }; return this.$element.find("option").each(function () { var i = e(this), n = i.attr("class") || "", d = i.attr("style"), r = i.data("content") ? i.data("content") : i.html(), c = "undefined" != typeof i.data("subtext") ? '<small class="muted text-muted">' + i.data("subtext") + "</small>" : "", h = "undefined" != typeof i.data("icon") ? '<span class="' + t.options.iconBase + " " + i.data("icon") + '"></span> ' : "", p = i.is(":disabled") || i.parent().is(":disabled"), u = i[0].index; if ("" !== h && p && (h = "<span>" + h + "</span>"), i.data("content") || (r = h + '<span class="text">' + r + c + "</span>"), !t.options.hideDisabled || !p) if (i.parent().is("optgroup") && i.data("divider") !== !0) { if (0 === i.index()) { o += 1; var f = i.parent().attr("label"), m = "undefined" != typeof i.parent().data("subtext") ? '<small class="muted text-muted">' + i.parent().data("subtext") + "</small>" : "", v = i.parent().data("icon") ? '<span class="' + t.options.iconBase + " " + i.parent().data("icon") + '"></span> ' : ""; f = v + '<span class="text">' + f + m + "</span>", 0 !== u && s.length > 0 && s.push(a("", null, "divider")), s.push(a(f, null, "dropdown-header")) } s.push(a(l(r, "opt " + n, d, o), u)) } else s.push(i.data("divider") === !0 ? a("", u, "divider") : i.data("hidden") === !0 ? a(l(r, n, d), u, "hide is-hidden") : a(l(r, n, d), u)) }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), e(s.join("")) }, findLis: function () { return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis }, render: function (t) { var i = this; t !== !1 && this.$element.find("option").each(function (t) { i.setDisabled(t, e(this).is(":disabled") || e(this).parent().is(":disabled")), i.setSelected(t, e(this).is(":selected")) }), this.tabIndex(); var s = this.options.hideDisabled ? ":not([disabled])" : "", o = this.$element.find("option:selected" + s).map(function () { var t, n = e(this), s = n.data("icon") && i.options.showIcon ? '<i class="' + i.options.iconBase + " " + n.data("icon") + '"></i> ' : ""; return t = i.options.showSubtext && n.attr("data-subtext") && !i.multiple ? ' <small class="muted text-muted">' + n.data("subtext") + "</small>" : "", n.data("content") && i.options.showContent ? n.data("content") : "undefined" != typeof n.attr("title") ? n.attr("title") : s + n.html() + t }).toArray(), a = this.multiple ? o.join(this.options.multipleSeparator) : o[0]; if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) { var l = this.options.selectedTextFormat.split(">"); if (l.length > 1 && o.length > l[1] || 1 == l.length && o.length >= 2) { s = this.options.hideDisabled ? ", [disabled]" : ""; var d = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + s).length, r = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(o.length, d) : this.options.countSelectedText; a = r.replace("{0}", o.length.toString()).replace("{1}", d.toString()) } } this.options.title = this.$element.attr("title"), "static" == this.options.selectedTextFormat && (a = this.options.title), a || (a = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", n(a)), this.$newElement.find(".filter-option").html(a) }, setStyle: function (e, t) { this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|validate\[.*\]/gi, "")); var i = e ? e : this.options.style; "add" == t ? this.$button.addClass(i) : "remove" == t ? this.$button.removeClass(i) : (this.$button.removeClass(this.options.style), this.$button.addClass(i)) }, liHeight: function () { if (this.options.size !== !1) { var e = this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus", !1).end().appendTo("body"), t = e.addClass("open").find("> .dropdown-menu"), i = t.find("li").not(".divider").not(".dropdown-header").filter(":visible").children("a").outerHeight(), n = this.options.header ? t.find(".popover-title").outerHeight() : 0, s = this.options.liveSearch ? t.find(".bs-searchbox").outerHeight() : 0, o = this.options.actionsBox ? t.find(".bs-actionsbox").outerHeight() : 0; e.remove(), this.$newElement.data("liHeight", i).data("headerHeight", n).data("searchHeight", s).data("actionsHeight", o) } }, setSize: function () { this.findLis(); var t, i, n, s = this, o = this.$menu, a = o.find(".inner"), l = this.$newElement.outerHeight(), d = this.$newElement.data("liHeight"), r = this.$newElement.data("headerHeight"), c = this.$newElement.data("searchHeight"), h = this.$newElement.data("actionsHeight"), p = this.$lis.filter(".divider").outerHeight(!0), u = parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom")) + parseInt(o.css("border-top-width")) + parseInt(o.css("border-bottom-width")), f = this.options.hideDisabled ? ", .disabled" : "", m = e(window), v = u + parseInt(o.css("margin-top")) + parseInt(o.css("margin-bottom")) + 2, b = function () { i = s.$newElement.offset().top - m.scrollTop(), n = m.height() - i - l }; if (b(), this.options.header && o.css("padding-top", 0), "auto" == this.options.size) { var $ = function () { var e, l = s.$lis.not(".hide"); b(), t = n - v, s.options.dropupAuto && s.$newElement.toggleClass("dropup", i > n && t - v < o.height()), s.$newElement.hasClass("dropup") && (t = i - v), e = l.length + l.filter(".dropdown-header").length > 3 ? 3 * d + v - 2 : 0, o.css({ "max-height": t + "px", overflow: "hidden", "min-height": e + r + c + h + "px" }), a.css({ "max-height": t - r - c - h - u + "px", "overflow-y": "auto", "min-height": Math.max(e - u, 0) + "px" }) }; $(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", $), e(window).off("resize.getSize").on("resize.getSize", $), e(window).off("scroll.getSize").on("scroll.getSize", $) } else if (this.options.size && "auto" != this.options.size && o.find("li" + f).length > this.options.size) { var g = this.$lis.not(".divider" + f).find(" > *").slice(0, this.options.size).last().parent().index(), x = this.$lis.slice(0, g + 1).filter(".divider").length; t = d * this.options.size + x * p + u, s.options.dropupAuto && this.$newElement.toggleClass("dropup", i > n && t < o.height()), o.css({ "max-height": t + r + c + h + "px", overflow: "hidden" }), a.css({ "max-height": t - u + "px", "overflow-y": "auto" }) } }, setWidth: function () { if ("auto" == this.options.width) { this.$menu.css("min-width", "0"); var e = this.$newElement.clone().appendTo("body"), t = e.find("> .dropdown-menu").css("width"), i = e.css("width", "auto").find("> button").css("width"); e.remove(), this.$newElement.css("width", Math.max(parseInt(t), parseInt(i)) + "px") } else "fit" == this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", "")); this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width") }, selectPosition: function () { var t, i, n = this, s = "<div />", o = e(s), a = function (e) { o.addClass(e.attr("class").replace(/form-control/gi, "")).toggleClass("dropup", e.hasClass("dropup")), t = e.offset(), i = e.hasClass("dropup") ? 0 : e[0].offsetHeight, o.css({ top: t.top + i, left: t.left, width: e[0].offsetWidth, position: "absolute" }) }; this.$newElement.on("click", function () { n.isDisabled() || (a(e(this)), o.appendTo(n.options.container), o.toggleClass("open", !e(this).hasClass("open")), o.append(n.$menu)) }), e(window).resize(function () { a(n.$newElement) }), e(window).on("scroll", function () { a(n.$newElement) }), e("html").on("click", function (t) { e(t.target).closest(n.$newElement).length < 1 && o.removeClass("open") }) }, setSelected: function (e, t) { this.findLis(), this.$lis.filter('[data-original-index="' + e + '"]').toggleClass("selected", t) }, setDisabled: function (e, t) { this.findLis(), t ? this.$lis.filter('[data-original-index="' + e + '"]').addClass("disabled").find("a").attr("href", "#").attr("tabindex", -1) : this.$lis.filter('[data-original-index="' + e + '"]').removeClass("disabled").find("a").removeAttr("href").attr("tabindex", 0) }, isDisabled: function () { return this.$element.is(":disabled") }, checkDisabled: function () { var e = this; this.isDisabled() ? this.$button.addClass("disabled").attr("tabindex", -1) : (this.$button.hasClass("disabled") && this.$button.removeClass("disabled"), -1 == this.$button.attr("tabindex") && (this.$element.data("tabindex") || this.$button.removeAttr("tabindex"))), this.$button.click(function () { return !e.isDisabled() }) }, tabIndex: function () { this.$element.is("[tabindex]") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))) }, clickListener: function () { var t = this; this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function (e) { e.stopPropagation() }), this.$newElement.on("click", function () { t.setSize(), t.options.liveSearch || t.multiple || setTimeout(function () { t.$menu.find(".selected a").focus() }, 10) }), this.$menu.on("click", "li a", function (i) { var n = e(this), s = n.parent().data("originalIndex"), o = t.$element.val(), a = t.$element.prop("selectedIndex"); if (i.preventDefault(), !t.isDisabled() && !n.parent().hasClass("disabled")) { var l = t.$element.find("option"), d = l.eq(s), r = d.prop("selected"), c = d.parent("optgroup"), h = t.options.maxOptions, p = c.data("maxOptions") || !1; if (t.multiple) { if (d.prop("selected", !r), t.setSelected(s, !r), n.blur(), h !== !1 || p !== !1) { var u = h < l.filter(":selected").length, f = p < c.find("option:selected").length; if (h && u || p && f) if (h && 1 == h) l.prop("selected", !1), d.prop("selected", !0), t.$menu.find(".selected").removeClass("selected"), t.setSelected(s, !0); else if (p && 1 == p) { c.find("option:selected").prop("selected", !1), d.prop("selected", !0); var m = n.data("optgroup"); t.$menu.find(".selected").has('a[data-optgroup="' + m + '"]').removeClass("selected"), t.setSelected(s, !0) } else { var v = "function" == typeof t.options.maxOptionsText ? t.options.maxOptionsText(h, p) : t.options.maxOptionsText, b = v[0].replace("{n}", h), $ = v[1].replace("{n}", p), g = e('<div class="notify"></div>'); v[2] && (b = b.replace("{var}", v[2][h > 1 ? 0 : 1]), $ = $.replace("{var}", v[2][p > 1 ? 0 : 1])), d.prop("selected", !1), t.$menu.append(g), h && u && (g.append(e("<div>" + b + "</div>")), t.$element.trigger("maxReached.bs.select")), p && f && (g.append(e("<div>" + $ + "</div>")), t.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function () { t.setSelected(s, !1) }, 10), g.delay(750).fadeOut(300, function () { e(this).remove() }) } } } else l.prop("selected", !1), d.prop("selected", !0), t.$menu.find(".selected").removeClass("selected"), t.setSelected(s, !0); t.multiple ? t.options.liveSearch && t.$searchbox.focus() : t.$button.focus(), (o != t.$element.val() && t.multiple || a != t.$element.prop("selectedIndex") && !t.multiple) && t.$element.change() } }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function (e) { e.target == this && (e.preventDefault(), e.stopPropagation(), t.options.liveSearch ? t.$searchbox.focus() : t.$button.focus()) }), this.$menu.on("click", "li.divider, li.dropdown-header", function (e) { e.preventDefault(), e.stopPropagation(), t.options.liveSearch ? t.$searchbox.focus() : t.$button.focus() }), this.$menu.on("click", ".popover-title .close", function () { t.$button.focus() }), this.$searchbox.on("click", function (e) { e.stopPropagation() }), this.$menu.on("click", ".actions-btn", function (i) { t.options.liveSearch ? t.$searchbox.focus() : t.$button.focus(), i.preventDefault(), i.stopPropagation(), e(this).is(".bs-select-all") ? t.selectAll() : t.deselectAll(), t.$element.change() }), this.$element.change(function () { t.render(!1) }) }, liveSearchListener: function () { var t = this, s = e('<li class="no-results"></li>'); this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api", function () { t.$menu.find(".active").removeClass("active"), t.$searchbox.val() && (t.$searchbox.val(""), t.$lis.not(".is-hidden").removeClass("hide"), s.parent().length && s.remove()), t.multiple || t.$menu.find(".selected").addClass("active"), setTimeout(function () { t.$searchbox.focus() }, 10) }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function (e) { e.stopPropagation() }), this.$searchbox.on("input propertychange change keyup copy paste cut click mouseup", function () { var o = t.$searchbox.val(); o ? (t.options.searchAccentInsensitive ? t.$lis.not(".is-hidden").removeClass("hide").find("a").not(":aicontains(" + i(t.$searchbox.val()) + ")").parent().addClass("hide") : t.$lis.not(".is-hidden").removeClass("hide").find("a").not(":icontains(" + t.$searchbox.val() + ")").parent().addClass("hide"), t.$menu.find("li").filter(":visible:not(.no-results)").length ? s.parent().length && s.remove() : (s.parent().length && s.remove(), s.html(t.options.noneResultsText + ' "' + n(t.$searchbox.val()) + '"').show(), t.$menu.find("li").last().after(s))) : (t.$lis.not(".is-hidden").removeClass("hide"), s.parent().length && s.remove()), t.$menu.find("li.active").removeClass("active"), t.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus(), e(this).focus(), "" !== o && setTimeout(function () { var e = t.$searchbox.val(); "" === e && t.$searchbox.trigger("propertychange") }, 0); }) }, val: function (e) { return "undefined" != typeof e ? (this.$element.val(e), this.render(), this.$element) : this.$element.val() }, selectAll: function () { this.findLis(), this.$lis.not(".divider").not(".disabled").not(".selected").filter(":visible").find("a").click() }, deselectAll: function () { this.findLis(), this.$lis.not(".divider").not(".disabled").filter(".selected").filter(":visible").find("a").click() }, keydown: function (t) { var n, s, o, a, l, d, r, c, h, p = e(this), u = p.is("input") ? p.parent().parent() : p.parent(), f = u.data("this"), m = { 32: " ", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9" }; if (f.options.liveSearch && (u = p.parent().parent()), f.options.container && (u = f.$menu), n = e("[role=menu] li a", u), h = f.$menu.parent().hasClass("open"), !h && /([0-9]|[A-z])/.test(String.fromCharCode(t.keyCode)) && (f.options.container ? f.$newElement.trigger("click") : (f.setSize(), f.$menu.parent().addClass("open"), h = !0), f.$searchbox.focus()), f.options.liveSearch && (/(^9$|27)/.test(t.keyCode.toString(10)) && h && 0 === f.$menu.find(".active").length && (t.preventDefault(), f.$menu.parent().removeClass("open"), f.$button.focus()), n = e("[role=menu] li:not(.divider):not(.dropdown-header):visible", u), p.val() || /(38|40)/.test(t.keyCode.toString(10)) || 0 === n.filter(".active").length && (n = f.$newElement.find("li").filter(f.options.searchAccentInsensitive ? ":aicontains(" + i(m[t.keyCode]) + ")" : ":icontains(" + m[t.keyCode] + ")"))), n.length) { if (/(38|40)/.test(t.keyCode.toString(10))) s = n.index(n.filter(":focus")), a = n.parent(":not(.disabled):visible").first().index(), l = n.parent(":not(.disabled):visible").last().index(), o = n.eq(s).parent().nextAll(":not(.disabled):visible").eq(0).index(), d = n.eq(s).parent().prevAll(":not(.disabled):visible").eq(0).index(), r = n.eq(o).parent().prevAll(":not(.disabled):visible").eq(0).index(), f.options.liveSearch && (n.each(function (t) { e(this).is(":not(.disabled)") && e(this).data("index", t) }), s = n.index(n.filter(".active")), a = n.filter(":not(.disabled):visible").first().data("index"), l = n.filter(":not(.disabled):visible").last().data("index"), o = n.eq(s).nextAll(":not(.disabled):visible").eq(0).data("index"), d = n.eq(s).prevAll(":not(.disabled):visible").eq(0).data("index"), r = n.eq(o).prevAll(":not(.disabled):visible").eq(0).data("index")), c = p.data("prevIndex"), 38 == t.keyCode && (f.options.liveSearch && (s -= 1), s != r && s > d && (s = d), a > s && (s = a), s == c && (s = l)), 40 == t.keyCode && (f.options.liveSearch && (s += 1), -1 == s && (s = 0), s != r && o > s && (s = o), s > l && (s = l), s == c && (s = a)), p.data("prevIndex", s), f.options.liveSearch ? (t.preventDefault(), p.is(".dropdown-toggle") || (n.removeClass("active"), n.eq(s).addClass("active").find("a").focus(), p.focus())) : n.eq(s).focus(); else if (!p.is("input")) { var v, b, $ = []; n.each(function () { e(this).parent().is(":not(.disabled)") && e.trim(e(this).text().toLowerCase()).substring(0, 1) == m[t.keyCode] && $.push(e(this).parent().index()) }), v = e(document).data("keycount"), v++, e(document).data("keycount", v), b = e.trim(e(":focus").text().toLowerCase()).substring(0, 1), b != m[t.keyCode] ? (v = 1, e(document).data("keycount", v)) : v >= $.length && (e(document).data("keycount", 0), v > $.length && (v = 1)), n.eq($[v - 1]).focus() } (/(13|32)/.test(t.keyCode.toString(10)) || /(^9$)/.test(t.keyCode.toString(10)) && f.options.selectOnTab) && h && (/(32)/.test(t.keyCode.toString(10)) || t.preventDefault(), f.options.liveSearch ? /(32)/.test(t.keyCode.toString(10)) || (f.$menu.find(".active a").click(), p.focus()) : e(":focus").click(), e(document).data("keycount", 0)), (/(^9$|27)/.test(t.keyCode.toString(10)) && h && (f.multiple || f.options.liveSearch) || /(27)/.test(t.keyCode.toString(10)) && !h) && (f.$menu.parent().removeClass("open"), f.$button.focus()) } }, mobile: function () { this.$element.addClass("mobile-device").appendTo(this.$newElement), this.options.container && this.$menu.hide() }, refresh: function () { this.$lis = null, this.reloadLi(), this.render(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight() }, update: function () { this.reloadLi(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight() }, hide: function () { this.$newElement.hide() }, show: function () { this.$newElement.show() }, remove: function () { this.$newElement.remove(), this.$element.remove() } }; var a = e.fn.selectpicker; e.fn.selectpicker = s, e.fn.selectpicker.Constructor = o, e.fn.selectpicker.noConflict = function () { return e.fn.selectpicker = a, this }, e(document).data("keycount", 0).on("keydown", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", o.prototype.keydown).on("focusin.modal", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", function (e) { e.stopPropagation() }), e(window).on("load.bs.select.data-api", function () { e(".selectpicker").each(function () { var t = e(this); s.call(t, t.data()) }) }) }(jQuery);
/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,d=d.concat(c.errorList)}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||-1!==a.inArray(c.keyCode,d)||(b.name in this.submitted||b===this.lastElement)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors();var b,c=this.elements().removeData("previousValue").removeAttr("aria-invalid");if(this.settings.unhighlight)for(b=0;c[b];b++)this.settings.unhighlight.call(this,c[b],this.settings.errorClass,"");else c.removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?this.findByName(b.name).filter(":checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j instanceof TypeError&&(j.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\]|\$)/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.off(".validate-equalTo").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}});var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})});
var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var timeOut;
var searchId;
var isSafari = navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1;
var clearSearch = false;

var keyCode = {
    Backspace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    Pause: 19,
    CapsLock: 20,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    LeftArrow: 37,
    UpArrow: 38,
    RightArrow: 39,
    DownArrow: 40,
    Insert: 45,
    Delete: 46,
    LeftWindow: 91,
    RightWindow: 92
};

var excludedSearchKeys = [
    keyCode.Tab,
    keyCode.Shift,
    keyCode.Ctrl,
    keyCode.Alt,
    keyCode.Pause,
    keyCode.CapsLock,
    keyCode.PageUp,
    keyCode.PageDown,
    keyCode.End,
    keyCode.Home,
    keyCode.LeftArrow,
    keyCode.UpArrow,
    keyCode.RightArrow,
    keyCode.DownArrow,
    keyCode.Insert,
    keyCode.LeftWindow,
    keyCode.RightWindow
];

$(document).ready(function () {
    $("body, .login-main, #server-app-container").removeAttr("style");

    $("form").attr("autocomplete", "off");
    $("input[type=text], input[type=password]").attr("autocomplete", "off");
    $('[data-toggle="tooltip"]').tooltip();
    $(".dropdown-menu #notify_header").click(function (e) {
        e.stopPropagation();
    });
    $("#notification-icon").click(function (e) {
        if (!$("#notification-link").hasClass("open")) {
            $("#notification-content-area").ejWaitingPopup();
            $("#notification-content-area").addClass("show");
            $("#notification-content-area").ejWaitingPopup("show");
            $("#notification-content-area").removeClass("show");
            $("#notification-list").attr("src", window.getUserNotificationsPartialViewResultUrl);
        }
    });

    var notBackdrop =
        $('<div id="nav-backdrop" class="modal-backdrop" style="z-index: 50; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; color: #fff; opacity: 0; position: absolute"></div>');

    $("#upload-item-section, #notification-link, #account-profile").on("hidden.bs.dropdown", function () {
        parent.$("#nav-backdrop").hide();
    });

    $("#notification-link, #account-profile, #upload-item-section").click(function () {
        if ($(".dropdown-backdrop").length === 0) {
            $("body").append(notBackdrop);
        }
        if (!$("#notification-link").hasClass("open")) {
            notBackdrop.show();
        }
        else if (!$("#account-profile").hasClass("open")) {
            notBackdrop.show();
        } else {
            notBackdrop.show();
        }
    });

    $("#account-profile .dropdown-menu").click(function (e) {
        e.stopPropagation();
    });

    notBackdrop.click(function () {
        notBackdrop.hide();
    });

    $(document).on("click", ".dropdown-backdrop", function () {
        parent.$("#nav-backdrop").hide();
    });

    searchId = $("#search-area").children("input").attr("id");
    if (searchId === "ad-user-import" || searchId === "AD-group-import" || searchId === "search-ad-users" || searchId === "search-ad-groups") {
        $.xhrPool = [];

        $.xhrPool.abortAll = function () {
            $(this).each(function (i, jqXHR) {
                jqXHR.abort();
            });
            $.xhrPool.length = 0;
        };

        $.ajaxSetup({
            beforeSend: function (jqXHR) {
                $.xhrPool.push(jqXHR);
            },
            complete: function (jqXHR) {
                var i = $.xhrPool.indexOf(jqXHR);
                if (i > -1) $.xhrPool.splice(i, 1);
            }
        });
    } else {
        $.xhrPool = [];

        $.xhrPool.abortAll = function () {
            $(this).each(function (i, jqXHR) {
                jqXHR.abort();
            });
            $.xhrPool.length = 0;
        };
        if (typeof ej != "undefined" && typeof ej.UrlAdaptor != "undefined") {
            ej.UrlAdaptor.prototype.beforeSend = function (dm, request) {
                $.xhrPool.push(request);
            }
            $.ajaxSetup({
                complete: function (jqXHR) {
                    var i = $.xhrPool.indexOf(jqXHR);
                    if (i > -1) $.xhrPool.splice(i, 1);
                }
            });
        }
    }

    setClientLocaleCookie("boldservice.client.locale", 365);

    function setClientLocaleCookie(name, exdays) {
        var value = {
            Locale: navigator.language,
            TimeZoneOffset: new Date().getTimezoneOffset()
        };
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays++);
        var cookie_value = escape(JSON.stringify(value)) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = name + "=" + cookie_value + ";path=/";
    }

});

$(document).on("keyup", "textarea", function (event) {
    if (event.keyCode != 8 && event.keyCode != 46) {
        var max = $(this).attr("maxlength");
        if (max != undefined && $(this).val().length >= max) {
            $(this).val($(this).val().substring(0, max));
        }
    }
});

function isEmptyOrWhitespace(value) {
    return $.trim(value) === "";
}

function convertToBoolean(value) {
    if (typeof (value) === "string") {
        value = value.toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}

//Handles Ajax error
function handleAjaxError() {
}

function refreshScroller() {
    var expandCollapseIconHeight = $(".collapseIcon").css("display") == "block" ? $(".collapseIcon").height() : 0;
    if ($(window).height() - ($("#CatergoryHeading").outerHeight() + $("#base_menu_container_Div").outerHeight() + $("#listing").outerHeight() + expandCollapseIconHeight) < 0) {
        var scrollerHeight = $(window).height() - ($("#CatergoryHeading").outerHeight() + $("#base_menu_container_Div").outerHeight() + expandCollapseIconHeight);
        var scrollerWidth = $("#CatergoryHeading").outerWidth();
        $("#ScrollElement").ejScroller({
            height: window.innerWidth < 1041 ? (scrollerHeight < 200 ? 200 : scrollerHeight) : scrollerHeight,
            width: scrollerWidth,
            buttonSize: 0,
            scrollerSize: 9
        });
    }
    else {
        if ($("#ScrollElement").data("ejScroller") != undefined) {
            $("#ScrollElement").data("ejScroller").destroy();
        }
    }
}

function refreshScrollerForCategory() {
    if ($(window).height() - ($(".item-navigation").outerHeight() + $("#header-area").outerHeight() + $("#category-listing").outerHeight() + $("#scroll-content").outerHeight() + $("#create-new-category").outerHeight()) < 0) {
        var scrollerHeight = $(window).height() - ($(".item-navigation").outerHeight() + $("#header-area").outerHeight() + $("#category-listing").outerHeight() + $("#create-new-category").outerHeight());
        var scrollerWidth = $(".item-navigation").outerWidth();

        if ($(".all-items").hasClass("active") && $("#category-list").is(":visible")) {
            $("#scroll-content").ejScroller({
                height: scrollerHeight,
                buttonSize: 0,
                scrollerSize: 9,
                autoHide: true
            });
        }
    }
    else {
        if ($("#scroll-content").data("ejScroller") != undefined) {
            $("#scroll-content").data("ejScroller").destroy();
        }
    }
}

function addPlacehoder(object) {
    if (regexIe8.test(userAgent)) {
        $(object).find("input[type=text],input[type=password],textarea").each(function () {
            if ($(this).val() === "") {
                $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder") })).insertAfter(this).show();
            }
            else {
                $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder") })).insertAfter(this).hide();
            }
        });
    }
}

$("textarea").keyup(function (event) {
    if (event.keyCode != 8 && event.keyCode != 46) {
        var max = 255;
        if ($(this).attr("maxlength") != undefined) {
            max = $(this).attr("maxlength");
        }
        if ($(this).val().length >= max) {
            $(this).val($(this).val().substring(0, max));
        }
    }
});

$(document).on("focus", "input[type=text],input[type=password],textarea", function () {
    if (regexIe8.test(userAgent)) {
        $(this).next(".placeholder").removeClass("show").addClass("hide");
    }
});

$(document).on("focusout", "input[type=text],input[type=password],textarea", function () {
    if (regexIe8.test(userAgent) && $(this).val() === "") {
        $(this).next(".placeholder").removeClass("hide").addClass("show");
    }
});
$(document).on("focus", ".placeholder", function () {
    $(this).prev("input").focus();
});

function doAjaxPost(type, url, data, onSuccess, onError, onComplete, element, processData, contentType, passDataToCallbackFn) {
    if (element) {
        if (element.is(":input:button") || element.is("button"))
            element.prop({ "disabled": true });
        else {
            showWaitingPopup(element);
        }
    }
    if (processData === undefined || processData === null) processData = true;
    if (contentType === undefined || contentType === null) contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    $.ajax({
        type: type,
        url: url,
        context: this,
        processData: processData,
        contentType: contentType,
        data: data,
        success: (passDataToCallbackFn === true) ? $.proxy(getFnObj(onSuccess), window, data) : $.proxy(getFnObj(onSuccess), window),
        error: $.proxy(function (error, status, errorThrown) {
            if (error.statusText != "abort") {
            }
            if (onError)
                getFnObj(onError).call(window, error, status, errorThrown);
        }, this),
        complete: $.proxy(function (e) {
            try {
                var response = JSON.parse(e.responseText);
                if (response.data != undefined && response.data != null
                    && response.data.Message != undefined && response.data.Message != null
                    && response.data.Message.toLowerCase() == "unauthorized") {
                    window.location.replace(window.location.href);
                }
            } catch (exception) {
            }

            if (element) {
                if (element.is(":input:button") || element.is("button"))
                    element.prop({ "disabled": false });
                else
                    hideWaitingPopup(element);
            }
            if (onComplete)
                getFnObj(onComplete).call(window, e);
        }, this)
    });
};

function ShowWaitingProgress(selector, show) {
    if (show == "show") {
        var selectorId = createLoader(selector)
        $(selector).ejWaitingPopup({ template: $("#" + selectorId) });
        $(selector).ejWaitingPopup("show");
    } else
        $(selector).ejWaitingPopup("hide");
};

function getFnObj(obj) {
    if (typeof obj === "function") return obj;
    if (typeof obj === "string" && window[obj])
        return obj;
};

function showWaitingPopup(element) {
    if (typeof element === "string")
        element = $((element.indexOf(".") === 0) ? element : "#" + element);
    element.ejWaitingPopup();
    element.ejWaitingPopup("show");
};

function hideWaitingPopup(element) {
    if (typeof element === "string")
        element = $((element.indexOf(".") === 0) ? element : "#" + element);
    element.ejWaitingPopup("hide");
};

function redirect(url, interval) {
    if (interval)
        setTimeout(function () { window.location.assign(url) }, interval);
    else
        window.location.assign(url);
};

function checkMonthFormat(value, format) {
    return value.includes(format);
}

function DateCustomFormat(formatString, dateValue) {
    var yyyy, yy, MMMM, MMM, MM, M, dddd, ddd, dd, d, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    var dateObject = new Date(dateValue);
    //var dateObject = MilltoDate.toString();
    yy = ((yyyy = dateObject.getFullYear()) + "").slice(-2);
    MM = (M = dateObject.getMonth() + 1) < 10 ? ("0" + M) : M;
    MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
    dd = (d = dateObject.getDate()) < 10 ? ("0" + d) : d;
    ddd = (dddd = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObject.getDay()]).substring(0, 3);
    th = (d >= 10 && d <= 20) ? "th" : ((dMod = d % 10) == 1) ? "st" : (dMod == 2) ? "nd" : (dMod == 3) ? "rd" : "th";
    formatString = formatString.replace("yyyy", yyyy).replace("yy", yy).replace("dddd", dddd).replace("ddd", ddd).replace("dd", dd).replace("d", d).replace("th", th);
    switch (true) {
        case checkMonthFormat(formatString, "MMMM"):
            formatString = formatString.replace("MMMM", MMMM);
            break;
        case checkMonthFormat(formatString, "MMM"):
            formatString = formatString.replace("MMM", MMM);
            break;
        case checkMonthFormat(formatString, "MM"):
            formatString = formatString.replace("MM", MM);
            break;
        case checkMonthFormat(formatString, "M "):
            formatString = formatString.replace("M ", M + " ");
            break;
        case checkMonthFormat(formatString, "M,"):
            formatString = formatString.replace("M,", M + ",");
            break;
        case checkMonthFormat(formatString, "M"):
            formatString = formatString.replace("M", M);
            break;
    }


    h = (hhh = dateObject.getHours());
    if (h == 0) h = 24;
    if (h > 12) h -= 12;
    hh = h < 10 ? ("0" + h) : h;
    AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
    mm = (m = dateObject.getMinutes()) < 10 ? ("0" + m) : m;
    ss = (s = dateObject.getSeconds()) < 10 ? ("0" + s) : s;
    return formatString.replace("hhh", hhh).replace("hh", hh).replace("h", h).replace("mm", mm).replace("m", m).replace("ss", ss).replace("s", s).replace("ampm", ampm).replace("AMPM", AMPM);
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function validateUserName(userName) {
    if (/\s/g.test(userName)) {
        return { isValid: false, message: window.Server.App.LocalizationContent.HasWhiteSpace };
    }
    if (/[^a-zA-Z0-9]/.test(userName)) {
        return { isValid: false, message: window.Server.App.LocalizationContent.UserNameSpecialCharacterValicator };
    }
    return { isValid: true, message: "valid" };
}

function isValidUrl(url) {
    //var regexExpression = /^(?!(ftp|https?):\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+(\.[a-z]{2,6})?(:\d{1,5})?(\/[a-zA-Z0-9]+[a-zA-Z0-9]*(\.[a-z]{2,8})?)*?$/gm;
    var ipAddressRegex = /(http:\/\/|https:\/\/)([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}?(:\d{1,5})?$/gm;
    var hostNameRegex = /^(http|https):\/\/[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    var localHostRegex = /^(http:\/\/|https:\/\/)[A-Za-z0-9-_]{3,}(?:\:\d+)?$/gm;
    if (!(ipAddressRegex.test(url) || hostNameRegex.test(url) || localHostRegex.test(url))) {
        return false;
    } else {
        return true;
    }
}

function getMaxZIndex() {
    var maxZIndex = 0;
    $("div").each(function () {
        var currentZIndex = parseInt($(this).css("zIndex"), 10);
        if (currentZIndex > maxZIndex) {
            maxZIndex = currentZIndex;
        }
    });
    return maxZIndex;
}

function IsEmail(email) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

function IsValidContactNumber(contactNumber) {
    var regex = /^(?:|[0-9\-\+]{9,15})$/;
    if (regex.test(contactNumber)) {
        return true;
    }
    else {
        return false;
    }
}

function onCloseMessageBox() {
    $("#messageBox").ejDialog("close");
}

function onMessageDialogClose() {
    $("#messageBox").find(".message-content").text("");
    $(".message-box-btn-holder").html("");
    $(".message-box-close").html("");
}

function messageBox(messageIcon, messageHeader, messageText, type, successCallback, errorCallback, width, height, maxHeight) {
    $("#messageBox").find(".message-content").text("");
    $(".message-box-btn-holder").html("");
    $(".message-box-close").html("");
    $("#messageBox").find(".message-header").html("<span class='su " + messageIcon + "'></span> <span class='modal-title' data-toggle='tooltip' data-placement='bottom' data-container='body' title='" + messageHeader + "'  >" + messageHeader + "</h2>");
    $("#messageBox").find(".message-content").html(messageText);
    if (type == "error") {
        var successButton;
        var closeIcon;
        var errorButton;
        if (successCallback != undefined) {
            successButton = $("<input type='button' class='critical-action-button pull-right' value='" + window.Server.App.LocalizationContent.YesButton + "'></input>");
            successButton.bind("click", $.proxy(getFnObj(successCallback), window));
        }
        if (errorCallback != undefined) {
            errorButton = $("<input type='button' class='secondary-button pull-right' value='" + window.Server.App.LocalizationContent.NoButton + "'></input>");
            errorButton.bind("click", $.proxy(getFnObj(errorCallback), window));
            closeIcon = $('<span class="su su-close"></span>');
            closeIcon.bind("click", $.proxy(getFnObj(errorCallback), window));
        }
        else {
            errorButton = $("<input type='button' class='secondary-button pull-right' value='" + window.Server.App.LocalizationContent.NoButton + "'></input>");
            closeIcon = $('<span class="su su-close"></span>');
            errorButton.click(function () {
                onCloseMessageBox();
            });
            closeIcon.click(function () {
                onCloseMessageBox();
            });
        }
        $(".message-box-close").html(closeIcon);
        $(".message-box-btn-holder").append(errorButton, successButton);
        $("#messageBox").unbind("keydown");
    }
    else {
        var successButton;
        var closeIcon;
        if (successCallback != undefined) {
            successButton = $("<input type='button' class='secondary-button' value='" + window.Server.App.LocalizationContent.OKButton + "'></input>");
            successButton.bind("click", $.proxy(getFnObj(successCallback), window));
            closeIcon = $('<span class="su su-close"></span>');
            closeIcon.bind("click", $.proxy(getFnObj(successCallback), window));
        }
        else {
            successButton = $("<input type='button' class='secondary-button' value='" + window.Server.App.LocalizationContent.OKButton + "'></input>");
            closeIcon = $('<span class="su su-close"></span>');
            successButton.click(function () {
                onCloseMessageBox();
            });
            closeIcon.click(function () {
                onCloseMessageBox();
            });
        }
        $(".message-box-close").html(closeIcon);
        $(".message-box-btn-holder").append(successButton);
        $("#messageBox").on("keydown", function (event) {
            switch (event.keyCode) {
                case 13:
                case 27:
                    successButton.click();
            }
        });
    }

    $('[data-toggle="tooltip"]').tooltip();
    $("#messageBox").ejDialog("open");
    $("#messageBox").focus();
    setTimeout(function () {
        var sizeobj = $("#messageBox").data("ejDialog");
        if (width != undefined)
            sizeobj.option("width", width);
        if (window.innerWidth > 1040) {
            if (height == undefined)
                height = $("#messageBox").find(".modal-content").height() + 135 + "px";
        }
        sizeobj.option("height", height);
        if (maxHeight != undefined)
            sizeobj.option("maxHeight", maxHeight);
    }, 50);
}

function deleteUserAvatar() {
    ShowWaitingProgress("#content-area", "show");
    doAjaxPost('POST', deleteavatarUrl, { id: $("#userId").val() },
        function (result) {
            ShowWaitingProgress("#content-area", "hide");
            if (result.status) {
                location.reload();
                SuccessAlert(window.Server.App.LocalizationContent.DeleteAvatar, window.Server.App.LocalizationContent.DeleteAvatarSuccess, 7000);
                var isLoggedUser = $("#logged-user").html().toLowerCase();
                $("#user-profile-picture").attr("src", getdefaultavatarUrl);
                $("#user-profile-picture").siblings("#avatar-delete-click").remove();
                if ($("#user-email").val() == isLoggedUser) {
                    $(".profile-picture,#profile-picture-menu").find("img").attr("src", getdefaultavatarUrl);
                }

            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.DeleteAvatarTitle, window.Server.App.LocalizationContent.DeleteAvatarError, 7000);
            }

        }
    );
}

function IsValidName(validationType, inputString) {
    var regex;
    if (validationType.toLowerCase() === "username") {
        regex = new RegExp(/[*\[\\\]\|\/\:\<\>\%\+\#\&\?\'\"\@\;\,]/);
    }
    else {
        regex = new RegExp(/[*\[\\\]\|\/\:\<\>\%\+\#\?\'\"\;\,]/);
    }
    return !regex.test(inputString);
}

function UsernameValidation(username) {
    var filter = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,252}[a-zA-Z0-9]$/;
    if (filter.test(username)) {
        return true;
    }
    else {
        return false;
    }
}

function IsValidUsername(username) {
    return UsernameValidation(username) || IsEmail(username);
}

function IsValidUsernameLength(username) {
    var filter = /^.{3,254}$/;
    if (filter.test(username)) {
        return true;
    }
    else {
        return false;
    }
}

function GridLocalization() {
    ej.Grid.Locale["en-US"] = {
        EmptyRecord: window.Server.App.LocalizationContent.NoRecords,
        StringMenuOptions: [{ text: window.Server.App.LocalizationContent.SearchKeyStart, value: "StartsWith" }, { text: window.Server.App.LocalizationContent.SearchKeyEnd, value: "EndsWith" }, { text: window.Server.App.LocalizationContent.SearchKeyContanins, value: "Contains" }, { text: window.Server.App.LocalizationContent.SearchKeyEqual, value: "Equal" }, { text: window.Server.App.LocalizationContent.SearchKeyNotEqual, value: "NotEqual" }],
        FilterMenuCaption: window.Server.App.LocalizationContent.SearchValue,
        Filter: window.Server.App.LocalizationContent.Search,
        Clear: window.Server.App.LocalizationContent.ClearSearch
    };
    ej.Pager.Locale["en-US"] = {
        pagerInfo: window.Server.App.LocalizationContent.PageCount,
        firstPageTooltip: window.Server.App.LocalizationContent.FirstPage,
        lastPageTooltip: window.Server.App.LocalizationContent.LastPage,
        nextPageTooltip: window.Server.App.LocalizationContent.NextPage,
        previousPageTooltip: window.Server.App.LocalizationContent.PreviousPage
    };
}

$(document).on("keyup", "#SearchCategory, #search-groups, #search-group-users, #ad-user-import, #userSearchKey,#groupSearchKey, #ad-group-import, #searchItems, #search-schedules, #search-users, #search-ad-users, #search-ad-groups, #search-user-permission, #search-group-permission, #search-database-users,#search-tree, #search-home-page, #search-items, .search-user-holder, .tree-view-search-holder,#search-applications, #search-app-users, #add-user-search, #search-app-groups, #add-group-search, #add-admin-search, #search-app-admins ", function (e) {
    var element = "#" + this.id;
    if ($(element).val() != "") {
        if (element == "#search-home-page") {
            $(element).parent().siblings("span.close-icon").css("display", "block");
        }
        else {
            $(element).siblings("span.close-icon").css("display", "block");
            $(element).siblings("span.search-user").css("display", "none");
            $(element).siblings("span.search-group").css("display", "none");
            $(element).siblings("span.search-group-users").css("display", "none");
            $(element).siblings("span.search-icon").css("display", "none");
            $(element).siblings("span.search-item").css("display", "none");
            $(element).siblings("span.search-schedule").css("display", "none");
            $(element).siblings("span.search").css("display", "none");
            $(element).siblings("span.search-application").css("display", "none");
            $(element).siblings("span.search-icon").css("display", "none");
        }
    } else {
        if (element == "#search-home-page") {
            $(element).parent().siblings("span.su-search").css("display", "block");
        }
        else {
            $(element).siblings("span.close-icon").css("display", "none");
            $(element).siblings("span.su-search").css("display", "block");
        }
    }
});

$(document).on("click", "#clear-search,.clear-search,#add-user-clear-search,#group-clear-search,#add-group-clear-search, #admin-clear-search, #add-admin-clear-search", function () {
    var currentElement = $(this).prevAll("input");
    if (currentElement == "" || currentElement == null || currentElement == undefined || currentElement.length <= 0) {
        currentElement = $(this).prev("div").find("input");
    }
    var currentId = "#" + currentElement.attr("id");
    currentElement.val("");

    if (!clearSearch) {
        $("#clear-search").css("display", "none");
        $("#add-user-clear-search").css("display", "none");

        $("#group-clear-search").css("display", "none");
        $("#add-group-clear-search").css("display", "none");

        $("#admin-clear-search").css("display", "none");
        $("#add-admin-clear-search").css("display", "none");
    }

    if (currentElement.val() == "") {
        if (currentId == "#search-home-page" && !clearSearch) {
            $("#clear-search").parent().siblings("span.su-search").css("display", "block");
            $(".search-area").removeClass("add-background");
            $(".placeholder, #clear-search").hide();
            if ($(".all-items").hasClass("active") && !$("#category-list").is(":visible")) {
                setTimeout(function () { $(".search-area").prevAll().show().parent().removeClass("pull-right"); $("#category-section-name").show(); }, 300);
            }
            else {
                setTimeout(function () { $(".search-area").prevAll(":not(#back-icon)").show().parent().removeClass("pull-right"); $("#category-section-name").show(); }, 300);
            }
            setTimeout(function () { $(".search-home-section:visible").removeClass("show"); }, 300);
        }
        else {
            $("#clear-search").siblings("span.su-search").css("display", "block");
            $("#add-user-clear-search").siblings("span.su-search").css("display", "block");

            $("#group-clear-search").siblings("span.su-search").css("display", "block");
            $("#add-group-clear-search").siblings("span.su-search").css("display", "block");

            $("#admin-clear-search").siblings("span.su-search").css("display", "block");
            $("#add-admin-clear-search").siblings("span.su-search").css("display", "block");
        }

        if (currentId == "#ad-user-import" || currentId == "#ad-group-import") {
            var gridObj = $("#Grid").data("ejGrid");
            gridObj.option("dataSource", "");
        } else {
            PerformSearch(currentId);
        }
    }
    else {
        currentElement.val("");
    }
});

$(document).on("keydown", "#search-groups, #search-group-users, #searchItems, #search-schedules,#userSearchKey,#groupSearchKey, #search-users, #search-user-permission, #search-group-permission, #search-home-page, #search-items,#search-applications,#search-app-users,#add-user-search, #search-app-groups, #add-group-search, #add-admin-search, #search-app-admins", function (e) {
    $.xhrPool.abortAll();
    var currentKeyCode = parseInt(e.which);
    var element = "#" + this.id;
    if (timeOut != null) {
        clearTimeout(timeOut);
        timeOut = null;
    }
    if (currentKeyCode === keyCode.Enter) {
        PerformSearch(element);
    }
    else if (excludedSearchKeys.indexOf(currentKeyCode) === -1) {
        timeOut = setTimeout(function () {
            PerformSearch(element);
        }, 900);
    }
});

function PerformSearch(currentId) {
    var gridObj;

    if (currentId === "#search-schedules") {
        gridObj = $("#scheduleGrid").data("ejGrid");
        gridObj.search($("#search-schedules").val());
    }
    else if (currentId === "#search-users") {
        gridObj = $("#user_grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId === "#search-ad-users") {
        gridObj = $("#user_grid").data("ejGrid");
        gridObj.search($("#search-ad-users").val());
    }
    else if (currentId === "#search-items") {
        gridObj = $("#items").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId === "#search-home-page") {
        gridObj = $("#items").data("ejGrid");
        gridObj.model.filterSettings.filteredColumns = [];
        if (!$("#category-list").is(":visible") || $("#category-list").length <= 0) {
            if ($(".all-items").hasClass("active")) {
                gridObj.model.filterSettings.filteredColumns = [{ field: "CategoryName", operator: "equal", value: $("#category-section-name").html() }];
            }
            gridObj.model.pageSettings.currentPage = 1;
            gridObj.refreshContent();
        }
    }
    else if (currentId === "#search-group-users" || currentId == "#search-groups") {
        gridObj = $("#Grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId === "#search-ad-groups") {
        gridObj = $("#Grid").data("ejGrid");
        gridObj.search($("#search-ad-groups").val());
    }
    else if (currentId === "#ad-user-import") {
        $(".grid-error-validation").css("display", "none");
        $(".empty-validation").css("display", "none");
        $(".grid-validation").css("display", "none");
        searchADUsers($("#ad-user-import").val());
    }
    else if (currentId === "#ad-group-import") {
        $(".grid_error_validation").css("display", "none");
        $(".empty_validation").css("display", "none");
        $(".grid_validation").css("display", "none");
        searchADGroups($("#ad-group-import").val());
    }
    else if (currentId === "#search-user-permission") {
        gridObj = $("#itempermissiongrid").data("ejGrid");
        gridObj.search($("#search-user-permission").val());
    }
    else if (currentId === "#search-group-permission") {
        gridObj = $("#itemgrouppermissiongrid").data("ejGrid");
        gridObj.search($("#search-group-permission").val());
    }
    else if (currentId === "#userSearchKey") {
        gridObj = $("#UserGrid").data("ejGrid");
        gridObj.refreshContent();
    }
    else if (currentId === "#groupSearchKey") {
        gridObj = $("#GroupGrid").data("ejGrid");
        gridObj.refreshContent();
    }
    else if (currentId === "#search-applications") {
        gridObj = $("#application_grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId === "#search-app-users") {
        gridObj = $("#users_grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId === "#add-user-search") {
        gridObj = $("#add_users_grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId === "#search-app-groups") {
        gridObj = $("#groups_grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId === "#add-group-search") {
        gridObj = $("#add_groups_grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId === "#search-app-admins") {
        gridObj = $("#admins_grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId === "#add-admin-search") {
        gridObj = $("#add_admins_grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
}

function SuccessAlert(header, content, duration) {
    $("#success-alert").css("display", "table");
    $("#message-header").html(header);
    $("#message-content").html(content);
    setTimeout(function () {
        $('#success-alert').fadeOut();
    }, duration);
}
function WarningAlert(header, content, duration) {
    $("#warning-alert").css("display", "table");
    $("#warning-alert #message-header").html(header);
    $(" #warning-alert #message-content").html(content);
    if (duration != null && duration != "") {
        setTimeout(function () {
            $('#warning-alert').fadeOut();
        }, duration);
    }
    $(document).on("click", ".close-div", function () {
        $('#warning-alert').fadeOut();
    });
}
function isApplicationUrlValid(url) {
    var regexExpression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (!regexExpression.test(url)) {
        return false;
    } else {
        return true;
    }
}
function maxLength(inputString) {
    return inputString.length > 255;
}
function getCurrentPageNumber(pageSize, selectedRecordsCount, totalRecordsCount, currentPage) {
    var difference = totalRecordsCount - selectedRecordsCount;
    if (difference > pageSize) {
        var lastPage = difference % pageSize == 0 ? difference / pageSize : Math.floor((difference / pageSize) + 1);
        if (currentPage > lastPage) {
            return lastPage;
        } else {
            return currentPage;
        }
    }
    else {
        return 1;
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getUrlList(url) {
    var urlList = [];
    for (var i = 0; i < url.length; i++) {
        if (url.indexOf(',') != -1) {
            if (url[i] == ',') {
                urlList.push(url.substr(0, i));
                url = url.replace(url.slice(0, url.substr(0, i + 1).length), '');
                i = 0;
            }
        }
        else {
            urlList.push(url);
            url = '';
        }
    }

    return urlList;
}

function createLoader(element) {
    var returnId = "";
    if (typeof element === "string") {
        var selector = (element.indexOf(".") === 0) ? "." : "#";
        element = (element.indexOf(".") === 0) ? element.slice(1, element.length) : (element.indexOf("#") === 0) ? element.slice(1, element.length) : element;
        returnId = element + "-loader-icon";

        if ($("#" + returnId).length == 0 && $(selector + element).length != 0) {
            var template = $("<div class='loader-blue loader-icon' id='" + returnId + "'><svg class='circular'><circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div>");
            $("body").append(template);
        }
        return returnId;
    }
    else {
        element = element.selector;
        var selector = (element.indexOf(".") === 0) ? "." : "#";
        element = element.slice(1, element.length);
        returnId = element + "-loader-icon";
        if ($("#" + returnId).length == 0 && $(selector + element).length != 0) {
            var template = $("<div class='loader-blue loader-icon' id='" + returnId + "'><svg class='circular'><circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div>");
            $("body").append(template);
        }
    }

    return returnId;
}

function blurServerAppContainer(size) {
    if (size == undefined || size == "") {
        size = "5px";
    }

    $("#header-area, #menu-area, #content-area, footer, .cookie-notification").css("filter", "blur(" + size + ")");
    $("#server-app-container").css("overflow", "hidden");
}

function unblurServerAppContainer() {
    $("#header-area, #menu-area, #content-area, footer, .cookie-notification").css("filter", "");
    $("#server-app-container").css("overflow", "");
}
var card = null;
var cvc = null;
var exp = null;
var stripe;
$(document).ready(function () {
    var payFormWaitingPopupTemplateId = createLoader("update-billing-body");
    $("#update-billing-body").ejWaitingPopup({ template: $("#" + payFormWaitingPopupTemplateId) });
    var serverAppWaitingPopupTemplateId = createLoader("server-app-container");
    $("#server-app-container").ejWaitingPopup({ template: $("#" + serverAppWaitingPopupTemplateId) });
    if ($("#tenant-status").length > 0 && $("#tenant-status").val().toLowerCase() == "suspended") {
        $("#notification-section").css("display", "none");
    }
    $("#card-details-popup").ejDialog({
        width: "470px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        closeOnEscape: true
    });

    $("#messageBox").ejDialog({
        width: (parent.window.innerWidth > 460) ? "450px" : (parent.window.innerWidth - 10),
        height: "150px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        close: "onMessageDialogClose",
    });

    var cardDetailsWaitingPopupTemplateId = createLoader("card-details-popup_wrapper");
    $("#card-details-popup_wrapper").ejWaitingPopup({ template: $("#" + cardDetailsWaitingPopupTemplateId) });
    stripe = Stripe($("#stripePublicKey").text().trim());
    var elements = stripe.elements();
    var stripeElementStyle = {
        base: {
            'fontSize': '12px'
        },
        invalid: {
            iconColor: "#a94442",
            color: "#a94442"
        }
    };

    card = elements.create('cardNumber', {
        hidePostalCode: true,
        'placeholder': 'XXXX XXXX XXXX XXXX',
        'style': stripeElementStyle
    });
    card.mount('#card-number');

    cvc = elements.create('cardCvc', {
        'placeholder': 'CVC',
        'style': stripeElementStyle
    });
    cvc.mount('#card-cvc');

    exp = elements.create('cardExpiry', {
        'placeholder': 'MM / YY',
        'style': stripeElementStyle
    });
    exp.mount('#card-exp');

    var cardBrandToPfClass = {
        'visa': 'su-visa',
        'mastercard': 'su-mastercard',
        'amex': 'su-american-express',
        'discover': 'su-discover',
        'diners': 'su-diners',
        'jcb': 'su-jcb',
        'unionpay': 'su-unionpay',
        'unknown': 'su-credit-card',
    }

    card.on('change', function (event) {
        if (event.brand) {
            setBrandIcon(event.brand);
        }

        showCreditcardValidation(event);
    });

    exp.on('change', function (event) {
        showCreditcardValidation(event);
    });

    cvc.on('change', function (event) {
        showCreditcardValidation(event);
    });

    function setBrandIcon(brand) {
        var brandIconElement = document.getElementById('brand-icon');
        var cardClass = 'su-credit-card';
        if (brand in cardBrandToPfClass) {
            cardClass = cardBrandToPfClass[brand];
        }
        for (var i = brandIconElement.classList.length - 1; i >= 0; i--) {
            brandIconElement.classList.remove(brandIconElement.classList[i]);
        }

        brandIconElement.classList.add(cardClass);
    }

    function updateCard() {
        if (!isCardExist) {
            return;
        }

        var nameOnCard = $("#name").val();
        var cardData = {
            name: nameOnCard != "" ? nameOnCard : undefined
        };

        $("#card-details-popup_wrapper").ejWaitingPopup("show");
        stripe.createToken(card, cardData).then(function (result) {
            if (result.token) {
                if ($(".update-card-and-pay").length == 1) {
                    updateAndPay(result.token.id);
                }
                else if ($(".update-card").length == 1) {
                    updateCardDetails(result.token.id);
                }
            }
            else {
                if (result.error && result.error.message) {
                    showCreditcardValidation(result);
                }
                $("#card-details-popup_wrapper").ejWaitingPopup("hide");
            }
        });
    }

    function closeUpdateCardDialog() {
        $("#card-details-popup").ejDialog("close");
        $("#name").val("");
        card.clear();
        cvc.clear();
        exp.clear();
    }

    $(document).on("click", ".update-card, .update-card-and-pay", function (e) {
        e.preventDefault();
        updateCard();
    });

    $(document).on("click", ".cancel-update", function (e) {
        closeUpdateCardDialog();
    });

    $(document).on("click", ".edit-card, .update-and-pay ", function () {
        $("#card-details-popup").ejDialog("open");
    });

    $(document).keyup(function (e) {
        if (e.which == 13) {
            if ($("#update-card-container").is(":visible")) {
                if (isCardExist) {
                    updateCard();
                } else {
                    $("#payment-submit").click();
                }
            }

        }
    });

    $(document).on("click", ".PopupClose", function (e) {
        closeUpdateCardDialog();
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.IdP.App.LocalizationContent.ItemNameValidator);

    $.validator.addMethod("isValidEmail", function (value, element) {
        if (value.trim() === "") {
            return true;
        } else {
            return IsEmail(value);
        }
    }, window.IdP.App.LocalizationContent.IsValidEmail);

    $("#card-form-id").validate({
        errorElement: "span.validation-error",
        ignore: "",
        onkeyup: function (element, event) { if (event.keyCode != 9) $(element).valid(); else true; },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "pay-form-info-fullname": {
                isRequired: true
            },
            "pay-form-info-email": {
                isRequired: true,
                isValidEmail: true
            },
            "pay-form-info-address1": {
                isRequired: true
            },
            "pay-form-info-address2": {
                isRequired: false
            },
            "pay-form-info-city": {
                isRequired: true
            },
            "pay-form-info-country": {
                isRequired: true
            },
            "pay-form-info-state": {
                isRequired: true
            },
            "pay-form-info-zip": {
                isRequired: true
            }
        },
        highlight: function (element) {
            var read = $("#" + element.id).not(":disabled");
            if (read) {
                $(element).closest('div').addClass("has-error");
            }
        },
        unhighlight: function (element) {
            $(element).closest("div").removeClass("has-error");
            $(element).closest("div").find("span.validation-error").html("");
        },
        errorPlacement: function (error, element) {
            var read = $("#" + element.context.id).not(":disabled");
            if (read) {
                $(element).closest('div').find("span.validation-error").html(error.html());
            }
        },
        messages: {
            "pay-form-info-fullname": {
                isRequired: window.IdP.App.LocalizationContent.FullnameValidator
            },
            "pay-form-info-email": {
                isRequired: window.IdP.App.LocalizationContent.EmailValidator,
                isValidEmail: window.IdP.App.LocalizationContent.IsValidEmail
            },
            "pay-form-info-address1": {
                isRequired: window.IdP.App.LocalizationContent.AddressValidator
            },
            "pay-form-info-city": {
                isRequired: window.IdP.App.LocalizationContent.CityValidator
            },
            "pay-form-info-country": {
                isRequired: window.IdP.App.LocalizationContent.CountryValidator
            },
            "pay-form-info-state": {
                isRequired: window.IdP.App.LocalizationContent.StateValidator
            },
            "pay-form-info-zip": {
                isRequired: window.IdP.App.LocalizationContent.ZipValidator
            },
            "pay-form-info-card-name": {
                isRequired: window.IdP.App.LocalizationContent.NameonCardValidator
            }
        }
    });
});

function showCreditcardValidation(result) {
    var errorMessage = document.querySelector(".error>.message");
    if (result.error) {
        errorMessage.textContent = result.error.message;
    } else {
        errorMessage.textContent = "";
    }
}

function validateForm(e) {
    e.preventDefault();
    $(".update-card, .update-card-and-pay").trigger("click");
}

function enableInputs(form) {
    Array.prototype.forEach.call(
        form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function (input) {
            input.removeAttribute('disabled');
        }
    );
}

function disableInputs(form) {
    Array.prototype.forEach.call(
        form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function (input) {
            input.setAttribute('disabled', 'true');
        }
    );
}

var isBillingAddressChanged = false;

$(document).on("change", "#pay-form-info-fullname, #pay-form-info-email, #pay-form-info-address1, #pay-form-info-address2, #pay-form-info-state, #pay-form-info-city, #pay-form-info-zip, #pay-form-info-country", function () {
    isBillingAddressChanged = true;
    $("#validation-detail>.validation-error").text("");
});

$(document).on("click", ".update-billing-address", function () {
    if (isBillingAddressChanged) {
        var example = document.querySelector('.pay-form-info');
        var form = example.querySelector('form');
        var fullname = form.querySelector('#pay-form-info-fullname');
        var address1 = form.querySelector('#pay-form-info-address1');
        var address2 = form.querySelector('#pay-form-info-address2');
        var city = form.querySelector('#pay-form-info-city');
        var state = form.querySelector('#pay-form-info-state');
        var zip = form.querySelector('#pay-form-info-zip');
        var country = form.querySelector('#pay-form-info-country');
        var email = form.querySelector('#pay-form-info-email');
        if ($("#card-form-id").valid()) {
            disableInputs(form);
            updateBillingAddress(fullname.value, email.value, address1.value, address2.value,
                country.value, city.value, state.value, zip.value);
            enableInputs(form);
        }
    }
    else {
        $("#validation-detail>.validation-error").text(window.IdP.App.LocalizationContent.BillingAddressNotChanged);
    }
});

function updateBillingAddress(fullName, eMail, address1, address2, country, city, state, zip) {
    $("#update-billing-body").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        data: {
            fullName: fullName,
            eMail: eMail,
            address1: address1,
            address2: address2,
            country: country,
            city: city,
            state: state,
            zip: zip
        },
        url: updateBillingAddressUrl,
        success: function (result) {
            $("#update-billing-body").ejWaitingPopup("hide");
            if (result.Status) {
                $("#pay-form-info-fullname").val(result.CardDetail.FullName);
                $("#pay-form-info-address1").val(result.CardDetail.Address1);
                $("#pay-form-info-address2").val(result.CardDetail.Address2);
                $("#pay-form-info-city").val(result.CardDetail.City);
                $("#pay-form-info-state").val(result.CardDetail.State);
                $("#pay-form-info-zip").val(result.CardDetail.ZipCode);
                $("#pay-form-info-email").val(result.CardDetail.Email);
                isBillingAddressChanged = false;
                SuccessAlert(window.IdP.App.LocalizationContent.UpdateBillingAddressTitle, window.IdP.App.LocalizationContent.UpdateBillingAddressSuccess, 2000);
            } else {
                WarningAlert(window.IdP.App.LocalizationContent.UpdateBillingAddressTitle, window.IdP.App.LocalizationContent.UpdateBillingAddressFailed, 2000);
            }
        }
    });
}

function updateCardDetails(cardToken) {
    $.ajax({
        type: "POST",
        data: {
            cardToken: cardToken
        },
        url: updateCardUrl,
        success: function (result) {
            $("#card-details-popup_wrapper").ejWaitingPopup("hide");
            if (result.Status) {
                $("#card-details-popup").ejDialog("close");
                card.clear();
                cvc.clear();
                exp.clear();
                window.location.reload();
            } else {
                $(".error").css("display", "block");
                $(".message").text(result.Data);
            }
        }
    });
}

function updateAndPay(cardToken) {
    $.ajax({
        type: "POST",
        data: {
            cardToken: cardToken
        },
        url: updateCardUrl,
        success: function (result) {
            if (result.Status) {
                $("#card-details-popup_wrapper").ejWaitingPopup("hide");
                $("#card-details-popup").ejDialog("close");
                card.clear();
                retryPayment();
            } else {
                $("#card-details-popup_wrapper").ejWaitingPopup("hide");
                $(".error").css("display", "block");
                $(".message").text(result.Data);
            }
        }
    });
}

$(document).on("click", ".retry-payment ", function () {
    retryPayment();
});

function retryPayment() {
    var failurePopupHeight;
    if (window.innerWidth < 1280) {
        failurePopupHeight = "200px";
        failurePopupWidth = "450px";
    }
    else {
        failurePopupHeight = "190px";
        failurePopupWidth = "440px";
    }
    messageBox("", window.IdP.App.LocalizationContent.RetryPaymentTitle, window.IdP.App.LocalizationContent.RetryPaymentWait, "success", function () {
        onCloseMessageBox();
    }, undefined, undefined, "155px", undefined, "retry-payment-loader");
    $('.message-box-btn-holder').append("<span class='loader'></span>");

    $.ajax({
        type: "POST",
        data: {
        },
        url: retryPaymentUrl,
        success: function (result) {
            $("#server-app-container").ejWaitingPopup("hide");
            if (result.Status) {
                messageBox("", window.IdP.App.LocalizationContent.RetryPaymentTitle, window.IdP.App.LocalizationContent.RetryPaymentSuccess, "success", function () {
                    onCloseMessageBox();
                    location.reload();
                }, undefined, "430px", "140px", undefined, "retry-payment-messageBox");
            } else {
                if (result.Data == "Something went wrong, try again.") {
                    messageBox("", window.IdP.App.LocalizationContent.RetryPaymentTitle, window.IdP.App.LocalizationContent.RetryPaymentFailDescription3, "success", function () {
                        onCloseMessageBox();
                    }, undefined, "420px", undefined, undefined, "retry-payment-messageBox");
                }
                else {
                    messageBox("", window.IdP.App.LocalizationContent.RetryPaymentTitle, window.IdP.App.LocalizationContent.RetryPaymentFailDescription1 + "<br/>" + result.Data + " – <a href='" + helpSiteBaseUrl + "/site-settings/payments/error-codes' target='_blank'>" + window.IdP.App.LocalizationContent.MoreDetails + " </a>. " + window.IdP.App.LocalizationContent.RetryPaymentFailDescription2, "success", function () {
                        onCloseMessageBox();
                    }, undefined, failurePopupWidth, failurePopupHeight, undefined, "retry-payment-messageBox");
                }
            }
        }
    });
}

$(document).on('click', '#payment-submit', function (e) {
    $("#payment-submit").attr("disabled", true);

    if (!$("#card-form-id").valid()) {
        $("#payment-submit").attr("disabled", false);
        if (!(card._complete && cvc._complete && exp._complete)) {
            document.querySelector(".error>.message").textContent = "Your card number is incomplete.";
        }
        return;
    }

    showWaitingPopup("server-app-container");
    e.preventDefault();
    var fullname = $('#pay-form-info-fullname').val();
    var nameOnCard = $("#name").val();
    var email = $('#pay-form-info-email').val();
    var address1 = $('#pay-form-info-address1').val();
    var address2 = $('#pay-form-info-address2').val();
    var country = $('#pay-form-info-country').val();
    var city = $('#pay-form-info-city').val();
    var state = $('#pay-form-info-state').val();
    var zip = $('#pay-form-info-zip').val();

    var cardData = {
        name: nameOnCard != "" ? nameOnCard : undefined,
        address_line1: address1 != "" ? address1 : undefined,
        address_line2: address2 != "" ? address2 : undefined,
        address_country: country != "" ? country : undefined,
        address_city: city != "" ? city : undefined,
        address_state: state != "" ? state : undefined,
        address_zip: zip != "" ? zip : undefined
    };

    stripe.createToken(card, cardData).then(function (result) {
        if (result.token) {
            var cardInfo = result.token.card;
            $.ajax({
                url: createSubscriptionCardUrl,
                type: "POST",
                data: {
                    id: tenantInfoId,
                    token: result.token.id,
                    fullName: fullname,
                    email: email,
                    addressLine1: cardInfo.address_line1,
                    addressLine2: cardInfo.address_line2,
                    city: cardInfo.address_city,
                    state: cardInfo.address_state,
                    country: cardInfo.address_country,
                    zip: cardInfo.address_zip
                },
                success: function (data) {
                    if (!data.Status) {
                        hideWaitingPopup("server-app-container");
                        $("#payment-submit").attr("disabled", false);
                        var errorElement = $("#add-card-details .validation-error");
                        if (data.ErrorCode) {
                            errorElement.html(window.IdP.App.LocalizationContent.RetryPaymentFailDescription1 + data.ErrorCode + " – <a href='" + helpSiteBaseUrl + "/site-settings/payments/error-codes' target='_blank'>" + window.IdP.App.LocalizationContent.MoreDetails + " </a>. " + window.IdP.App.LocalizationContent.RetryPaymentFailDescription2);
                        }
                        else {
                            errorElement.html(data.StatusMessage);
                        }
                    }
                    else {
                        hideWaitingPopup("server-app-container");
                        SuccessAlert(window.IdP.App.LocalizationContent.Payments, window.IdP.App.LocalizationContent.AddPaymentDetailSuccess, 7000);
                        card.clear();
                        cvc.clear();
                        exp.clear();
                        window.location.reload();
                    }
                }
            });
        } else if (result.error && result.error.message) {
            showCreditcardValidation(result);
            $("#payment-submit").removeAttr("disabled");
            hideWaitingPopup("server-app-container");
        }
    });
});


$(document).on('click', '.selectpicker', function (e) {
    $(this).parent().parent().removeClass("has-error");
    $(this).parent().parent().closest("div").find("span.validation-error").html("");
});