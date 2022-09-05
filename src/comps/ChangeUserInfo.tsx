import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FC } from "react";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import useAnnounce from "../hooks/useAnnounce";
import { changeSettingsAction } from "../store/actions/auth-actions";
import authSlice from "../store/slices/auth/auth-slice";

const ChangeUserInfo: FC = () => {
  const { displayname, location } = useTypeSelector((state) => state.auth);
  const { setDisplayname, setLocation } = authSlice.actions;
  const announce = useAnnounce();
  const d = useTypeDispatch();
  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          <EditIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody display="flex" flexDirection="column" gap="2">
          <Input
            placeholder="Display name"
            value={displayname}
            onChange={(e) => d(setDisplayname(e.target.value))}
          />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => d(setLocation(e.target.value))}
          />
          <Button
            onClick={() => {
              d(changeSettingsAction({ displayname, location, announce }));
              d(setDisplayname(""));
              d(setLocation(""));
            }}
          >
            Save
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ChangeUserInfo;
