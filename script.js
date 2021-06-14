var myChart;

function qcal(n,k,q){
  var comq=[];
  var powq=[];
  var result;
  //start of error check
  if (isNaN(n)|| isNaN(k)|| isNaN(q))    return "N, k, q must be numeric"; //Is numeric?
  if (n <= 0) return "N must be larger than zero";//0 <= n?
  if (n < k|| k < 0) return "0"; //0 <= k <= n?
  if (k == 0 || n == k) return "1"; // k == 0 or k == n?
  if (n < k*2) k = n-k; //Is k larger than n/2?
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

$("#fmlbutton").on("click",function(){
  var n=document.getElementById(`inputn`).value;
  var k=document.getElementById(`inputk`).value;
  var q=document.getElementById(`inputq`).value;
  n=Number(n);
  k=Number(k);
  q=Number(q);
  sum=qcal(n,k,q);//error check
  if (isNaN(sum)){
    document.getElementById(`result2`).textContent=``;
    document.getElementById(`error2`).textContent=sum;    
    document.getElementById(`result2`).animate([{opacity:`1`},{opacity:`0`}],300);
    document.getElementById(`error2`).animate([{opacity:`0`},{opacity:`1`}],300);
    return 0;
  }

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
        res = x[i] + "q^" + i + " ";
      }else {
        res="q^" + i + " "; 
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
  }
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
  if (isNaN(qcal(n,1,q))|| n > 100){    
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
// var ctx = document.getElementById("chart01").getContext('2d');  
 var qmax;
  qmax = qcal(n,k,q)*1.1;
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