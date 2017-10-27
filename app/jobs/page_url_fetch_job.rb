class PageUrlFetchJob

  include Sidekiq::Worker
  sidekiq_options queue: :page_url_fetch_job

  def perform(url_fields,room_id,sort_order=nil)
    # We can spawn multiple job for faster response
    # If so Progrss bar need to be handle to javascript side
    # for now calculation at server side 
    begin
      url_orders = sort_order.present? && sort_order.is_a?(String) ? sort_order.split(",") :  url_fields.keys.sort
      ordered_urls = []
      total_url = url_fields.keys.count
      url_orders.each_with_index do |order,index|
        url = url_fields[order]
        UrlFetchJob.perform_async(url,order,room_id,total_url)
      end
      
        
    rescue=>e
      # Log Error
    end
  end

end
