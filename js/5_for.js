/**
* 　JS講座：繰り返し
*    繰り返し処理をする方法を説明。for文の使い方を例に従って説明します。
*    他にも do while文、for in文やeach文などがありますが、そこは機会があれば、、、
*    　・サイコロを10回振り、出た目の合計を表示する
*    　・formで指定された数分の行数を持つテーブルを作成する
**/

var countvalue = 0;   //サイコロを振る回数
var currentvalue = 0;   //今回のサイコロの出た目
var totalvalue = 0;   //サイコロの出た目の合計

var linevalue = 0;   //表示する行数

$(document).ready(function(){

});

//サイコロを振って出た目を返す
function xi() {
  // 1～6の値をランダムで取得
  var random_no = Math.floor( Math.random() * 6 ) + 1;
  return random_no;
}

function doXi() {
  // inputに入力された値（value）を取得　※val()は文字列で取得するので、parseInt()で数値に変換
  countvalue = parseInt($("#countvalue").val());
  console.log(countvalue);

  // 結果表示を初期化
  $("#displayArea1").html("");

  // それぞれの値を初期化
  currentvalue = 0;
  totalvalue = 0;
  // 指定された回数サイコロを振る
  for (var i = 1; i <= countvalue; i++) {
    // サイコロを振る
    currentvalue = xi();
    // 出た目を合計に合算する
    totalvalue += currentvalue;
    // 結果を画面に追記する
    $("#displayArea1").append("<p>" + i + "回目：" + currentvalue + "</p>");

    console.log(i + "回目：" + currentvalue + ", 合計：" + totalvalue);
  }
  // 最終的な合計を表示
  $("#displayArea1").append("<p>-------</p>");
  $("#displayArea1").append("<p>合計：" + totalvalue + " (" + countvalue + "回)</p>");
}

function makeTable() {
  // inputに入力された値（value）を取得　※val()は文字列で取得するので、parseInt()で数値に変換
  linevalue = parseInt($("#linevalue").val());
  console.log(linevalue);

  // テーブルのタグを格納する変数を作成し、1行目を追記
  var tableHTML = "<table>";
  //tableHTML += "<tr><th>No</th><th>名前</th><th>所属</th></tr>"

  // 指定された行数のテーブルを描画
  for (var i = 1; i <= linevalue; i++) {
    // 行を追加
    tableHTML += "<tr><td>" + i + "</td><td>名前</td><td>所属</td></tr>"
  }

  // テーブルタグを締める
　  tableHTML += "</table>"

  // 描画
  $("#displayArea2").html(tableHTML);
}
