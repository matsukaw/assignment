// parentcustomerid フィールドの変更を監視
Xrm.Page.getAttribute("parentcustomerid").addOnChange(function () {
    // parentcustomerid フィールドの選択内容を取得
    var parentCustomerId = Xrm.Page.getAttribute("parentcustomerid").getValue();

    // parentcustomerid フィールドが選択内容を持っていない場合
    if (!parentCustomerId || !parentCustomerId[0] || !parentCustomerId[0].entityType) {
        // jobtitle フィールドをクリア
        Xrm.Page.getAttribute("jobtitle").setValue(null);
    } else {
        // 選択された関連エンティティの種類を取得
        var entityType = parentCustomerId[0].entityType;

        // 選択された関連エンティティの ID を取得
        var entityId = parentCustomerId[0].id;

        if (entityType === "contact") {
            // 関連エンティティが contact の場合
            Xrm.WebApi.retrieveRecord("contact", entityId, "?$select=yomifullname").then(function (contactRecord) {
                // 関連エンティティの yomifullname フィールドから値を取得
                var yomifullname = contactRecord.yomifullname;

                // yomifullname フィールドの値を jobtitle フィールドに設定
                Xrm.Page.getAttribute("jobtitle").setValue(yomifullname);
            }).catch(function (error) {
                // 関連エンティティが contact であり、yomifullname フィールドの値を取得できない場合
                // エラーメッセージを表示
                console.log(error.message);
            });
        } else if (entityType === "account") {
            // 関連エンティティが account の場合
            Xrm.WebApi.retrieveRecord("account", entityId, "?$select=yominame").then(function (accountRecord) {
                // 関連エンティティの yominame フィールドから値を取得
                var yominame = accountRecord.yominame;

                // yominame フィールドの値を jobtitle フィールドに設定
                Xrm.Page.getAttribute("jobtitle").setValue(yominame);
            }).catch(function (error) {
                // 関連エンティティが account であり、yominame フィールドの値を取得できない場合
                // エラーメッセージを表示
                console.log(error.message);
            });
        }
    }
});
