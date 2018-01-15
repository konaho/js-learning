/**
 *  ※複数人で同時にアクセスしたときに画像と画像シリーズの対応は一緒でないといけないので、
 * 　　ボタンと画像シリーズの関係は固定になるように、または1時間おきに固定になるように作り直す
 * 　※console.log（）はすべて消すこと
 **/

const IMG_PATH_BASE = "image/";  // 画像パスのベース
const DISPLAY_LIST = ["#numberSelect", "#typeSelect", "#displayImage"];   // 画面リスト
const REWARD_LIST = ["chicken", "potato", "drink"];   // 画像シリーズリスト
const BTNTEXT_LIST = ["★", "☆", "■", "□", "◆", "◇", "◎", "●", "○", "▲", "△"];   // ボタンに表示される文字リスト
const CLASS_HIDE = "hide";
// const CLASS_SHOW = "show";

var display_num = 0;  // 現在の画面番号
var member_num = 0;
var selected_reward = ""; // 選択された画像シリーズの名前
var img_path = ""; // 表示する画像パス

var btn_reward_list = []; // 各ボタンに割り当てられた画像シリーズを格納する


$(document).ready(function(){

  /**
  * changeDisplay：画面遷移
  * @param: 遷移先画面の番号（1:分割数セレクタ、2:ボタン選択、3:画像表示）
  **/
  function changeDisplay(display_to) {
    // 画面遷移
    // （非表示にしたいsectionにhideクラスをつけ、表示させたいsectionからhideクラスを外す）
    // （hideクラスは既についているか場合はそのまま、ついていない場合のみつける）
    var length = DISPLAY_LIST.length;
    for (var i = 0; i < length; i++) {
      if(i == (display_to-1)) {
        if($(DISPLAY_LIST[i]).hasClass(CLASS_HIDE)) {
          $(DISPLAY_LIST[i]).removeClass(CLASS_HIDE);
        }
      } else {
        if(!$(DISPLAY_LIST[i]).hasClass(CLASS_HIDE)) {
          $(DISPLAY_LIST[i]).addClass(CLASS_HIDE);
        }
      }
    }
    // 現在の画面番号を更新
    display_num = display_to;
    // 画面に合わせて必要な処理を実行
    switch (display_to) {
      case 1: // セレクタ画面の場合
        break;
      case 2: // ボタン画面の場合
        //setBtns();    // 表示ごとにボタンをランダムに設定する場合は利用
        break;
      case 3: // 画像表示画面の場合
        loadImage();
        break;
      default:
        console.log("不正な画面遷移が行われました。");

    }
  };

  /**
   * loadImage：画像のロード
   * ランダムで表示する画像を決めて表示する
   **/
  function loadImage() {
    // 分割数より小さいランダム数値を設定
    var random_no = Math.floor( Math.random() * member_num );
    // これまで選択されてきた情報を基に画像パスを設定
    img_path = IMG_PATH_BASE + selected_reward + "_" + member_num + "/img" + random_no + ".jpg";
    // 画像を画面に表示
    $("#displayStage").html("<img src='" + img_path + "' alt='" + selected_reward + "'>");
  }

  /**
   * setBtns：ボタンに対象画像シリーズをセットする
   **/
  function setBtns() {
    // 画像シリーズ数をセット（画像シリーズリスト配列の長さから判定）
    var reward_num = REWARD_LIST.length;
    // ボタンテキスト数をセット（ボタンテキストリスト配列の長さから判定）
    var btntext_num = BTNTEXT_LIST.length;
    // ボタンの数をセット（HTMLのボタン数を数える）
    var btn_num = $("#typeSelect #typeBtns button").length;
    console.log("btn_num: " + btn_num);
    // 一時的にランダム数値を格納する
    var tmp_random_reward = 0;  //リワード用
    var tmp_random_btn = 0;  //ボタン表示用

    // 各ボタンに商品画像をセットする
    console.log("-----\n【ボタン割り当て】");
    for (var i = 1; i <= btn_num; i++) {
      console.log("-- ボタン" + i);
      // ↓　画像シリーズをセット　↓
      // 画像シリーズ数より小さいランダムな値を出し、
      tmp_random_reward = Math.floor( Math.random() * reward_num );
      // その数値を基にボタン番号と画像シリーズの対応リストを作成
      btn_reward_list[i] = REWARD_LIST[tmp_random_reward];
      console.log("画像シリーズ: " + tmp_random_reward + ", " + REWARD_LIST[tmp_random_reward]);

      // ↓　ボタンテキストをセット　↓
      // ボタンテキスト数より小さいランダムな値を出し、
      tmp_random_btn = Math.floor( Math.random() * btntext_num );
      // その数値を基にボタンの表示を変更
      $("#btn_"+ i).text(BTNTEXT_LIST[tmp_random_btn]);
      console.log("テキスト: " + tmp_random_btn + ", " + BTNTEXT_LIST[tmp_random_btn]);
    }
    console.log("-----");
  }

  /**
   * init：ロード完了時の処理（初期処理）
   **/
  function init() {
    // ボタンに対象画像シリーズを割り当てる
    setBtns();
    // 画面遷移　←セレクタ画面
    changeDisplay(1);
  }


  /**
  * Handler：イベントハンドラー
  **/

  // 戻るボタンがクリックされた時の処理
  function onClickBackButtonHandler(event) {
    console.log(event.target.id + " btn clicked!");
    if(display_num > 1) {
      display_num -= 1;
    }
    changeDisplay(display_num);
  }

  // プルダウンが選択された時の処理
  function onChangeSelectHandler(event) {
    console.log(event.target.id + " selected!");
    member_num = $(event.target).val();
    if(member_num == 0) {
      alert("参加人数の選択をお願いします。");
    } else {
      changeDisplay(2);
    }
    console.log("参加人数: " + member_num);
  }

  // ボタンがクリックされた時の処理
  function onClickButtonHandler(event) {
    console.log(event.target.id + " btn clicked!");
    // クリックされたボタンのidからボタン番号を取得（btn_xxという命名規則なので、5文字目以降を取得）
    var btn_id = event.target.id;
    var btn_no = btn_id.slice(4);
    selected_reward = btn_reward_list[btn_no]
    console.log("画像シリーズ: " + selected_reward);
    changeDisplay(3);
  }


  // 画像リロードボタンがクリックされた時の処理
  function onClickReloadeImgButtonHandler(event) {
    console.log(event.target.id + " btn clicked!");
    // 画像を再ロードする
    loadImage();
  }

  /*
  // windowがリサイズされた時の処理
  function onResizeWindowHandler(event) {
    console.log("window resized.");
  }
  */


  /**
   * Listener（on）：イベントリスナーの登録
   **/

   // 戻るボタンクリックのイベント登録
   $("#backBtn").on('click', onClickBackButtonHandler);
  // プルダウン選択のイベント登録
  $("#selectDivideNumber").on('change', onChangeSelectHandler);
  // ボタンクリックのイベント登録
  $("#typeSelect button").on('click', onClickButtonHandler);
  // 画像リロードボタンクリックのイベント登録
  $("#reloadImgBtn").on('click', onClickReloadeImgButtonHandler);
  /*
  // windowリサイズのイベント登録
  $(window).on('risize', onResizeWindowHandler);
  */


  // init呼び出し
  init();
});
