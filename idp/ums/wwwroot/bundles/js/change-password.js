/*!
*  filename: ej.core.min.js
*  version : 14.4.0.15
*  Copyright Syncfusion Inc. 2001 - 2016. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
*/
(function(n){typeof define=="function"&&define.amd?define(["jquery"],n):n()})(function(){window.ej=window.Syncfusion=window.Syncfusion||{},function(n,t,i){"use strict";var o,u,f,e;t.version="14.4.0.15";t.consts={NamespaceJoin:"-"};t.TextAlign={Center:"center",Justify:"justify",Left:"left",Right:"right"};t.Orientation={Horizontal:"horizontal",Vertical:"vertical"};t.serverTimezoneOffset=0;t.persistStateVersion=null;Object.prototype.hasOwnProperty||(Object.prototype.hasOwnProperty=function(n,t){return n[t]!==i});String.format=function(){for(var t=arguments[0],n=0;n<arguments.length-1;n++)t=t.replace(new RegExp("\\{"+n+"\\}","gm"),arguments[n+1]);return t.replace(/\{[0-9]\}/g,"")};jQuery.uaMatch=function(n){n=n.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(n)||/(webkit)[ \/]([\w.]+)/.exec(n)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(n)||/(msie) ([\w.]+)/.exec(n)||n.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n)||[];return{browser:t[1]||"",version:t[2]||"0"}};t.defineClass=function(n,r,u,f){if(!n||!u)return i;for(var o=n.split("."),s=window,e=0;e<o.length-1;e++)t.isNullOrUndefined(s[o[e]])&&(s[o[e]]={}),s=s[o[e]];return(f||t.isNullOrUndefined(s[o[e]]))&&(r=typeof r=="function"?r:function(){},s[o[e]]=r,s[o[e]].prototype=u),s[o[e]]};t.util={getNameSpace:function(n){var i=n.toLowerCase().split(".");return i[0]==="ej"&&(i[0]="e"),i.join(t.consts.NamespaceJoin)},getObject:function(n,r){var u,e,f;if(!r)return i;for(u=r,e=n.split("."),f=0;f<e.length;f++){if(t.util.isNullOrUndefined(u))break;u=u[e[f]]}return u},createObject:function(n,r,u){for(var s=n.split("."),h=u||window,f=h,o,c=s.length,e=0;e<c;e++)o=s[e],e+1==c?f[o]=r===i?{}:r:t.isNullOrUndefined(f[o])&&(f[o]={}),f=f[o];return h},isNullOrUndefined:function(n){return n===i||n===null},print:function(i,r){var f=t.buildTag("div"),o=i.clone(),r,e,u;f.append(o);r||(r=window.open("","print","height=452,width=1024,tabbar=no"));r.document.write("<!DOCTYPE html>");e=n("head").find("link").add("style");t.browserInfo().name==="msie"?(u="",e.each(function(t,i){i.tagName=="LINK"&&n(i).attr("href",i.href);u+=i.outerHTML}),r.document.write("<html><head><\/head><body>"+u+f[0].innerHTML+"<\/body><\/html>")):(u="",r.document.write("<html><head>"),e.each(function(t,i){i.tagName=="LINK"&&n(i).attr("href",i.href);u+=i.outerHTML}),r.document.writeln(u+"<\/head><body>"),r.document.writeln(f[0].innerHTML+"<\/body><\/html>"));r.document.close();r.focus();setTimeout(function(){t.isNullOrUndefined(r.window)||(r.print(),setTimeout(function(){r.close()},1e3))},1e3)},ieClearRemover:function(t){var i=n(t).height();t.style.paddingTop=parseFloat(i/2)+"px";t.style.paddingBottom=parseFloat(i/2)+"px";t.style.height="1px";t.style.lineHeight="1px"},sendAjaxRequest:function(t){n.ajax({type:t.type,cache:t.cache,url:t.url,dataType:t.dataType,data:t.data,contentType:t.contentType,async:t.async,success:t.successHandler,error:t.errorHandler,beforeSend:t.beforeSendHandler,complete:t.completeHandler})},buildTag:function(t,r,u,f){var s=/^[a-z]*[0-9a-z]+/ig.exec(t)[0],e=/#([_a-z]+[-_0-9a-z]+)/ig.exec(t),o;return e=e?e[e.length-1]:i,o=/\.([a-z]+[-_0-9a-z ]+)/ig.exec(t),o=o?o[o.length-1]:i,n(document.createElement(s)).attr(e?{id:e}:{}).addClass(o||"").css(u||{}).attr(f||{}).html(r||"")},_preventDefaultException:function(n,t){if(n)for(var i in t)if(t[i].test(n[i]))return!0;return!1},getMaxZindex:function(){var t=1;return t=Math.max.apply(null,n.map(n("body *"),function(t){if(n(t).css("position")=="absolute"||n(t).css("position")=="fixed")return parseInt(n(t).css("z-index"))||1})),(t==i||t==null)&&(t=1),t},blockDefaultActions:function(n){n.cancelBubble=!0;n.returnValue=!1;n.preventDefault&&n.preventDefault();n.stopPropagation&&n.stopPropagation()},getDimension:function(t,i){var e,u=n(t).parents().andSelf().filter(":hidden"),r,f;return u&&(r={visibility:"hidden",display:"block"},f=[],u.each(function(){var t={};for(var n in r)t[n]=this.style[n],this.style[n]=r[n];f.push(t)}),e=/(outer)/g.test(i)?n(t)[i](!0):n(t)[i](),u.each(function(n){var i=f[n];for(var t in r)this.style[t]=i[t]})),e},transitionEndEvent:function(){return{"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"otransitionend",ms:"MSTransitionEnd"}[t.userAgent()]},animationEndEvent:function(){return{"":"animationend",webkit:"webkitAnimationEnd",Moz:"animationend",O:"webkitAnimationEnd",ms:"animationend"}[t.userAgent()]},startEvent:function(){return t.isTouchDevice()||n.support.hasPointer?"touchstart":"mousedown"},endEvent:function(){return t.isTouchDevice()||n.support.hasPointer?"touchend":"mouseup"},moveEvent:function(){return t.isTouchDevice()||n.support.hasPointer?n.support.hasPointer&&!t.isMobile()?"ejtouchmove":"touchmove":"mousemove"},cancelEvent:function(){return t.isTouchDevice()||n.support.hasPointer?"touchcancel":"mousecancel"},tapEvent:function(){return t.isTouchDevice()||n.support.hasPointer?"tap":"click"},tapHoldEvent:function(){return t.isTouchDevice()||n.support.hasPointer?"taphold":"click"},isDevice:function(){return t.getBooleanVal(n("head"),"data-ej-forceset",!1)?t.getBooleanVal(n("head"),"data-ej-device",this._device()):this._device()},isPortrait:function(){var n=document.documentElement;return n&&n.clientWidth/n.clientHeight<1.1},isLowerResolution:function(){return window.innerWidth<=640&&t.isPortrait()&&t.isDevice()||window.innerWidth<=800&&!t.isDevice()||window.innerWidth<=800&&!t.isPortrait()&&t.isWindows()&&t.isDevice()||t.isMobile()},isIOSWebView:function(){return/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)},isAndroidWebView:function(){return!(typeof Android=="undefined")},isWindowsWebView:function(){return location.href.indexOf("x-wmapp")!=-1},_device:function(){return/Android|BlackBerry|iPhone|iPad|iPod|IEMobile|kindle|windows\sce|palm|smartphone|iemobile|mobile|pad|xoom|sch-i800|playbook/i.test(navigator.userAgent.toLowerCase())},isMobile:function(){return/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase())&&/mobile/i.test(navigator.userAgent.toLowerCase())||t.getBooleanVal(n("head"),"data-ej-mobile",!1)===!0},isTablet:function(){return/ipad|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase())||t.getBooleanVal(n("head"),"data-ej-tablet",!1)===!0||!t.isMobile()&&t.isDevice()},isTouchDevice:function(){return("ontouchstart"in window||window.navigator.msPointerEnabled&&t.isMobile())&&this.isDevice()},getClearString:function(t){return n.trim(t.replace(/\s+/g," ").replace(/(\r\n|\n|\r)/gm,"").replace(new RegExp(">[\n\t ]+<","g"),"><"))},getBooleanVal:function(t,i,r){var u=n(t).attr(i);return u!=null?u.toLowerCase()=="true":r},_getSkewClass:function(n,t,i){var h=n.width(),c=n.height(),f=n.offset().left,e=n.offset().left+h,o=n.offset().top,s=n.offset().top+c,r=h*.3,u=c*.3;return t<f+r&&i<o+u?"e-m-skew-topleft":t>e-r&&i<o+u?"e-m-skew-topright":t>e-r&&i>s-u?"e-m-skew-bottomright":t<f+r&&i>s-u?"e-m-skew-bottomleft":t>f+r&&i<o+u&&t<e-r?"e-m-skew-top":t<f+r?"e-m-skew-left":t>e-r?"e-m-skew-right":i>s-u?"e-m-skew-bottom":"e-m-skew-center"},_removeSkewClass:function(t){n(t).removeClass("e-m-skew-top e-m-skew-bottom e-m-skew-left e-m-skew-right e-m-skew-topleft e-m-skew-topright e-m-skew-bottomleft e-m-skew-bottomright e-m-skew-center e-skew-top e-skew-bottom e-skew-left e-skew-right e-skew-topleft e-skew-topright e-skew-bottomleft e-skew-bottomright e-skew-center")},_getObjectKeys:function(n){var t,i=[];if(n=Object.prototype.toString.call(n)===Object.prototype.toString()?n:{},!Object.keys){for(t in n)n.hasOwnProperty(t)&&i.push(t);return i}if(Object.keys)return Object.keys(n)},_touchStartPoints:function(n,t){if(n){var i=n.touches?n.touches[0]:n;t._distX=0;t._distY=0;t._moved=!1;t._pointX=i.pageX;t._pointY=i.pageY}},_isTouchMoved:function(n,t){if(n){var i=n.touches?n.touches[0]:n,f=i.pageX-t._pointX,e=i.pageY-t._pointY,o=Date.now(),r,u;return t._pointX=i.pageX,t._pointY=i.pageY,t._distX+=f,t._distY+=e,r=Math.abs(t._distX),u=Math.abs(t._distY),!(r<5&&u<5)}},listenEvents:function(n,i,r,u,f,e){for(var o=0;o<n.length;o++)t.listenTouchEvent(n[o],i[o],r[o],u,f,e)},listenTouchEvent:function(i,r,u,f,e,o){for(var s,h=f?"removeEventListener":"addEventListener",a=f?"off":"on",l=n(i),c=0;c<l.length;c++){s=l[c];switch(r){case"touchstart":t._bindEvent(s,h,r,u,"mousedown","MSPointerDown","pointerdown",o);break;case"touchmove":t._bindEvent(s,h,r,u,"mousemove","MSPointerMove","pointermove",o);break;case"touchend":t._bindEvent(s,h,r,u,"mouseup","MSPointerUp","pointerup",o);break;case"touchcancel":t._bindEvent(s,h,r,u,"mousecancel","MSPointerCancel","pointercancel",o);break;case"tap":case"taphold":case"ejtouchmove":case"click":n(s)[a](r,u);break;default:t.browserInfo().name=="msie"&&t.browserInfo().version<9?e._on(n(s),r,u):s[h](r,u,!0)}}},_bindEvent:function(t,i,r,u,f,e,o){n.support.hasPointer?t[i](window.navigator.pointerEnabled?o:e,u,!0):t[i](r,u,!0)},_browser:function(){return/webkit/i.test(navigator.appVersion)?"webkit":/firefox/i.test(navigator.userAgent)?"Moz":/trident/i.test(navigator.userAgent)?"ms":"opera"in window?"O":""},styles:document.createElement("div").style,userAgent:function(){for(var i="webkitT,t,MozT,msT,OT".split(","),r,n=0,u=i.length;n<u;n++)if(r=i[n]+"ransform",r in t.styles)return i[n].substr(0,i[n].length-1);return!1},addPrefix:function(n){return t.userAgent()===""?n:(n=n.charAt(0).toUpperCase()+n.substr(1),t.userAgent()+n)},destroyWidgets:function(t){var i=n(t).find("[data-role *= ejm]");i.each(function(t,i){var r=n(i),u=r.data("ejWidgets");u&&r[u]("destroy")})},getAttrVal:function(t,i,r){var u=n(t).attr(i);return u!=null?u:r},getOffset:function(t){var i={},u=t.offset()||{left:0,top:0},r;return n.extend(!0,i,u),n("body").css("position")!="static"&&(r=n("body").offset(),i.left-=r.left,i.top-=r.top),i},getZindexPartial:function(i,r){var e,f,u;if(!t.isNullOrUndefined(i)&&i.length>0)return e=i.parents(),f=n("body").children(),!t.isNullOrUndefined(i)&&i.length>0&&f.splice(f.index(r),1),n(f).each(function(n,t){e.push(t)}),u=Math.max.apply(u,n.map(e,function(t){if(n(t).css("position")!="static")return parseInt(n(t).css("z-index"))||1})),!u||u<1e4?u=1e4:u+=1,u},isValidAttr:function(t,i){var t=n(t)[0],r;return typeof t[i]!="undefined"?!0:(r=!1,n.each(t,function(n){if(n.toLowerCase()==i.toLowerCase())return r=!0,!1}),r)}};n.extend(t,t.util);t.widgetBase={droppables:{"default":[]},resizables:{"default":[]},_renderEjTemplate:function(i,r,u,f){var e=null;return((typeof i=="object"||i.startsWith("#")||i.startsWith("."))&&(e=n(i).attr("type")),e&&(e=e.toLowerCase(),t.template[e]))?t.template[e](this,i,r,u,f):t.template.render(this,i,r,u,f)},destroy:function(){var u,r,f,i;if(!this._trigger("destroy")){this.model.enablePersistence&&(this.persistState(),n(window).off("unload",this._persistHandler));try{this._destroy()}catch(e){}for(u=this.element.data("ejWidgets")||[],i=0;i<u.length;i++)u[i]==this.pluginName&&u.splice(i,1);for(u.length||this.element.removeData("ejWidgets");this._events;){if(r=this._events.pop(),f=[],!r)break;for(i=0;i<r[1].length;i++)n.isPlainObject(r[1][i])||f.push(r[1][i]);n.fn.off.apply(r[0],f)}this._events=null;this.element.removeClass(t.util.getNameSpace(this.sfType)).removeClass("e-js").removeData(this.pluginName);this.element=null;this.model=null}},_on:function(i){this._events||(this._events=[]);for(var r=[].splice.call(arguments,1,arguments.length-1),u={},f=r.length;u&&typeof u!="function";)u=r[--f];return r[f]=t.proxy(r[f],this),this._events.push([i,r,u,r[f]]),n.fn.on.apply(i,r),this},_off:function(t,i,r,u){var e=this._events,s,h,o,f,c;if(!e||!e.length)return this;for(typeof r=="function"&&(s=u,u=r,r=s),h=i.match(/\S+/g)||[""],o=0;o<e.length;o++)if(f=e[o],c=f[0].length&&(!u||f[2]===u)&&(f[1][0]===i||h[0])&&(!r||f[1][1]===r)&&n.inArray(t[0],f[0])>-1,c){n.fn.off.apply(t,u?[i,r,f[3]]:[i,r]);e.splice(o,1);break}return this},_trigger:function(i,r){var f=null,e,u,s={},o,h;return(n.extend(s,r),i in this.model&&(f=this.model[i]),f&&(typeof f=="string"&&(f=t.util.getObject(f,window)),n.isFunction(f)&&(u=t.event(i,this.model,r),e=f.call(this,u),o=this.model._applyScope,o&&o.call(),r&&n.extend(r,u),u.cancel||!t.isNullOrUndefined(e))))?e===!1||u.cancel:(h=Boolean(r),r=r||{},r.originalEventType=i,r.type=this.pluginName+i,u=n.Event(r.type,t.event(r.type,this.model,r)),this.element.trigger(u),h&&n.extend(r,u),t.isOnWebForms&&u.cancel==!1&&this.model.serverEvents&&this.model.serverEvents.length&&t.raiseWebFormsServerEvents(i,r,s),u.cancel)},setModel:function(t,i){var r,f,e,u;if(!this._trigger("modelChange",{changes:t})){for(r in t){if(!i){if(this.model[r]===t[r]){delete t[r];continue}if(n.isPlainObject(t[r])&&(o(this.model[r],t[r]),n.isEmptyObject(t[r]))){delete t[r];continue}}if(this.dataTypes&&(f=this._isValidModelValue(r,this.dataTypes,t),f!==!0))throw"setModel - Invalid input for property :"+r+" - "+f;this.model.notifyOnEachPropertyChanges&&this.model[r]!==t[r]&&(e={oldValue:this.model[r],newValue:t[r]},t[r]=this._trigger(r+"Change",e)?this.model[r]:e.newValue)}n.isEmptyObject(t)||(this._setFirst?(u=t.dataSource,u&&delete t.dataSource,n.extend(!0,this.model,t),u&&(this.model.dataSource=u instanceof Array?u.slice():u,t.dataSource=this.model.dataSource),this._setModel&&this._setModel(t)):this._setModel&&this._setModel(t)===!1||n.extend(!0,this.model,t),"enablePersistence"in t&&this._setState(t.enablePersistence))}},option:function(r,u,f){if(!r)return this.model;if(n.isPlainObject(r))return this.setModel(r,f);if(typeof r=="string"){r=r.replace(/^model\./,"");var e=t.getObject(r,this.model);if(u===i&&!f)return e;if(r==="enablePersistence")return this._setState(u);if(f&&u===t.extensions.modelGUID)return this._setModel(t.createObject(r,t.getObject(r,this.model),{}));if(f||t.getObject(r,this.model)!==u)return this.setModel(t.createObject(r,u,{}),f)}return i},_isValidModelValue:function(n,t,i){var r=t[n],u=i[n],f,e,o;if(!r)return!0;if(typeof r=="string"){if(r=="enum"&&(i[n]=u?u.toString().toLowerCase():u,r="string"),r==="array"){if(Object.prototype.toString.call(u)==="[object Array]")return!0}else if(r==="data"||r==="parent"||typeof u===r)return!0;return"Expected type - "+r}if(u instanceof Array){for(e=0;e<u.length;e++)if(f=this._isValidModelValue(n,t,u[e]),f!==!0)return" ["+e+"] - "+f;return!0}for(o in u)if(f=this._isValidModelValue(o,r,u),f!==!0)return o+" : "+f;return!0},_returnFn:function(n,t){t.indexOf(".")!=-1?this._returnFn(n[t.split(".")[0]],t.split(".").slice(1).join(".")):n[t]=n[t].call(n.propName)},stringify:function(n){for(var u,r=this.observables,i=0;i<r.length;i++)u=t.getObject(r[i],n),t.isNullOrUndefined(u)||typeof u!="function"||this._returnFn(n,r[i]);return JSON.stringify(n)},_setState:function(i){if(i===!0){this._persistHandler=t.proxy(this.persistState,this);n(window).on("unload",this._persistHandler)}else this.deleteState(),n(window).off("unload",this._persistHandler)},_removeProp:function(n,i){t.isNullOrUndefined(n)||(i.indexOf(".")!=-1?this._removeProp(n[i.split(".")[0]],i.split(".").slice(1).join(".")):delete n[i])},persistState:function(){var n,i;if(this._ignoreOnPersist){for(n=r({},this.model),i=0;i<this._ignoreOnPersist.length;i++)this._removeProp(n,this._ignoreOnPersist[i]);n.ignoreOnPersist=this._ignoreOnPersist}else if(this._addToPersist){for(n={},i=0;i<this._addToPersist.length;i++)t.createObject(this._addToPersist[i],t.getObject(this._addToPersist[i],this.model),n);n.addToPersist=this._addToPersist}else n=r({},this.model);this._persistState&&(n.customPersists={},this._persistState(n.customPersists));window.localStorage?(t.isNullOrUndefined(t.persistStateVersion)||window.localStorage.getItem("persistKey")!=null||window.localStorage.setItem("persistKey",t.persistStateVersion),window.localStorage.setItem("$ej$"+this.pluginName+this._id,JSON.stringify(n))):document.cookie&&(t.isNullOrUndefined(t.persistStateVersion)||t.cookie.get("persistKey")!=null||t.cookie.set("persistKey",t.persistStateVersion),t.cookie.set("$ej$"+this.pluginName+this._id,n))},deleteState:function(){window.localStorage?window.localStorage.removeItem("$ej$"+this.pluginName+this._id):document.cookie&&t.cookie.set("$ej$"+this.pluginName+this._id,model,new Date)},restoreState:function(i){var f=null,r,u;if(window.localStorage?f=window.localStorage.getItem("$ej$"+this.pluginName+this._id):document.cookie&&(f=t.cookie.get("$ej$"+this.pluginName+this._id)),f&&(r=JSON.parse(f),this._restoreState&&(this._restoreState(r.customPersists),delete r.customPersists),t.isNullOrUndefined(r)===!1&&(t.isNullOrUndefined(r.ignoreOnPersist)?t.isNullOrUndefined(r.addToPersist)||(this._addToPersist=r.addToPersist,delete r.addToPersist):(this._ignoreOnPersist=r.ignoreOnPersist,delete r.ignoreOnPersist))),t.isNullOrUndefined(r)||t.isNullOrUndefined(this._ignoreOnPersist))this.model=n.extend(!0,this.model,r);else{for(u in this._ignoreOnPersist)this._ignoreOnPersist[u].indexOf(".")!==-1?t.createObject(this._ignoreOnPersist[u],t.getObject(this._ignoreOnPersist[u],this.model),r):r[this._ignoreOnPersist[u]]=this.model[this._ignoreOnPersist[u]];this.model=r}!i&&f&&this._setModel&&this._setModel(this.model)},ignoreOnPersist:function(n){var r=[],t,u;if(typeof n=="object"?r=n:typeof n=="string"&&r.push(n),this._addToPersist===i)for(this._ignoreOnPersist=this._ignoreOnPersist||[],t=0;t<r.length;t++)this._ignoreOnPersist.push(r[t]);else for(t=0;t<r.length;t++)u=this._addToPersist.indexOf(r[t]),this._addToPersist.splice(u,1)},addToPersist:function(t){var u=[],f,r;if(typeof t=="object"?u=t:typeof t=="string"&&u.push(t),this._addToPersist===i)for(this._ignoreOnPersist=this._ignoreOnPersist||[],r=0;r<u.length;r++)f=this._ignoreOnPersist.indexOf(u[r]),this._ignoreOnPersist.splice(f,1);else for(r=0;r<u.length;r++)n.inArray(u[r],this._addToPersist)===-1&&this._addToPersist.push(u[r])},formatting:function(i,r,u){var f,l,h,c,a,v,s,e,y;if(i=i.replace(/%280/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">"),u=t.preferredCulture(u)?u:"en-US",f=i,l=i.split("{0:"),a=i.split("}"),h=l[0],c=a[1],typeof r=="string"&&n.isNumeric(r)&&(r=Number(r)),i.indexOf("{0:")!=-1)return v=new RegExp("\\{0(:([^\\}]+))?\\}","gm"),s=v.exec(i),s!=null&&r!=null?h!=null&&c!=null?h+t.format(r,s[2],u)+c:t.format(r,s[2],u):r!=null?r:"";if(f.startsWith("{")&&!f.startsWith("{0:")){var o=f.split(""),r=(r||"")+"",p=r.split(""),w=/[0aA\*CN<>\?]/gm;for(e=0,y=0;e<o.length;e++)o[e]=w.test(o[e])?"{"+y+++"}":o[e];return String.format.apply(String,[o.join("")].concat(p)).replace("{","").replace("}","")}return this.data!=null&&this.data.Value==null?(n.each(this.data,function(n,t){f=f.replace(new RegExp("\\{"+n+"\\}","gm"),t)}),f):this.data.Value}};t.WidgetBase=function(){};o=function(t,i){for(var r in t)t[r]===i[r]&&delete i[r],n.isPlainObject(i[r])&&n.isPlainObject(t[r])&&o(t[r],i[r])};t.widget=function(f,o,h){var a,l,v;if(typeof f=="object"){h=o;for(a in f)l=f[a],l instanceof Array&&(h._rootCSS=l[1],l=l[0]),t.widget(a,l,h),f[a]instanceof Array&&(h._rootCSS="");return}v=h._rootCSS||t.getNameSpace(o);h=t.defineClass(o,function(i,e){var y,p,w,b,c,g,k,d,nt,l,a;if(this.sfType=o,this.pluginName=f,this.instance=s,t.isNullOrUndefined(this._setFirst)&&(this._setFirst=!0),this["ob.values"]={},n.extend(this,t.widgetBase),this.dataTypes)for(y in e)if(p=this._isValidModelValue(y,this.dataTypes,e),p!==!0)throw"setModel - Invalid input for property :"+y+" - "+p;for(w=i.data("ejWidgets")||[],w.push(f),i.data("ejWidgets",w),c=0;t.widget.observables&&this.observables&&c<this.observables.length;c++)b=t.getObject(this.observables[c],e),b&&t.createObject(this.observables[c],t.widget.observables.register(b,this.observables[c],this,i),e);if(this.element=i.jquery?i:n(i),this.model=r(!0,{},h.prototype.defaults,e),this.model.keyConfigs=r(this.keyConfigs),this.element.addClass(v+" e-js").data(f,this),this._id=i[0].id,this.element.attr("tabIndex")||this.element.attr("tabIndex",""),this.model.enablePersistence){if(window.localStorage&&!t.isNullOrUndefined(t.persistStateVersion)&&window.localStorage.getItem("persistKey")!=t.persistStateVersion)for(c in window.localStorage)c.indexOf("$ej$")!=-1&&window.localStorage.removeItem(c);else if(document.cookie&&!t.isNullOrUndefined(t.persistStateVersion)&&t.cookie.get("persistKey")!=t.persistStateVersion){g=document.cookie.split(/; */);for(k in g)k.indexOf("$ej$")!=-1&&t.cookie.set(k.split("=")[0],model,new Date)}this._persistHandler=t.proxy(this.persistState,this);n(window).on("unload",this._persistHandler);this.restoreState(!0)}if(this._init(e),typeof this.model.keyConfigs=="object"&&!(this.model.keyConfigs instanceof Array)){d=!1;this.model.keyConfigs.focus&&this.element.attr("accesskey",this.model.keyConfigs.focus);for(nt in this.model.keyConfigs)if(nt!=="focus"){d=!0;break}d&&this._keyPressed&&(l=i,a="keydown",this.keySettings&&(l=this.keySettings.getElement?this.keySettings.getElement()||l:l,a=this.keySettings.event||a),this._on(l,a,function(n){if(this.model.keyConfigs){var t=u.getActionFromCode(this.model.keyConfigs,n.which,n.ctrlKey,n.shiftKey,n.altKey),i={code:n.which,ctrl:n.ctrlKey,alt:n.altKey,shift:n.shiftKey};t&&this._keyPressed(t,n.target,i,n)===!1&&n.preventDefault()}}))}this._trigger("create")},h);n.fn[f]=function(r){for(var w,p=r,u,y=0;y<this.length;y++){var s=n(this[y]),l=s.data(f),b=l&&s.hasClass(v),a=null;if(this.length>0&&n.isPlainObject(p)&&(r=t.copyObject({},p)),!b){h.prototype._requiresID!==!0||n(this[y]).attr("id")||s.attr("id",c("ejControl_"));r&&typeof r!="object"?e(f+": methods/properties can be accessed only after plugin creation"):(h.prototype.defaults&&!t.isNullOrUndefined(t.setCulture)&&"locale"in h.prototype.defaults&&f!="ejChart"&&(!r||"locale"in r?t.isNullOrUndefined(r)&&(r={},r.locale=t.setCulture().name):r.locale=t.setCulture().name),new h(s,r));continue}if(r)if(u=[].slice.call(arguments,1),this.length>0&&u[0]&&p==="option"&&n.isPlainObject(u[0])&&(u[0]=t.copyObject({},u[0])),n.isPlainObject(r))l.setModel(r);else if((r.indexOf("_")===0||t.isNullOrUndefined(a=t.getObject(r,l)))&&r.indexOf("model.")!==0)e(o+": function/property - "+r+" does not exist");else{if(!a||!n.isFunction(a)){if(arguments.length==1)return a;l.option(r,arguments[1]);continue}if(w=a.apply(l,u),w!==i)return w}}return f.indexOf("ejm")!=-1&&t.widget.registerInstance(s,f,o,h.prototype),this};t.widget.register(f,o,h.prototype)};n.extend(t.widget,function(){var n={},i=[],r=function(i,r,u){t.isNullOrUndefined(n[i])||e("ej.widget : The widget named "+i+" is trying to register twice.");n[i]={name:i,className:r,proto:u};t.widget.extensions&&t.widget.extensions.registerWidget(i)},u=function(n,t,r,u){i.push({element:n,pluginName:t,className:r,proto:u})};return{register:r,registerInstance:u,registeredWidgets:n,registeredInstances:i}}());t.widget.destroyAll=function(n){var u,r,t,i;if(n&&n.length)for(u=0;u<n.length;u++)if(r=n.eq(u).data(),t=r.ejWidgets,t&&t.length)for(i=0;i<t.length;i++)r[t[i]]&&r[t[i]].destroy&&r[t[i]].destroy()};t.cookie={get:function(n){var t=RegExp(n+"=([^;]+)").exec(document.cookie);return t&&t.length>1?t[1]:i},set:function(n,t,i){typeof t=="object"&&(t=JSON.stringify(t));t=escape(t)+(i==null?"":"; expires="+i.toUTCString());document.cookie=n+"="+t}};u={getActionFromCode:function(n,t,i,r,f){var s,o,e;i=i||!1;r=r||!1;f=f||!1;for(s in n)if(s!=="focus")for(o=u.getKeyObject(n[s]),e=0;e<o.length;e++)if(t===o[e].code&&i==o[e].isCtrl&&r==o[e].isShift&&f==o[e].isAlt)return s;return null},getKeyObject:function(t){for(var f,o,e,s={isCtrl:!1,isShift:!1,isAlt:!1},c=n.extend(!0,{},s),r=t.split(","),h=[],i=0;i<r.length;i++){if(f=null,r[i].indexOf("+")!=-1)for(o=r[i].split("+"),e=0;e<o.length;e++)f=u.getResult(n.trim(o[e]),s);else f=u.getResult(n.trim(r[i]),n.extend(!0,{},c));h.push(f)}return h},getResult:function(n,t){return n==="ctrl"?t.isCtrl=!0:n==="shift"?t.isShift=!0:n==="alt"?t.isAlt=!0:t.code=parseInt(n,10),t}};t.getScrollableParents=function(t){return n(t).parentsUntil("html").filter(function(){return n(this).css("overflow")!="visible"}).add(n(window))};t.browserInfo=function(){var i={},r=[],e={opera:/(opera|opr)(?:.*version|)[ \/]([\w.]+)/i,edge:/(edge)(?:.*version|)[ \/]([\w.]+)/i,webkit:/(chrome)[ \/]([\w.]+)/i,safari:/(webkit)[ \/]([\w.]+)/i,msie:/(msie|trident) ([\w.]+)/i,mozilla:/(mozilla)(?:.*? rv:([\w.]+)|)/i},o,s,f,u;for(o in e)if(e.hasOwnProperty(o)&&(r=navigator.userAgent.match(e[o]),r)){if(i.name=r[1].toLowerCase()=="opr"?"opera":r[1].toLowerCase(),i.version=r[2],i.culture={},i.culture.name=i.culture.language=navigator.language||navigator.userLanguage,typeof t.globalize!="undefined"){for(s=t.preferredCulture().name,f=navigator.language||navigator.userLanguage?t.preferredCulture(navigator.language||navigator.userLanguage):t.preferredCulture("en-US"),u=0;navigator.languages&&u<navigator.languages.length;u++)if(f=t.preferredCulture(navigator.languages[u]),f.language==navigator.languages[u])break;t.preferredCulture(s);n.extend(!0,i.culture,f)}!navigator.userAgent.match(/Trident\/7\./)||(i.name="msie");break}return i.isMSPointerEnabled=i.name=="msie"&&i.version>9&&window.navigator.msPointerEnabled,i.pointerEnabled=window.navigator.pointerEnabled,i};t.eventType={mouseDown:"mousedown touchstart",mouseMove:"mousemove touchmove",mouseUp:"mouseup touchend",mouseLeave:"mouseleave touchcancel",click:"click touchend"};t.event=function(t,i,r){return n.extend(r||{},{type:t,model:i,cancel:!1})};t.proxy=function(n,t,i){return!n||typeof n!="function"?null:"on"in n&&t?i?n.on(t,i):n.on(t):function(){var r=i?[i]:[];return r.push.apply(r,arguments),n.apply(t||this,r)}};t.hasStyle=function(n){var r=document.documentElement.style,i,t;if(n in r)return!0;for(i=["ms","Moz","Webkit","O","Khtml"],n=n[0].toUpperCase()+n.slice(1),t=0;t<i.length;t++)if(i[t]+n in r)return!0;return!1};Array.prototype.indexOf=Array.prototype.indexOf||function(n){var i=this.length,t;if(i===0)return-1;for(t=0;t<i;t++)if(t in this&&this[t]===n)return t;return-1};String.prototype.startsWith=String.prototype.startsWith||function(n){return this.slice(0,n.length)===n};var r=t.copyObject=function(n,u){var h=2,c,f,s,o,e,l;for(typeof n!="boolean"&&(h=1),s=[].slice.call(arguments,h),h===1&&(u=n,n=i),o=0;o<s.length;o++)for(e in s[o])if(c=u[e],f=s[o][e],f!==i&&c!==f&&s[o]!==f&&u!==f)if(f instanceof Array)if(o===0&&n)for(u[e]=[],l=0;l<f.length;l++)r(!0,u[e],f);else u[e]=f.slice();else t.isPlainObject(f)?(u[e]=c||{},n?r(n,u[e],f):r(u[e],f)):u[e]=f;return u},s=function(){return this},h=0,c=function(n){return n+h++};t.template={};t.template.render=t.template["text/x-jsrender"]=function(t,i,r,u,f){i.slice(0,1)!=="#"&&(i=["<div>",i,"<\/div>"].join(""));var e={prop:f,index:u};return n(i).render(r,e)};t.isPlainObject=function(n){if(!n||t.DataManager!==i&&n instanceof t.DataManager||typeof n!="object"||n.nodeType||jQuery.isWindow(n))return!1;try{if(n.constructor&&!n.constructor.prototype.hasOwnProperty("isPrototypeOf"))return!1}catch(f){return!1}var r,u=t.support.isOwnLast;for(r in n)if(u)break;return r===i||n.hasOwnProperty(r)};f=!1;t.util.valueFunction=function(n){return function(r,u){var e=t.getObject(n,this.model);if(f===!1&&(f=t.getObject("observables.getValue",t.widget)),r===i)return t.isNullOrUndefined(f)?typeof e=="function"?e.call(this):e:f(e,u);typeof e=="function"?(this["ob.values"][n]=r,e.call(this,r)):t.createObject(n,r,this.model)}};t.util.getVal=function(n){return typeof n=="function"?n():n};t.support={isOwnLast:function(){var n=function(){this.a=1},t;n.prototype.b=1;for(t in new n)return t==="b"}(),outerHTML:function(){return document.createElement("div").outerHTML!==i}()};e=t.throwError=function(n){try{throw new Error(n);}catch(t){throw t.message+"\n"+t.stack;}};t.getRandomValue=function(n,r){var u,f;return n===i||r===i?t.throwError("Min and Max values are required for generating a random number"):("crypto"in window&&"getRandomValues"in crypto?(f=new Uint16Array(1),window.crypto.getRandomValues(f),u=f[0]%(r-n)+n):u=Math.random()*(r-n)+n,u|0)};t.extensions={};t.extensions.modelGUID="{0B1051BA-1CCB-42C2-A3B5-635389B92A50}"}(window.jQuery,window.Syncfusion),function(){$.fn.addEleAttrs=function(n){var t=$(this);$.each(n,function(n,i){i&&i.specified&&t.attr(i.name,i.value)})};$.fn.removeEleAttrs=function(n){return this.each(function(){var t=$(this),i=$(this.attributes).clone();$.each(i,function(i,r){r&&r.specified&&n.test(r.name)&&t.removeAttr(r.name)})})};$.fn.attrNotStartsWith=function(n){var u=this,r=[],t;for(this.each(function(){t=$(this.attributes).clone()}),i=0;i<t.length;i++)if(t[i]&&t[i].specified&&n.test(t[i].name))continue;else r.push(t[i]);return r};$.fn.removeEleEmptyAttrs=function(){return this.each(function(){var n=$(this),t=$(this.attributes).clone();$.each(t,function(t,i){i&&i.specified&&i.value===""&&n.removeAttr(i.name)})})};$.extend($.support,{has3d:ej.addPrefix("perspective")in ej.styles,hasTouch:"ontouchstart"in window,hasPointer:navigator.msPointerEnabled,hasTransform:ej.userAgent()!==!1,pushstate:"pushState"in history&&"replaceState"in history,hasTransition:ej.addPrefix("transition")in ej.styles});$.extend($.expr[":"],{attrNotStartsWith:function(n,t,i){for(var u=n.attributes,r=0;r<u.length;r++)if(u[r].nodeName.indexOf(i[3])===0)return!1;return!0}});var n=$.fn.andSelf||$.fn.addBack;$.fn.andSelf=$.fn.addBack=function(){return n.apply(this,arguments)}}()});

/*!
*  filename: ej.waitingpopup.min.js
*  version : 14.4.0.15
*  Copyright Syncfusion Inc. 2001 - 2016. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
*/
(function(n){typeof define=="function"&&define.amd?define(["./../common/ej.core.min"],n):n()})(function(){(function(n,t){t.widget("ejWaitingPopup","ej.WaitingPopup",{element:null,model:null,validTags:["div","span"],_setFirst:!1,_rootCSS:"e-waitingpopup",defaults:{showOnInit:!1,target:null,appendTo:null,showImage:!0,htmlAttributes:{},cssClass:"",text:null,template:null,create:null,destroy:null},dataTypes:{showOnInit:"boolean",showImage:"boolean",cssClass:"string"},_isTargetVisible:function(){return this.element.css("display")!="none"},show:function(){this._isTargetVisible()&&(this._refreshPanel(),this.maindiv.css("display","block"),this.model.showOnInit=!0)},hide:function(){this.maindiv.css("display","none");this.model.showOnInit=!1},refresh:function(){this._isTargetVisible()&&this._refreshPanel()},_setText:function(n){n?this.popupText?this.popupText.html(n):(this._generateTextTag(n),this._setContentPosition()):this.popupText&&(this.popupText.remove(),this.popupText=null)},_showImage:function(n){n?(this.popupImage=t.buildTag("span.e-image"),this.popupText?this.popupImage.insertBefore(this.popupText):this.maindiv.append(this.popupImage)):this.popupImage&&(this.popupImage.remove(),this.popupImage=null)},_setTemplate:function(){var i=this.model.template;typeof i=="string"&&(i=n(i));this.templateObj=typeof i=="object"&&typeof i.css=="function"?i:t.buildTag("div","",{"text-align":"center"}).append(i);this.templateObj.css({visibility:"visible",display:"block"});this.maindiv.append(this.templateObj)},_setTheme:function(n){this.maindiv.removeClass(this.model.cssClass).addClass(n)},_init:function(){this._initialize();this._render();this._wireEvents()},_wireEvents:function(){n(window).on("resize",n.proxy(this._resizeHandler,this))},_unwireEvents:function(){n(window).off("resize",n.proxy(this._resizeHandler,this))},_resizeHandler:function(){this.refresh()},_setModel:function(i){for(var r in i)switch(r){case"text":this._setText(i[r]);break;case"cssClass":this._setTheme(i[r]);break;case"htmlAttributes ":this._addAttr(i[r]);break;case"showOnInit":this._setVisibility(i[r]);break;case"showImage":this._showImage(i[r]);this._setContentPosition();break;case"target":this.model.target=i[r];this._setTarget();this.refresh();break;case"appendTo":this.model.appendTo=i[r];this._setTarget();t.isNullOrUndefined(this.model.appendTo)||this.model.appendTo=="document"||this.model.appendTo=="window"?n("body").append(this.maindiv):this.maindiv.appendTo(n(this.model.appendTo));this.refresh();break;case"template":this.maindiv.empty();i[r]?(this.model.template=i[r],this._setTemplate()):(this.model.template=i[r]=null,this._showImage(this.model.showImage),this.model.text&&this._generateTextTag(this.model.text));this._setContentPosition()}},_setTarget:function(){this.targetElement=this.model.target=="document"?n(document):this.model.target=="window"?n(window):this.model.target?n(this.model.target):this.element},_destroy:function(){this.maindiv.remove();this._unwireEvents()},_initialize:function(){this.maindiv=null;this.popupText=null;this.popupImage=null;this.templateObj=null;this.targetElement=null},_render:function(){this._setTarget();var i=n("#"+this.element[0].id+"_WaitingPopup").get(0);i&&n(i).remove();this.maindiv=t.buildTag("div.e-waitpopup-pane e-widget "+this.model.cssClass+"#"+this.element[0].id+"_WaitingPopup");this.model.template?this._setTemplate():(this._showImage(this.model.showImage),this.model.text&&this._generateTextTag(this.model.text));t.isNullOrUndefined(this.model.appendTo)||this.model.appendTo=="document"||this.model.appendTo=="window"?n("body").append(this.maindiv):this.maindiv.appendTo(n(this.model.appendTo));this._setVisibility(this.model.showOnInit);this._addAttr(this.model.htmlAttributes)},_refreshPanel:function(){this.maindiv.width(this.targetElement.outerWidth());this.maindiv.height(this.targetElement.outerHeight());this._setPanelPosition();this._setContentPosition()},_addAttr:function(t){var i=this;n.map(t,function(n,t){t=="class"?i.maindiv.addClass(n):i.maindiv.attr(t,n)})},_setPanelPosition:function(){var i=t.util.getOffset(this.targetElement);this.model.appendTo!=null&&n(this.model.appendTo).length>0&&((this.targetElement.css("position")=="relative"||this.targetElement.css("position")=="absolute")&&this.targetElement[0]===n(this.model.appendTo)[0]?i={left:0,top:0}:(i.left-=this.targetElement.offsetParent().offset().left,i.top-=this.targetElement.offsetParent().offset().top));this.maindiv.css({position:"absolute",left:Math.ceil(i.left)+"px",top:Math.ceil(i.top)+"px","z-index":this._maxZindex()+1})},_setContentPosition:function(){if(this.model.template==null){var t=0,r=0,i,n=null;i=this.targetElement.outerHeight();this.popupText&&(t=this.popupText.outerHeight());this.popupImage&&(r=this.popupImage.outerHeight());this.popupImage&&(n=Math.ceil((i-(r+t))/2),this.popupImage.css("top",n+"px"));this.popupText&&(n||(n=Math.ceil((i-t)/2)),this.popupText.css("top",n+"px"))}else this.templateObj.css({position:"relative",left:Math.ceil((this.targetElement.outerWidth()-this.templateObj.outerWidth())/2),top:Math.ceil((this.targetElement.outerHeight()-this.templateObj.outerHeight())/2)})},_generateTextTag:function(n){this.popupText=t.buildTag("div.e-text",n);this.maindiv.append(this.popupText)},_setVisibility:function(n){n&&this._isTargetVisible()?this.show():this.hide()},_maxZindex:function(){return t.util.getZindexPartial(this.element)}})})(jQuery,Syncfusion)});

/*! jQuery Validation Plugin - v1.19.3 - 1/9/2021
 * https://jqueryvalidation.org/
 * Copyright (c) 2021 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.submitButton=b.currentTarget,a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.submitButton&&(c.settings.submitHandler||c.formSubmitted)&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),!(c.settings.submitHandler&&!c.settings.debug)||(e=c.settings.submitHandler.call(c,c.currentForm,b),d&&d.remove(),void 0!==e&&e)}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0],k="undefined"!=typeof this.attr("contenteditable")&&"false"!==this.attr("contenteditable");if(null!=j&&(!j.form&&k&&(j.form=this.closest("form")[0],j.name=this.attr("name")),null!=j.form)){if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(a,b){i[b]=f[b],delete f[b]}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g)),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}});var b=function(a){return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")};a.extend(a.expr.pseudos||a.expr[":"],{blank:function(c){return!b(""+a(c).val())},filled:function(c){var d=a(c).val();return null!==d&&!!b(""+d)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||a.inArray(c.keyCode,d)!==-1||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c="undefined"!=typeof a(this).attr("contenteditable")&&"false"!==a(this).attr("contenteditable");if(!this.form&&c&&(this.form=a(this).closest("form")[0],this.name=a(this).attr("name")),d===this.form){var e=a.data(this.form,"validator"),f="on"+b.type.replace(/^validate/,""),g=e.settings;g[f]&&!a(this).is(g.ignore)&&g[f].call(e,this,b)}}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.currentForm,e=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){e[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=g.check(e)&&h))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)void 0!==a[b]&&null!==a[b]&&a[b]!==!1&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").trigger("focus").trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name"),e="undefined"!=typeof a(this).attr("contenteditable")&&"false"!==a(this).attr("contenteditable");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),e&&(this.form=a(this).closest("form")[0],this.name=d),this.form===b.currentForm&&(!(d in c||!b.objectLength(a(this).rules()))&&(c[d]=!0,!0))})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type,g="undefined"!=typeof e.attr("contenteditable")&&"false"!==e.attr("contenteditable");return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=g?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f,g=a(b).rules(),h=a.map(g,function(a,b){return b}).length,i=!1,j=this.elementValue(b);"function"==typeof g.normalizer?f=g.normalizer:"function"==typeof this.settings.normalizer&&(f=this.settings.normalizer),f&&(j=f.call(b,j),delete g.normalizer);for(d in g){e={method:d,parameters:g[d]};try{if(c=a.validator.methods[d].call(this,j,b,e.parameters),"dependency-mismatch"===c&&1===h){i=!0;continue}if(i=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(k){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",k),k instanceof TypeError&&(k.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),k}}if(!i)return this.objectLength(g)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){"string"==typeof c&&(c={method:c});var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.submitButton&&a("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return c="string"==typeof c&&c||"remote",a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),""===d&&(d=!0),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0===e.param||e.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(a,d){b[a]="function"==typeof d&&"normalizer"!==a?d(c):d}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var a;b[this]&&(Array.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(a=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(a[0]),Number(a[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:void 0!==b&&null!==b&&b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a)},date:function(){var a=!1;return function(b,c){return a||(a=!0,this.settings.debug&&window.console&&console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")),this.optional(c)||!/Invalid|NaN/.test(new Date(b).toString())}}(),dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d>=c},maxlength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d<=c},rangelength:function(a,b,c){var d=Array.isArray(a)?a.length:this.getLength(a,b);return this.optional(b)||d>=c[0]&&d<=c[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e,f=a(c).attr("type"),g="Step attribute on input type "+f+" is not supported.",h=["text","number","range"],i=new RegExp("\\b"+f+"\\b"),j=f&&!i.test(h.join()),k=function(a){var b=(""+a).match(/(?:\.(\d+))?$/);return b&&b[1]?b[1].length:0},l=function(a){return Math.round(a*Math.pow(10,e))},m=!0;if(j)throw new Error(g);return e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),this.optional(c)||m},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var c,d={};return a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,c){var e=a.port;"abort"===a.mode&&(d[e]&&d[e].abort(),d[e]=c)}):(c=a.ajax,a.ajax=function(b){var e=("mode"in b?b:a.ajaxSettings).mode,f=("port"in b?b:a.ajaxSettings).port;return"abort"===e?(d[f]&&d[f].abort(),d[f]=c.apply(this,arguments),d[f]):c.apply(this,arguments)}),a});
var validateUserpassword = {
    p_policy_uppercase: function (userpassword) {
        this.name = "p_policy_uppercase";
        var re = /^(?=.*[A-Z]).+$/;
        if (re.test(userpassword))
            return "p_policy_uppercase"
    },
    p_policy_lowercase: function (userpassword) {
        this.name = "p_policy_lowercase";
        var re = /^(?=.*[a-z]).+$/;
        if (re.test(userpassword))
            return "p_policy_lowercase";
    },
    p_policy_number: function (userpassword) {
        this.name = "p_policy_number";
        var re = /^(?=.*\d).+$/;
        if (re.test(userpassword))
            return "p_policy_number"
    },
    p_policy_specialcharacter: function (userpassword) {
        this.name = "p_policy_specialcharacter";
        var re = /^(?=.*(_|[^\w])).+$/;
        if (re.test(userpassword))
            return "p_policy_specialcharacter"
    },
    p_policy_length: function (userpassword) {
        this.name = "p_policy_length";
        var re = /^(?=.{6,}).+$/
        if (re.test(userpassword))
            return "p_policy_length"
    }
};

function passwordBoxHightlight(element) {
    var rules = "";
    $(element).closest('div').addClass("e-error");
    var isPopoverPasswordPolicy = $("#new-password").data("toggle") === "popover";
    var passwordPolicyElement = !isPopoverPasswordPolicy ? $('#password_policy_rules').find('li>span') : $('#password_policy_rules').find('li>span:not(.content)');
    var passwordPolicyClass = !isPopoverPasswordPolicy ? "su-tick" : "su-password-tick";
    if ($(element).attr('id') == "new-password") {
        for (var i = 0; i < passwordPolicyElement.length; i++) {
            if ($(passwordPolicyElement[i]).attr('class') == passwordPolicyClass)
                $(element).closest('div').removeClass("e-error");
            else
                rules = "[[[unsatisfied-rule]]]";
        }
        if (rules != "" && rules != undefined) {
            $(element).closest('div').addClass("e-error");
            rules = "";
        }
    }
}

function passwordBoxUnhightlight(element) {
    var rules = "";
    $(element).closest('div').removeClass('e-error');
    var isPopoverPasswordPolicy = $("#new-password").data("toggle") === "popover";
    var passwordPolicyElement = !isPopoverPasswordPolicy ? $('#password_policy_rules').find('li>span') : $('#password_policy_rules').find('li>span:not(.content)');
    var passwordPolicyClass = !isPopoverPasswordPolicy ? "su-tick" : "su-password-tick";

    if ($(element).attr('id') == "new-password") {
        for (var i = 0; i < passwordPolicyElement.length; i++) {
            if ($(passwordPolicyElement[i]).attr('class') != passwordPolicyClass)
                rules = "[[[unsatisfied-rule]]]";
            if ($(passwordPolicyElement[i]).attr('class') == passwordPolicyClass)
                $(element).closest('div').removeClass("e-error");
        }
        if (rules != "" && rules != undefined) {
            $(element).closest('div').addClass("e-error");
            rules = "";
        }
    }
    $(element).closest('div').find(".password-validate-holder").html("");
}

function createPasswordPolicyRules() {
    if ($("#new-password").data("toggle") !== "popover") {
        if ($("#new-password").val() != '' && $("#new-password").next("ul").length == 0) {
            $("#new-password").after("<ul id='password_policy_rules'></ul>");
            $("#password_policy_rules").append("<li id='p_policy_heading'>Password must meet the following requirements:</li>")
            $("#tenant-password-policy").attr("data-policy-minimumlength") != "" ? $("#password_policy_rules").append("<li id='p_policy_length'><span class='su su-close'></span>At least " + $("#tenant-password-policy").attr("data-policy-minimumlength") + " characters.</li>") : ""
            $("#tenant-password-policy").attr("data-policy-uppercase").toLowerCase() == "true" ? $("#password_policy_rules").append("<li id='p_policy_uppercase'><span class='su su-close'></span>One uppercase.</li>") : ""
            $("#tenant-password-policy").attr("data-policy-lowercase").toLowerCase() == "true" ? $("#password_policy_rules").append("<li id='p_policy_lowercase'><span class='su su-close'></span>One lowercase.</li>") : ""
            $("#tenant-password-policy").attr("data-policy-number").toLowerCase() == "true" ? $("#password_policy_rules").append("<li id='p_policy_number'><span class='su su-close'></span>One numeric.</li>") : ""
            $("#tenant-password-policy").attr("data-policy-specialcharacter").toLowerCase() == "true" ? $("#password_policy_rules").append("<li id='p_policy_specialcharacter'><span class='su su-close'></span>One special character.</li>") : ""
        }
        if ($("#new-password").val() == '' && $("#new-password").next("ul").length != 0) {
            $("#new-password").next("ul").remove();
        }
    }
    else {
        passwordPolicyPopover("#new-password", $("#new-password").val());
    }
}

$.validator.addMethod("isValidPassword", function (value, element) {
    var validateMethods = new Array();
    validateMethods.push(validateUserpassword.p_policy_uppercase);
    validateMethods.push(validateUserpassword.p_policy_lowercase);
    validateMethods.push(validateUserpassword.p_policy_number);
    validateMethods.push(validateUserpassword.p_policy_specialcharacter);
    validateMethods.push(validateUserpassword.p_policy_length);
    if ($("#new-password").data("toggle") !== "popover") {
        for (var n = 0; n < validateMethods.length; n++) {
            var currentMethodName = validateMethods[n];
            if (currentMethodName(value) != "" && currentMethodName(value) != undefined) {
                ruleName = currentMethodName(value);
                if ($('#password_policy_rules').find('li#' + ruleName + ' span').attr("class") != "su-tick") {
                    $('#password_policy_rules').find('li#' + ruleName + ' span').addClass("su su-tick").removeClass("su su-close");
                    $('#password_policy_rules').find('li#' + ruleName).addClass("clear-error");
                    ruleName = ""
                }
            }
            else {
                ruleName = name;
                $(element).closest('div').addClass("has-error");
                if ($('#password_policy_rules').find('li#' + ruleName + ' span').attr("class") == "su-tick") {
                    $('#password_policy_rules').find('li#' + ruleName + ' span').addClass("su su-close").removeClass("su-tick");
                    $('#password_policy_rules').find('li#' + ruleName).removeClass("clear-error");
                    ruleName = "";
                }
            }
        }
        if ($('#password_policy_rules li>span.su-tick').length == $('#password_policy_rules').find('li>span').length)
            return true;
    }
    else {
        passwordPolicyPopover("#new-password", value);
        if ($('#password_policy_rules li>span.su-password-tick').length == $('#password_policy_rules li>span:not(.content)').length) {
            return true;
        }
    }
}, "");

function passwordPolicyPopover(element, value) {
    var newPassword = $(element);
    newPassword.popover("show");
    var validateMethods = new Array();
    validateMethods.push(validateUserpassword.p_policy_uppercase);
    validateMethods.push(validateUserpassword.p_policy_lowercase);
    validateMethods.push(validateUserpassword.p_policy_number);
    validateMethods.push(validateUserpassword.p_policy_specialcharacter);
    validateMethods.push(validateUserpassword.p_policy_length);
    $.each(validateMethods, function (i) {
        var currentMethodName = validateMethods[i];
        ruleName = currentMethodName(value);
        if (ruleName != undefined && ruleName != "") {
            if (!newPassword.next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                newPassword.next().find("#password_policy_rules").find("li#" + ruleName + " span:first").addClass("su-password-tick").removeClass("icon");
            }
        }
        else {
            ruleName = name;
            if (newPassword.next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                newPassword.next().find("#password_policy_rules").find("li#" + ruleName + " span:first").removeClass("su-password-tick").addClass("icon");
            }
        }

        ruleName = "";
    });
}
var isKeyUp = false;
$(document).ready(function () {
    var rules;

    $(".password-fields-user-profile-edit").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            onChangePasswordClick();
            this.blur();
            return false;
        }
    });
    $("#new-password").bind("keyup", function () {
        if ($("#new-password").val() == $("#confirm-password").val()) {
            $("#confirm-password").closest('div').removeClass('has-error');
            $("#confirm-password").closest('div').find('span:last-child').html("");
        }
        else if ($("#confirm-password").val() != '') {
            $("#confirm-password").closest('div').addClass("has-error");
            $("#confirm-password").closest('div').next("div").find("span").html(window.TM.App.LocalizationContent.PasswordMismatch).css("display", "block");
        }
        createPasswordPolicyRules();
    });

    $.validator.addMethod("isEditadminPassword", function (value, element) {
        var validateMethods = new Array();
        validateMethods.push(validateUserpassword.p_policy_uppercase);
        validateMethods.push(validateUserpassword.p_policy_lowercase);
        validateMethods.push(validateUserpassword.p_policy_number);
        validateMethods.push(validateUserpassword.p_policy_specialcharacter);
        validateMethods.push(validateUserpassword.p_policy_length);
        for (var n = 0; n < validateMethods.length; n++) {
            var currentMethodName = validateMethods[n];
            if (currentMethodName(value) != "" && currentMethodName(value) != undefined) {
                ruleName = currentMethodName(value);
                if ($('#password_policy_rules').find('li#' + ruleName + ' span').attr("class") != "su-tick") {
                    $('#password_policy_rules').find('li#' + ruleName + ' span').addClass("su su-tick").removeClass("su su-close");
                    $('#password_policy_rules').find('li#' + ruleName).addClass("clear-error");
                    ruleName = ""
                }
            }
            else {
                ruleName = name;
                $(element).closest('div').addClass("has-error");
                if ($('#password_policy_rules').find('li#' + ruleName + ' span').attr("class") == "su-tick") {
                    $('#password_policy_rules').find('li#' + ruleName + ' span').addClass("su su-close").removeClass("su-tick");
                    $('#password_policy_rules').find('li#' + ruleName).removeClass("clear-error");
                    ruleName = "";
                }
            }
        }
        if ($('#password_policy_rules li>span.su-tick').length == $('#password_policy_rules').find('li>span').length)
            return true;
    }, "");

    $('.change-password-form').validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            $("#success-message").html("");
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            } else true;
        },
        onfocusout: function (element) { $(element).valid(); $("#success-message").html(""); },
        rules: {
            "old-password": {
                required: true
            },
            "new-password": {
                required: true,
                isEditadminPassword: true
            },
            "confirm-password": {
                required: true,
                equalTo: "#new-password"
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("has-error");
            if ($(element).attr('id') == "new-password") {
                for (var i = 0; i < $('#password_policy_rules').find('li>span').length; i++) {
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') == "su-tick")
                        $(element).closest('div').removeClass("has-error");
                    else
                        rules = "unsatisfied-rule";
                }
                if (rules != "" && rules != undefined) {
                    $(element).closest('div').addClass("has-error");
                    rules = "";
                }
            }
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('has-error');
            if ($(element).attr('id') == "new-password") {
                for (var i = 0; i < $('#password_policy_rules').find('li>span').length; i++) {
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') != "su-tick")
                        rules = "unsatisfied-rule";
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') == "su-tick")
                        $(element).closest('div').removeClass("has-error");
                }
                if (rules != "" && rules != undefined) {
                    $(element).closest('div').addClass("has-error");
                    rules = "";
                }
            }
            $(element).closest('div').find(".password-validate-holder").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest('div').find(".password-validate-holder").html(error.html());
        },
        messages: {
            "old-password": {
                required: window.TM.App.LocalizationContent.OldPasswordValidator
            },
            "new-password": {
                required: window.TM.App.LocalizationContent.NewPasswordValidator,
            },
            "confirm-password": {
                required: window.TM.App.LocalizationContent.ConfirmPasswordValidator,
                equalTo: window.TM.App.LocalizationContent.PasswordMismatch
            }
        }
    });
});

$('#new-password').on("change", function () {
    createPasswordPolicyRules();
    $("#new-password").valid();
});

function createPasswordPolicyRules() {
    if ($("#new-password").val() != '' && $("#new-password").next("ul").length == 0) {
        $("#new-password").after("<ul id='password_policy_rules'></ul>");
        $("#password_policy_rules").append("<li id='p_policy_heading'>" + window.TM.App.LocalizationContent.PasswordRule1 + "</li>")
        $("#password_policy_rules").append("<li id='p_policy_length'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule2 + "</li>")
        $("#password_policy_rules").append("<li id='p_policy_uppercase'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule3 + "</li>")
        $("#password_policy_rules").append("<li id='p_policy_lowercase'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule4 + "</li>")
        $("#password_policy_rules").append("<li id='p_policy_number'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule5 + "</li>")
        $("#password_policy_rules").append("<li id='p_policy_specialcharacter'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule6 + "</li>")
        $("#confirm-password-section").css("margin-top", "-53px")
        $(".button-section").css("margin-top", "-20px");
        $(".button-section").addClass("top-margin");
    }
    if ($("#new-password").val() == '' && $("#new-password").next("ul").length != 0) {
        $("#new-password").next("ul").remove();
        $("#confirm-password-section").css("margin-top", "25px")
        $(".button-section").css("margin-top", "20px");
    }
}

function onChangePasswordClick() {
    $(".password-validate-holder").html("");
    $("#new-password-validate, #confirm-password-validate").closest("div").prev("div").removeClass("has-error");
    var isValid = true;
    isValid = $('.change-password-form').valid();

    if (isValid && $("#new-password").val() != $("#confirm-password").val()) {
        $("#confirm-password-validate").html("Passwords mismatch");
        $("#confirm-password-validate").closest("div").prev("div").addClass("has-error");
        isValid = false;
    }

    if (isValid == false) {
        return;
    }

    ShowWaitingProgress("#content-area", "show");
    doAjaxPost('POST', updatepasswordUrl, { oldpassword: $("#old-password").val(), newpassword: $("#new-password").val(), confirmpassword: $("#confirm-password").val() },
        function (result) {
            $("input[type='password']").val("");
            ShowWaitingProgress("#content-area", "hide");
            $("#password_policy_rules").remove();
            $("#confirm-password-section").removeAttr("style");
            $("#change-password-btn").css("margin-top", "0px");
            if (!result.Data.status && result.Data.key == "password") {
                $("#old-password-validate").html(result.Data.value);
                $("#old-password-validate").closest("div").prev("div").addClass("has-error");
            }
            else {
                SuccessAlert(window.TM.App.LocalizationContent.UpdatePassword, window.TM.App.LocalizationContent.PasswordSuccess, 7000);
            }
        }
    );
}
$(document).on("ready", function () {
    $(".show-hide-password").on("click", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text').val();
            $(this).removeClass('su-show').addClass('su-hide').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoHide);
            $(this).tooltip('show');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
            $(this).removeClass('su-hide').addClass('su-show').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoView);
            $(this).tooltip('show');
        }
    });

    //For the purpose of Responsive layout
    $(".show-hide-password").bind("touchstart", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr("type", "text");
        }
        else {
            $(this).siblings("input").attr("type", "password");
        }
    });
    $(".show-hide-password").on("touchend", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
        }
    });

  
    if (window.innerWidth < 1041) {

        $(".show-hide-password").on("click", function () {
            if ($(this).siblings("input").is(":password")) {
                $(this).siblings("input").attr('type', 'text');
            }
            else {
                $(this).siblings("input").attr('type', 'password');
            }
        });
    }


    //Ej2 inputbox show/hide password
    $(".show-hide-password-ej2").on("click", function () {
        if ($(this).siblings().find("input").is(":password")) {
            $(this).siblings().find("input").attr('type', 'text');
            $(this).removeClass('su-show').addClass('su-hide').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoHide);
            $(this).tooltip('show');
        }
        else {
            $(this).siblings().find("input").attr('type', 'password');
            $(this).removeClass('su-hide').addClass('su-show').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoView);
            $(this).tooltip('show');
        }
    });

    $(".show-hide-password-ej2").bind("touch", function () {
        if ($(this).siblings().find("input").is(":password")) {
            $(this).siblings().find("input").attr('type', 'text');
            $(this).removeClass('su-show');
            $(this).addClass('su-hide');

        }
        else {
            $(this).siblings().find("input").attr('type', 'password');
            $(this).removeClass('su-hide');
            $(this).addClass('su-show');

        }
    });
});