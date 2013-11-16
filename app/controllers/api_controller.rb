class ApiController < ApplicationController
  require 'parse-ruby-client'

  def review_new
    Parse.init({
      :application_id => "Gm97bunEwR2nDQWO0SULDGNwxtPLZsorqYrR7UjR",
      :api_key => "1MqGClUuY7U5B87d6D4US6sTBBLgtDrMFqhTnPbk"
    })

    review = Parse::Object.new('Review')
    review['filename'] = params[:filename]
    review['type'] = params[:type]
    review['code'] = params[:code]
  end
end
