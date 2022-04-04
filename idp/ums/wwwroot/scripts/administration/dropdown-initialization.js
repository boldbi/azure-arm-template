function dropDownListInitialization(id, placeHolder) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        index: 0,
        floatLabelType: "Never",
        placeholder: placeHolder,
        cssClass: 'e-outline e-custom e-non-float',
        enablePersistence: true
    });

    dropDownList.appendTo(id);
}

function groupImportDropDownListInitialization(id, placeHolder) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        index: 0,
        floatLabelType: "Never",
        placeholder: placeHolder,
        change: ongroupImportchange,
        cssClass: 'e-outline e-custom e-non-float',
        enablePersistence: true
    });

    dropDownList.appendTo(id);
}

function fontDropDownListInitialization(id, placeHolder, authType) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        index: 0,
        floatLabelType: "Never",
        placeholder: placeHolder,
        change: onFontChange,
        cssClass: 'e-outline e-custom e-non-float',
        enablePersistence: true
    });

    dropDownList.appendTo(id);
}