import React from "react";
import styled from "styled-components/macro";

import { QUERIES, WEIGHTS } from "../../constants";
import Logo from "../Logo";
import Icon from "../Icon";
import UnstyledButton from "../UnstyledButton";
import SuperHeader from "../SuperHeader";
import MobileMenu from "../MobileMenu";
import VisuallyHidden from "../VisuallyHidden";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <DesktopNav>
          <FlipLink href="/sale">Sale</FlipLink>
          <FlipLink href="/new">New&nbsp;Releases</FlipLink>
          <FlipLink href="/men">Men</FlipLink>
          <FlipLink href="/women">Women</FlipLink>
          <FlipLink href="/kids">Kids</FlipLink>
          <FlipLink href="/collections">Collections</FlipLink>
        </DesktopNav>
        <MobileActions>
          <ShoppingBagButton>
            <Icon id="shopping-bag" />
            <VisuallyHidden>Open cart</VisuallyHidden>
          </ShoppingBagButton>
          <UnstyledButton>
            <Icon id="search" />
            <VisuallyHidden>Search</VisuallyHidden>
          </UnstyledButton>
          <UnstyledButton onClick={() => setShowMobileMenu(true)}>
            <Icon id="menu" />
            <VisuallyHidden>Open menu</VisuallyHidden>
          </UnstyledButton>
        </MobileActions>
        <Filler />
      </MainHeader>

      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
      />
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  border-bottom: 1px solid var(--color-gray-300);
  overflow: auto;

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: space-between;
    align-items: center;
    border-top: 4px solid var(--color-gray-900);
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: clamp(1rem, 9.2vw - 4.5rem, 3.5rem);
  margin: 0px 48px;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const MobileActions = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 32px;
    display: flex;
  }

  @media ${QUERIES.phoneAndSmaller} {
    gap: 16px;
  }
`;

const LogoWrapper = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    flex: revert;
  }
`;

const ShoppingBagButton = styled(UnstyledButton)`
  transform: translateX(-2px);
`;

const Filler = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const NavLink = styled.a`
  --flip-duration: 200ms;
  --flip-depth: 1em;
  --flip-ease: cubic-bezier(0.5, 0, 0.5, 1);
  --flip-transition: var(--flip-duration) var(--flip-ease);

  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  perspective: 200px;

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Flip = styled.div`
  position: absolute;

  @media (prefers-reduced-motion: no-preference) {
    transition:
      transform var(--flip-transition),
      opacity var(--flip-transition);
    transform: translateZ(calc(var(--flip-depth) * -1)) rotateX(0deg)
      translateZ(var(--flip-depth));

    ${NavLink}:hover &, ${NavLink}:focus & {
      transform: translateZ(calc(var(--flip-depth) * -1)) rotateX(90deg)
        translateZ(var(--flip-depth));
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity var(--flip-transition);

    ${NavLink}:hover &, ${NavLink}:focus & {
      opacity: 0;
    }
  }
`;

const FlipBottom = styled.div`
  font-weight: ${WEIGHTS.bold};
  opacity: 0;

  @media (prefers-reduced-motion: no-preference) {
    transition:
      transform var(--flip-transition),
      opacity var(--flip-transition);
    transform: translateZ(calc(var(--flip-depth) * -1)) rotateX(-90deg)
      translateZ(var(--flip-depth));

    ${NavLink}:hover &, ${NavLink}:focus & {
      transform: translateZ(calc(var(--flip-depth) * -1)) rotateX(0deg)
        translateZ(var(--flip-depth));
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity var(--flip-transition);

    ${NavLink}:hover &, ${NavLink}:focus & {
      opacity: 1;
    }
  }
`;

const FlipLink = ({ children, ...props }) => {
  return (
    <NavLink {...props}>
      <Flip>{children}</Flip>
      <FlipBottom aria-hidden={true}>{children}</FlipBottom>
    </NavLink>
  );
};

export default Header;
