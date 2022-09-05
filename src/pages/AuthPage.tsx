import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import AuthForm from "../comps/AuthForm";
import HeaderText from "../comps/ui/HeaderText";

const AuthPage: FC = () => {
  return (
    <>
      <HeaderText>Login / Create an account</HeaderText>
      <Flex justify="space-evenly" align="center" wrap="wrap">
        <AuthForm type="login" />
        <AuthForm type="sign up" />
      </Flex>
    </>
  );
};

export default AuthPage;
