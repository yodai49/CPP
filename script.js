$("#calbutton").on("click",function(){
  var n=document.getElementById(`inputn`).value;
  var k=document.getElementById(`inputk`).value;
  var q=document.getElementById(`inputq`).value;
  n=Number(n);
  k=Number(k);
  q=Number(q);
  var sum = n+k+q;
})

$(function(){
  $(window).scroll(function (){
    $("#notice1").each(function(){
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/5){
        $(this).addClass("fade_on");
      } else {
        $(this).removeClass("fade_on");
      }
    });
  });
});


$(function(){
  $(window).scroll(function (){
    $("#notice2").each(function(){
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/5){
        $(this).addClass("fade_on");
      } else {
        $(this).removeClass("fade_on");
      }
    });
  });
});


$(function(){
  $(window).scroll(function (){
    $("#notice3").each(function(){
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/5){
        $(this).addClass("fade_on");
      } else {
        $(this).removeClass("fade_on");
      }
    });
  });
});