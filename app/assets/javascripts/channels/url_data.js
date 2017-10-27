var AT = AT || {};
AT.roomId = Math.random().toString();
console.log(AT.roomId);
App.url_messages = App.cable.subscriptions.create({channel: 'UrlChannel',roomId: AT.roomId}, {  
  received: function(data) {
    var totalFetchedUrl = $("#url_results li").length
    progress = ((totalFetchedUrl+1)/parseFloat(data.total_url)) * 100 
    $(".progress-bar").css("width", progress + "%").text(progress + " %");
    console.log(this.renderMessage(data))
    return $('.result ul').append(this.renderMessage(data));
  },
  renderMessage: function(data) {

    return "<li><b>" + data.url+": </b> "+data.title+"</li>";
  }
});