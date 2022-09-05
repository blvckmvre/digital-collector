import { Progress } from "@chakra-ui/react";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <Progress
      isIndeterminate
      pos="fixed"
      size="lg"
      bottom="1"
      left="1"
      right="1"
    />
  );
};

export default Loading;
