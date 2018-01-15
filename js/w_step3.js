 /**
  * 　STEP3：指定されたファイルパスの画像でページ画像を置き換え
  *    ・画像をロードする関数を以下の通り修正する
  *    　　－アラートを消す
  *    　　－表示画像のパスを基に指定場所に画像をロードする
  *    ・（ついでに）リロードボタンを押すと画像表示が変わることを確認する
  **/

 const IMG_PATH_BASE = "image/chicken_4/";  // 画像パスのベース

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
    // 画像は4枚用意されているので、4より小さいランダム数値を設定
    var random_no = Math.floor( Math.random() * 4 );
    console.log("ランダム数値：" + random_no);
    // ランダム数値を基に画像パスを設定
    img_path = IMG_PATH_BASE + "img" + random_no + ".jpg";
    console.log("画像パス：" + img_path);
    // 画像を画面に表示（ローディング画像と置き換え）
    $("#displayStage").html("<img src='" + img_path + "' alt='唐揚げ'>");
  }


  /**
  * Handler：イベントハンドラー
  **/

  // 画像リロードボタンがクリックされた時の処理
  function onClickReloadeImgButtonHandler(event) {
    console.log(event.target.id + " btn clicked!");
    // 画像を再ロードする
    loadImage();
  }


  /**
   * Listener（on）：イベントリスナーの登録
   **/

   // 画像リロードボタンクリックのイベント登録
  $("#reloadImgBtn").on('click', onClickReloadeImgButtonHandler);


  // init呼び出し
  init();
});
