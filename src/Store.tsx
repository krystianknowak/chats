import React from "react";
import { MessageActionInterface } from "./interfaces/Message";

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

interface Props {}

export const Store: React.FC<Props> = props => {
  const reducerHook = React.useReducer(reducer, initState);

  return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
};
