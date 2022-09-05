import { Flex } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import OffersList from "../comps/OffersList";
import HeaderText from "../comps/ui/HeaderText";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import useAnnounce from "../hooks/useAnnounce";
import {
  getReceivedOffersAction,
  getSentOffersAction,
  completeTradeAction,
  rejectOfferAction,
} from "../store/actions/trade-actions";

const MyOffersPage: FC = () => {
  const { receivedOffers, sentOffers } = useTypeSelector(
    (state) => state.trades
  );
  const d = useTypeDispatch();
  const announce = useAnnounce();
  useEffect(() => {
    d(getReceivedOffersAction());
    d(getSentOffersAction());
  }, []);
  return (
    <>
      <HeaderText>My Offers</HeaderText>
      <Flex justify="space-evenly" wrap="wrap" gap="10">
        <OffersList
          title="Received offers"
          offers={receivedOffers}
          accept_callback={(id) => d(completeTradeAction({ id, announce }))}
          reject_callback={(id) => d(rejectOfferAction(id))}
        />
        <OffersList title="Sent offers" offers={sentOffers} />
      </Flex>
    </>
  );
};

export default MyOffersPage;
