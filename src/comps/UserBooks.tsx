import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import useAnnounce from "../hooks/useAnnounce";
import {
  getUserBooksAction,
  rmBookAction,
} from "../store/actions/books-actions";
import { IUser } from "../types/users";
import MakeAnOffer from "./MakeAnOffer";

const UserBooks: FC<{ user: IUser }> = ({ user }) => {
  const d = useTypeDispatch();
  const { userBooks } = useTypeSelector((state) => state.books);
  const { userData } = useTypeSelector((state) => state.auth);
  const announce = useAnnounce();
  useEffect(() => {
    d(getUserBooksAction(user.id));
  }, []);
  return userBooks.length ? (
    <Flex w="max(350px, 50vw)" direction="column" gap="1">
      {userBooks.map((book) => (
        <Flex
          key={book.id}
          borderWidth="1px"
          align="center"
          justify="space-between"
          p="1"
          rounded="md"
        >
          "{book.title}" by {book.author}
          {userData?.id === book.user_id ? (
            <Button
              onClick={() => d(rmBookAction({ id: book.id, announce }))}
              size="sm"
              colorScheme="red"
            >
              <DeleteIcon />
            </Button>
          ) : (
            userData && <MakeAnOffer offerUser={user} offerBook={book} />
          )}
        </Flex>
      ))}
    </Flex>
  ) : (
    <Text>No books yet</Text>
  );
};

export default UserBooks;
