// 取引先担当者の個人的事項の説明が変更されたときに実行する関数
function onContactDescriptionChange() {
  Xrm.Page.getAttribute("description").addOnChange(function (context) {
    // 新しい説明の値を取得
    const newDescription = context.getFormContext().getAttribute("description").getValue();

    // 取引先担当者の取引先企業名を取得
    const parentCustomerLookup = Xrm.Page.getAttribute("parentcustomerid").getValue();

    if (parentCustomerLookup && parentCustomerLookup[0]) {
      const parentCustomerName = parentCustomerLookup[0].name;

      // 取引先企業のGUIDを取得
      getAccountIdByAccountName(parentCustomerName, newDescription);
    } else {
      console.log("エラー: 取引先企業が関連付けられていないか、取引先企業名がありません。");
      alert("エラー: 取引先企業が関連付けられていないか、取引先企業名がありません。");
    }
  });
}

// 取引先企業名から取引先企業のGUIDを取得
function getAccountIdByAccountName(accountName, newDescription) {
  const fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="account">
      <attribute name="accountid" />
      <filter type="and">
        <condition attribute="name" operator="eq" value="${accountName}" />
      </filter>
    </entity>
  </fetch>`;

  // WebAPIを使用して取引先企業のGUIDを取得
  Xrm.WebApi.retrieveMultipleRecords("account", `?fetchXml=${encodeURIComponent(fetchXml)}`)
    .then(function (result) {
      if (result.entities.length > 0) {
        const accountId = result.entities[0].accountid;

        // 取引先企業の説明を更新
        updateAccountDescription(accountId, newDescription);
      } else {
        console.log("エラー: 取引先企業が見つかりませんでした。");
        alert("エラー: 取引先企業が見つかりませんでした。");
      }
    })
    .catch(function (error) {
      console.log("エラー: 取引先企業の検索に失敗しました - " + error.message);
      alert("エラー: 取引先企業の検索に失敗しました - " + error.message);
    });
}

// 取引先企業の説明フィールドを更新する関数
function updateAccountDescription(accountId, description) {
  const entity = {};
  entity.description = description;

  // 取引先企業の説明を更新
  Xrm.WebApi.updateRecord("account", accountId, entity).then(
    function () {
      console.log("取引先企業の説明が更新されました。");
      alert("取引先企業の説明が更新されました。");
    },
    function (error) {
      console.log("エラー: 取引先企業の説明の更新に失敗しました - " + error.message);
      alert("エラー: 取引先企業の説明の更新に失敗しました - " + error.message);
    }
  );
}

// メインの処理フローを呼び出す
onContactDescriptionChange();
