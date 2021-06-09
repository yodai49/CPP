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

$("#visbutton").on("click",function(){ //visualize
  var n=document.getElementById(`inputn`).value;
  var k=document.getElementById(`inputk`).value;
  var q=document.getElementById(`inputq`).value;
  n=Number(n);
  k=Number(k);
  q=Number(q);
  k=Math.floor(n/2);
  
  if (isNaN(qcal(n,1,q))|| n > 100){
    return 0;
  }
  //window.alert(qcal(n,n/2,q));
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
//    comq[i]=[];
    comq[i][0]=1;
    for(var j = 1;j<=(i+1);j++){
      comq[i][j]=comq[i-1][j-1]+powq[j]*comq[i-1][j];
    }
  }
 for (var i = 0 ;i <= n;i++){
    qdata[i]=comq[n][i];
    axis[i] = i;
  }
 var ctx = document.getElementById("chart01").getContext('2d');  
 var qmax;
  qmax = qcal(n,k,q)*1.1;
  var myChart = new Chart(ctx, {
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
      'rgba(200, 200, 192, 0.2)'
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
        }
      }]
    },
      maintainAspectRatio: false,
      legend: {
        display:false
    },
    annotation: {
      annotations: [{
        type: 'line',
        mode: 'horizontal',
        scaideID: 'y-axis-0',
        value:1000,
        borderColor: '#FFFFFF',
        borderWidth:30
      }]
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

