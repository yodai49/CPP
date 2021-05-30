$("#btn1").on("click",function(){
    let date= new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let message = `今日は`+year+`年`+month+`月`+day+`日です！`;
    $("#tBox").val(message);
})

$('input').on('focusin', function() {
    $(this).parent().find('label').addClass('active');
  });
  
  $('input').on('focusout', function() {
    if (!this.value) {
      $(this).parent().find('label').removeClass('active');
    }
  });
