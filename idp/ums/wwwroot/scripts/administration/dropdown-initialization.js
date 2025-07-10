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
        filterType: "Contains",
        created: function() {
            if (id === "#response-type-dropdown" && typeof openIdResponseType !== 'undefined') {
                dropDownList.value = openIdResponseType;
            }
            else if (id === "#token-method-type" && typeof oauthTokenMethod !== 'undefined') {
                dropDownList.value = oauthTokenMethod;
            }
            else if (id === "#user-info-method-type" && typeof oauthUserInfoMethod !== 'undefined') {
                dropDownList.value = oauthUserInfoMethod;
            }
        }
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
    if (args.element.id == 'ai-providers')
        aiConfiguration();
}

function groupImportDropDownListInitialization(id, placeHolder) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        index: 0,
        floatLabelType: "Never",
        placeholder: placeHolder,
        change: ongroupImportchange,
        cssClass: 'e-outline e-custom e-non-float',
        enablePersistence: true,
        created: function() {
            if (id === "#group-import-provider-oauth" && typeof oauthKnownProviderType !== 'undefined') {
                dropDownList.value = oauthKnownProviderType.toString();
            }
            else if (id === "#group-import-provider-openid" && typeof openIdKnownProviderType !== 'undefined') {
                dropDownList.value = openIdKnownProviderType.toString();
            }
        }
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