import { Button } from "@chakra-ui/react";
import { FC, FormEvent } from "react";
import { useAuthInput, useTypeDispatch } from "../hooks/redux-hooks";
import useAnnounce from "../hooks/useAnnounce";
import { loginAction, signupAction } from "../store/actions/auth-actions";
import AuthFormField from "./AuthFormField";

interface AuthFormProps {
  type: "login" | "sign up";
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const [username, setUsername, password, setPassword] = useAuthInput(type);
  const d = useTypeDispatch();
  const announce = useAnnounce();
  const auth = (e: FormEvent) => {
    e.preventDefault();
    type === "login"
      ? d(loginAction({ username, password, announce }))
      : d(signupAction({ username, password, announce }));
  };
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "25px",
      }}
      onSubmit={auth}
    >
      <AuthFormField
        type="text"
        label="Username"
        value={username}
        setValue={setUsername}
      />
      <AuthFormField
        type="password"
        label="Password"
        value={password}
        setValue={setPassword}
      />
      <Button type="submit" mt="5" textTransform="capitalize">
        {type}
      </Button>
    </form>
  );
};

export default AuthForm;
