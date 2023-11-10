function disableFaxField() {
    var formContext = Xrm.Page;

    // フォームタイプを取得
    var formType = formContext.ui.getFormType();

    // フォームタイプが新規作成モード（1）でない場合
    if (formType !== 1) {
        // フィールドのラベル「FAX」を非活性化
        var faxField = formContext.getControl("fax");

        if (faxField) {
            // フィールドを非活性化
            faxField.setDisabled(true);
        }
    }
}

// フォームの読み込み時に関数を実行
Xrm.Page.data.entity.addOnLoad(disableFaxField);
