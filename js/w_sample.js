/**
 * 　画面を表示するごとに画像が切り替わる仕組みを作る
 * 　いくつかの画面を並べると正しい画像になる
 * 　（複数名で参加し、とある画像を揃えられたら賞品が当たるようなキャンペーンを想定）
 **/

const IMG_PATH_BASE = "image/";  // 画像パスのベース
const DISPLAY_LIST = ["#numberSelect", "#typeSelect", "#displayImage"];   // 画面リスト
const BTN_REWARD_LIST = ["chicken", "drink", "potato", "potato", "chicken", "chicken", "drink", "potato"];   // 画像シリーズリスト
const CLASS_HIDE = "hide";

var display_num = 0;  // 現在の画面番号
var member_num = 0;   // 選択された参加人数
var selected_reward = ""; // 選択された画像シリーズの名前
var img_path = ""; // 表示する画像パス


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
   * init：ロード完了時の処理（初期処理）
   **/
  function init() {
    // 画面遷移　←セレクタ画面
    changeDisplay(1);
  }


  /**
  * Handler：イベントハンドラー
  **/

  // 戻るボタンがクリックされた時の処理
  function onClickBackButtonHandler(event) {
    console.log(event.target.id + " btn clicked!");
    // 初期画面でなければ前の画面に遷移する
    if(display_num > 1) {
      display_num -= 1;
    }
    changeDisplay(display_num);
  }

  // プルダウンが選択された時の処理
  function onChangeSelectHandler(event) {
    console.log(event.target.id + " selected!");
    // セレクタのval()から選択されたセレクタの値を取得
    member_num = $(event.target).val();
    console.log("参加人数: " + member_num);
    // 選択がなかったらアラート表示し、選択されていればボタン画面に遷移する
    if(member_num == 0) {
      alert("参加人数の選択をお願いします。");
    } else {
      changeDisplay(2);
    }
  }

  // ボタンがクリックされた時の処理
  function onClickButtonHandler(event) {
    console.log(event.target.id + " btn clicked!");
    // クリックされたボタンのidからボタン番号を取得（btn_xxという命名規則なので、5文字目以降を取得）
    var btn_id = event.target.id;
    var btn_no = btn_id.slice(4);
    // ボタン番号を基に選択された画像シリーズを配列から調べ、選択された画像シリーズ名を変数に設定
    selected_reward = BTN_REWARD_LIST[btn_no-1]
    console.log("画像シリーズ: " + selected_reward);
    changeDisplay(3);
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

   // 戻るボタンクリックのイベント登録
   $("#backBtn").on('click', onClickBackButtonHandler);
  // プルダウン選択のイベント登録
  $("#selectDivideNumber").on('change', onChangeSelectHandler);
  // ボタンクリックのイベント登録
  $("#typeSelect button").on('click', onClickButtonHandler);
  // 画像リロードボタンクリックのイベント登録
  $("#reloadImgBtn").on('click', onClickReloadeImgButtonHandler);


  // init呼び出し
  init();
});
