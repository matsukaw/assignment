function showDetailTab() {
    var formContext = Xrm.Page;

    // フォームのラベルを取得
    var formLabel = formContext.ui.formSelector.getCurrentItem().getLabel();

    // ラベルが「詳細」でない場合
    if (formLabel !== "詳細") { // フォームのラベルを正確に指定
        // タブの名前を指定してタブを取得
        var detailTab = formContext.ui.tabs.get("DETAILS_TAB"); // "tabName" を詳細タブの名前に置き換える

        if (detailTab) {
            // タブを表示する
            detailTab.setVisible(true);
        }
 }
}
// フォームの読み込み時に関数を実行
Xrm.Page.data.entity.addOnLoad(showDetailTab);
