/* eslint-disable no-unused-vars */
import React from "react";
import styled, { keyframes } from "styled-components/macro";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import { QUERIES, WEIGHTS } from "../../constants";

import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const MobileMenu = ({ isOpen, onDismiss }) => {
  const initialDelay = 200;
  const delayPerItem = 75;

  const style = (index) => ({
    "--animation-delay": `${initialDelay + index * delayPerItem}ms`,
  });

  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="Menu">
        <CloseButton onClick={onDismiss}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          <NavLink href="/sale" style={style(0)}>
            Sale
          </NavLink>
          <NavLink href="/new" style={style(1)}>
            New&nbsp;Releases
          </NavLink>
          <NavLink href="/men" style={style(2)}>
            Men
          </NavLink>
          <NavLink href="/women" style={style(3)}>
            Women
          </NavLink>
          <NavLink href="/kids" style={style(4)}>
            Kids
          </NavLink>
          <NavLink href="/collections" style={style(5)}>
            Collections
          </NavLink>
        </Nav>
        <Footer>
          <SubLink href="/terms" style={style(6)}>
            Terms and Conditions
          </SubLink>
          <SubLink href="/privacy" style={style(7)}>
            Privacy Policy
          </SubLink>
          <SubLink href="/contact" style={style(8)}>
            Contact Us
          </SubLink>
        </Footer>
      </Content>
    </Overlay>
  );
};

const backdropFadeIn = keyframes`
  from {
    background: transparent;
  }
  to {
    background: var(--color-backdrop);
  }
`;

const swingIn = keyframes`
  from {
    transform: rotateY(-120deg);
  }
  to {
    transform: rotateY(0deg);
  }
`;

const contentFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Overlay = styled(DialogOverlay)`
  --ease-out: cubic-bezier(0, 0, 0, 1);
  --ease-in-out: cubic-bezier(0.39, 0, 0.5, 1);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  animation: ${backdropFadeIn} 400ms both var(--ease-in-out);
  perspective: 1200px;
`;

const Content = styled(DialogContent)`
  background: white;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  animation-delay: 200ms;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${swingIn} 1000ms both var(--ease-out);
    transform-origin: 100% 50%;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: ${contentFadeIn} 300ms both var(--ease-out);
  }
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;
  animation: ${contentFadeIn} 300ms both var(--ease-in-out);
  animation-delay: var(--animation-delay);

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
  animation: ${contentFadeIn} 300ms both var(--ease-in-out);
  animation-delay: var(--animation-delay);
`;

export default MobileMenu;
