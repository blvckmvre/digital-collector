import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

const NoAuthAlert: FC = () => {
  return (
    <Alert status="warning" variant="top-accent">
      <AlertIcon />
      You are not logged in!
      <Button as={Link} size="sm" ml="auto" colorScheme="orange" to="/auth">
        Login / Sign Up
      </Button>
    </Alert>
  );
};

export default NoAuthAlert;
