web: bundle exec puma -p $PORT 
worker: bundle exec sidekiq -q url_fetch_job -q page_url_fetch_job -c 4