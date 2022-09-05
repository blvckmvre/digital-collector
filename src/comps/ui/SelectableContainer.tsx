import { Container, ResponsiveValue } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface SelectableContainerProps {
  onClick: () => void; 
  children: ReactNode;
  borderWidth?: ResponsiveValue<string>;
}

const SelectableContainer: FC<SelectableContainerProps> = ({
  children,
  ...p
}) => {
  return (
    <Container
      rounded="md"
      cursor="pointer"
      p="1"
      _hover={{ bg: "blue.300" }}
      {...p}
    >
      {children}
    </Container>
  );
};

export default SelectableContainer;
