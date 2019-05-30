$(document).on('turbolinks:load', function() { 
  var user_list = $("#user-search-result");
  var member_list = $(".chat-group-users");
  var search_list = $("#user-search-result")

  function appendUsers(user) {
    var html =`<div class="chat-group-user clearfix js-chat-user">
                <p class="chat-group-user__name">
                ${user.name} 
                </p>
                <a class="user_search_add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
                </a>
                </div>`

    user_list.append(html);
  }

  function appendMembers(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat_group_user_22'>
                <input name='group[user_ids][]' type='hidden' value="${user_id}">
                <p class='chat-group-user__name'>${name}</p>
                <a class='user_search_remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`

    member_list.append(html);
  }

  function appendNoUsers(user) {
    console.log(user)
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user }</p>
                </div>`

    search_list.append(html);
  }

  $(".chat-group-form__input").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(members) {
      $("#user-search-result").empty();
      if (members.length !== 0) {
        members.forEach(function(user){
            appendUsers(user);
        })
      }
      else {
        appendNoUsers("一致するユーザーはいません");
      }
    })
    .fail(function() {
        alert('ユーザー検索に失敗しました');
    });
  });
  $(function() {
    $(document).on("click", '.user_search_add', function() {
      var name = $(this).attr("data-user-name");   
      var user_id = $(this).attr("data-user-id");
      $(this).parent().remove();
      appendMembers(name, user_id);
    });
    $(document).on("click", '.user_search_remove', function() {
      $(this).parent().remove();
    });
  });
});
