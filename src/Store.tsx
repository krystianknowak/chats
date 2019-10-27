import React from "react";
import io from "socket.io-client";
import { MessageActionInterface, MessageStateInterface } from "./interfaces/Message";

interface IContextProps {
  state: any;
  dispatch: ({ type }: { type: string }) => void;
}

const initState = {
  general: [
    { from: "Krystian", msg: "hi" },
    { from: "Kazimierz", msg: "hi" },
    { from: "Krzysztof", msg: "hi" }
  ],
  topic2: [
    { from: "Krystian", msg: "hi2" },
    { from: "Kazimierz", msg: "hi2" },
    { from: "Krzysztof", msg: "hi2" }
  ]
};

export const CTX = React.createContext({} as any, () =>
  Math.floor(Math.random() * 10)
);

const reducer = (state: any, action: MessageActionInterface) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
};


let socket: SocketIOClient.Socket;

const sendChatAction = (value: any) => {
  socket.emit("chat message", value);
};

interface Props {
  children: any;
}

export const Store: React.FC<Props> = (props: Props) => {

  const [allChats, dispatch] = React.useReducer(reducer, initState);

  if (!socket) {
    socket = io(":3001");
    socket.on('chat message', (msg: MessageStateInterface) => {
      dispatch({type: "RECEIVE_MESSAGE", payload: msg})
    });
  }

  const user = 'Krystian' +  Math.floor(Math.random() * 10);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
};
