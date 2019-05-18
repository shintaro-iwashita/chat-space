$(document).on('turbolinks:load', function() { 
function buildHTML(message){
  if ( message.image ) {
  var html =
  `<div class="info" data-message-id=${message.id}>
  <div class="upper-info">
    <div class="upper-info__user-name">
      ${message.user_name}
    </div>
    <div class="upper-info__date">
      ${message.date}
    </div>
  </div>
  <div class="text-message">
    <p class="text-message__content">
      ${message.content}
    </p>
  </div>
  <img src=${message.image} >
</div>`

  return html;
  } else {
  var html = `<div class="info" data-message-id=${message.id}>
  <div class="upper-info">
    <div class="upper-info__user-name">
      ${message.user_name}
    </div>
    <div class="upper-info__date">
      ${message.date}
    </div>
  </div>
  <div class="text-message">
    <p class="text-message__content">
      ${message.content}
    </p>
  </div>
</div>`
  
  return html;
  };
  }

  $('.new_message').on('submit', function(e){
  e.preventDefault();
  console.log("test")
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
  url: url,
  type: "POST",
  data: formData,
  dataType: 'json',
  processData: false,
  contentType: false
  })
  .done(function(data){
    console.log(data.id)
    console.log(data.user_name)
  var html = buildHTML(data);
  $('.messages').append(html);
  $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  $('form')[0].reset();
  })
  .fail(function(){
  alert('error');
  })
  .always(() => {
    $(".new-message__submit-btn").removeAttr("disabled");
    });
  });
});