

var userId = '';
var nickname = '';

function login(){
  if (nickname.isEmpty()) {
    alert('Please enter user nickname');
    return;
  }

var landingUrl = "http://" + $window.location.host + "/chat";

  window.location.href =  landingUrl +'+?userid=' + encodeURIComponent(userId) + '&nickname=' + encodeURIComponent(nickname);
}

$('#user_nickname').change(function() {
  userId = $('#user_id').val().trim();
  nickname = $('#user_nickname').val().trim();
});

$('#user_nickname').keydown(function(e){
  if (e.which == 13) {
    nickname = $('#user_nickname').val().trim();
    login();
  }
});

$('#btn_start').click(function() {
  login();
});

$(document).ready(function() {
  $('#user_nickname').val('');
  $('#user_nickname').focus();

  $('#user_id').val(getUserId());
});


$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }
});

/*$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});
*/

var password = document.getElementById("password"), confirm_password = document.getElementById("confirm_password");

      function validatePassword(){
       if(password.value != confirm_password.value) {
       confirm_password.setCustomValidity("Passwords Don't Match");
       } 
       else {
       confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;