import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useTypeSelector } from "../hooks/redux-hooks";

const NavLinks: FC<{ shouldAdjust: boolean }> = ({ shouldAdjust }) => {
  const { isLoggedIn } = useTypeSelector((state) => state.auth);
  return (
    <Breadcrumb
      py="3"
      px="5"
      separator="›"
      fontSize={shouldAdjust ? "md" : "xs"}
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/recent">
          Recent trades
        </BreadcrumbLink>
      </BreadcrumbItem>
      {isLoggedIn && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/offers">
            My offers
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default NavLinks;
