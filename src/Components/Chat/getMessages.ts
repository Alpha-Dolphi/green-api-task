import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import Chat from '../../data/chat';
import { getCurrentTime } from '../../utilities/getCurrentTime';

type SetChatList = Dispatch<SetStateAction<Chat[]>>;
// type setEnter = Dispatch<SetStateAction<boolean>>;

export const getMessages = async (
  idInstance: string,
  apiTokenInstance: string,
  chatList: Chat[],
  setChatList: SetChatList
) => {

  try {
    const urlRecieve = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
    let response;

        response = await axios.get(urlRecieve)

      if (!response.data) {
        return;
      }
      const urlDelete = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${response.data.receiptId}`;
      const resp = await axios.delete(urlDelete);

      let webhookBody = response.data.body;

      if (webhookBody?.typeWebhook === 'incomingMessageReceived') {

        if (webhookBody.messageData.typeMessage !== "textMessage") {
            const urlDelete = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${response.data.receiptId}`;
            const resp = await axios.delete(urlDelete);
            return;
        }

        const messageContent = webhookBody.messageData.textMessageData.textMessage;

        const userChat = chatList.find(({ chatId }) => {
          return chatId === webhookBody.senderData.chatId;
        });

        if (userChat) {

            // console.error("ADDING");
            const newChatList = chatList.map((chat) =>
            chat.chatId === userChat.chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    {
                      content: messageContent,
                      id: Math.floor(Math.random() * 10000) + 1,
                      isUserMessage: false,
                      sendTime: getCurrentTime(),
                    },
                  ],
                }
              : chat
          );

        //   console.log("lengh ", length);
          console.log("userChat.messages.length ", userChat.messages.length);
        //   setLength(userChat.messages.length)
        //   if (length <  userChat.messages.length) {
        //     return;
        //   }
        //   console.log("newChatList", userChat.messages);

        //   setChatList(chatList);
          setChatList(newChatList);
        }
      }

  } catch (ex) {
    console.error(ex);
  }
};
