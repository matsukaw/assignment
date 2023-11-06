function setOptionSetDisplayValue() {
    var formContext = Xrm.Page;

    // オプションセットのフィールド名を正確に指定
    var optionSetField = formContext.getAttribute("preferredcontactmethodcode");
    var displayField = formContext.getAttribute("jobtitle");

    if (optionSetField && displayField) {
        // オプションセットの値を取得
        var optionSetValue = optionSetField.getValue();

        // オプションセットの選択肢の一覧を取得
        var optionSetOptions = optionSetField.getOptions();

        // オプションセットの値に対応する表示名を検索
        var displayValue = "";
        for (var i = 0; i < optionSetOptions.length; i++) {
            if (optionSetOptions[i].value === optionSetValue) {
                displayValue = optionSetOptions[i].text;
                break;
            }
        }

        // 表示名を別のフィールドにセット
        displayField.setValue(displayValue);
　　　　　formContext.data.entity.save();
    }
}

// オプションセットのフィールドが変更されたときに関数を実行
Xrm.Page.getAttribute("preferredcontactmethodcode").addOnChange(setOptionSetDisplayValue);
