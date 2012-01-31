require "metric/version"
require 'rubygems'
require 'sinatra'
require 'data_mapper'
require 'geocoder'
require 'user_agent'
require 'metric/flags'

DataMapper::setup(:default, "sqlite3:///Users/mbeck/metric.db")

module Metrics
  class Metric
      include DataMapper::Resource
      property :id, Serial
      property :user_agent, String
      property :ip, String
      property :location_city, String
      property :location_country, String
      property :url, String
      property :referrer, String
      property :query_string, String
      property :visited_at, DateTime
  end

  DataMapper.finalize
  Metric.auto_upgrade!

  get '/' do
    erb :index
  end

  get '/reporting/?' do
    protected!
    @metrics = Metric.all
    erb :reporting
  end

  get '/m.js' do
    content_type :js
    result = request.location
    @metric = Metric.create!(:user_agent => request.user_agent, 
                          :ip => request.ip,
                          :location_city => result.city,
                          :location_country => result.country,
                          :url => request.referrer,
                          :query_string => request.query_string,
                          :referrer => request.referrer,
                          :visited_at => Time.now)

    "/**
    * @file                         metrics
    * @note                         JS File
    */"
  end


  helpers do
    # Taken from sinatra examples
    def protected!
      unless authorized?
        response['WWW-Authenticate'] = %(Basic realm="Restricted Area")
        throw(:halt, [401, "Not authorized\n"])
      end
    end

    def authorized?
      @auth ||=  Rack::Auth::Basic::Request.new(request.env)
      @auth.provided? && @auth.basic? && @auth.credentials && @auth.credentials == [settings.user, settings.password]
    end

  end
  
end
