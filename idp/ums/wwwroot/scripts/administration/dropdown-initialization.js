function dropDownListInitialization(id, placeHolder, allowFilter) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        index: 0,
        floatLabelType: "Never",
        placeholder: placeHolder,
        cssClass: 'e-outline e-custom e-non-float',
        enablePersistence: true,
        change: onDropDownListChange,
        query: new ej.data.Query(),
        allowFiltering: allowFilter,
        filterType: "Contains"
    });

    dropDownList.appendTo(id);
}

function onDropDownListChange(args) {
    if (args.element.id == 'enable-ssl')
        onBaseUrlChange(args);
    if (args.element.id == 'fontfamily')
        onFontChange();
    if (args.element.id == 'application-theme')
        onApplicationThemeChange();
    if (args.element.id == 'mail-account')
        emailConfiguration();
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

function fontDropDownListInitialization(id, placeHolder, allowFilter, authType) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        index: 0,
        floatLabelType: "Never",
        placeholder: placeHolder,
        change: onFontChange,
        cssClass: 'e-outline e-custom e-non-float',
        enablePersistence: true,
        query: new ej.data.Query(),
        allowFiltering: allowFilter,
        filterType: "Contains"
    });

    dropDownList.appendTo(id);
}