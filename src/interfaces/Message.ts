export interface MessageInterface {
  from: string;
  msg: string;
}

export interface MessageStateInterface extends MessageInterface {
  topic: string;
}

export interface MessageActionInterface {
  type: string;
  payload: MessageStateInterface;
}

