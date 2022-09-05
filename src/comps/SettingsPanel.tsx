import {
  ArrowBackIcon,
  AtSignIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import useAnnounce from "../hooks/useAnnounce";
import { logoutAction } from "../store/actions/auth-actions";

const ColorModeAssets = {
  light: {
    nextIcon: <MoonIcon />,
    nextText: "Dark Mode",
  },
  dark: {
    nextIcon: <SunIcon />,
    nextText: "Light Mode",
  },
};

const SettingsPanel: FC<{ shouldAdjust: boolean }> = ({ shouldAdjust }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { userData } = useTypeSelector((state) => state.auth);
  const d = useTypeDispatch();
  const removeCookie = useCookies(["session"])[2];
  const router = useNavigate();
  const announce = useAnnounce();
  return (
    <Flex mr="1" align="center" gap="2">
      {userData && (
        <Text fontWeight="bold" fontSize={shouldAdjust ? "md" : "xs"}>
          {userData.username}
        </Text>
      )}
      <Menu>
        <MenuButton as={IconButton} icon={<HamburgerIcon />}></MenuButton>
        <MenuList>
          {userData && (
            <MenuItem icon={<AtSignIcon />} onClick={() => router("/me")}>
              My Profile
            </MenuItem>
          )}
          <MenuItem
            onClick={toggleColorMode}
            icon={ColorModeAssets[colorMode].nextIcon}
          >
            {ColorModeAssets[colorMode].nextText}
          </MenuItem>
          {userData && (
            <MenuItem
              icon={<ArrowBackIcon />}
              onClick={async () => {
                await d(logoutAction(announce));
                removeCookie("session");
              }}
            >
              Logout
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SettingsPanel;
