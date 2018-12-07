class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = Message.includes(:user).where(group_id: @group.id)
    @last_message = Message.last
    respond_to do |format|
      format.html
      format.json {@new_message = Message.where('id > ?', params[:message][:id])}
    end
  end

  def create
    @message = @group.messages.new(message_params)
    @message.save
    respond_to do |format|
      format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
      format.json
    end
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end
end
