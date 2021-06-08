function qcal(n,k,q){
  var comq=[];
  var powq=[];
  var result;
  //start of error check
  if (isNaN(n)|| isNaN(k)|| isNaN(q))    return "N, k, q must be numeric"; //Is numeric?
  if (n <= 0) return "N must be larger than zero";
  if (n < k|| k < 0) return "0"; //0 <= k <= n?
  if (k == 0 || n == k) return "1"; // k == 0 or k == n?
  if (n / 2 < k) k = n-k; //Is k larger than n/2?
  if (q == 0) return "1"; //Is q equal to zero?
  if (n * k > 100000000) return "too large";
  //end of error check
  powq[0]=1;
  for(var i = 1; i <= k;i++){
    powq[i]=powq[i-1]*q;
  }
  for(var i = 0; i<= n;i++){
    comq[i]=[];
    for(var j = 0;j <= k; j++){
      comq[i][j]=0;
    }
  }
  comq[0][0]=1;
  for(var i = 1;i <= n; i++){
//    comq[i]=[];
    comq[i][0]=1;
    for(var j = 1;j<=k;j++){
      comq[i][j]=comq[i-1][j-1]+powq[j]*comq[i-1][j];
      if (!isFinite(comq[i][j])){
        result="too large";
        return result;
      } 
    }
  }
  result=comq[n][k];
  return result;
}

$("#calbutton").on("click",function(){
//  document.getElementById(`result1`).classList.add("transparent");
  var n=document.getElementById(`inputn`).value;
  var k=document.getElementById(`inputk`).value;
  var q=document.getElementById(`inputq`).value;
  n=Number(n);
  k=Number(k);
  q=Number(q);
  var sum =qcal(n,k,q);
  if (isNaN(sum)){
    document.getElementById(`result1`).textContent=``;
    document.getElementById(`error`).textContent=sum;    
    document.getElementById(`result1`).animate([{opacity:`1`},{opacity:`0`}],300);
    document.getElementById(`error`).animate([{opacity:`0`},{opacity:`1`}],300);
  } else{ 
    document.getElementById(`result1`).textContent=sum;
    document.getElementById(`result1`).animate([{opacity:`0`},{opacity:`1`}],300);
    document.getElementById(`error`).animate([{opacity:`1`},{opacity:`0`}],300);
    document.getElementById(`error`).textContent=``;    
  }
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