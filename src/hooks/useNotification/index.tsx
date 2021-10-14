import { NotificationContext } from "src/contexts/Notifications";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const useNotification = (): ((any) => void) => {
  const dispatch = useContext(NotificationContext);

  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: uuidv4(),
        dismissable: true,
        removable: true,
        ...props,
      },
    });
  };
};
