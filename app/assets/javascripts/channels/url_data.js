var AT = AT || {};
AT.roomId = Math.random().toString();
console.log(AT.roomId);
App.url_messages = App.cable.subscriptions.create({channel: 'UrlChannel',roomId: AT.roomId}, {  
  received: function(data) {

    $(".progress-bar").css("width", data.progress + "%").text(data.progress + " %");
    return $('.result').append(this.renderMessage(data));
  },
  renderMessage: function(data) {

    return "<p> <b>" + data.url+": </b> "+data.title+"</p>";
  }
});