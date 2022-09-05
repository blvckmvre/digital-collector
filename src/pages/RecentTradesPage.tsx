import { Flex, Heading, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import HeaderText from "../comps/ui/HeaderText";
import { useTypeDispatch, useTypeSelector } from "../hooks/redux-hooks";
import { getCompletedTradesAction } from "../store/actions/trade-actions";

const RecentTradesPage: FC = () => {
  const { completedTrades } = useTypeSelector((state) => state.trades);
  const d = useTypeDispatch();
  useEffect(() => {
    d(getCompletedTradesAction());
  }, []);
  return (
    <Flex direction="column" gap="2" align="center" w="95vw" m="auto">
      <HeaderText>Recent Trades</HeaderText>
      {completedTrades.length ? (
        completedTrades.map((trade) => (
          <Flex
            w="full"
            p="4"
            borderWidth="1px"
            key={trade.id}
            direction="column"
            gap="1"
          >
            <Text>
              <strong>{trade.creator_name}</strong> got "{trade.gets_title}"
            </Text>
            <Text>
              <strong>{trade.partner_name}</strong> got "{trade.gives_title}"
            </Text>
          </Flex>
        ))
      ) : (
        <Heading textAlign="center" size="sm">
          No trades yet
        </Heading>
      )}
    </Flex>
  );
};

export default RecentTradesPage;
