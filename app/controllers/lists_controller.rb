class ListsController < ApplicationController
  def index
    @lists = if params[:keywords]
               List.where('name ilike ?', "%#{params[:keywords]}%")
             else
               []
             end
  end
end
