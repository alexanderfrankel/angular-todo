class ListsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @lists = if params[:keywords]
               List.where('name ilike ?', "%#{params[:keywords]}%")
             else
               []
             end
  end

  def show
    @list = List.find(params[:id])
  end

  def create
    @list = List.new(list_params)
    @list.save
    render 'show', status: 201
  end

  def update
    list = List.find(params[:id])
    list.update_attributes(list_params)
    head :no_content
  end

  def destroy
    list = List.find(params[:id])
    list.destroy
    head :no_content
  end

  private

  def list_params
    params.require(:list).permit(:name)
  end

end
