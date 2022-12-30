//IE9 placeholder support function
var userAgent = navigator.userAgent;
var regexIe9 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");

$(document).ready(function () {
    if (regexIe9.test(userAgent)) {
        $(document).on("keyup focusout", "input[type=text],input[type=password]", function () {
            $(this).val() === "" ? $(this).nextAll(".placeholder:first").show() : $(this).nextAll(".placeholder:first").hide();
        });

        $(document).on("click", ".placeholder", function () {
            $(this).prevAll("input:first").focus();
        });

        $(window).load(function () {
            addPlaceholder("body");
        });
    }
});

function addPlaceholder(dom) {
    $(dom).find("input[type=text],input[type=password]").each(function (event) {
        if ($(this).nextAll(".placeholder:first").length <= 0) {
            var placeholderStyle = { position: "absolute", color: "#a7a9ac" };
            $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder") }).css(placeholderStyle)).insertAfter(this);
            isToHide = false;
            var placeholder = $(this).next(".placeholder:first").css({ bottom: 0, left: 0 });
            if (!$(this).parent().is(":visible")) {
                $(this).parent().show();
                isToHide = true;
            }

            var leftDifference = $(this).offset().left - placeholder.offset().left;
            var bottomDifference = $(this).offset().top + $(this).outerHeight() - placeholder.offset().top - placeholder.outerHeight();
            var alignMiddle = ($(this).outerHeight() - $(this).nextAll(".placeholder:first").outerHeight()) / 2;
            isToHide ? $(this).parent().hide() : null;
            placeholder.css({ bottom: -(bottomDifference) + alignMiddle, left: leftDifference + 13 });
            $(this).val() === "" ? placeholder.show() : placeholder.hide();
        }
    });
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