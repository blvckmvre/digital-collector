import { Flex, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import useAnnounce from "../hooks/useAnnounce";
import { getMyBooksAction } from "../store/actions/books-actions";
import { addOfferAction } from "../store/actions/trade-actions";
import { IBook } from "../types/books";
import { IUser } from "../types/users";
import SelectableContainer from "./ui/SelectableContainer";

const TradeScreen: FC<{ offerBook: IBook; offerUser: IUser }> = ({
  offerBook,
  offerUser,
}) => {
  const { userData } = useTypeSelector((state) => state.auth);
  const { myBooks } = useTypeSelector((state) => state.books);
  const d = useTypeDispatch();
  const announce = useAnnounce();
  useEffect(() => {
    if (userData) d(getMyBooksAction());
  }, []);
  return (
    <Flex direction="column" gap="1">
      {myBooks.length ? (
        myBooks.map((book) => (
          <SelectableContainer
            key={book.id}
            onClick={() =>
              d(
                addOfferAction({
                  partner: offerUser,
                  gives: book,
                  gets: offerBook,
                  announce,
                })
              )
            }
          >
            "{book.title}" by {book.author}
          </SelectableContainer>
        ))
      ) : (
        <Text>No books to trade</Text>
      )}
    </Flex>
  );
};

export default TradeScreen;
