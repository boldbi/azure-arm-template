function dropDownListInitialization(e,t){new ejs.dropdowns.DropDownList({index:0,floatLabelType:"Never",placeholder:t,cssClass:"e-outline e-custom e-non-float",enablePersistence:!0}).appendTo(e)}function generateProfileAvatar(){$(".profile-pic-tag").each(function(){var e=$(this).attr("data-id"),t=$(this).attr("data-image-size"),a=t/3,n=a<10?"0":a<20?"1px":"2px",i=a<10?"1px":"2px",s=$(this).attr("data-display-name"),o=$(this).attr("data-type"),l=$(this).attr("data-url");if($(this).html(""),0!=e){var c=["#b7fbff","#a9eec2","#ffe0a3","#ffa1ac","#8ed6ff","#bf9fee","#ffa0d2","#32dbc6","#d2c8c8","#e3e7f1"];if("user"==o){for(var r=e.match(/(\d+)/g),u=0,u=0;u<r.length;u++)var d=r[0][0];$(this).css("background-color",c[d]);o=l+"/User/Avatar?id="+e,l=$('<img id="default-profile-image">');l.attr("src",o),l.css("position","absolute"),l.css("border-radius","50%"),"120"===t?(l.attr("width","125px"),l.attr("height","125px"),l.css("top","-1px"),l.css("left","-1.5px")):"45"===t?(l.attr("width",t),l.attr("height",t),l.css("right","12px")):"40"===t?(l.attr("width",t),l.attr("height",t)):"64"===t?(l.attr("width",t),l.attr("height",t),l.css("top","0px"),l.css("left","0px")):(l.attr("width",t),l.attr("height",t),l.css("top","5px"),l.css("left","5px")),l.appendTo($(this))}else{o=e%10;$(this).css("background-color",c[o])}$(this).css("width",t),$(this).css("height",t),$(this).css("line-height",t+"px");l=s.trim().toUpperCase().split(/ /),e=$('<span id="first-letter">');isNullOrWhitespace(l[1])?e.text(l[0][0]):e.text(l[0][0]+l[1][0]),e.css("font-size",a+"px"),e.css("color","#333"),e.css("margin-left",i),e.css("letter-spacing",n),e.appendTo($(this))}})}function isNullOrWhitespace(e){return null==e||""==e.trim()}var userDetails,isKeyUp=!1;function SaveUserPreference(){$("#success-message").html("");var e=void 0===document.getElementById("language").ej2_instances[0].value?"en-us":document.getElementById("language").ej2_instances[0].value,t=null!=document.getElementById("model-language")?document.getElementById("model-language").ej2_instances[0].value:"en-us";$("#lang_tag").val()===document.getElementById("language").ej2_instances[0].value&&t===$("#model-language").val()||(showWaitingPopup("content-area"),doAjaxPost("POST",updateUserPreferenceUrl,{returnurl:$("#hidden-return-url").val(),languageSettings:e,modelLanguageSettings:t},function(e){e.Data.status?e.Data.isTenantUserLanguage?($("#tenant-hidden-form-post").attr("action",e.Data.returnUrl),$("#token").attr("value",e.Data.token),$("#tenant-hidden-form-post").submit()):(hideWaitingPopup("content-area"),SuccessAlert(window.Server.App.LocalizationContent.UpdateAccountPreference,e.Data.value,7e3),location.reload()):(hideWaitingPopup("content-area"),WarningAlert(window.Server.App.LocalizationContent.UpdateAccountPreference,e.Data.value,e.Message,7e3),location.reload())}),$("#language-cancel-button").css("display","none"),$("#language-cancel-link-button").css("display","none"))}$(document).ready(function(){dropDownListInitialization("#language",window.Server.App.LocalizationContent.Language),dropDownListInitialization("#model-language",window.Server.App.LocalizationContent.DataLanguage),document.getElementById("language").ej2_instances[0].value=selectedApplicationLanguageValue,document.getElementById("language").ej2_instances[0].text=selectedApplicationLanguageText,$(document).on("click","#language-save-button",SaveUserPreference),null!=document.getElementById("model-language")&&(document.getElementById("model-language").ej2_instances[0].value=selectedDataLanguageValue,document.getElementById("model-language").ej2_instances[0].text=selectedDataLanguageText),createWaitingPopup("content-area")}),$(document).on("click","#language-cancel-button",function(e){window.location.href="profile"});