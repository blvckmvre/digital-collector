import { Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { useTypeSelector } from "../hooks/redux-hooks";
import AddBookModal from "./AddBookModal";
import ChangeUserInfo from "./ChangeUserInfo";
import HeaderText from "./ui/HeaderText";
import UserBooks from "./UserBooks";

const MyProfile: FC = () => {
  const { userData } = useTypeSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex direction="column" gap="5" align="center">
      {userData && (
        <>
          <HeaderText>{userData.username}</HeaderText>
          <Text>Display name: {userData.displayname || "[ None ]"}</Text>
          <Text>Location: {userData.location || "[ None ]"}</Text>
          <ChangeUserInfo />
          <Button onClick={onOpen}>Add a book</Button>
          <AddBookModal isOpen={isOpen} onClose={onClose} />
          <Heading size="md">My Books</Heading>
          <UserBooks user={userData} />
        </>
      )}
    </Flex>
  );
};

export default MyProfile;
