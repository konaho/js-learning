/**
 * 　STEP2：画面がロードされたら、ランダムで1つのファイルパスを抽出（アラート表示）
 *    ・画面がロードされた後に呼び出される記述を書く
 *    ・画像をロードするための関数を作る
 *    ・ファイルパスのベースとなる定数と、設定されたファイルパスを格納する変数を作る
 *    ・画像をロードする関数の中で、
 *    　　－0から3の値をランダムで設定する（用意されている画像が4枚なので）
 *    　　－ランダム数値とファイルパスのベースを基に表示画像のパスを作る
 *    　　－作った表示画像のパスを変数に格納する
 *    　　－作った表示画像のパスをアラートで表示する
 *    ・スクリプトが全部読み込まれた後に画像をロードする関数を呼び出す
 *    ・（ついでに）リロードボタンくっつけて、押されたらファイルパスが再設定されるようにする
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
    alert("画像パス：" + img_path);
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
