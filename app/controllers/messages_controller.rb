class MessagesController < ApplicationController
  def create
    # 1. Buscar atráves de params[:chatroom_id] o Modelo que representa o Chatroom
    @chatroom = Chatroom.find(params[:chatroom_id])
    # 2. Criar uma instancia de mensagem, com os parametros passados p/ criação da mensagem
    @message = Message.new(message_params)
    # 3. Criar a relação da mensagem com o chatroom
    @message.chatroom = @chatroom
    # 4. Criar a relação da mensagem com o usuário
    @message.user = current_user

    if @message.save
      ChatroomChannel.broadcast_to(
        @chatroom,
        render_to_string(partial: "message", locals: {message: @message})
      )
      head :ok
    else
      render "chatrooms/show", status: :unprocessable_entity
    end
    
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
