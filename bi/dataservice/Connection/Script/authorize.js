/// <reference path="jquery-2.2.4.min.js" />
'use strict'
function initialize(data) {
    window.authData = data;
}
function authorize() {
    this.api = {
        validate: 'v1.0/connection/validate',
        oauthLogin: 'v1.0/oauth/authenticate',
        getOAuthAccounts: 'v1.0/design/linked-accounts/',
        oauthReAuthUrl: 'v1.0/oauth/re-authorize',
        validateCredentials: 'v1.0/connection/validate-credentials',
        getAccountSettings: 'v1.0/connection/analytics/list-accounts',
        getWebProperties: 'v1.0/connection/analytics/list-properties',
        getViews: 'v1.0/connection/analytics/list-views',
        getRepositories: 'v1.0/connection/github/list-repositories',
        getXeroOrganizations: 'v1.0/connection/xero/list-organizations'
    };
    this.isOAuthConnection = false;
    this.accounts = [];
    this.selectedAccount = null;
    this.accountId = null;
    this.propertyId = null;
    this.viewId = null;
    this.xeroOrganizationId = null;
    this.initialize = function () {
        this.disableContinueBtn();
        if (window.authData && typeof window.authData === "object") {
            window.authData.service = window.authData.service.toLowerCase();
            window.authData.provider = window.authData.provider.toLowerCase();
            this.init();
            this.initTemplate();
            if (this.isOAuthConnection) {
                this.getAccountsForProvider();
            } else {
                this.enableContinueBtn();
            }
        } else {
            var payload = this.getUrlParameter('payload');
            if (payload) {
                this.isOAuthConnection = true;
                var obj = JSON.parse(payload);
                this.selectedAccount = {
                    Provider: obj.provider,
                    Service: obj.service,
                    Id: obj.serviceId
                };
                window.authData = {
                    provider: obj.provider.toLowerCase(),
                    designerService: obj.serviceUrl,
                    origin: obj.origin,
                    service: obj.service,
                    server: obj.server,
                    token: obj.token,
                    isRedirect: true
                };
                this.onOkBtnClick(null);
            }

        }
        this.wireEvents();
    };
    this.defineHeader = function () {
        $("#template-header").css("display", "block");
        $("#template-connect-header").css("display", "block");
        $("#template-repo-header").css("display", "none");
        $("#template-repository-header").css("display", "none");
    }
    this.init = function () {
        $(".e-auth-content-wrapper .e-auth-content-header .e-ds-icon").addClass(window.authData.service);
        $(".e-auth-content-wrapper .e-auth-content-header .e-ds-name").html(this.getServiceName(window.authData.provider, window.authData.service));
        $('.e-auth-content-wrapper .e-auth-content').html(this.getTemplate(this.getServiceName(window.authData.provider, window.authData.service)));
        this.defineHeader();
    }
    this.wireEvents = function () {
        $('.e-auth-content-wrapper .e-auth-content-footer .e-ok-btn').on('click', $.proxy(this.onOkBtnClick, this));
        $('.e-auth-content-wrapper #re-authorize').on('click', $.proxy(this.reAuthorizeClick, this));
        $('.e-auth-content-wrapper #oauth-account').on('change', $.proxy(this.onAccSelectionChange, this));
        $('.e-auth-content-wrapper .e-auth-content-footer .e-new-account').on('click', $.proxy(this.onNewAccountClick, this));
        $('.e-auth-content-wrapper').on('keyup', $.proxy(this.keyHandler, this));      
        $('.e-auth-content-wrapper .e-auth-content-footer .e-back-btn').on('click', $.proxy(this.onBackBtnClick, this));
    };
    this.unwireEvents = function () {
        $('.e-auth-content-wrapper .e-auth-content-footer .e-ok-btn').off('click', $.proxy(this.onOkBtnClick, this));
        $('.e-auth-content-wrapper #re-authorize').off('click', $.proxy(this.reAuthorizeClick, this));
        $('.e-auth-content-wrapper #oauth-account').off('change', $.proxy(this.onAccSelectionChange, this));
        $('.e-auth-content-wrapper .e-auth-content-footer .e-new-account').off('click', $.proxy(this.onNewAccountClick, this));
        $('.e-auth-content-wrapper').off('keyup', $.proxy(this.keyHandler, this));
        $('.e-account-settings-content-wrapper #list-accounts').off('change', $.proxy(this.onAccSelection, this));
        $('.e-account-settings-content-wrapper #list-properties').off('change', $.proxy(this.onPropertySelection, this));
        $('.e-account-settings-content-wrapper #list-views').off('change', $.proxy(this.onViewSelection, this));
        $('.e-auth-content-wrapper .e-auth-content-footer .e-back-btn').off('click', $.proxy(this.onBackBtnClick, this));
    };
    this.wireGASettings = function () {
        $('.e-account-settings-content-wrapper #list-accounts').on('change', $.proxy(this.onAccSelection, this));
        $('.e-account-settings-content-wrapper #list-properties').on('change', $.proxy(this.onPropertySelection, this));
        $('.e-account-settings-content-wrapper #list-views').on('change', $.proxy(this.onViewSelection, this));
    }
    this.wireXeroEvents = function () {
        $('.e-account-settings-content-wrapper #list-orgs').on('change', $.proxy(this.onOrganizationSelection, this));
    }
    this.onAccFetchSuccess = function (data, args) {
        if (args.Status) {
            if (args.Data && args.Data.length !== 0) {
                this.enableContinueBtn();
                var accList = $('#oauth-account');
                $('#no-acc-container').hide();
                $('#acc-container').show();
                for (var i = 0; i < args.Data.length; i++) {
                    accList.append($('<option>').html($('<div>').html(args.Data[i].Name)).data('data', args.Data[i]).attr('value', args.Data[i].Id));
                }
                if (window.authData.isRedirect && this.selectedAccount) {
                    var currentAcc = accList.find('option[value=' + this.selectedAccount.Id + ']');
                    if (currentAcc.length !== 0) {
                        currentAcc.attr('selected', 'selected');
                        $('#continue-btn').trigger('click');
                    }
                } else {
                    this.onAccSelectionChange({ currentTarget: accList[0] });
                }
            } else {
                $('#acc-container').hide();
                $('#no-acc-container').show();
                this.disableContinueBtn();
            }
        } else {
            this.disableContinueBtn();
            $('#error-msg').html(args.Message);
        }
    }

    this.onAccSelectionChange = function (args) {
        this.hideErrorMsg();
        var value = args.currentTarget.value;
        this.selectedAccount = $(args.currentTarget).find('option[value=' + value + ']').data('data');
        this.validateSelectedAccount(this.selectedAccount);
        if ($('#continue-btn')[0].hasAttribute('disabled')) {
            this.removeErrorNotification();
            this.hideErrorMsg();
            this.enableContinueBtn();
            $('.e-add-auth-req-wrapper').css('display', 'none');
        }
        if ($('.e-add-auth-req-wrapper').css('display') !== 'none') {
            this.disableContinueBtn();
        }
    }
    this.validateSelectedAccount = function (data) {
        if (data && data.Services.indexOf(window.authData.service) === -1) {
            $('.e-add-auth-req-wrapper').show();
        } else {
            $('.e-add-auth-req-wrapper').hide();
        }
    }
    this.onNewAccountClick = function (args) {
        window.location.href = this.getOAuthLoginUrl(null);
    }
    this.reAuthorizeClick = function (args) {
        window.location.href = this.getOAuthLoginUrl(this.selectedAccount.Id);
    }
    this.onOkBtnClick = function (args) {
        this.removeErrorNotification();
        this.hideErrorMsg();
        var serviceName = window.authData.service;
        if (serviceName !== undefined && (serviceName.toLowerCase() === 'analytics' || serviceName.toUpperCase() === 'ADS') && $('#account-settings-container').css('display') === "none") {
            if (args === null) {
                this.init();
                this.getAccountsForProvider();
            } else {
                if ($("#account-settings-container").find('.e-account-settings-content-wrapper').length <= 0) {
                    $("#account-settings-container").append(this.renderGAAccountSettings());
                }
                this.wireGASettings();
                this.getAccountsSettings();
            }
        } else if (serviceName !== undefined && (serviceName.toLowerCase() === 'xero') && $('#account-settings-container').css('display') === "none") {
            if (args === null) {
                this.init();
                this.getAccountsForProvider();
            } else {
                if ($("#account-settings-container").find('.e-account-settings-content-wrapper').length <= 0) {
                    $("#account-settings-container").append(this.renderXeroOrganizationsSettings());
                }
                this.wireXeroEvents();
                this.getOrganizationsSettings();
            }
        } else if (serviceName !== undefined && serviceName.toLowerCase() === 'azuredevops' && $('#account-settings-container').css('display') === "none") {
            if (args === null) {
                this.init();
                this.getAccountsForProvider();
            } else {
                if ($("#account-settings-container").find('.e-account-settings-content-wrapper').length <= 0) {
                    $("#account-settings-container").append(this.renderAzureDevOpsAccountSettings());
                }
                $('.e-auth-content, .e-new-account').css('display', 'none');
                $('#account-settings-container, .e-back-btn-div').css('display', 'inline');
            }
        } else if (serviceName !== undefined && serviceName.toLowerCase() === 'freshbooks' && $('#account-settings-container').css('display') === "none") {
            if (args === null) {
                this.init();
                this.getAccountsForProvider();
            } else {
                if ($("#account-settings-container").find('.e-account-settings-content-wrapper').length <= 0) {
                    $("#account-settings-container").append(this.renderFreshBooksAccountSettings());
                }
                $('.e-auth-content, .e-new-account').css('display', 'none');
                $('#account-settings-container, .e-back-btn-div').css('display', 'inline');
            }
        } else if (serviceName !== undefined && serviceName.toUpperCase() === 'GITHUB' && $('#account-settings-container').css('display') === "none") {
            if (args === null) {
                this.init();
            } else {
                if (!($("#username").val().trim() === '' || $("#password").val().trim() === '')) {
                    if ($("#account-settings-container").find('.e-account-settings-content-wrapper').length <= 0) {
                        $("#account-settings-container").append(this.renderGithubRepositorySettings());
                    }
                    $('.e-auth-content, .e-new-account').css('display', 'none');
                    $('#account-settings-container, .e-back-btn-div').css('display', 'inline');
                    this.getGithubRepositories();
                }
            }
        }
        else {
            if (args === null) {
                this.showLoader('Redirecting please wait...');
                this.hideAuthContainer();
            }
            if (serviceName !== undefined && serviceName.toLowerCase() === 'azuredevops') {
                if ($("#devops-account").val().trim() === '' || $("#devops-project").val().trim() === '') {
                    if ($("#devops-account").val().trim() === '') {
                        $('#devops-account').addClass('e-req-error');
                    } else {
                        $('#devops-account').removeClass('e-req-error');
                    }
                    if ($("#devops-project").val().trim() === '') {
                        $('#devops-project').addClass('e-req-error');
                    } else {
                        $('#devops-project').removeClass('e-req-error');
                    }
                } else {
                    $('#devops-account').removeClass('e-req-error');
                    $('#devops-project').removeClass('e-req-error');
                    this.accountId = $("#devops-account").val().trim();
                    this.propertyId = $("#devops-project").val().trim();
                    this.repositoryName = $("#devops-repository").val()?.trim();
                    this.validateConnectionInfo();
                }
            } else if (serviceName !== undefined && serviceName.toUpperCase() === 'GITHUB') {
                if ($('#list-repositories input[name="repository"]').length <= 0) {
                    $('#list-repositories').addClass('e-req-error');
                } else {
                    $('#list-repositories').removeClass('e-req-error');
                    this.validateConnectionInfo();
                }
            } else if (serviceName !== undefined && serviceName.toLowerCase() === 'freshbooks') {
                if ($("#freshbooks-account-id").val().trim() === '') {
                        $('#freshbooks-account-id').addClass('e-req-error');
                } else {
                    $('#freshbooks-account-id').removeClass('e-req-error');
                    this.accountId = $("#freshbooks-account-id").val().trim();
                    this.validateConnectionInfo();
                }
            }
            else {
                this.validateConnectionInfo();
            }
        }
    };
    this.portObjToUrl = function (obj) {
        var request = {
            provider: window.authData.provider,
            service: window.authData.service,
            data: obj,
            origin: window.authData.origin
        };
        var url = '';
        var keys = Object.keys(request);
        for (var i = 0; i < keys.length; i++) {
            url += keys[i] + '=' + encodeURIComponent(request[keys[i]]) + '&';
        }
        return url;
    };
    this.getServiceName = function (provider, service) {
        switch (provider) {
            case "jira":
                return "Jira";
            case "xero":
                return "Xero";
            case "google":
                if (service === 'youtube') {
                    return "YouTube";
                }
                else if (service === 'ads') {
                    return "Google Ads";
                }
                else {
                    return "Google Analytics";
                }
            case "salesforce":
                return "Salesforce";
            case "azuredevops":
                return "Azure DevOps";
            case "freshbooks":
                return "FreshBooks";
            case "servicenow":
                return "ServiceNow";
            case 'mailchimp':
                return 'Mail Chimp';
            case 'zendesk':
                return 'Zendesk';
            case 'stripe':
                return 'Stripe';
            case "github":
                return "GitHub";
            case "sendgrid":
                return "SendGrid";
            case 'youtube':
                return 'YouTube';
            case 'twilio':
                return 'Twilio';
            case 'infusionsoft':
                return 'Infusionsoft';
            case "asana":
                return "Asana";
            case "freshdesk":
                return "FreshDesk";

        }
    };
    this.validateConnectionInfo = function () {
        switch (window.authData.provider.toLowerCase()) {
            case 'jira':
            case 'zendesk':
            case 'servicenow':
                this.validateDomainBasicAuthConnection();
                break;
            case 'freshdesk':
                this.validateDomainTokenAuthConnection();
                break;
            case 'salesforce':
            case 'google':
            case 'youtube':
            case 'azuredevops':
            case 'freshbooks':
            case 'infusionsoft':
            case 'xero':
            case 'asana':
                this.validateOAuthConnection();
                break;
            case 'mailchimp':
            case 'github':
            case 'stripe':
            case 'twilio':
                this.validateBasicAuthConnection();
                break;
            case 'sendgrid':
                this.validateTokenAuthConnection();
                break;
        }
    };
    this.initTemplate = function () {
        switch (window.authData.provider.toLowerCase()) {
            case 'jira':
                $('#url').focus();
                break;
            case 'salesforce':
                break;
        }
    };
    this.getTemplate = function (service) {
        switch (service) {
            case 'ServiceNow':
                return this.getDomainBasicAuthTemplate('{instance-name}.service-now.com', 'ServiceNow');
            case 'Jira':
                return this.getDomainBasicAuthTemplate('https://yourdomain.atlassian.net', 'Jira');
            case 'Zendesk':
                return this.getDomainBasicAuthTemplate('{domain-name}.zendesk.com', 'Zendesk');
            case 'FreshDesk':
                return this.getDomainTokenAuthTemplate('<:your_domain>.freshdesk.com', 'FreshDesk');
            case 'Salesforce':
            case 'Google Analytics':
            case 'Google Ads':
            case 'YouTube':
            case 'Azure DevOps':
            case 'FreshBooks':
            case 'Infusionsoft':
            case 'Xero':
            case 'Asana':
                this.isOAuthConnection = true;
                $('.e-new-account').css('display', 'inline-block');
                return this.getOAuthTemplate();
            case 'Mail Chimp':
            case 'GitHub':
            case 'Twilio':
            case 'Stripe':
                return this.getBasicAuthTemplate(service);
            case 'SendGrid':
                return this.getTokenAuthTemplate(service);
        }
    };
    this.validateBasicAuthConnection = function () {
        $('.e-auth-content-wrapper').removeClass('e-req-error');
        var obj = { status: false, data: '' };
        var data = {};
        var isRequiredFieldEmpty = false;
        var requiredFields = $('input.e-required');
        for (var i = 0; i < requiredFields.length; i++) {
            if (requiredFields.eq(i).val().trim() === '') {
                isRequiredFieldEmpty = true;
                break;
            }
        }
        if ($("#username").val().trim() !== '') {
            data.username = $('#username').val().trim();
        }
        if ($("#password").val().trim() !== '') {
            data.password = $('#password').val().trim();
        }

        if ($("#list-repositories").length > 0) {
            var repos = [];
            $.each($("input[name='repository']:checked"), function () {
                repos.push($(this).val());
            });
            if (repos.length > 0) {
                data.repositoryURL = repos.join(',');
            } else {
                isRequiredFieldEmpty = true;
            }
        }
       
        obj.status = true;
        obj.data = JSON.stringify(data);
        if (isRequiredFieldEmpty) {
            $('.e-auth-content-wrapper').addClass('e-req-error');
            obj.status = false;
        }
        if (obj.status) {
            var request = {
                provider: window.authData.provider,
                service: window.authData.service,
                data: obj.data,
                origin: window.authData.origin
            };
            this.doAjaxPost('GET', window.authData.designerService + this.api.validateCredentials + '?' + this.portObjToUrl(obj.data), obj.data, this.onFetchSuccess);
        }
    };
this.validateTokenAuthConnection = function () {
    $('.e-auth-content-wrapper').removeClass('e-req-error');
    var obj = { status: false, data: '' };
    var data = {};
    var isRequiredFieldEmpty = false;
    var requiredFields = $('input.e-required');
    for (var i = 0; i < requiredFields.length; i++) {
        if (requiredFields.eq(i).val().trim() === '') {
            isRequiredFieldEmpty = true;
            break;
        }
    }
    if ($("#apitoken").val().trim() !== '') {
        data.apitoken = $('#apitoken').val().trim();
    }
    obj.status = true;
    obj.data = JSON.stringify(data);
    if (isRequiredFieldEmpty) {
        $('.e-auth-content-wrapper').addClass('e-req-error');
        obj.status = false;
    }
    if (obj.status) {
        var request = {
            provider: window.authData.provider,
            service: window.authData.service,
            data: obj.data,
            origin: window.authData.origin
        };
        this.doAjaxPost('GET', window.authData.designerService + this.api.validateCredentials + '?' + this.portObjToUrl(obj.data), obj.data, this.onFetchSuccess);
    }        
};
    this.validateDomainBasicAuthConnection = function () {
        $('.e-domain-url').removeClass('e-req-error');
        $('.e-domain-username').removeClass('e-req-error');
        $('.e-domain-pwd').removeClass('e-req-error');
        var obj = { status: false, data: '' };
        var data = {};
        if ($("#url").val().trim() !== '' && this.validateDomain($("#url").val().trim()) && $("#username").val().trim() !== '' && $("#password").val().trim() !== '') {
            data.url = $('#url').val().trim();
            data.username = $('#username').val().trim();
            data.password = $('#password').val().trim();
            obj.status = true;
            obj.data = JSON.stringify(data);
        } else {
            obj.status = false;
            if ($("#url").val().trim() === '' || !this.validateDomain($("#url").val().trim())) {
                $('.e-domain-url').addClass('e-req-error');
            }
            if ($("#username").val().trim() === '') {
                $('.e-domain-username').addClass('e-req-error');
            }
            if ($("#password").val().trim() === '') {
                $('.e-domain-pwd').addClass('e-req-error');
            }
        }
        if (obj.status) {
            var request = {
                provider: window.authData.provider,
                service: window.authData.service,
                data: obj.data,
                origin: window.authData.origin
            };
            this.doAjaxPost('GET', window.authData.designerService + this.api.validateCredentials + '?' + this.portObjToUrl(obj.data), obj.data, this.onFetchSuccess);
        }
    }
    this.validateDomainTokenAuthConnection = function () {
        $('.e-domain-url').removeClass('e-req-error');
        $('.e-domain-pwd').removeClass('e-req-error');
        var obj = { status: false, data: '' };
        var data = {};
        if ($("#url").val().trim() !== '' && this.validateDomain($("#url").val().trim()) && $("#password").val().trim() !== '') {
            data.url = $('#url').val().trim();
            data.password = $('#password').val().trim();
            obj.status = true;
            obj.data = JSON.stringify(data);
        } else {
            obj.status = false;
            if ($("#url").val().trim() === '' || !this.validateDomain($("#url").val().trim())) {
                $('.e-domain-url').addClass('e-req-error');
            }
            if ($("#password").val().trim() === '') {
                $('.e-domain-pwd').addClass('e-req-error');
            }
        }
        if (obj.status) {
            var request = {
                provider: window.authData.provider,
                service: window.authData.service,
                data: obj.data,
                origin: window.authData.origin
            };
            this.doAjaxPost('GET', window.authData.designerService + this.api.validateCredentials + '?' + this.portObjToUrl(obj.data), obj.data, this.onFetchSuccess);
        }
    }

    this.onFetchSuccessForSalesforce = function (data, args) {
        if (args !== null && args !== undefined) {
            if (args.ApiStatus === true) {               
                    window.location.href = window.authData.designerService + this.api.validate + '?' + this.portObjToUrl(data);
                } else {
                $('.e-add-auth-req-wrapper').css('display', 'block');
                this.disableContinueBtn();
            }
        }
    }
    this.onFetchSuccess = function (data, args) {
        if (args !== null && args !== undefined) {
            if (args.ApiStatus === true) {
                window.location.href = window.authData.designerService + this.api.validate + '?' + this.portObjToUrl(data);
            } else {
                        this.showErrorMsg(args.Message);
                }
            }
    }
    this.showErrorMsg = function (msg) {
        $('#error-msg').html(msg).show();
    };
    this.hideErrorMsg = function () {
        $('#error-msg').hide();
    };
    this.validateOAuthConnection = function () {
        if (this.selectedAccount === null || this.selectedAccount === undefined) {
            this.showErrorMsg('Please connect an account to continue.');

        } else {
            var obj = { status: false, data: {} };
            var data = {};
            if (this.selectedAccount !== null || this.selectedAccount !== undefined) {
                obj.status = true;
                var serviceName = window.authData.service;
                if (serviceName !== undefined && (serviceName.toLowerCase() === 'analytics' || serviceName.toLowerCase() === 'ads')) {
                    obj.data = JSON.stringify({
                        serviceId: this.selectedAccount.Id,
                        accountId: this.accountId,
                        propertyId: this.propertyId,
                        viewId: this.viewId
                    });
                } else if (serviceName !== undefined && serviceName.toLowerCase() === 'azuredevops') {
                    obj.data = JSON.stringify({
                        serviceId: this.selectedAccount.Id,
                        accountId: this.accountId,
                        propertyId: this.propertyId,
                        repositoryName: this.repositoryName
                    });
                } else if (serviceName !== undefined && serviceName.toLowerCase() === 'xero') {
                    obj.data = JSON.stringify({
                        serviceId: this.selectedAccount.Id,
                        accountId: this.xeroOrganizationId
                    });
                } else if (serviceName !== undefined && serviceName.toLowerCase() === 'freshbooks') {
                    obj.data = JSON.stringify({
                        serviceId: this.selectedAccount.Id,
                        accountId: this.accountId
                    });
                }
                else {
                    obj.data = JSON.stringify({
                        serviceId: this.selectedAccount.Id
                    });
                }
            }
            this.doAjaxPost('GET', window.authData.designerService + this.api.validateCredentials + '?' + this.portObjToUrl(obj.data), obj.data, this.onFetchSuccessForSalesforce);
        }
    }
    this.removeErrorNotification = function () {
        $('.e-auth-content-wrapper').removeClass('e-error');
    };
    this.showLoader = function (text) {
        $('#loader').css('display', 'table').find('.e-loader-text').html(text || '');

    }
    this.hideLoader = function () {
        $('#loader').hide();
    }
    this.hideAuthContainer = function () {
        $('#auth-container').hide();
    };

    this.getDomainBasicAuthTemplate = function (domainUrl, service) {
        let passwordLabel = 'Password';
        let infoUrl;
        let url = '';
        if (service.toLowerCase() == 'servicenow') {
            url = 'Instance Name';
        } else {
            url = 'Domain Name';
        }
        switch (service.toLowerCase()) {
            case 'jira':
                passwordLabel = 'API Token';
                infoUrl = 'https://confluence.atlassian.com/cloud/api-tokens-938839638.html';
                break;
            default:
                break;
        }
        return '<div class="e-div">' +
            '<span>' +
            '<label>' + url + '</label>' +
            '</span>' +
            '<input type="text" class="e-domain-url e-required" id="url" placeholder="' + domainUrl + '"/>' +
            '</div>' +
            '<div class="e-div">' +
            ' <span>' +
            '<label>Username</label>' +
            '</span>' +
            ' <input type="text" class=" e-domain-username e-required" id="username" placeholder="Username"/>' +
            '</div>' +
            '<div class="e-div">' +
            '<span>' +
            ' <label style="float:left;">' + passwordLabel + '</label>' + (infoUrl !== undefined && infoUrl !== '' ? this.getHelpIconTemplate(infoUrl) : '') +
            '</span>' +
            ' <input type="password" class="e-domain-pwd e-required" id="password" placeholder="**********"/>' +
            ' </div>';
    };
    this.getDomainTokenAuthTemplate = function (domainUrl, service) {
        let passwordLabel = 'API Token';
        let infoUrl;
        let url = 'Domain Name';
        switch (service.toLowerCase()) {
            case 'freshdesk':
                infoUrl = 'https://support.freshdesk.com/en/support/solutions/articles/215517-how-to-find-your-api-key';
                break;
            default:
                break;
        }
        return '<div class="e-div">' +
            '<span>' +
            '<label>' + url + '</label>' +
            '</span>' +
            '<input type="text" class="e-domain-url e-required" id="url" placeholder="' + domainUrl + '"/>' +
            '</div>' +
            '<div class="e-div">' +
            ' <span>' +
            '</div>' +
            '<div class="e-div">' +
            '<span>' +
            ' <label style="float:left;">' + passwordLabel + '</label>' + (infoUrl !== undefined && infoUrl !== '' ? this.getHelpIconTemplate(infoUrl) : '') +
            '</span>' +
            ' <input type="password" class="e-domain-pwd e-required" id="password" placeholder="**********"/>' +
            ' </div>';
    };
    this.getHelpIconTemplate = function (infoUrl) {
        return '<a class="help-icon" href="' + infoUrl + '" target="_blank"></a>';
    };
    this.getBasicAuthTemplate = function (serviceProvider) {
        switch (serviceProvider) {
            case 'Twilio':
                return '<div class="e-div">' +
                    ' <span>' +
                    '<label>Account SID</label>' +
                    '</span>' +
                    ' <input type="text" class="e-required" id="username" placeholder="account SID"/>' +
                    '</div>' +
                    '<div class="e-div">' +
                    '<span>' +
                    ' <label>Auth Token</label>' +
                    '</span>' +
                    ' <input type="password" class="e-required" id="password" placeholder="**********"/>' +
                    ' </div>';
            case 'Mail Chimp':
                return '<div class="e-div">' +
                    ' <span>' +
                    '<label>Username</label>' +
                    '</span>' +
                    ' <input type="text" class="e-required" id="username" placeholder="Username"/>' +
                    '</div>' +
                    '<div class="e-div">' +
                    '<span>' +
                    ' <label>API Key</label>' +
                    '</span>' +
                    ' <input type="password" class="e-required" id="password" placeholder="**********"/>' +
                    ' </div>';
            case 'GitHub':
                return '<div class="e-div">' +
                    '<span>' +
                    '<label>Username</label>' +
                    '</span>' +
                    '<input type="text" class="e-domain-username e-required" id="username" placeholder="Username"/>' +
                    '</div>' +
                    '<div class="e-div">' +
                    ' <span>' +
                    '<label>Personal Access Token</label>' +
                    '<a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" target="_blank">' +
                    '<img class="help-icon-personal-access-token" src="../../Connection/Content/Images/help_icon.png" style="width:12px;height;12px;margin-left:5px">' +
                    '</a>' +
                    '</span>' +
                    ' <input type="password" class=" e-domain-username e-required" id="password" placeholder="**********"/>' +
                    '</div>';
            default:
                return '<div class="e-div">' +
                    ' <span>' +
                    '<label>Username</label>' +
                    '</span>' +
                    ' <input type="text" class="e-required" id="username" placeholder="Username"/>' +
                    '</div>' +
                    '<div class="e-div">' +
                    '<span>' +
                    ' <label>Password</label>' +
                    '</span>' +
                    ' <input type="password" class="e-required" id="password" placeholder="**********"/>' +
                    ' </div>';
        }
    };
    this.getTokenAuthTemplate = function (serviceProvider) {
        switch (serviceProvider) {
            case 'SendGrid':
                return '<div class="e-div">' +
                    ' <span>' +
                    '<label>Api Token</label>' +
                    '</span>' +
                    ' <input type="password" class="e-required" id="apitoken" placeholder="**********"/>' +
                    '</div>';
        }
    };
    this.getOAuthTemplate = function () {
        return '<div class="e-div" id="acc-container">' +
            '<span>' +
            ' <label>Account Selected</label>' +
            '</span>' +
            ' <select id = "oauth-account" class="e-list">' +
            '</select >' +
            ' <div class="e-add-auth-req-wrapper">' +
            ' <lable class="e-label e-warn"> Additional permission is required for this account.</lable>' +
            ' <button id = "re-authorize" class="e-ok-btn e-authorize-btn e-right-align"> Authorize</button>' +
            '</div>' +
            '</div>' +
            '<div style="display:none;" class="e-no-acc-label e-div" id="no-acc-container"><label id="no-accounts-label">Please connect an account to continue.<label/></div>';
    };

    this.getOAuthLoginUrl = function (reauthId) {
        let url = window.authData.designerService + (reauthId ? this.api.oauthReAuthUrl: this.api.oauthLogin) + '?';
        if (window.authData.provider) {
            url += 'provider=' + window.authData.provider;
        }
        if (window.authData.service) {
            url += '&service=' + window.authData.service;
        }
        if (window.authData.token) {
            url += '&token=' + window.authData.token;
        }
        url += '&origin=' + window.authData.origin;
        if (window.authData.server) {
            url += '&server=' + window.authData.server;
        }
        if (reauthId) {
            url += '&id=' + reauthId;
        }
        url += '&pageredirect=' + window.location.origin + window.location.pathname;
        return url;
    }
    this.getAccountsForProvider = function () {
        this.doAjaxPost('GET', window.authData.designerService + this.api.getOAuthAccounts + window.authData.provider, null, this.onAccFetchSuccess);
    }

    this.doAjaxPost = function (method, url, data, success) {
        this.showLoader();
        $.ajax({
            type: method,
            url: url,
            crossDomain: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data),
            beforeSend: $.proxy(function (req) {
                req.setRequestHeader('Caller', window.authData.server);
                req.setRequestHeader('Authorization', window.authData.token);
            }),
            success: $.proxy(function (args) {
                this.hideLoader();
                success.call(this, data, args);
            }, this),
            error: $.proxy(function (evt) {
                this.hideLoader();
                this.showErrorMsg('An error occured while fetching the data.' + evt.status + ':' + evt.statusText);
            }, this)
        });
    }
    this.getUrlParameter = function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    this.enableContinueBtn = function () {
        $('#continue-btn').removeAttr('disabled');
    };
    this.disableContinueBtn = function () {
        $('#continue-btn').attr('disabled', 'disabled');
    }
    this.validateUrl = function (url) {
        var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return regexp.test(url);
    };
    this.validateDomain = function (url) {
        var regexp = /^(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return regexp.test(url);
    };
    this.keyHandler = function (evt) {
        if (evt.which === 13 || evt.keyCode === 13) {
            $('#continue-btn').trigger('click');
        }
    };
	
	this.renderGAAccountSettings = function(){
		return   '<div class="e-account-settings-content-wrapper">' +
                 '<div class="e-account-settings-content">' + 
                 '<div class="e-account-settings-dropdown-div">'  +
                 '<div class="e-account-settings-dropdown-label-div"><label>Analytics Account :</label></div>' + 
                 '<select id="list-accounts" class="e-account-settings"></select>' +
                 '</div>' + '<div class="e-account-settings-dropdown-div">' +
                 '<div class="e-account-settings-dropdown-label-div">' + '<label>Web Property :</label>' + '</div>' +
                 '<select id="list-properties" class="e-account-settings"></select>' + '</div>' + '<div class="e-account-settings-dropdown-div">' +
                 '<div class="e-account-settings-dropdown-label-div">' + '<label>Profile :</label>' + '</div>' +
                 '<select id="list-views" class="e-account-settings"></select>' + '</div>' + '</div>' + '</div>';
	}

    this.renderXeroOrganizationsSettings = function () {
        return '<div class="e-account-settings-content-wrapper">' +
            '<div class="e-account-settings-content">' +
            '<div class="e-account-settings-dropdown-div">' +
            '<div class="e-account-settings-dropdown-label-div"><label>Organizations :</label></div>' +
            '<select id="list-orgs" class="e-account-settings"></select>' +
            '</div>' + '</div>' + '</div>';
    };

    this.renderAzureDevOpsAccountSettings = function () {
        var parentDiv = '<div class="e-account-settings-content-wrapper">' +
            '<div class = "e-account-settings-content">';
        var accountName = '<div class = "e-account-settings-dropdown-div">' +
            '<div class="e-account-settings-dropdown-label-div">' +
            '<label>Account</label></div>' +
            '<input type="text" class="e-required e-account-settings" id="devops-account" placeholder="Account"/>' +
            '</div>';
        var projectName = '<div class = "e-account-settings-dropdown-div">' +
            '<div class="e-account-settings-dropdown-label-div">' +
            '<label>Team Project</label></div>' +
            '<input type="text" class="e-required e-account-settings" id="devops-project" placeholder="TeamProject"/>' +
            '</div>';
        var repositoryName = '<div class = "e-account-settings-dropdown-div">' +
            '<div class="e-account-settings-dropdown-label-div">' +
            '<label>Repository Name</label></div>' +
            '<input type="text" class="e-required e-account-settings" id="devops-repository" placeholder="Repository Name"/>' +
            '</div>';
        var endTag = '</div>' + '</div>';
        var type = window.authData.type;
        if (type !== null) {
            return $(parentDiv).append(accountName, projectName, repositoryName, endTag);
        } else {
            return $(parentDiv).append(accountName, projectName, endTag);
        }
    }

    this.renderFreshBooksAccountSettings = function () {
        return '<div class="e-account-settings-content-wrapper">' +
            '<div class = "e-account-settings-content">' +
            '<div class = "e-account-settings-dropdown-div">' +
            '<div class="e-account-settings-dropdown-label-div">' +
            '<label>Account ID</label></div>' +
            '<input type="text" class="e-required e-account-settings" id="freshbooks-account-id" placeholder="Account ID"/>' +
            '</div></div></div>';
    };

    this.renderGithubRepositorySettings = function () {
        return '<div class="e-account-settings-content-wrapper">' +
            '<div class="e-account-settings-content">' +
            '<div class="e-account-settings-dropdown-div">' +
            '<div class="e-account-settings-dropdown-label-div"><label>Repositories :</label></div>' +
            '<div class="e-repositories" id="list-repositories"></div>' +
            '</div><div><label id="items-count" style="margin-top: -0.5%"> 0 item(s) selected</div>';
    };

    this.getAccountsSettings = function (args) {
        var id = 'list-accounts';
        var request = {
            provider: window.authData.provider,
            serviceId: this.selectedAccount.Id,
        };
        this.AjaxPost('POST', window.authData.designerService + this.api.getAccountSettings, request, this.onFetchGASettings, id);
    }

    this.getOrganizationsSettings = function (args) {
        var id = 'list-orgs';
        var request = {
            provider: window.authData.provider,
            serviceId: this.selectedAccount.Id,
        };
        this.AjaxPost('POST', window.authData.designerService + this.api.getXeroOrganizations, request, this.onFetchXeroOrganizationSettings, id);
    }

    this.getGithubRepositories = function (args) {
        var id = 'list-repositories';
        $("#template-header").css("display", "none");
        $("#template-repo-header").css("display", "block");
        $("#template-connect-header").css("display", "none");
        $("#template-repository-header").css("display", "block");
        var request = {
            username: $("#username").val(),
            personalAccessToken: $("#password").val()
        };
        this.AjaxPost('POST', window.authData.designerService + this.api.getRepositories, request, this.onFetchGitHubRepositorySettings, id);
    }

    this.onAccSelection = function (args) {
        var id = 'list-properties';
        var value = args.currentTarget.value;
        this.accountId = $(args.currentTarget).find('option[value=' + value + ']').data('data').id;
        var request = {
            provider: window.authData.provider,
            serviceId: this.selectedAccount.Id,
            accountId: this.accountId
        };
        this.AjaxPost('POST', window.authData.designerService + this.api.getWebProperties, request, this.onFetchGASettings, id);
    }
	
    this.onPropertySelection = function (args) {
        var id = 'list-views';
        var value = args.currentTarget.value;
        this.propertyId = $(args.currentTarget).find('option[value=' + value + ']').data('data').id;
        var request = {
            provider: window.authData.provider,
            serviceId: this.selectedAccount.Id,
            accountId: this.accountId,
            propertyId: this.propertyId
        };
        this.AjaxPost('POST', window.authData.designerService + this.api.getViews, request, this.onFetchGASettings, id);
    }

    this.onViewSelection = function (args) {
        var value = args.currentTarget.value;
        this.viewId = $(args.currentTarget).find('option[value=' + value + ']').data('data').id;
    }

    this.onOrganizationSelection = function (args) {
        var value = args.currentTarget.value;
        this.xeroOrganizationId = $(args.currentTarget).find('option[value=' + value + ']').data('data').TenantId;
    };

    this.onFetchGASettings = function (data, id, args) {
        var accList = $('#' + id);
        var optionList = [];
        if (args.Status) {
            if (args.Data && args.Data.length !== 0) {
                data = JSON.parse(args.Data);
                if (data.items.length !== 0) {
                    accList.html('');
                    for (var i = 0; i < data.items.length; i++) {
                        optionList.push($('<option>').html($('<div>').html(data.items[i].name)).data('data', data.items[i]).attr('value', data.items[i].id));
                    }
                    accList.append(optionList);
                    switch (id) {
                        case 'list-accounts':
                            this.onAccSelection({ currentTarget: accList[0] });
                            $('.e-auth-content, .e-new-account').css('display', 'none');
                            $('#account-settings-container, .e-back-btn-div').css('display', 'inline');
                            break;
                        case 'list-properties':
                            this.onPropertySelection({ currentTarget: accList[0] });
                            break;
                        case 'list-views':
                            this.onViewSelection({ currentTarget: accList[0] });
                            this.hideLoader();
                            break;                     
                    }                      
                }
                else {
                    this.hideLoader();
                    $('#error-msg').html('');
                    this.showErrorMsg('You may not have any Google Analytics account.');
                }
            }
        } else {
            this.hideLoader();   
            $('#error-msg').html('');
            var errorMsg = null;
            try {
                errorMsg = JSON.parse(args.Message).error.message;
            }
            catch (e) {
                errorMsg = args.Message;
            }
            this.showErrorMsg(errorMsg);
        }      
    }

    this.onFetchXeroOrganizationSettings = function (data, id, args) {
        var orgList = $('#' + id);
        var optionList = [];
        if (args.Status) {
            if (args.Data && args.Data.length !== 0) {
                data = JSON.parse(args.Data);
                if (data.orgList.length !== 0) {
                    orgList.html('');
                    for (var i = 0; i < data.orgList.length; i++) {
                        optionList.push($('<option>').html($('<div>').html(data.orgList[i].OrganizationName)).data('data', data.orgList[i]).attr('value', data.orgList[i].TenantId));
                    }
                    orgList.append(optionList);
                    switch (id) {
                        case 'list-orgs':
                            this.onOrganizationSelection({ currentTarget: orgList[0] });
                            $('.e-auth-content, .e-new-account').css('display', 'none');
                            $('#account-settings-container, .e-back-btn-div').css('display', 'inline');
                            this.hideLoader();
                            $('#error-msg').html('');
                            break;
                    }
                }
                else {
                    this.hideLoader();
                    $('#error-msg').html('');
                    this.showErrorMsg('You may not have any Organizations in your Xero account.');
                }
            }
        } else {
            this.hideLoader();
            $('#error-msg').html('');
            var errorMsg = null;
            try {
                errorMsg = JSON.parse(args.Message).error.message;
            }
            catch (e) {
                errorMsg = args.Message;
            }
            this.showErrorMsg(errorMsg);
        }
    };

    this.onFetchGitHubRepositorySettings = function (data, id, args) {
        var reposList = $('#' + id);
        if (args.Status) {
            if (args.Data && args.Data.length !== 0) {
                data = JSON.parse(args.Data);
                if (data.repoList.length !== 0) {
                    reposList.html('');
                    var repoSearchElem = '<div class="e-search-panel" style="display: flex;align-items: center;"><input type="text" id="search" class="e-searchbox" name="search"><img class="search-icon" src="/Connection/Content/Images/search-icon.png" style="margin-left: -18px;"><input type="checkbox" id="selectAll" class="e-select-all" name="selectAll"><label for="selectAll"> Select All</label></div>';
                    reposList.append(repoSearchElem);
                    $('#search').on('keyup', $.proxy(this.searchRepos, this));
                    $('#selectAll').on('change', $.proxy(this.checkUncheckAll, this));
                    for (var i = 0; i < data.repoList.length; i++) {
                        var repoDivElem = '<div class="repo-div"><label><input type="checkbox" class="e-repos" name="repository" value="' + data.repoList[i].FullName + '">' + data.repoList[i].FullName + '</label></div>';
                        reposList.append(repoDivElem);
                    }
                    if (data.repoList.length > 0) {
                        $('.e-repos').on('change', $.proxy(this.getItemsCountText, this));
                    }
                    switch (id) {
                        case 'list-repositories':
                            $('.e-auth-content, .e-new-account').css('display', 'none');
                            $('#account-settings-container, .e-back-btn-div').css('display', 'inline');
                            this.hideLoader();
                            $('#error-msg').html('');
                            break;
                    }
                }
                else {
                    this.hideLoader();
                    $('#error-msg').html('');
                    this.showErrorMsg('Provided account does not have any repository.');
                }
            }
        } else {
            this.hideLoader();
            $('#error-msg').html('');
            var errorMsg = null;
            try {
                errorMsg = JSON.parse(args.Message).error.message;
            }
            catch (e) {
                errorMsg = args.Message;
            }
            this.showErrorMsg(errorMsg);
        }
    }

    this.getItemsCountText = function (args) {
        $("#items-count").text($("input[name='repository']:checked").length + " item(s) selected");
    }

    this.checkUncheckAll = function (args) {
        var checkboxState = $("input#selectAll.e-select-all").is(":checked");
        $('.e-repos').each(function () {
            var $this = $(this);
            $this[0].checked = checkboxState;
        });
        this.getItemsCountText();
    }

    this.searchRepos = function () {
        var searchedKey = $('.e-searchbox').val();
        $('.repo-div').each(function () {
            var $this = $(this);
            $this[0].style.display = (searchedKey === '' || $this[0].innerText.toUpperCase().startsWith(searchedKey.toUpperCase())) ? 'block' : 'none';
        });
    }

    this.onBackBtnClick = function () {
        $('.e-auth-content,.e-new-account').css('display', 'inline');
        $('.e-new-account').css('display', (window.authData.service.toUpperCase() === "GITHUB") ? 'none' : 'inline');
        this.defineHeader();
        $('#account-settings-container,.e-back-btn-div').css('display', 'none');
    }

    this.AjaxPost = function (method, url, data, success, id) {
         $.ajax({
            type: method,
            url: url,
            crossDomain: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data),
            beforeSend: $.proxy(function (req, evt) {
                this.showLoader();
                req.setRequestHeader('Caller', window.authData.server);
                req.setRequestHeader('Authorization', window.authData.token);
            }, this),
            success: $.proxy(success, this, data, id),
            error: $.proxy(function (evt) {
                this.showErrorMsg('An error occured while fetching the data.' + evt.status + ':' + evt.statusText);
             }, this),
         });
    }
 };
$(function () {
    var obj = new authorize();
    obj.initialize();
});
