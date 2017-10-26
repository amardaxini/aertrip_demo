class HomeController < ApplicationController
  
  def index
  end

  def extract_url
    UrlFetchJob.perform_async(params["url_field"].as_json,params[:roomId],params[:sort_order])
    head :ok
  end
end
