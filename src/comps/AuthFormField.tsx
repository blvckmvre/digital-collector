import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FC, HTMLInputTypeAttribute, useState } from "react";
import { useTypeDispatch } from "../hooks/redux-hooks";

interface AuthFormFieldProps {
  value: string;
  setValue: ActionCreatorWithPayload<string>;
  type: HTMLInputTypeAttribute;
  label: string;
}

const AuthFormField: FC<AuthFormFieldProps> = ({
  value,
  setValue,
  type,
  label,
}) => {
  const d = useTypeDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(0);
  const rotation = [type];
  if (type === "password") rotation.push("text");
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          type={type === "password" ? rotation[isPasswordVisible] : type}
          minLength={4}
          maxLength={16}
          value={value}
          onChange={(e) => d(setValue(e.target.value))}
        />
        {type === "password" && (
          <InputRightElement>
            <IconButton
              aria-label="Password visibility"
              icon={isPasswordVisible ? <ViewOffIcon /> : <ViewIcon />}
              size="sm"
              onClick={() => setIsPasswordVisible((p) => (p + 1) % 2)}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};

export default AuthFormField;
