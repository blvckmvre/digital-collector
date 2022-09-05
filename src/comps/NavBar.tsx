import { Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { FC } from "react";
import NavLinks from "./NavLinks";
import SettingsPanel from "./SettingsPanel";

const NavBar: FC = () => {
  const [shouldAdjust] = useMediaQuery("(min-width: 500px)");
  return (
    <Flex align="center" justify="space-between" shadow="lg">
      <Flex align="center">
        <Heading
          size={shouldAdjust ? "md" : "xs"}
          fontFamily="monospace"
          ml="5"
        >
          DCol
        </Heading>
        <NavLinks shouldAdjust={shouldAdjust} />
      </Flex>
      <SettingsPanel shouldAdjust={shouldAdjust} />
    </Flex>
  );
};

export default NavBar;
