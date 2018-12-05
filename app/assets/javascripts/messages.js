$(function() {

  function buildHTML(message){
    var html = `<p class="messages__name">${message.user_name}</p>
                <p class="messages__time">${message.created_at}</p>
                <p class="messages__body">${message.body}</p>`
    return html;
  }

  function buildImageHTML(message){
    var html = `<p class="messages__name">${message.user_name}</p>
                <p class="messages__time">${message.created_at}</p>
                <p class="messages__body">${message.body}</p>
                <img src='${message.image.url}'>`
    return html;
  }

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
