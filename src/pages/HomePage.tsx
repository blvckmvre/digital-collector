import { Flex, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderText from "../comps/ui/HeaderText";
import SelectableContainer from "../comps/ui/SelectableContainer";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import { getUsersAction } from "../store/actions/users-actions";

const HomePage: FC = () => {
  const { users } = useTypeSelector((state) => state.users);
  const d = useTypeDispatch();
  const router = useNavigate();
  useEffect(() => {
    d(getUsersAction());
  }, []);
  return (
    <Flex direction="column" align="center" gap="2" w="95vw" m="auto">
      <HeaderText>All Users</HeaderText>
      {users ? (
        users.map((user) => (
          <SelectableContainer
            key={user.id}
            onClick={() => router("/" + user.id)}
            borderWidth="1px"
          >
            {user.displayname || user.username}
          </SelectableContainer>
        ))
      ) : (
        <Text>No users yet</Text>
      )}
    </Flex>
  );
};

export default HomePage;
