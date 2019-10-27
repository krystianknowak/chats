import React from "react";
import { Paper, Typography, Chip, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { MessageInterface, MessageStateInterface } from "./interfaces/Message";
import { CTX } from "./Store";

const useStyles = makeStyles((theme: any) => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  chatBox: {
    width: "85%"
  },
  button: {
    width: "15%"
  },
  chip: {}
}));

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();

  // CTX store
  const { allChats, sendChatAction, user } = React.useContext(CTX);

  const topics = Object.keys(allChats);
  const [activeTopic, setActiveTopic] = React.useState(topics[0]);
  const [textValue, setTextValue] = React.useState<string>("");

  const handleSendChatAction = () => {
    const message: MessageStateInterface = { from: user, msg: textValue, topic: activeTopic }
    sendChatAction(message);
    setTextValue("");
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Chat app
        </Typography>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map(topic => (
                <ListItem
                  onClick={() => setActiveTopic(topic)}
                  key={topic}
                  button
                >
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            <List>
              {allChats[activeTopic].map(
                (chat: MessageInterface, index: number) => (
                  <div className={classes.flex} key={index}>
                    <Chip label={chat.from} className={classes.chip} />
                    <Typography variant="body1">{chat.msg}</Typography>
                  </div>
                )
              )}
            </List>
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="Send a chat"
            className={classes.chatBox}
            value={textValue}
            onChange={(e: any) => setTextValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSendChatAction}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};
