$(document).ready(function () {
    var textbox = new ejs.inputs.TextBox({
        htmlAttributes: { name: "username", type: "password", maxlength: "85" },
        placeholder: 'Create password*',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    textbox.appendTo('#create-password');

    var emailTextbox = new ejs.inputs.TextBox({
        placeholder: 'Email address',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    emailTextbox.appendTo('#boldsign-email');

    var firstNameTextbox = new ejs.inputs.TextBox({
        placeholder: 'First Name*',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    firstNameTextbox.appendTo('#firstName');

    var lastNameTextbox = new ejs.inputs.TextBox({
        placeholder: 'Last Name',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    lastNameTextbox.appendTo('#lastName');

    var organizationNameTextbox = new ejs.inputs.TextBox({
        placeholder: 'Organization Name*',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    organizationNameTextbox.appendTo('#organizationName');

    var phoneTextbox = new ejs.inputs.TextBox({
        placeholder: 'Phone',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    phoneTextbox.appendTo('#phone');

    var verificationCodeTextBox = new ejs.inputs.MaskedTextBox({
        mask: '0-0-0-0-0-0'
    });
    verificationCodeTextBox.appendTo('#verification-code');
});

