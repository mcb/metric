# config.ru
require './metric.rb'

set :user, 'admin'
set :password, 'admin'

run Sinatra::Application