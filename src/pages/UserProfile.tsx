import { Flex, Heading, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import { getUsersAction } from "../store/actions/users-actions";
import UserBooks from "../comps/UserBooks";
import HeaderText from "../comps/ui/HeaderText";

const UserProfile: FC = () => {
  const { currUser } = useTypeSelector((state) => state.users);
  const { userData } = useTypeSelector((state) => state.auth);
  const router = useNavigate();
  const { id } = useParams();
  const d = useTypeDispatch();
  useEffect(() => {
    if (+id! === userData?.id) router("/me");
    d(getUsersAction(+id!));
  }, []);
  return (
    <Flex direction="column" gap="5" align="center">
      {currUser ? (
        <>
          <HeaderText>{currUser.username}</HeaderText>
          <Text>Display name: {currUser.displayname || "[ None ]"}</Text>
          <Text>Location: {currUser.location || "[ None ]"}</Text>
          <Heading size="sm">Books</Heading>
          <UserBooks user={currUser} />
        </>
      ) : (
        <HeaderText>User not found</HeaderText>
      )}
    </Flex>
  );
};

export default UserProfile;
