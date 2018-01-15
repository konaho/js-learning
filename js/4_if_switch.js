/**
* 　JS講座：条件分岐
*    条件に従って処理を分岐する方法を説明。if文とswitch文の使い方を例に従って説明します。
*    　・入力された値に応じて背景色と太字が切り替わる（[背景色]～100：赤、～1000：黄色、1000～：青 [太字]～500：太字
*    　・チケットのステータスに応じてアイコンの色を変更
**/

const COLOR_RED = "red";
const COLOR_YELLOW = "yellow";
const COLOR_BLUE = "#4488c5";

const STYLE_BOLD = "bold";
const STYLE_NORMAL = "normal";

const COLOR_STATUS_DEFAULT = "#aaaaa";   //初期値
const COLOR_STATUS_NOTYET = "#ed8077";   //未処理
const COLOR_STATUS_DOING = "#4488c5";   //処理中
const COLOR_STATUS_DONE = "#5eb5a6";   //処理済み
const COLOR_STATUS_COMPLETE = "#b0be3c";   //完了

var nowValue = 0;   // フォーム入力された値
var status = 0;   // 選択されたステータス（0：未処理、1：処理中、2：処理済み、9：完了）

$(document).ready(function(){

});

function changeBGColor(color) {
  $("#displayArea1").css('background-color', color);
}
function changeTextWeight(style) {
  $("#displayArea1").css('font-weight', style);
}

function changedValue() {
  // inputに入力された値（value）を取得　※val()は文字列で取得するので、parseInt()で数値に変換
  nowValue = parseInt($("#somevalue").val());
  console.log(nowValue);

  if(nowValue < 100) {
    changeBGColor(COLOR_RED);
  } else if(nowValue < 1000) {
    changeBGColor(COLOR_YELLOW);
  } else {
    changeBGColor(COLOR_BLUE);
  }

  if(nowValue < 500) {
    changeTextWeight(STYLE_BOLD);
  } else {
    changeTextWeight(STYLE_NORMAL);
  }

}

function selectedStatus() {
  // セレクタで選択された値（value）を取得
  status = $("#statusSelect").val();
  console.log(status);

  // アイコンの色を変更
  switch (status) {
    case "未処理":
      $("#ticketIcon").html("未処理");
      $("#ticketIcon").css('background-color', COLOR_STATUS_NOTYET);
    break;
    case "処理中":
      $("#ticketIcon").html("処理中");
      $("#ticketIcon").css('background-color', COLOR_STATUS_DOING);
    break;
    case "処理済み":
      $("#ticketIcon").html("処理済み");
      $("#ticketIcon").css('background-color', COLOR_STATUS_DONE);
    break;
    case "完了":
      $("#ticketIcon").html("完了");
      $("#ticketIcon").css('background-color', COLOR_STATUS_COMPLETE);
    break;
    default:
      $("#ticketIcon").html("未選択");
      $("#ticketIcon").css('background-color', COLOR_STATUS_DEFAULT);
  }
}
