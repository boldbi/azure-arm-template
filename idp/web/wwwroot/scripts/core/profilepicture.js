function generateProfileAvatar() {
    $(".profile-pic-tag").each(function () {
        var id = $(this).attr("data-id");
        var imageSize = $(this).attr("data-image-size");
        var fontSize = imageSize / 3;
        var letterSpace = fontSize < 10 ? "0" : fontSize < 20 ? "1px" : "2px";
        var letterLeftMargin = fontSize < 10 ? "1px" : "2px";
        var displayName = $(this).attr("data-display-name");
        var type = $(this).attr("data-type");
        var idpUrl = $(this).attr("data-url");
        $(this).html("");
        if (id != 0) {
            var colors = ["#b7fbff", "#a9eec2", "#ffe0a3", "#ffa1ac", "#8ed6ff", "#bf9fee", "#ffa0d2", "#32dbc6", "#d2c8c8", "#e3e7f1"];
            if (type == "user") {
                var stringArray = id.match(/(\d+)/g);
                var i = 0;
                for (i = 0; i < stringArray.length; i++) {
                    var number = stringArray[0][0];
                }
                $(this).css("background-color", colors[number]);
                var imageUrl = idpUrl + "/User/Avatar?id=" + id;
                var image = $('<img id="default-profile-image">');
                image.attr("src", imageUrl);
                image.css("position", "absolute");
                image.css("border-radius", "50%");
                if (imageSize === "120") {
                    image.attr("width", "125px");
                    image.attr("height", "125px");
                    image.css("top", "-1px");
                    image.css("left", "-1.5px");
                }
                else if (imageSize === "45") {
                    image.attr("width", imageSize);
                    image.attr("height", imageSize);
                    image.css("right", "12px");
                }
                else if (imageSize === "40")
                {
                    image.attr("width", imageSize);
                    image.attr("height", imageSize);
                    image.css("left", "8px");
                }
                else {
                    image.attr("width", imageSize);
                    image.attr("height", imageSize);
                    image.css("top", "0px");
                    image.css("left", "0px");
                }
                image.appendTo($(this));
            }
            else {
                var userIdLastNumber = id % 10;
                $(this).css("background-color", colors[userIdLastNumber]);
            }
            $(this).css("width", imageSize);
            $(this).css("height", imageSize);
            $(this).css("line-height", imageSize + "px");
            var nameLetters = displayName.trim().toUpperCase().split(/ /);
            var firstCharacter = $('<span id="first-letter">');
            if (isNullOrWhitespace(nameLetters[1])) {
                firstCharacter.text(nameLetters[0][0]);
            } else {
                firstCharacter.text(nameLetters[0][0] + nameLetters[1][0]);
            }
            firstCharacter.css("font-size", fontSize + "px");
            firstCharacter.css("color", "#333");
            firstCharacter.css("margin-left", letterLeftMargin);
            firstCharacter.css("letter-spacing", letterSpace);
            firstCharacter.appendTo($(this));
        }
    });
}

function isNullOrWhitespace(value) {
    return (value == null || value == undefined || value.trim() == "");
}