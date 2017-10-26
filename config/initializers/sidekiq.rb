require 'sidekiq'
require 'sidekiq/web'



if Rails.env == 'production' 

  #namespace = ENV['REDIS_NAMESPACE'] || AppConfig.redis['namespace']
  redis_url = ENV['REDISTOGO_URL']

  Sidekiq.configure_client do |config|
    config.redis = { :url => redis_url }
    
  end

  Sidekiq.configure_server do |config|
    config.redis = { :url => redis_url}
    
  end

end
