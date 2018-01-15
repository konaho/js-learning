/**
 * 　STEP6：選んだプルダウンの値によって画像の分割数を変える
 *    ・プルダウン選択時用のイベントハンドラー関数を作る
 *    ・プルダウンセレクタにイベントハンドラーを設定する
 *    ・セレクタの選択された値（分割数）を識別し、変数に設定する
 *    ・分割数と決定された画像シリーズに従って、画像をロードする
 **/

 const IMG_PATH_BASE = "image/";  // 画像パスのベース
 const BTN_REWARD_LIST = ["chicken", "potato", "drink", "chicken", "potato", "drink", "potato", "drink"];   // 画像シリーズリスト


 var selected_reward = ""; // 選択された画像シリーズの名前
 var img_path = "";   // 表示する画像のフルパス

// 画面がロードされた後に処理される
$(document).ready(function(){

  /**
   * init：ロード完了時の処理（初期処理）
   **/
  function init() {
    // 画像をロード
    loadImage();
  }

  /**
   * loadImage：画像のロード
   * ランダムで表示する画像を決めて表示する
   **/
  function loadImage() {
    if(selected_reward == "") return;

    // 画像は4枚用意されているので、4より小さいランダム数値を設定
    var random_no = Math.floor( Math.random() * 4 );
    console.log("ランダム数値：" + random_no);
    // ランダム数値と選択された画像シリーズを基に画像パスを設定
    img_path = IMG_PATH_BASE + selected_reward + "_4" + "/img" + random_no + ".jpg";
    console.log("画像パス：" + img_path);
    // 画像を画面に表示（ローディング画像と置き換え）
    $("#displayStage").html("<img src='" + img_path + "' alt='"+ selected_reward + "'>");
  }


  /**
  * Handler：イベントハンドラー
  **/

  // ボタンがクリックされた時の処理
  function onClickButtonHandler(event) {
    console.log(event.target.id + " btn clicked!");
    // クリックされたボタンのidからボタン番号を取得（btn_xxという命名規則なので、5文字目以降を取得）
    var btn_id = event.target.id;
    var btn_no = btn_id.slice(4);
    // ボタン番号を基に画像シリーズを配列から調べ、選択された画像シリーズ名を変数に設定
    selected_reward = BTN_REWARD_LIST[btn_no-1]
    console.log("画像シリーズ: " + selected_reward);
    loadImage();
  }

  // 画像リロードボタンがクリックされた時の処理
  function onClickReloadeImgButtonHandler(event) {
    console.log(event.target.id + " btn clicked!");
    // 画像を再ロードする
    loadImage();
  }


  /**
   * Listener（on）：イベントリスナーの登録
   **/

   // ボタンクリックのイベント登録（jQueryは同じ属性を持つDOMに一気に指定することができる）
   $("#typeSelect button").on('click', onClickButtonHandler);
   // 画像リロードボタンクリックのイベント登録
   $("#reloadImgBtn").on('click', onClickReloadeImgButtonHandler);


  // init呼び出し
  init();
});
