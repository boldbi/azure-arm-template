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