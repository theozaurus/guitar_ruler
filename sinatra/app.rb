require 'sinatra'
require "sinatra/reloader" if development?

get '/', :provides => 'html' do
  haml :index
end
