const webApiUrl = Xrm.Page.context.getClientUrl() + "/api/data/v9.1";
// 取引先担当者の詳細情報を取得する関数
function getContactDetails(contactId, callback) {
  Xrm.WebApi.retrieveRecord("contact", contactId, "?$select=_parentcustomerid_value").then(
    function (contactDetails) {
      const parentCustomerId = contactDetails["_parentcustomerid_value"];
      if (parentCustomerId) {
        callback(parentCustomerId);
      } else {
        alert("エラー: 取引先企業が関連付けられていません。");
      }
    },
    function (error) {
      alert("エラー: 取引先担当者の詳細情報の取得に失敗しました - " + error.message);
    }
  );
}
// 取引先企業の詳細情報を取得する関数
function getAccountDetails(accountId, callback) {
  Xrm.WebApi.retrieveRecord("account", accountId, "?$select=description").then(
    function (accountDetails) {
      const accountDescription = accountDetails["description"];
      if (accountDescription) {
        callback(accountDescription);
      } else {
        alert("エラー: 取引先企業の説明が取得できませんでした。");
      }
    },
    function (error) {
      alert("エラー: 取引先企業の詳細情報の取得に失敗しました - " + error.message);
    }
  );
}
// 取引先企業の説明フィールドを更新する関数
function updateAccountDescription(accountId, description) {
  const entity = {};
  entity.description = description;
  Xrm.WebApi.updateRecord("account", accountId, entity).then(
    function () {
      alert("取引先企業の説明が更新されました。");
    },
    function (error) {
      alert("エラー: 取引先企業の説明の更新に失敗しました - " + error.message);
    }
  );
}
// 取引先担当者の個人的事項の説明が変更されたときに実行する関数
function onContactDescriptionChange() {
  Xrm.Page.getAttribute("description").addOnChange(function (context) {
    const newDescription = context.getFormContext().getAttribute("description").getValue();
    const contactId = Xrm.Page.data.entity.getId();
    getContactDetails(contactId, function (parentCustomerId) {
      getAccountDetails(parentCustomerId, function (accountDescription) {
        updateAccountDescription(parentCustomerId, newDescription);
      });
    });
  });
}
onContactDescriptionChange();
//