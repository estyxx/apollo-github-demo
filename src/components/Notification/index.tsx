import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
  Flex,
  Stack,
  keyframes,
} from "@chakra-ui/react";
import React from "react";
import { useState, useMemo } from "react";
import { useEffect } from "react";

type NotificationProps = {
  id?: string;
  type: "error" | "success" | "warning" | "info";
  message?: string;
  dispatch?: React.Dispatch<any>;
  dismissable?: boolean;
  removable?: boolean;
};

const TYPES_BACKGROUND_COLORS = {
  error: "red.50",
  success: "green.50",
  warning: "orange.500",
  info: "blue.400",
};

const SLIDE_LEFT = keyframes`
  0% {
    margin-left: 120%;
  }

  100% {
    margin-left: 0;
  }
`;

const SLIDE_RIGHT = keyframes`
  0% {
      margin-left: 0;
  }

  100% {
      margin-left: 120%;
  }
`;

const FULL_WITH = 100; // %
const TIMEOUT_REMOVE_NOTIFICATION = 400; // milliseconds
const EXPIRE_NOTIFICATION_TIMEOUT = 15000; // milliseconds

const Notification = ({
  id,
  type,
  message,
  dismissable = false,
  removable = false,
  dispatch,
}: NotificationProps): JSX.Element => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(10);
  const [intervalID, setIntervalID] = useState(null);

  // do not dismiss errors, ever
  const isExpiring = useMemo(() => {
    return dismissable && type !== "error";
  }, [dismissable, type]);

  const handleStartTimer = () => {
    // runs the function every X milliseconds
    // (100 / 0.5) = 200 interations * INTERVAL = X milliseconds -> timeout
    const _id = setInterval(() => {
      setWidth((prev) => {
        if (prev < FULL_WITH) {
          return prev + 0.5;
        }
        return prev;
      });
    }, EXPIRE_NOTIFICATION_TIMEOUT / 200);
    setIntervalID(_id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotificaiton = () => {
    handlePauseTimer();
    if (isExpiring || removable) {
      setExit(true);
      setTimeout(() => {
        dispatch && dispatch({ type: "REMOVE_NOTIFICATION", id: id });
      }, TIMEOUT_REMOVE_NOTIFICATION);
    }
  };

  useEffect(() => {
    handleStartTimer();
  }, []);

  useEffect(() => {
    if (width === FULL_WITH) {
      handleCloseNotificaiton();
    }
  }, [width]);

  return (
    <ChakraAlert
      status={type}
      boxShadow="base"
      borderRadius={5}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      {...(isExpiring && {
        animation: exit ? `${SLIDE_RIGHT} 0.4s` : `${SLIDE_LEFT} 0.4s`,
      })}
    >
      <Stack spacing={0} align="stretch" w="100%">
        <Flex mb="0">
          <AlertIcon />
          <Box flex="1" margin={0}>
            <AlertDescription display="block" pr={3}>
              {message}
            </AlertDescription>
          </Box>
          {removable && <CloseButton onClick={handleCloseNotificaiton} />}
        </Flex>
        {isExpiring && (
          <Box h={1} bg={TYPES_BACKGROUND_COLORS[type]} width={`${width}%`}></Box>
        )}
      </Stack>
    </ChakraAlert>
  );
};

export { Notification };
