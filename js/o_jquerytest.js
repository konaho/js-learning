/**
 *
 * 　jquetyテスト
 * 　
 **/


 var orderTestBtnHandler = function() {
   location.reload();
 };


$(function(){
  console.log("$(function(){});");
});



$(document).ready(function(){
  console.log("$(document).ready()");

  $("#orderTestBtn").on('click', orderTestBtnHandler);

});
