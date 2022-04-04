/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(t){"use strict";var e=jQuery.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||3<e[0])throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(),function(n){"use strict";n.fn.emulateTransitionEnd=function(t){var e=!1,i=this;n(this).one("bsTransitionEnd",function(){e=!0});return setTimeout(function(){e||n(i).trigger(n.support.transition.end)},t),this},n(function(){n.support.transition=function o(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(t.style[i]!==undefined)return{end:e[i]};return!1}(),n.support.transition&&(n.event.special.bsTransitionEnd={bindType:n.support.transition.end,delegateType:n.support.transition.end,handle:function(t){if(n(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})})}(jQuery),function(s){"use strict";var e='[data-dismiss="alert"]',a=function(t){s(t).on("click",e,this.close)};a.VERSION="3.4.1",a.TRANSITION_DURATION=150,a.prototype.close=function(t){var e=s(this),i=e.attr("data-target");i||(i=(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),i="#"===i?[]:i;var o=s(document).find(i);function n(){o.detach().trigger("closed.bs.alert").remove()}t&&t.preventDefault(),o.length||(o=e.closest(".alert")),o.trigger(t=s.Event("close.bs.alert")),t.isDefaultPrevented()||(o.removeClass("in"),s.support.transition&&o.hasClass("fade")?o.one("bsTransitionEnd",n).emulateTransitionEnd(a.TRANSITION_DURATION):n())};var t=s.fn.alert;s.fn.alert=function o(i){return this.each(function(){var t=s(this),e=t.data("bs.alert");e||t.data("bs.alert",e=new a(this)),"string"==typeof i&&e[i].call(t)})},s.fn.alert.Constructor=a,s.fn.alert.noConflict=function(){return s.fn.alert=t,this},s(document).on("click.bs.alert.data-api",e,a.prototype.close)}(jQuery),function(s){"use strict";var n=function(t,e){this.$element=s(t),this.options=s.extend({},n.DEFAULTS,e),this.isLoading=!1};function i(o){return this.each(function(){var t=s(this),e=t.data("bs.button"),i="object"==typeof o&&o;e||t.data("bs.button",e=new n(this,i)),"toggle"==o?e.toggle():o&&e.setState(o)})}n.VERSION="3.4.1",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(t){var e="disabled",i=this.$element,o=i.is("input")?"val":"html",n=i.data();t+="Text",null==n.resetText&&i.data("resetText",i[o]()),setTimeout(s.proxy(function(){i[o](null==n[t]?this.options[t]:n[t]),"loadingText"==t?(this.isLoading=!0,i.addClass(e).attr(e,e).prop(e,!0)):this.isLoading&&(this.isLoading=!1,i.removeClass(e).removeAttr(e).prop(e,!1))},this),0)},n.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")?(i.prop("checked")&&(t=!1),e.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==i.prop("type")&&(i.prop("checked")!==this.$element.hasClass("active")&&(t=!1),this.$element.toggleClass("active")),i.prop("checked",this.$element.hasClass("active")),t&&i.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var t=s.fn.button;s.fn.button=i,s.fn.button.Constructor=n,s.fn.button.noConflict=function(){return s.fn.button=t,this},s(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(t){var e=s(t.target).closest(".btn");i.call(e,"toggle"),s(t.target).is('input[type="radio"], input[type="checkbox"]')||(t.preventDefault(),e.is("input,button")?e.trigger("focus"):e.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(t){s(t.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(t.type))})}(jQuery),function(p){"use strict";var c=function(t,e){this.$element=p(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=e,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",p.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",p.proxy(this.pause,this)).on("mouseleave.bs.carousel",p.proxy(this.cycle,this))};function r(n){return this.each(function(){var t=p(this),e=t.data("bs.carousel"),i=p.extend({},c.DEFAULTS,t.data(),"object"==typeof n&&n),o="string"==typeof n?n:i.slide;e||t.data("bs.carousel",e=new c(this,i)),"number"==typeof n?e.to(n):o?e[o]():i.interval&&e.pause().cycle()})}c.VERSION="3.4.1",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},c.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(p.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},c.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e);if(("prev"==t&&0===i||"next"==t&&i==this.$items.length-1)&&!this.options.wrap)return e;var o=(i+("prev"==t?-1:1))%this.$items.length;return this.$items.eq(o)},c.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(t>this.$items.length-1||t<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(i<t?"next":"prev",this.$items.eq(t))},c.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&p.support.transition&&(this.$element.trigger(p.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(t,e){var i=this.$element.find(".item.active"),o=e||this.getItemForDirection(t,i),n=this.interval,s="next"==t?"left":"right",a=this;if(o.hasClass("active"))return this.sliding=!1;var r=o[0],l=p.Event("slide.bs.carousel",{relatedTarget:r,direction:s});if(this.$element.trigger(l),!l.isDefaultPrevented()){if(this.sliding=!0,n&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var h=p(this.$indicators.children()[this.getItemIndex(o)]);h&&h.addClass("active")}var d=p.Event("slid.bs.carousel",{relatedTarget:r,direction:s});return p.support.transition&&this.$element.hasClass("slide")?(o.addClass(t),"object"==typeof o&&o.length&&o[0].offsetWidth,i.addClass(s),o.addClass(s),i.one("bsTransitionEnd",function(){o.removeClass([t,s].join(" ")).addClass("active"),i.removeClass(["active",s].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger(d)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(i.removeClass("active"),o.addClass("active"),this.sliding=!1,this.$element.trigger(d)),n&&this.cycle(),this}};var t=p.fn.carousel;p.fn.carousel=r,p.fn.carousel.Constructor=c,p.fn.carousel.noConflict=function(){return p.fn.carousel=t,this};var e=function(t){var e=p(this),i=e.attr("href");i&&(i=i.replace(/.*(?=#[^\s]+$)/,""));var o=e.attr("data-target")||i,n=p(document).find(o);if(n.hasClass("carousel")){var s=p.extend({},n.data(),e.data()),a=e.attr("data-slide-to");a&&(s.interval=!1),r.call(n,s),a&&n.data("bs.carousel").to(a),t.preventDefault()}};p(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),p(window).on("load",function(){p('[data-ride="carousel"]').each(function(){var t=p(this);r.call(t,t.data())})})}(jQuery),function(a){"use strict";var r=function(t,e){this.$element=a(t),this.options=a.extend({},r.DEFAULTS,e),this.$trigger=a('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};function n(t){var e,i=t.attr("data-target")||(e=t.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"");return a(document).find(i)}function l(o){return this.each(function(){var t=a(this),e=t.data("bs.collapse"),i=a.extend({},r.DEFAULTS,t.data(),"object"==typeof o&&o);!e&&i.toggle&&/show|hide/.test(o)&&(i.toggle=!1),e||t.data("bs.collapse",e=new r(this,i)),"string"==typeof o&&e[o]()})}r.VERSION="3.4.1",r.TRANSITION_DURATION=350,r.DEFAULTS={toggle:!0},r.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},r.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(t=e.data("bs.collapse"))&&t.transitioning)){var i=a.Event("show.bs.collapse");if(this.$element.trigger(i),!i.isDefaultPrevented()){e&&e.length&&(l.call(e,"hide"),t||e.data("bs.collapse",null));var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var n=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return n.call(this);var s=a.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",a.proxy(n,this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][s])}}}},r.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=a.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var e=this.dimension();this.$element[e](this.$element[e]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!a.support.transition)return i.call(this);this.$element[e](0).one("bsTransitionEnd",a.proxy(i,this)).emulateTransitionEnd(r.TRANSITION_DURATION)}}},r.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},r.prototype.getParent=function(){return a(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(t,e){var i=a(e);this.addAriaAndCollapsedClass(n(i),i)},this)).end()},r.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var t=a.fn.collapse;a.fn.collapse=l,a.fn.collapse.Constructor=r,a.fn.collapse.noConflict=function(){return a.fn.collapse=t,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var e=a(this);e.attr("data-target")||t.preventDefault();var i=n(e),o=i.data("bs.collapse")?"toggle":e.data();l.call(i,o)})}(jQuery),function(a){"use strict";var r='[data-toggle="dropdown"]',o=function(t){a(t).on("click.bs.dropdown",this.toggle)};function l(t){var e=t.attr("data-target");e||(e=(e=t.attr("href"))&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var i="#"!==e?a(document).find(e):null;return i&&i.length?i:t.parent()}function s(o){o&&3===o.which||(a(".dropdown-backdrop").remove(),a(r).each(function(){var t=a(this),e=l(t),i={relatedTarget:this};e.hasClass("open")&&(o&&"click"==o.type&&/input|textarea/i.test(o.target.tagName)&&a.contains(e[0],o.target)||(e.trigger(o=a.Event("hide.bs.dropdown",i)),o.isDefaultPrevented()||(t.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",i)))))}))}o.VERSION="3.4.1",o.prototype.toggle=function(t){var e=a(this);if(!e.is(".disabled, :disabled")){var i=l(e),o=i.hasClass("open");if(s(),!o){"ontouchstart"in document.documentElement&&!i.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",s);var n={relatedTarget:this};if(i.trigger(t=a.Event("show.bs.dropdown",n)),t.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),i.toggleClass("open").trigger(a.Event("shown.bs.dropdown",n))}return!1}},o.prototype.keydown=function(t){if(/(38|40|27|32)/.test(t.which)&&!/input|textarea/i.test(t.target.tagName)){var e=a(this);if(t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled")){var i=l(e),o=i.hasClass("open");if(!o&&27!=t.which||o&&27==t.which)return 27==t.which&&i.find(r).trigger("focus"),e.trigger("click");var n=i.find(".dropdown-menu li:not(.disabled):visible a");if(n.length){var s=n.index(t.target);38==t.which&&0<s&&s--,40==t.which&&s<n.length-1&&s++,~s||(s=0),n.eq(s).trigger("focus")}}}};var t=a.fn.dropdown;a.fn.dropdown=function e(i){return this.each(function(){var t=a(this),e=t.data("bs.dropdown");e||t.data("bs.dropdown",e=new o(this)),"string"==typeof i&&e[i].call(t)})},a.fn.dropdown.Constructor=o,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=t,this},a(document).on("click.bs.dropdown.data-api",s).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",r,o.prototype.toggle).on("keydown.bs.dropdown.data-api",r,o.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",o.prototype.keydown)}(jQuery),function(a){"use strict";var s=function(t,e){this.options=e,this.$body=a(document.body),this.$element=a(t),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.fixedContent=".navbar-fixed-top, .navbar-fixed-bottom",this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};function r(o,n){return this.each(function(){var t=a(this),e=t.data("bs.modal"),i=a.extend({},s.DEFAULTS,t.data(),"object"==typeof o&&o);e||t.data("bs.modal",e=new s(this,i)),"string"==typeof o?e[o](n):i.show&&e.show(n)})}s.VERSION="3.4.1",s.TRANSITION_DURATION=300,s.BACKDROP_TRANSITION_DURATION=150,s.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},s.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},s.prototype.show=function(i){var o=this,t=a.Event("show.bs.modal",{relatedTarget:i});this.$element.trigger(t),this.isShown||t.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(t){a(t.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var t=a.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),t&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:i});t?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(s.TRANSITION_DURATION):o.$element.trigger("focus").trigger(e)}))},s.prototype.hide=function(t){t&&t.preventDefault(),t=a.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(s.TRANSITION_DURATION):this.hideModal())},s.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},s.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},s.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},s.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},s.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},s.prototype.backdrop=function(t){var e=this,i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var o=a.support.transition&&i;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+i).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(t){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),o&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return;o?this.$backdrop.one("bsTransitionEnd",t).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION):t()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var n=function(){e.removeBackdrop(),t&&t()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",n).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION):n()}else t&&t()},s.prototype.handleUpdate=function(){this.adjustDialog()},s.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},s.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},s.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},s.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"";var n=this.scrollbarWidth;this.bodyIsOverflowing&&(this.$body.css("padding-right",t+n),a(this.fixedContent).each(function(t,e){var i=e.style.paddingRight,o=a(e).css("padding-right");a(e).data("padding-right",i).css("padding-right",parseFloat(o)+n+"px")}))},s.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad),a(this.fixedContent).each(function(t,e){var i=a(e).data("padding-right");a(e).removeData("padding-right"),e.style.paddingRight=i||""})},s.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var t=a.fn.modal;a.fn.modal=r,a.fn.modal.Constructor=s,a.fn.modal.noConflict=function(){return a.fn.modal=t,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var e=a(this),i=e.attr("href"),o=e.attr("data-target")||i&&i.replace(/.*(?=#[^\s]+$)/,""),n=a(document).find(o),s=n.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(i)&&i},n.data(),e.data());e.is("a")&&t.preventDefault(),n.one("show.bs.modal",function(t){t.isDefaultPrevented()||n.one("hidden.bs.modal",function(){e.is(":visible")&&e.trigger("focus")})}),r.call(n,s,this)})}(jQuery),function(g){"use strict";var o=["sanitize","whiteList","sanitizeFn"],a=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],t={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},r=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,l=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function u(t,e){var i=t.nodeName.toLowerCase();if(-1!==g.inArray(i,e))return-1===g.inArray(i,a)||Boolean(t.nodeValue.match(r)||t.nodeValue.match(l));for(var o=g(e).filter(function(t,e){return e instanceof RegExp}),n=0,s=o.length;n<s;n++)if(i.match(o[n]))return!0;return!1}function n(t,e,i){if(0===t.length)return t;if(i&&"function"==typeof i)return i(t);if(!document.implementation||!document.implementation.createHTMLDocument)return t;var o=document.implementation.createHTMLDocument("sanitization");o.body.innerHTML=t;for(var n=g.map(e,function(t,e){return e}),s=g(o.body).find("*"),a=0,r=s.length;a<r;a++){var l=s[a],h=l.nodeName.toLowerCase();if(-1!==g.inArray(h,n))for(var d=g.map(l.attributes,function(t){return t}),p=[].concat(e["*"]||[],e[h]||[]),c=0,f=d.length;c<f;c++)u(d[c],p)||l.removeAttribute(d[c].nodeName);else l.parentNode.removeChild(l)}return o.body.innerHTML}var m=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};m.VERSION="3.4.1",m.TRANSITION_DURATION=150,m.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0},sanitize:!0,sanitizeFn:null,whiteList:t},m.prototype.init=function(t,e,i){if(this.enabled=!0,this.type=t,this.$element=g(e),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&g(document).find(g.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var o=this.options.trigger.split(" "),n=o.length;n--;){var s=o[n];if("click"==s)this.$element.on("click."+this.type,this.options.selector,g.proxy(this.toggle,this));else if("manual"!=s){var a="hover"==s?"mouseenter":"focusin",r="hover"==s?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,g.proxy(this.enter,this)),this.$element.on(r+"."+this.type,this.options.selector,g.proxy(this.leave,this))}}this.options.selector?this._options=g.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},m.prototype.getDefaults=function(){return m.DEFAULTS},m.prototype.getOptions=function(t){var e=this.$element.data();for(var i in e)e.hasOwnProperty(i)&&-1!==g.inArray(i,o)&&delete e[i];return(t=g.extend({},this.getDefaults(),e,t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t.sanitize&&(t.template=n(t.template,t.whiteList,t.sanitizeFn)),t},m.prototype.getDelegateOptions=function(){var i={},o=this.getDefaults();return this._options&&g.each(this._options,function(t,e){o[t]!=e&&(i[t]=e)}),i},m.prototype.enter=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusin"==t.type?"focus":"hover"]=!0),e.tip().hasClass("in")||"in"==e.hoverState)e.hoverState="in";else{if(clearTimeout(e.timeout),e.hoverState="in",!e.options.delay||!e.options.delay.show)return e.show();e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)}},m.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},m.prototype.leave=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusout"==t.type?"focus":"hover"]=!1),!e.isInStateTrue()){if(clearTimeout(e.timeout),e.hoverState="out",!e.options.delay||!e.options.delay.hide)return e.hide();e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)}},m.prototype.show=function(){var t=g.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var e=g.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!e)return;var i=this,o=this.tip(),n=this.getUID(this.type);this.setContent(),o.attr("id",n),this.$element.attr("aria-describedby",n),this.options.animation&&o.addClass("fade");var s="function"==typeof this.options.placement?this.options.placement.call(this,o[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,r=a.test(s);r&&(s=s.replace(a,"")||"top"),o.detach().css({top:0,left:0,display:"block"}).addClass(s).data("bs."+this.type,this),this.options.container?o.appendTo(g(document).find(this.options.container)):o.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var l=this.getPosition(),h=o[0].offsetWidth,d=o[0].offsetHeight;if(r){var p=s,c=this.getPosition(this.$viewport);s="bottom"==s&&l.bottom+d>c.bottom?"top":"top"==s&&l.top-d<c.top?"bottom":"right"==s&&l.right+h>c.width?"left":"left"==s&&l.left-h<c.left?"right":s,o.removeClass(p).addClass(s)}var f=this.getCalculatedOffset(s,l,h,d);this.applyPlacement(f,s);var u=function(){var t=i.hoverState;i.$element.trigger("shown.bs."+i.type),i.hoverState=null,"out"==t&&i.leave(i)};g.support.transition&&this.$tip.hasClass("fade")?o.one("bsTransitionEnd",u).emulateTransitionEnd(m.TRANSITION_DURATION):u()}},m.prototype.applyPlacement=function(t,e){var i=this.tip(),o=i[0].offsetWidth,n=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(s)&&(s=0),isNaN(a)&&(a=0),t.top+=s,t.left+=a,g.offset.setOffset(i[0],g.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),i.addClass("in");var r=i[0].offsetWidth,l=i[0].offsetHeight;"top"==e&&l!=n&&(t.top=t.top+n-l);var h=this.getViewportAdjustedDelta(e,t,r,l);h.left?t.left+=h.left:t.top+=h.top;var d=/top|bottom/.test(e),p=d?2*h.left-o+r:2*h.top-n+l,c=d?"offsetWidth":"offsetHeight";i.offset(t),this.replaceArrow(p,i[0][c],d)},m.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},m.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();this.options.html?(this.options.sanitize&&(e=n(e,this.options.whiteList,this.options.sanitizeFn)),t.find(".tooltip-inner").html(e)):t.find(".tooltip-inner").text(e),t.removeClass("fade in top bottom left right")},m.prototype.hide=function(t){var e=this,i=g(this.$tip),o=g.Event("hide.bs."+this.type);function n(){"in"!=e.hoverState&&i.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),t&&t()}if(this.$element.trigger(o),!o.isDefaultPrevented())return i.removeClass("in"),g.support.transition&&i.hasClass("fade")?i.one("bsTransitionEnd",n).emulateTransitionEnd(m.TRANSITION_DURATION):n(),this.hoverState=null,this},m.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},m.prototype.hasContent=function(){return this.getTitle()},m.prototype.getPosition=function(t){var e=(t=t||this.$element)[0],i="BODY"==e.tagName,o=e.getBoundingClientRect();null==o.width&&(o=g.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var n=window.SVGElement&&e instanceof window.SVGElement,s=i?{top:0,left:0}:n?null:t.offset(),a={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},r=i?{width:g(window).width(),height:g(window).height()}:null;return g.extend({},o,a,r,s)},m.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},m.prototype.getViewportAdjustedDelta=function(t,e,i,o){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(t)){var r=e.top-s-a.scroll,l=e.top+s-a.scroll+o;r<a.top?n.top=a.top-r:l>a.top+a.height&&(n.top=a.top+a.height-l)}else{var h=e.left-s,d=e.left+s+i;h<a.left?n.left=a.left-h:d>a.right&&(n.left=a.left+a.width-d)}return n},m.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},m.prototype.getUID=function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},m.prototype.tip=function(){if(!this.$tip&&(this.$tip=g(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},m.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},m.prototype.enable=function(){this.enabled=!0},m.prototype.disable=function(){this.enabled=!1},m.prototype.toggleEnabled=function(){this.enabled=!this.enabled},m.prototype.toggle=function(t){var e=this;t&&((e=g(t.currentTarget).data("bs."+this.type))||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e))),t?(e.inState.click=!e.inState.click,e.isInStateTrue()?e.enter(e):e.leave(e)):e.tip().hasClass("in")?e.leave(e):e.enter(e)},m.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})},m.prototype.sanitizeHtml=function(t){return n(t,this.options.whiteList,this.options.sanitizeFn)};var e=g.fn.tooltip;g.fn.tooltip=function i(o){return this.each(function(){var t=g(this),e=t.data("bs.tooltip"),i="object"==typeof o&&o;!e&&/destroy|hide/.test(o)||(e||t.data("bs.tooltip",e=new m(this,i)),"string"==typeof o&&e[o]())})},g.fn.tooltip.Constructor=m,g.fn.tooltip.noConflict=function(){return g.fn.tooltip=e,this}}(jQuery),function(n){"use strict";var s=function(t,e){this.init("popover",t,e)};if(!n.fn.tooltip)throw new Error("Popover requires tooltip.js");s.VERSION="3.4.1",s.DEFAULTS=n.extend({},n.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),((s.prototype=n.extend({},n.fn.tooltip.Constructor.prototype)).constructor=s).prototype.getDefaults=function(){return s.DEFAULTS},s.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();if(this.options.html){var o=typeof i;this.options.sanitize&&(e=this.sanitizeHtml(e),"string"===o&&(i=this.sanitizeHtml(i))),t.find(".popover-title").html(e),t.find(".popover-content").children().detach().end()["string"===o?"html":"append"](i)}else t.find(".popover-title").text(e),t.find(".popover-content").children().detach().end().text(i);t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},s.prototype.hasContent=function(){return this.getTitle()||this.getContent()},s.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},s.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var t=n.fn.popover;n.fn.popover=function e(o){return this.each(function(){var t=n(this),e=t.data("bs.popover"),i="object"==typeof o&&o;!e&&/destroy|hide/.test(o)||(e||t.data("bs.popover",e=new s(this,i)),"string"==typeof o&&e[o]())})},n.fn.popover.Constructor=s,n.fn.popover.noConflict=function(){return n.fn.popover=t,this}}(jQuery),function(s){"use strict";function n(t,e){this.$body=s(document.body),this.$scrollElement=s(t).is(document.body)?s(window):s(t),this.options=s.extend({},n.DEFAULTS,e),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",s.proxy(this.process,this)),this.refresh(),this.process()}function e(o){return this.each(function(){var t=s(this),e=t.data("bs.scrollspy"),i="object"==typeof o&&o;e||t.data("bs.scrollspy",e=new n(this,i)),"string"==typeof o&&e[o]()})}n.VERSION="3.4.1",n.DEFAULTS={offset:10},n.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},n.prototype.refresh=function(){var t=this,o="offset",n=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),s.isWindow(this.$scrollElement[0])||(o="position",n=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var t=s(this),e=t.data("target")||t.attr("href"),i=/^#./.test(e)&&s(e);return i&&i.length&&i.is(":visible")&&[[i[o]().top+n,e]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},n.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),n=this.offsets,s=this.targets,a=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),o<=e)return a!=(t=s[s.length-1])&&this.activate(t);if(a&&e<n[0])return this.activeTarget=null,this.clear();for(t=n.length;t--;)a!=s[t]&&e>=n[t]&&(n[t+1]===undefined||e<n[t+1])&&this.activate(s[t])},n.prototype.activate=function(t){this.activeTarget=t,this.clear();var e=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',i=s(e).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},n.prototype.clear=function(){s(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var t=s.fn.scrollspy;s.fn.scrollspy=e,s.fn.scrollspy.Constructor=n,s.fn.scrollspy.noConflict=function(){return s.fn.scrollspy=t,this},s(window).on("load.bs.scrollspy.data-api",function(){s('[data-spy="scroll"]').each(function(){var t=s(this);e.call(t,t.data())})})}(jQuery),function(r){"use strict";var a=function(t){this.element=r(t)};function e(i){return this.each(function(){var t=r(this),e=t.data("bs.tab");e||t.data("bs.tab",e=new a(this)),"string"==typeof i&&e[i]()})}a.VERSION="3.4.1",a.TRANSITION_DURATION=150,a.prototype.show=function(){var t=this.element,e=t.closest("ul:not(.dropdown-menu)"),i=t.data("target");if(i||(i=(i=t.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var o=e.find(".active:last a"),n=r.Event("hide.bs.tab",{relatedTarget:t[0]}),s=r.Event("show.bs.tab",{relatedTarget:o[0]});if(o.trigger(n),t.trigger(s),!s.isDefaultPrevented()&&!n.isDefaultPrevented()){var a=r(document).find(i);this.activate(t.closest("li"),e),this.activate(a,a.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:t[0]}),t.trigger({type:"shown.bs.tab",relatedTarget:o[0]})})}}},a.prototype.activate=function(t,e,i){var o=e.find("> .active"),n=i&&r.support.transition&&(o.length&&o.hasClass("fade")||!!e.find("> .fade").length);function s(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),n?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu").length&&t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),i&&i()}o.length&&n?o.one("bsTransitionEnd",s).emulateTransitionEnd(a.TRANSITION_DURATION):s(),o.removeClass("in")};var t=r.fn.tab;r.fn.tab=e,r.fn.tab.Constructor=a,r.fn.tab.noConflict=function(){return r.fn.tab=t,this};var i=function(t){t.preventDefault(),e.call(r(this),"show")};r(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery),function(l){"use strict";var h=function(t,e){this.options=l.extend({},h.DEFAULTS,e);var i=this.options.target===h.DEFAULTS.target?l(this.options.target):l(document).find(this.options.target);this.$target=i.on("scroll.bs.affix.data-api",l.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",l.proxy(this.checkPositionWithEventLoop,this)),this.$element=l(t),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};function i(o){return this.each(function(){var t=l(this),e=t.data("bs.affix"),i="object"==typeof o&&o;e||t.data("bs.affix",e=new h(this,i)),"string"==typeof o&&e[o]()})}h.VERSION="3.4.1",h.RESET="affix affix-top affix-bottom",h.DEFAULTS={offset:0,target:window},h.prototype.getState=function(t,e,i,o){var n=this.$target.scrollTop(),s=this.$element.offset(),a=this.$target.height();if(null!=i&&"top"==this.affixed)return n<i&&"top";if("bottom"==this.affixed)return null!=i?!(n+this.unpin<=s.top)&&"bottom":!(n+a<=t-o)&&"bottom";var r=null==this.affixed,l=r?n:s.top;return null!=i&&n<=i?"top":null!=o&&t-o<=l+(r?a:e)&&"bottom"},h.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(h.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},h.prototype.checkPositionWithEventLoop=function(){setTimeout(l.proxy(this.checkPosition,this),1)},h.prototype.checkPosition=function(){if(this.$element.is(":visible")){var t=this.$element.height(),e=this.options.offset,i=e.top,o=e.bottom,n=Math.max(l(document).height(),l(document.body).height());"object"!=typeof e&&(o=i=e),"function"==typeof i&&(i=e.top(this.$element)),"function"==typeof o&&(o=e.bottom(this.$element));var s=this.getState(n,t,i,o);if(this.affixed!=s){null!=this.unpin&&this.$element.css("top","");var a="affix"+(s?"-"+s:""),r=l.Event(a+".bs.affix");if(this.$element.trigger(r),r.isDefaultPrevented())return;this.affixed=s,this.unpin="bottom"==s?this.getPinnedOffset():null,this.$element.removeClass(h.RESET).addClass(a).trigger(a.replace("affix","affixed")+".bs.affix")}"bottom"==s&&this.$element.offset({top:n-t-o})}};var t=l.fn.affix;l.fn.affix=i,l.fn.affix.Constructor=h,l.fn.affix.noConflict=function(){return l.fn.affix=t,this},l(window).on("load",function(){l('[data-spy="affix"]').each(function(){var t=l(this),e=t.data();e.offset=e.offset||{},null!=e.offsetBottom&&(e.offset.bottom=e.offsetBottom),null!=e.offsetTop&&(e.offset.top=e.offsetTop),i.call(t,e)})})}(jQuery);
/*! jQuery Validation Plugin - v1.19.3 - 1/9/2021
 * https://jqueryvalidation.org/
 * Copyright (c) 2021 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.submitButton=b.currentTarget,a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.submitButton&&(c.settings.submitHandler||c.formSubmitted)&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),!(c.settings.submitHandler&&!c.settings.debug)||(e=c.settings.submitHandler.call(c,c.currentForm,b),d&&d.remove(),void 0!==e&&e)}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0],k="undefined"!=typeof this.attr("contenteditable")&&"false"!==this.attr("contenteditable");if(null!=j&&(!j.form&&k&&(j.form=this.closest("form")[0],j.name=this.attr("name")),null!=j.form)){if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(a,b){i[b]=f[b],delete f[b]}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g)),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}});var b=function(a){return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")};a.extend(a.expr.pseudos||a.expr[":"],{blank:function(c){return!b(""+a(c).val())},filled:function(c){var d=a(c).val();return null!==d&&!!b(""+d)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||a.inArray(c.keyCode,d)!==-1||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c="undefined"!=typeof a(this).attr("contenteditable")&&"false"!==a(this).attr("contenteditable");if(!this.form&&c&&(this.form=a(this).closest("form")[0],this.name=a(this).attr("name")),d===this.form){var e=a.data(this.form,"validator"),f="on"+b.type.replace(/^validate/,""),g=e.settings;g[f]&&!a(this).is(g.ignore)&&g[f].call(e,this,b)}}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.currentForm,e=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){e[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=g.check(e)&&h))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)void 0!==a[b]&&null!==a[b]&&a[b]!==!1&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").trigger("focus").trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name"),e="undefined"!=typeof a(this).attr("contenteditable")&&"false"!==a(this).attr("contenteditable");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),e&&(this.form=a(this).closest("form")[0],this.name=d),this.form===b.currentForm&&(!(d in c||!b.objectLength(a(this).rules()))&&(c[d]=!0,!0))})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type,g="undefined"!=typeof e.attr("contenteditable")&&"false"!==e.attr("contenteditable");return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=g?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f,g=a(b).rules(),h=a.map(g,function(a,b){return b}).length,i=!1,j=this.elementValue(b);"function"==typeof g.normalizer?f=g.normalizer:"function"==typeof this.settings.normalizer&&(f=this.settings.normalizer),f&&(j=f.call(b,j),delete g.normalizer);for(d in g){e={method:d,parameters:g[d]};try{if(c=a.validator.methods[d].call(this,j,b,e.parameters),"dependency-mismatch"===c&&1===h){i=!0;continue}if(i=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(k){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",k),k instanceof TypeError&&(k.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),k}}if(!i)return this.objectLength(g)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){"string"==typeof c&&(c={method:c});var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.submitButton&&a("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return c="string"==typeof c&&c||"remote",a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),""===d&&(d=!0),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0===e.param||e.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(a,d){b[a]="function"==typeof d&&"normalizer"!==a?d(c):d}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var a;b[this]&&(Array.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(a=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(a[0]),Number(a[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:void 0!==b&&null!==b&&b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a)},date:function(){var a=!1;return function(b,c){return a||(a=!0,this.settings.debug&&window.console&&console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")),this.optional(c)||!/Invalid|NaN/.test(new Date(b).toString())}}(),dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d>=c},maxlength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d<=c},rangelength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d>=c[0]&&d<=c[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e,f=a(c).attr("type"),g="Step attribute on input type "+f+" is not supported.",h=["text","number","range"],i=new RegExp("\\b"+f+"\\b"),j=f&&!i.test(h.join()),k=function(a){var b=(""+a).match(/(?:\.(\d+))?$/);return b&&b[1]?b[1].length:0},l=function(a){return Math.round(a*Math.pow(10,e))},m=!0;if(j)throw new Error(g);return e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),this.optional(c)||m},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var c,d={};return a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,c){var e=a.port;"abort"===a.mode&&(d[e]&&d[e].abort(),d[e]=c)}):(c=a.ajax,a.ajax=function(b){var e=("mode"in b?b:a.ajaxSettings).mode,f=("port"in b?b:a.ajaxSettings).port;return"abort"===e?(d[f]&&d[f].abort(),d[f]=c.apply(this,arguments),d[f]):c.apply(this,arguments)}),a});
var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var timeOut;
var searchId;
var isSafari = navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1;
var clearSearch = false;
var toastTimeout;

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
    $(".dropdown-menu #notify_header").on("click", function (e) {
        e.stopPropagation();
    });
   
    var notBackdrop =
        $('<div id="nav-backdrop" class="modal-backdrop" style="z-index: 50; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; color: #fff; opacity: 0; position: absolute"></div>');

    $("#upload-item-section, #notification-link, #account-profile").on("hidden.bs.dropdown", function () {
        parent.$("#nav-backdrop").hide();
    });

    notBackdrop.click(function () {
        notBackdrop.hide();
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
});

$(document).on("click", ".dropdown-backdrop", function () {
    parent.$("#nav-backdrop").hide();
});

$(document).on("click", "#notification-link, #account-profile, #upload-item-section", function () {
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


$(document).on("click", "#account-profile .dropdown-menu", function (e) {
    e.stopPropagation();
});

$(document).on("keyup", "textarea", function (event) {
    if (event.keyCode != 8 && event.keyCode != 46) {
        var max = $(this).attr("maxlength");
        if (max != undefined && $(this).val().length >= max) {
            $(this).val($(this).val().substring(0, max));
        }
    }
});

$(document).on("keyup", "textarea", function (event) {
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

function setClientLocaleCookie(name, exdays) {
    var value = {
        Locale: navigator.language,
        TimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays++);
    var cookie_value = escape(JSON.stringify(value)) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = name + "=" + cookie_value + ";path=/";
}

function isEmptyOrWhitespace(value) {
    return value.trim() === "";
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

function getFnObj(obj) {
    if (typeof obj === "function") return obj;
    if (typeof obj === "string" && window[obj])
        return obj;
};

function createWaitingPopup(element) {
    ej.popups.createSpinner({
        target: document.getElementById(element)
    });
}

function showWaitingPopup(element) {
    ej.popups.showSpinner(document.getElementById(element));
    $("#" + element).find(".e-spinner-pane").addClass("e-spinner-bg");
};

function hideWaitingPopup(element) {
    ej.popups.hideSpinner(document.getElementById(element));
    $("#" + element).find(".e-spinner-pane").removeClass("e-spinner-bg");
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
    document.getElementById("messageBox").ej2_instances[0].hide();
}

function onMessageDialogClose() {
    $("#messageBox").find(".message-content").text("");
    $(".message-box-btn-holder").html("");
    $(".message-box-close").html("");
}

function messageBox(messageIcon, messageHeader, messageText, type, successCallback, errorCallback, width, height, maxHeight) {
    $("#messageBox").find(".message-content").text("");
    $(".e-footer-content").html("");
    $(".message-box-close").html("");
    $("#messageBox").find(".e-dlg-header").html("<span class='su " + messageIcon + "'></span> <span class='modal-title' data-toggle='tooltip' data-placement='bottom' data-container='body' title='" + messageHeader + "'  >" + messageHeader + "</h2>");
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
        $(".e-footer-content").append(errorButton, successButton);
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
        $(".e-footer-content").append(successButton);
        $("#messageBox").on("keydown", function (event) {
            switch (event.keyCode) {
                case 13:
                case 27:
                    successButton.click();
            }
        });
    }

    $('[data-toggle="tooltip"]').tooltip();
    document.getElementById("messageBox").ej2_instances[0].show();
    $("#messageBox").focus();
    var sizeobj = document.getElementById("messageBox").ej2_instances[0];
    setTimeout(function () {
        if (width != undefined)
            sizeobj.width = width;
        if (window.innerWidth > 1040) {
            if (height == undefined)
                height = $("#messageBox").find(".modal-content").height() + 135 + "px";
        }
        sizeobj.height = height;
        if (maxHeight != undefined)
            sizeobj.setMaxHeight(maxHeight);
    }, 50);
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
    clearTimeout(toastTimeout);
    $('#success-alert').css("display", "none");
    $("#message-header").html(header);
    $("#message-content").html(content);
    $("#success-alert").css("display", "table");
    
    toastTimeout = setTimeout(function () {
        $('#success-alert').fadeOut();
    }, duration);
}
function WarningAlert(header, content, duration) {
    clearTimeout(toastTimeout);
    $('#warning-alert').css("display", "none");
    $("#warning-alert #message-header").html(header);
    $(" #warning-alert #message-content").html(content);
    $("#warning-alert").css("display", "table");
    
    if (duration != null && duration != "") {
        toastTimeout = setTimeout(function () {
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