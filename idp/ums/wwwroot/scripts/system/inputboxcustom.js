
$(document).ready(function () {
    radioButtonInitialization("#check-sql", "SQL authentication", "checkWindows", true, "sql");
    radioButtonInitialization("#check-windows", "Windows authentication", "checkWindows", false, "windows");

    radioButtonInitialization("#new-db", "New database", "databaseType", true, "0");
    radioButtonInitialization("#existing-db", "Existing database", "databaseType", false, "1");

    radioButtonInitialization("#file-storage", "File Storage", "IsBlobStorage", true, "0");
    radioButtonInitialization("#blob-storage", "Azure Blob Storage", "IsBlobStorage", false, "1");

    radioButtonInitialization("#https", "Use HTTPS (Recommended)", "Connection", true, "https");
    radioButtonInitialization("#http", "Use HTTP", "Connection", false, "http");
    radioButtonInitialization("#custom-endpoint", "Specify custom endpoints", "Connection", false, "customendpoint");

    dropDownListInitialization('#database-type', 'Server type');

    if (isSiteCreation) {
        dropDownListInitialization('#tenant-type', 'Tenant Type');
        dropDownListInitialization('#branding-type', 'Use Branding');
        inputBoxInitialization('#tenant-name');
        inputBoxInitialization('#tenant-identifier');
        inputBoxInitialization('#site-isolation-code', true);
        inputBoxInitialization("#search-tenant-users");
        inputBoxInitialization("#input-domain");
    }

    inputBoxInitialization("#txt-dbname");
    inputBoxInitialization("#server-dbname");
    inputBoxInitialization("#imdbname");
    inputBoxInitialization("#txt-portnumber");
    inputBoxInitialization("#maintenance-db");
    inputBoxInitialization("#txt-servername");
    inputBoxInitialization("#txt-login");
    inputBoxInitialization("#txt-password-db");
    inputBoxInitialization("#database-name");
    inputBoxInitialization("#server-existing-dbname");
    inputBoxInitialization("#imdb-existing-dbname");
    inputBoxInitialization("#additional-parameter");

    inputBoxInitialization('#txt-accountname');
    inputBoxInitialization('#txt-endpoint');
    inputBoxInitialization('#txt-accesskey');
    inputBoxInitialization('#txt-containername');
    inputBoxInitialization('#txt-bloburl');

    inputBoxInitialization('#txt-firstname');
    inputBoxInitialization('#txt-lastname');
    inputBoxInitialization('#txt-username');
    inputBoxInitialization('#txt-emailid');
    inputBoxInitialization('#new-password');
    inputBoxInitialization('#txt-confirm-password');
});

function onDropDownListChange(args) {
    if (args.element.id == 'database-type')
        onDatbaseChange(args);
    if (args.element.id == 'check-windows')
        onWindowsChange(args);
    if (args.element.id == 'tenant-type')
        changeTenantType(args);
}

function onAuthRadioButtonChange(args) {
    onWindowsChange(args);
}

function onDatabaseRadioButtonChange(args) {
    onDbSelectChange(args);
}

function onBlobRadioButtonChange(args) {
    onBlobStorageChange(args);
}

function onConnectionRadioButtonChange(args) {
    onConnectionRadioChange(args);
}

function dropDownListInitialization(id, placeHolder) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        index: 0,
        floatLabelType: "Always",
        placeholder: placeHolder,
        change: onDropDownListChange,
        cssClass: 'e-outline e-custom'
    });

    dropDownList.appendTo(id);
}

function inputBoxInitialization(id, isDisable) {
    var inputbox = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom',
        floatLabelType: 'Auto'
    });

    if (isDisable) {
        inputbox.enabled = false;
    }

    inputbox.appendTo(id);
}

function radioButtonInitialization(id, label, name, isChecked, value) {

    var radiobutton = new ejs.buttons.RadioButton({
        label: label,
        name: name,
        checked: isChecked,
        value: value,
        change: onAuthRadioButtonChange,
        cssClass: 'e-custom'
    });

    if (name == 'checkWindows')
        radiobutton.change = onAuthRadioButtonChange

    if (name == 'databaseType')
        radiobutton.change = onDatabaseRadioButtonChange

    if (name == 'IsBlobStorage')
        radiobutton.change = onBlobRadioButtonChange

    if (name == 'Connection')
        radiobutton.change = onConnectionRadioButtonChange

    radiobutton.appendTo(id);
}

