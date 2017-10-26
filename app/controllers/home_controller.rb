class HomeController < ApplicationController
  def index
  end
  def extract_url
    params["url_field"].values.map do |x|
    ActionCable.server.broadcast "url_messages_#{params[:roomId]}",

        url: x
        
      head :ok
    end  
  end
end
