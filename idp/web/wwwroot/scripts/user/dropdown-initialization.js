function dropDownListInitialization(id, placeHolder) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        index: 0,
        floatLabelType: "Never",
        placeholder: placeHolder,
        cssClass: 'e-outline e-custom e-non-float',
        enablePersistence:true
    });

    dropDownList.appendTo(id);
}