
$(document).ready(function () {
    radioButtonInitialization("#check-sql", "SQL authentication", "checkWindows", true, "sql");
    radioButtonInitialization("#check-windows", "Windows authentication", "checkWindows", false, "windows");

    radioButtonInitialization("#new-db", "New database", "databaseType", true, "0");
    radioButtonInitialization("#existing-db", "Existing database", "databaseType", false, "1");

    radioButtonInitialization("#single-database", "Shared Sites Database", "ConfigurationMode", true, "0");
    radioButtonInitialization("#database-per-tenant", "Separate Site Databases", "ConfigurationMode", false, "1")
    
    radioButtonInitialization("#https", "Use HTTPS (Recommended)", "Connection", true, "https");
    radioButtonInitialization("#http", "Use HTTP", "Connection", false, "http");
    radioButtonInitialization("#custom-endpoint", "Specify custom endpoints", "Connection", false, "customendpoint");

    dropDownListInitialization('#database-type', 'Server type', false);
    dropDownListInitialization('#storage-type', 'Storage type', false);
    dropDownListInitialization('#aws-region', 'Region', true);
    dropDownListInitialization('#oci-object-region', 'Region', true);

    if (isSiteCreation) {
        dropDownListInitialization('#branding-type', 'Use Branding', false);
        inputBoxInitialization('#tenant-name');
        inputBoxInitialization('#tenant-identifier');
        inputBoxInitialization('#site-isolation-code', true);
        inputBoxInitialization("#search-tenant-users");
        inputBoxInitialization("#input-domain");
    }

    inputBoxInitialization("#txt-dbname");
    inputBoxInitialization("#txt-dbname-for-oracle");
    inputBoxInitialization("#txt-servicename");
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

    inputBoxInitialization('#txt-oci-bucketname');
    inputBoxInitialization('#txt-oci-accesskey');
    inputBoxInitialization('#txt-secretkey');
    inputBoxInitialization('#txt-namespace');
    inputBoxInitialization('#txt-oci-rootfoldername');

    inputBoxInitialization('#txt-firstname');
    inputBoxInitialization('#txt-lastname');
    inputBoxInitialization('#txt-username');
    inputBoxInitialization('#txt-emailid');
    inputBoxInitialization('#new-password');
    inputBoxInitialization('#txt-confirm-password');
    inputBoxInitialization('#txt-bucketname');
    inputBoxInitialization('#txt-accesskeyid');
    inputBoxInitialization('#txt-accesskeysecret');
    inputBoxInitialization('#txt-rootfoldername');
    inputBoxInitialization('#tenant-table-prefix');
    inputBoxInitialization('#server-table-prefix');
    inputBoxInitialization('#txt-server-prefix');
    inputBoxInitialization('#server-prefix-name');
    inputBoxInitialization('#txt-ums-prefix');
    inputBoxInitialization('#ums-table-prefix');
    inputBoxInitialization('#schema-name');
});

function onDropDownListChange(args) {
    debugger;
    if (args.element.id == 'database-type')
        onDatbaseChange(args);
    if (args.element.id == 'check-windows')
        onWindowsChange(args);
    if (args.element.id == 'tenant-type')
        changeTenantType(args);
    if (args.element.id == 'storage-type') {
        if (requestUrlPath == getAddTenantUrl) {
            gridChange();
        }

        onStorageTypeChange(args.value.toLowerCase());
    }
}

function onAuthRadioButtonChange(args) {
    onWindowsChange(args);
}

function onDatabaseRadioButtonChange(args) {
    onDbSelectChange(args);
}

function onConnectionRadioButtonChange(args) {
    onConnectionRadioChange(args);
}

function dropDownListInitialization(id, placeHolder, allowFilter = false) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        index: 0,
        floatLabelType: "Always",
        placeholder: placeHolder,
        change: onDropDownListChange,
        allowFiltering: allowFilter,
        filtering: function (e) {
            // Custom filtering logic
            var query = new ejs.data.Query();
            // Split the entered text by spaces and perform filtering for each word
            if (e.text !== '') {
                var words = e.text.split(' '); // Split by space
                for (var word of words) {
                    query = query.where('text', 'contains', word, true); // Perform case-insensitive search
                }
                e.updateData(dropDownList.dataSource, query);
            }
        },
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

    if (name == 'Connection')
        radiobutton.change = onConnectionRadioButtonChange

    radiobutton.appendTo(id);
}

