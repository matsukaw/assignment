// 新しい関数を定義
function setJobTitleFromAccountName() {
    // 取引先企業のフィールド名を適切な名前に変更してください
    var accountField = Xrm.Page.getAttribute("parentcustomerid");

    // 役職のフィールド名を適切な名前に変更してください
    var jobTitleField = Xrm.Page.getAttribute("jobtitle");

    // 取引先企業の名前を取得
    var accountName = accountField.getValue();

    // 取引先企業が選択されている場合、役職フィールドに名前を設定
    if (accountName) {
        jobTitleField.setValue(accountName[0].name); // "name" プロパティは取引先企業名を含みます
    } else {
        jobTitleField.setValue(null); // 取引先企業が選択されていない場合、役職フィールドをクリア
    }
}

// 新しい関数をフィールドの"onchange"イベントに関連付け
Xrm.Page.getAttribute("parentcustomerid").addOnChange(setJobTitleFromAccountName);
