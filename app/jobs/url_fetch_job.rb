class UrlFetchJob

  include Sidekiq::Worker
  sidekiq_options queue: :url_fetch_job

  def perform(url_fields,roomId,sort_order=nil)
    # We can spawn multiple job for faster response
    # If so Progrss bar need to be handle to javascript side
    # for now calculation at server side 
    begin
      url_orders = sort_order.present? && sort_order.is_a?(String) ? sort_order.split(",") :  url_fields.keys.sort
      ordered_urls = []
      total_url = url_fields.keys.count
      url_orders.each_with_index do |order,index|

        url = url_fields[order]
        begin
          page = MetaInspector.new(url)
          title = page.title
        rescue=>e
          title = e.message
        end  
        progress = ((index+1)/total_url.to_f)*100
        ActionCable.server.broadcast "url_messages_#{roomId}",url: url,title: title,progress: progress
      end
      
        
    rescue=>e
      # Log Error
    end
  end

end
