
class UrlChannel < ApplicationCable::Channel  
  def subscribed
    # stream_from "url_messages_#{params[:form_id]}"
    stream_from "url_messages_#{params[:roomId]}"
    # stream_from "url_messages"
  end
end  