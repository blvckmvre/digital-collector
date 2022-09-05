import { ArrowUpDownIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { ITradeOffer } from "../types/trade";

interface OffersListProps {
  title: string;
  offers: ITradeOffer[];
  accept_callback?: (id: number) => void;
  reject_callback?: (id: number) => void;
}

const OffersList: FC<OffersListProps> = ({
  title,
  offers,
  accept_callback,
  reject_callback,
}) => {
  return (
    <Flex direction="column" gap="2" w="350px">
      <Heading size="lg" textAlign="center">
        {title}
      </Heading>
      {offers.length ? (
        offers.map((offer) => (
          <Flex
            direction="column"
            borderWidth="1px"
            key={offer.id}
            justify="space-between"
            align="center"
            gap="3"
            p="2"
          >
            <Text textAlign="center">
              {offer.creator_name}: "{offer.gives_title}"
            </Text>
            <ArrowUpDownIcon />
            <Text textAlign="center">
              {offer.partner_name}: "{offer.gets_title}"
            </Text>
            <Flex gap="1">
              {accept_callback && (
                <Button onClick={() => accept_callback(offer.id)}>
                  <CheckIcon />
                </Button>
              )}
              {reject_callback && (
                <Button onClick={() => reject_callback(offer.id)}>
                  <CloseIcon />
                </Button>
              )}
            </Flex>
          </Flex>
        ))
      ) : (
        <Text textAlign="center">No pending offers</Text>
      )}
    </Flex>
  );
};

export default OffersList;
