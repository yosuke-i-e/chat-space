$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.user_name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
              </div>`
    $('#user-search-result').append(html);
  }

  function appendNoUser(user) {
    var html = `<p>${user}</p>`
    $('#user-search-result').append(html);
  }

  function appendResult(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member'id='chat-group-user-${user_id}'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${user_name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $('#result').append(html);
  }

  $(document).on("keyup", '#user-search-field', function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url:'/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendNoUser("一致するユーザーはいません");
      }
      $('.user-search-add').on("click", function(){
        user_id = $(this).attr('data-user-id');
        user_name = $(this).attr('data-user-name');
        appendResult(user_id, user_name);
        $(this).parent().remove();
      $('.user-search-remove').on("click", function(){
        $(this).parent().remove();
      })
    })
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});
