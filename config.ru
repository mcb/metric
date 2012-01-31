# config.ru
require 'metric'

set :user, 'admin'
set :password, 'admin'

run Sinatra::Application