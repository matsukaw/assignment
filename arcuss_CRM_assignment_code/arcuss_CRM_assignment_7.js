// 取引先企業名 フィールドが変更されたときのイベントハンドラを設定
Xrm.Page.getAttribute("parentcustomerid").addOnChange(function () {
    // 取引先企業名 フィールドの値を取得
    var companyName = Xrm.Page.getAttribute("parentcustomerid").getValue();
debugger;
    // 値がセットされているかを確認
    if (companyName && companyName[0]) {
        if (companyName[0].entityType === "account") {
            var companyId = companyName[0].id; // 取引先企業のレコードID

            // 取引先企業の業種（オプションセット）を取得
            Xrm.WebApi.retrieveRecord("account", companyId, "?$select=industrycode").then(
                function (account) {
                    var industryCodeValue = account.industrycode ? account.industrycode : null;
                    var industryText = getIndustryText(industryCodeValue);

                    if (industryText !== null) {
                        // 役職 フィールドに業種の表示名を設定
                        Xrm.Page.getAttribute("jobtitle").setValue(industryText);
                    } else {
                        // エラーハンドリング - 業種に該当する表示名が見つからない場合
                        // 取引先企業名を "役職" フィールドに設定
                        Xrm.Page.getAttribute("jobtitle").setValue(companyName[0].name);
                    }
                },
                function (error) {
                    // エラーハンドリング - WebAPIリクエストエラー
                    console.log(error.message);
                }
            );
        } else if (companyName[0].entityType === "contact") {
            // 取引先企業名が contact エンティティの場合、そのまま値を "役職" フィールドに設定
            Xrm.Page.getAttribute("jobtitle").setValue(companyName[0].name);
        }
    }
});

function getIndustryText(industryCode) {
    // 業種のオプションセット値に応じて表示名を返すロジックを実装
    var optionSetMapping = {
        1: "業種1の表示名",
        53: "建設業",
        56: "その他",
        30: "輸送",
        240: "金融/保険業",
        82: "不動産業",
        60: "製造業",
        // 他のオプションセット値に対する表示名を追加
    };

    // オプションセットの値から表示名を取得
    var industryText = optionSetMapping[industryCode];

    return industryText;
}
