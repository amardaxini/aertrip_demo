
class UrlChannel < ApplicationCable::Channel  
  def subscribed
    stream_from "url_messages_#{params[:roomId]}"
  end
end  