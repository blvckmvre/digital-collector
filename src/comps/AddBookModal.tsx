import {
  Button,
  CircularProgress,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, useEffect, useRef } from "react";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import useAnnounce from "../hooks/useAnnounce";
import { addBookAction } from "../store/actions/books-actions";
import { searchBooksAction } from "../store/actions/search-actions";
import searchSlice from "../store/slices/search/search-slice";
import SelectableContainer from "./ui/SelectableContainer";

const AddBookModal: FC<{ isOpen: boolean; onClose: () => void }> = (p) => {
  const { booksData, isLoading, query } = useTypeSelector(
    (state) => state.book_search
  );
  const { setQuery } = searchSlice.actions;
  const d = useTypeDispatch();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const announce = useAnnounce();
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => d(searchBooksAction(query.trim())), 1000);
  }, [query]);

  return (
    <Modal
      isOpen={p.isOpen}
      onClose={p.onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Add new book
          {isLoading && (
            <CircularProgress size="5" float="right" isIndeterminate />
          )}
        </ModalHeader>
        <ModalBody>
          <Input value={query} onChange={(e) => d(setQuery(e.target.value))} />
          {!!booksData.length && (
            <Flex direction="column" gap="2" p="2" mt="3" borderWidth="1px">
              {booksData.map((book, i) => (
                <SelectableContainer
                  key={i}
                  onClick={() => d(addBookAction({ book, announce }))}
                >
                  <strong>"{book.title}"</strong> by {book.author_name[0]}
                </SelectableContainer>
              ))}
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              d(setQuery(""));
              p.onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBookModal;
