class HomeController < ApplicationController
  
  def index
  end

  def extract_url
    PageUrlFetchJob.perform_async(params["url_field"].as_json,params[:roomId],params[:sort_order])
    head :ok
  end
end
