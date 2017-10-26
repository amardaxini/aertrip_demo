var AT = AT || {};
AT.roomId = Math.random();
console.log(AT.roomId);
App.url_messages = App.cable.subscriptions.create({channel: 'UrlChannel',roomId: AT.roomId}, {  
  received: function(data) {
    
    return $('#sortable').append(this.renderMessage(data));
  },
  renderMessage: function(data) {
    return "<p> <b>" + data.url+"</p>";
  }
});