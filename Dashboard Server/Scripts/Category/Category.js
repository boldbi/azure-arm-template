$(function() {
    $("#EditCategoryPopup").ejDialog({
        width: "600px",
        height: "250px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        closeOnEscape: true
    });
	var editCategoryPopupWrapperTemplateId = createLoader("EditCategoryPopup_wrapper");
    $("#EditCategoryPopup_wrapper").ejWaitingPopup({ template:$("#" + editCategoryPopupWrapperTemplateId) });
});

function deleteCategory(itemDetail) {
    $(this).parents(".dropdown").removeClass("open");
    $(this).parents(".dropdown").find(".dropdown-backdrop").remove();
    $("#delete-item-name").html(itemDetail.Name);
    $("#delete-item").attr("data-item-id", itemDetail.Id);
    $("#item-delete-confirmation").ejDialog("open");
    $("#item-delete-confirmation-wrapper").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: deleteConfirmationUrl,
        data: { itemId: itemDetail.Id, itemTypeId: itemDetail.ItemType, itemName: itemDetail.Name },
        async: false,
        success: function (data) {
            $("#item-delete-confirmation-wrapper").ejWaitingPopup("hide");
            $("#item-delete-confirmation").html(data);
        }
    });
}

function EditCategory(itemId, name, description) {
    $("#EditCategoryPopup #category_name").val(name);
    $("#EditCategoryPopup #category_description").val(description);
    $("#EditCategoryPopup").ejDialog("open");
    window.isEdited = false;
    window.editData = {
        ItemId: itemId,
        Name: name,
        Description: description
    }
}