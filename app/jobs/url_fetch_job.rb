class UrlFetchJob

  include Sidekiq::Worker
  sidekiq_options queue: :url_fetch_job

  def perform(url,order,room_id,total_url)
    # We can spawn multiple job for faster response
    # If so Progrss bar need to be handle to javascript side
    # for now calculation at server side 

    begin
      page = MetaInspector.new(url)
      title = page.title
    rescue=>e
      title = e.message
    end  
    ActionCable.server.broadcast "url_messages_#{room_id}",url: url,title: title,rank: order,total_url: total_url.to_f
  end
      
        

end
