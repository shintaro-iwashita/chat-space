$(document).on('turbolinks:load', function() { 
function buildHTML(message){
  var insertImage = '';
  if ( message.image ) {
    insertImage = `<img src=${message.image} >`
  };
  var html =`<div class="message" data-messageid=${message.id}>
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


  $('.new_message').on('submit', function(e){
    e.preventDefault();
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
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    .always(() => {
      $(".new_message__submit-btn").removeAttr("disabled");
    });
  });


  var reloadMessages = function() {
    var last_message_id = $(".message").last().data('messageid')
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var href = 'api/messages'
      $.ajax({
        url:href, //ルーティングで設定した通りのURLを指定
        type: 'GET',  //ルーティングで設定した通りhttpメソッドをgetに指定
        dataType: 'json',  //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length != 0){
        messages.forEach (function(message) {
          var insertHTML =  buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
          })
        }
      })
      .fail(function() {
        alert('error')
      })
    }
  };
  setInterval(reloadMessages, 5000);
});

