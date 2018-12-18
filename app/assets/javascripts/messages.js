$(function() {

  function buildHTML(message){
    var html = `<div class="messages__id" id="${message.id}">
                <p class="messages__name">${message.user_name}</p>
                <p class="messages__time">${message.created_at}</p>
                <p class="messages__body">${message.body}</p>`
    return html;
  }

  function buildImageHTML(message){
    var html = `<div class="messages__id" id="${message.id}">
                <p class="messages__name">${message.user_name}</p>
                <p class="messages__time">${message.created_at}</p>
                <p class="messages__body">${message.body}</p>
                <img src='${message.image.url}'>`
    return html;
  }

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var message_id = $('.chat').attr('id')
      var message_group = $('.chat__group').attr('id')
      $.ajax({
        type: 'GET',
        data: {
          message: { id: message_id, group: message_group }
        },
        url: location.href,
        dataType: 'json'
      })
      .done(function(messages) {
        messages.forEach(function(message){
          if (message.image.url == null) {
            html = buildHTML(message);
          } else {
            html = buildImageHTML(message);
          }
          $('.chat').attr('id', message.id)
          $('.messages').append(html);
          $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight});
        })
      })
      .fail(function(data){
        alert('自動更新に失敗しました')
      });
    } else {
      clearInterval(interval);
  }}, 5000);

  $('.message-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      if (data.image.url == null) {
        var html = buildHTML(data);
      }
      else {
        var html = buildImageHTML(data);
      }
      $('.chat').attr('id', data.id)
      $('.messages').append(html)
      $('.message-form__text-field').val('');
      $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.send-button').prop("disabled", false);
    })
    .fail(function(){
      alert('error');
    })
  })
})
