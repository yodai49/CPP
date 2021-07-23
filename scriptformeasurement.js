var myChart;
var timeoutflg;
var timer;
var timewatch;
function myisNaN(nan){
  if (typeof nan == "bigint"){
    return 0;
  } else{
    return isNaN(nan);
  }
}
function qcal(n,k,q){
  var comq=[];
  var powq=[];
  var result = 0;
  var starttime=performance.now();
  timeoutflg=0;
  //start of error check
  if (myisNaN(n)|| myisNaN(k)|| myisNaN(q)) return "N, k, q must be numeric"; //Is numeric?
  if (n <= 0) return "N must be larger than zero";//0 <= n?
  if (n != Math.floor(n) || k != Math.floor(k)) return "N, k must be integer";
  if (n < k|| k < 0) return "0"; //0 <= k <= n?
  if (k == 0 || n == k) return "1"; // k == 0 or k == n?
  if (n < k*2) k = n-k; //Is k larger than n/2?
  //end of error check
  if (Number.isInteger(q)){///////////////Q is integer
    q=BigInt(q);
    powq[0]=BigInt("1");
    for(var i = 1; i <= k;i++){
      powq[i]=powq[i-1]*q;
    }
    for(var i = 0; i<= n;i++){
      comq[i]=[];
      for(var j = 0;j <= k; j++){
        comq[i][j]=BigInt("0");
      }
    }
    comq[0][0]=BigInt("1");
    for(var i = 1;i <= n; i++){
      comq[i][0]=BigInt("1");
      if (performance.now() - starttime > 2000) {
        return "time out";
      }
      for(var j = 1;j<=k;j++){
        comq[i][j]=comq[i-1][j-1]+powq[j]*comq[i-1][j];
      }
    }
    result=comq[n][k];

  } else{                ///////////////if q is not integer
    
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
      comq[i][0]=1;
      if (timeoutflg == 1) {
        clearTimeout(timer);
        return "time out";
      }
      for(var j = 1;j<=k;j++){
        comq[i][j]=comq[i-1][j-1]+powq[j]*comq[i-1][j];
        if (!isFinite(comq[i][j])){
          result="too large";
          return result;
        } 
      }
    }
    clearTimeout(timer);
    result=comq[n][k];
  }
  return result;
}

$("#inputn").on("change",function(){
  document.getElementById(`press`).animate([{opacity:`1`},{opacity:`0`}],300);
  document.getElementById(`press`).textContent=``;
})
$("#inputk").on("change",function(){
  $("#calbutton").trigger("click");
  $("#fmlbutton").trigger("click");
  $("#visbutton").trigger("click");
  document.getElementById(`press`).animate([{opacity:`1`},{opacity:`0`}],300);
  document.getElementById(`press`).textContent=``;
})
$("#inputq").on("change",function(){
  $("#calbutton").trigger("click");
  $("#fmlbutton").trigger("click");
  $("#visbutton").trigger("click");
  document.getElementById(`press`).animate([{opacity:`1`},{opacity:`0`}],300);
  document.getElementById(`press`).textContent=``;
})
$("#inputn").on("input",function(){
  document.getElementById(`press`).textContent=`press enter to calculate`;
  document.getElementById(`press`).animate([{opacity:`0`},{opacity:`1`}],300);
})
$("#inputk").on("input",function(){
  document.getElementById(`press`).textContent=`press enter to calculate`;
  document.getElementById(`press`).animate([{opacity:`0`},{opacity:`1`}],300);
})
$("#inputq").on("input",function(){
  document.getElementById(`press`).textContent=`press enter to calculate`;
  document.getElementById(`press`).animate([{opacity:`0`},{opacity:`1`}],300);
})

$("#calbutton").on("click",function(){
  var res = "";
  for (var i = 1; i < 200;i++){
    res+="i = " + i + ": ,";
    for (var j = 0; j < i;j++){
      var mytime=0;
      for (var k = 0; k < 10;k++){
        timewatch=performance.now();
        var qqq = qcal(i,j,2);
        if (myisNaN(qqq)){
          mytime=-1;
          break;
        } else{
          mytime+=performance.now()-timewatch;
        }
      }
      if (mytime!=-1){
        mytime*=100;
        mytime=Math.round(mytime);
        mytime/=1000;
      }
      res+=mytime + ",";
    }
    res+="\n";
  }
  document.getElementById("result2").textContent=res;
})

$("#fmlbutton").on("click",function(){
  var n=document.getElementById(`inputn`).value;
  var k=document.getElementById(`inputk`).value;
  var q=document.getElementById(`inputq`).value;
  n=Number(n);
  k=Number(k);
  q=Number(q);
  sum=qcal(n,k,0);//error check
  if (myisNaN(sum)){
    document.getElementById(`result2`).textContent=``;
    document.getElementById(`error2`).textContent=sum;    
    document.getElementById(`result2`).animate([{opacity:`1`},{opacity:`0`}],300);
    document.getElementById(`error2`).animate([{opacity:`0`},{opacity:`1`}],300);
    return 0;
  }
  /////////// calculation of q-binomial coefficient   q=fib(k(n-k)/2)    ////////////
  var deg = n*k - k*k + 1;//degree of polynomial
  q=qcal(n,k,1);
  if (q <= 5) q = 5n;
  n =BigInt(n);
  k=BigInt(k);
  var comq=[];
  var powq=[];
  var res = BigInt("0");
  var starttime=performance.now();
  var middlek=k*(n-k)/BigInt("2");
/* an obsoleted method
  var fib0=BigInt("1"),fib1=BigInt("1"),fib2=BigInt("2");
  for(var i = 0; i < middlek;i++){
    fib2=fib0+fib1;
    fib0=fib1;
    fib1=fib2;
  }
  q=fib2;*/
  timeoutflg=0;
  powq[0]=BigInt("1");
  for(var i = 1; i <= k;i++){
    powq[i]=powq[i-1]*q;
  }
  for(var i = 0; i<= n;i++){
    comq[i]=[];
    for(var j = 0;j <= k; j++){
      comq[i][j]=BigInt("0");
    }
  }
  comq[0][0]=BigInt("1");
  for(var i = 1;i <= n; i++){
    if(performance.now()-starttime > 3000){
      document.getElementById(`result2`).textContent=``;
      document.getElementById(`error2`).textContent=`time out`;    
      document.getElementById(`result2`).animate([{opacity:`1`},{opacity:`0`}],300);
      document.getElementById(`error2`).animate([{opacity:`0`},{opacity:`1`}],300);
      return 0;    
    }
    comq[i][0]=BigInt("1");
    for(var j = 1;j<=k;j++){
      comq[i][j]=comq[i-1][j-1]+powq[j]*comq[i-1][j];
    }
  }
  var temp=BigInt(comq[n][k]);
  var res = "";           //////////////result set
  for (var i = 0; i < deg;i++){
    if(performance.now()-starttime > 3000){
      document.getElementById(`result2`).textContent=``;
      document.getElementById(`error2`).textContent=`time out`;    
      document.getElementById(`result2`).animate([{opacity:`1`},{opacity:`0`}],300);
      document.getElementById(`error2`).animate([{opacity:`0`},{opacity:`1`}],300);
      return 0;    
    }
    if (i != (deg - 1)){
      if (temp % q != 1n){
        res += temp % q + "q^" + i + " + ";
      } else {
        res +=  "q^" + i + " + ";
      }
    } else{
      if (temp % q != 1n){
        res += temp % q + "q^" + i ;
      } else {
        res +=  "q^" + i;
      }
    }
    temp-=temp % q;
    temp/=q;
  }                  /////////////////////// end of the calculation
    document.getElementById(`result2`).textContent=res;
    document.getElementById(`result2`).animate([{opacity:`0`},{opacity:`1`}],300);
    document.getElementById(`error2`).animate([{opacity:`1`},{opacity:`0`}],300);
    document.getElementById(`error2`).textContent=``;    
})

$("#visbutton").on("click",function(){ //visualize
  var n=document.getElementById(`inputn`).value;
  var k=document.getElementById(`inputk`).value;
  var q=document.getElementById(`inputq`).value;
  var ctx = document.getElementById("chart01").getContext('2d');
  n=Number(n);
  k=Number(k);
  q=Number(q);
  k=Math.floor(n/2);
  if (myisNaN(qcal(n,1,q))|| n > 100 || myisNaN(qcal(n,k,q))){    
    if(typeof myChart !== 'undefined' && myChart) myChart.destroy();
    document.getElementById(`error3`).textContent=`too large or non-numeric`;    
    document.getElementById(`error3`).animate([{opacity:`0`},{opacity:`1`}],300);
    return 0;
  }
  document.getElementById(`error3`).animate([{opacity:`1`},{opacity:`0`}],300);
  document.getElementById(`error3`).textContent=``;    
  var comq=[];
  var powq=[];
  var qdata=[];
  var axis=[];
  var result;

  powq[0]=1;
  for(var i = 1; i <= n;i++){
    powq[i]=powq[i-1]*q;
  }
  for(var i = 0; i<= (n+1);i++){
    comq[i]=[];
    for(var j = 0;j <= (n+1); j++){
      comq[i][j]=0;
    }
  }
  comq[0][0]=1;
  for(var i = 1;i <= n; i++){
    comq[i][0]=1;
    for(var j = 1;j<=(i+1);j++){
      if (j <= k){
        comq[i][j]=comq[i-1][j-1]+powq[j]*comq[i-1][j];
      } else{
        comq[i][j] = comq[i][n-j];
      }
    }
  }
 for (var i = 0 ;i <= n;i++){
    qdata[i]=comq[n][i];
    axis[i] = i;
  }
  var qmax=comq[n][k]*1.1;
  if(typeof myChart !== 'undefined' && myChart) myChart.destroy();
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: axis.slice(0,n+1),
    datasets: [{
    label: 'nCk_q',
    pointRadius:4,
    pointHoverRadius:8,
    pointBackgroundcolor:"#101010",
    pointBorderColor:"#EEEEEE",
    pointBorderWidth:1,
    pointBackgroundColor: "#444444",
    data: qdata.slice(0,n+1),
    backgroundColor: [
      'rgba(200, 200, 200, 0.2)'
    ],
    borderColor: [
      'rgba(255,255,255,1)'
    ],
    borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:false,
          max: qmax,
          min:1
        },
        gridLines: {
          color: `#222222`
        }
      }]
    },
      maintainAspectRatio: false,
      legend: {
        display:false
    }
  }
});
myChart.update();
})

$("#copybutton").on("click",function(){
  var copytarget = document.getElementById(`result2`);
  copytarget.select();
  document.execCommand("Copy");
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

$(function(){
  $(window).scroll(function (){
    $("#aboutline").each(function(){
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/5){
        $(this).addClass("effect-slide-r");
      } else {
        $(this).removeClass("effect-slide-r");
      }
    });
  });
});
$(function(){
  $(window).scroll(function (){
    $("#methodline").each(function(){
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/5){
        $(this).addClass("effect-slide-l");
      } else {
        $(this).removeClass("effect-slide-l");
      }
    });
  });
});

var _window = $(window),
    _header = $('header'),
    heroBottom;
 
_window.on('scroll',function(){
    heroBottom = 50;
    if(_window.scrollTop() > heroBottom){
        _header.addClass('transform');   
    }
    else{
        _header.removeClass('transform');   
    }
});
 
_window.trigger('scroll');

window.onload = function(){
  window.scrolltop = 0;
}

window.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const anchorLinksArr = Array.prototype.slice.call(anchorLinks);

  anchorLinksArr.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.hash;
      const targetElement = document.querySelector(targetId);
      const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
      window.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth"
      });
    });
  });
});


//////////////////////////////////////////////////////////////////////////
/* an obsoleted method of formula calculation(LU decomposition)/////////////////
//////////////////////////////////////////////////////////////////////////

  var deg = n * k-k*k;//degree of polynomial - 1
  var a=[]; //Matrix A
  var b=[]; // Vector B
  var l=[];//Matrix L
  var u=[];//Matrix U
  var tempsum;
  var sampleq=[]; //sample of q value
  var y=[];
  var x=[];
  var err=0; //0 no error  1 might be an error  2 must be an error
  for (var i = 0; i <= deg; i++){
      if (i % 2){
          sampleq[i] = -(i+1)/2;
      } else {
          sampleq[i] = i/2+1;
      }
      sampleq[i] /= 10;
  }
  for (var i = 0; i <= deg; i++){
      a[i] = [];
      a[i][0] = 1;
      for (var j = 1; j <= deg; j++){
          a[i][j] = a[i][j-1]*sampleq[i];
      }
      b[i] = qcal(n,k,sampleq[i]);
  }
  //LU dec
  for (var i = 0; i <= deg; i++){
    l[i] = [];
    u[i] = [];
  }
  l[0][0] = 1;
  for (var i = 0; i <= deg ;i++){
      for (var j = i; j <= deg; j++){ //loop of U
          tempsum = 0;
          for (var k = 0;k < i;k++) tempsum+=u[k][j]*l[i][k];
          u[i][j] = a[i][j]-tempsum;
      }
      l[i][i] = 1;
      for (var j = (i+1); j <= deg; j++){ //loop of L
          tempsum=0;
          for (var k = 0; k < i;k++) tempsum += u[k][i]*l[j][k];
          l[j][i] = (a[j][i]-tempsum) / u[i][i];
      }
  }
  for (var i = 0; i <= deg; i++){
      tempsum = 0;
      for (var j = 0; j <i;j++){
          tempsum += l[i][j] * y[j];
      }
      y[i] = b[i]-tempsum;
  }
  for (var i = 0; i <= deg; i++){
      tempsum = 0;
      for (var j = 0; j <i;j++){
          tempsum += l[i][j] * y[j];
      }
      y[i] = b[i]-tempsum;
  }
  for (var i = deg; i >= 0; i--){
      tempsum = 0;
      for (var j = i+1; j <= deg; j++){
          tempsum += u[i][j] * x[j];
      }
      x[i] = (y[i] - tempsum) / u[i][i];
      if ((x[i] - Math.floor(x[i]) > 0.1) && (Math.ceil(x[i]) - x[i] > 0.1)) err = 1;
      x[i] = Math.round(x[i]);
  }
  if (x[0] != 1) err = 2;
  var res;
  res = "";
  for (var i = 0; i <= deg; i++){
    if (i == 0){
      if (x[i] != 1){
        res =res +  x[i] + "q^" + i + " ";
      }else {
        res=res + "q^" + i + " "; 
      }
    } else{
      if (x[i] != 1){
        res = res + "+ "+ x[i] + "q^" + i + " ";
      } else{
        res = res + "+ q^" + i + " ";
      }
    }
  }
  if (err == 0){
    document.getElementById(`result2`).textContent=res;
    document.getElementById(`result2`).animate([{opacity:`0`},{opacity:`1`}],300);
    document.getElementById(`error2`).animate([{opacity:`1`},{opacity:`0`}],300);
    document.getElementById(`error2`).textContent=``;    
  } else if(err == 1){
    document.getElementById(`error2`).textContent=`The result might be an error`;    
    document.getElementById(`error2`).animate([{opacity:`0`},{opacity:`1`}],300);
    document.getElementById(`result2`).textContent=res;
    document.getElementById(`result2`).animate([{opacity:`0`},{opacity:`1`}],300);
  } else if (err == 2){
    document.getElementById(`result2`).textContent=``;
    document.getElementById(`error2`).textContent=`too large`;    
    document.getElementById(`result2`).animate([{opacity:`1`},{opacity:`0`}],300);
    document.getElementById(`error2`).animate([{opacity:`0`},{opacity:`1`}],300);
  } */

//////////////////////////////////////////////////////////////////////////
/* an obsoleted method of formula calculation(dp O[k^2(n-k)^2])/////////////////
//////////////////////////////////////////////////////////////////////////
  /*
var dp=[]; //dp[i][j][l] i列用いて、合計のブロック数がjで、最左列がl段であるものの個数
var sum=[];//sum[j][l] dp[i][j][0]からdp[i][j][l]までの和 合計のブロック数がjで最左列がl以下のものの総数
for (var i = 1;i <= (n-k);i++){
  dp[i] = [];
  for (var j = 0; j < deg;j++){
    dp[i][j] = [];
    for (var l = 0;l <= k;l++){
      if(i == 1){
        if ((j == l) && (j != -1)){
          dp[i][j][l] = 1;
        } else{
          dp[i][j][l] = 0;
        }
      } else {
        if (j > l){
          dp[i][j][l] = sum[j-l][l];
        } else{
          dp[i][j][l] = 0;
        }
      }
    }
  }
  for (var j = 0; j < deg; j++){
    sum[j]=[];
    for (var l = 0; l<=k; l++){
      if (l == 0){
        sum[j][l] = dp[i][j][l];
      } else{
        sum[j][l] = sum[j][l-1]+dp[i][j][l];
      }
    }
  }
}

var res = "";
for (var i = 0; i < deg;i++){
  var tempsum=0;
  for (var j = 1; j <= (n-k);j++){
    for(var l = 0; l <= k;l++){
      tempsum+=dp[j][i][l];
    }
  }
  if (i != (deg - 1)){
    if (tempsum != 1){
      res += tempsum + "q^" + i + " + ";
    } else {
      res +=  "q^" + i + " + ";
    }
  } else{
    if (tempsum != 1){
      res += tempsum + "q^" + i ;
    } else {
      res +=  "q^" + i;
    }
  }
}*/