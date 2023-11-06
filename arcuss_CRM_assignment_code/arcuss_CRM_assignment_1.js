function setDefaultPhoneNumber() {
    var phoneNumberField = Xrm.Page.getAttribute("telephone1");
    var defaultPhoneNumber = "1234-56-7890";

    if (!phoneNumberField.getValue()) {
        phoneNumberField.setValue(defaultPhoneNumber);
    }
}

// フォームが読み込まれたときにデフォルトの電話番号を設定
Xrm.Page.data.addOnLoad(setDefaultPhoneNumber);
