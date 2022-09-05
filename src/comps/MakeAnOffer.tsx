import { LinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FC } from "react";
import { IBook } from "../types/books";
import { IUser } from "../types/users";
import TradeScreen from "./TradeScreen";

interface MakeAnOfferProps {
  offerBook: IBook;
  offerUser: IUser;
}

const MakeAnOffer: FC<MakeAnOfferProps> = ({ offerBook, offerUser }) => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button>
          <LinkIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Choose a book from your collection</PopoverHeader>
        <PopoverBody>
          <TradeScreen offerBook={offerBook} offerUser={offerUser} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MakeAnOffer;
