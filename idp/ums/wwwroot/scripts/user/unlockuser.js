$(document).ready(function () {
    var userUnlockDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.UnlockUser,
        content: document.getElementById("unlock-user-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: unLockUser, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onUserUnlockDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.NoButton } }
        ],
        width: "472px",
        height: "auto",
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        visible: false
    });
    userUnlockDialog.appendTo("#unlock-user-confirmation");

    createWaitingPopup('unlock-user-confirmation');
});

$(document).on("click", ".unlock-user-class", function () {
    $(this).parent("li").addClass("unlock-user-id");
    onUserUnlockDialogOpen();
});

function unLockUser() {
    var userId = $(".unlock-user-id").attr("data-content");
    userId = userId === null || userId === undefined ? document.getElementById("user-id").value : userId;
    showWaitingPopup("unlock-user-confirmation");
    var userGrid = document.getElementById('user_grid') === null ? null : document.getElementById('user_grid').ej2_instances[0];
    var isUnlockedUser = unlockUser(userId);
    if (isUnlockedUser) {
        if (userGrid === null) {
            hideWaitingPopup("unlock-user-confirmation");
            onUserUnlockDialogClose();
            window.location.reload();
        }
        else {
            SuccessAlert(window.Server.App.LocalizationContent.UnlockUser, window.Server.App.LocalizationContent.UserUnlocked, 7000)
            userGrid.refresh();
            onUserUnlockDialogClose();
            hideWaitingPopup("unlock-user-confirmation");
        }
    }
    else {
        if (userGrid === null) {
            hideWaitingPopup("unlock-user-confirmation");
            onUserUnlockDialogClose();
            window.location.reload();
        }
        else {
            WarningAlert(window.Server.App.LocalizationContent.UnlockUser, window.Server.App.LocalizationContent.UserUnlockedError, null, 7000)
            userGrid.refresh();
            onUserUnlockDialogClose();
            hideWaitingPopup("unlock-user-confirmation");
        }
    }
}

$(document).on("click", ".unlock-userclass", function () {
    var userId = $(".unlock_user").attr("data-content");
    unlockUser(userId);
    window.location.reload();
});

function onUserUnlockDialogOpen() {
    document.getElementById("unlock-user-confirmation").ej2_instances[0].show();
}

function onUserUnlockDialogClose() {
    document.getElementById("unlock-user-confirmation").ej2_instances[0].hide();
}


function unlockUser(userId) {
    var isUserLocked = false;
    $.ajax({
        type: "POST",
        url: unlockUserUrl,
        async: false,
        data: { "userId": userId },
        success: function (result) {
            isUserLocked = result.Status;
        }
    });

    return isUserLocked;
}

$(document).on("click", "#unlock-user", function () {
    onUserUnlockDialogOpen();
});
