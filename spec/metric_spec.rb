require 'spec_helper'

describe 'Metric' do

  def app
    Sinatra::Application
  end
  

  it "homepage works" do
    get '/'
    last_response.should be_ok
  end
  
  it "js file gets delivered" do
    get '/m.js'
    last_response.should be_ok
  end
  
  it "reports fail without credentials" do
    get '/reports'
    last_response.status.should == 401
  end
  
  it "reports fail without correct credentials" do
    authorize 'admin', 'password'
    get '/reports'
    last_response.status.should == 401
  end
  
  it "reports work with correct credentials" do
    authorize 'admin', 'admin'
    get '/reports'
    last_response.should be_ok
  end

end