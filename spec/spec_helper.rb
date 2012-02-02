require 'rubygems'
require File.join(File.dirname(__FILE__), '..', 'lib/metric.rb')
require 'rack/test'

DataMapper.setup(:default, "sqlite3::memory:")

set :environment, :test

set :user, 'admin'
set :password, 'admin'

RSpec.configure do |conf|
  conf.include Rack::Test::Methods
  conf.before(:each) { DataMapper.auto_migrate! }
end