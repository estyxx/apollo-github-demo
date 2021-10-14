import { Wrap } from "@chakra-ui/react";
// import { Notification } from "../components/Notification/index";
// import { Notification } from "../components/Notification/index"
import { Notification } from "components/Notification"
import React, { createContext, ReactNode, useReducer } from "react";

type PayloadType = {
  id?: string;
  type: "error" | "success" | "warning" | "info";
  message?: string;
};

type ActionType =
  | { type: "ADD_NOTIFICATION"; payload: PayloadType }
  | { type: "REMOVE_NOTIFICATION"; id: string };

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationContext = createContext<React.Dispatch<ActionType>>(null);

const notificationReducer = (state: PayloadType[], action: ActionType): PayloadType[] => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, { ...action.payload }];
    case "REMOVE_NOTIFICATION":
      return state.filter((el) => el.id !== action.id);
    default:
      return state;
  }
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(notificationReducer, [
    {id: "12323231", type: "error", message: "Hey I'm an error message :(", dismissable: true, removable: true},
    {id: "3424324234", type: "success", message: "Hey the think the we know that they know was success!!", dismissable: true, removable: true},
    {id: "333343434", type: "warning", message: "👀", dismissable: true, removable: true},
    {id: "1232sss3231", type: "info", message: "How you doin'?", dismissable: true, removable: true},
  ]);
  console.log("Notifiation Providerrrrr helloooo", state, dispatch);
  return (
    <NotificationContext.Provider value={dispatch}>
      <Wrap position="fixed" top={5} right={5} zIndex={1}>
        {state.map((note) => {
          return <Notification dispatch={dispatch} key={note.id} {...note} />;
        })}
      </Wrap>
      {children}
    </NotificationContext.Provider>
  );
};
