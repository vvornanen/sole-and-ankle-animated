import React from "react";
import styled, { keyframes } from "styled-components/macro";

import { WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <ZoomContainer>
            <Image alt="" src={imageSrc} />
          </ZoomContainer>
          {variant === "on-sale" && <SaleFlag>Sale</SaleFlag>}
          {variant === "new-release" && <NewFlag>Just released!</NewFlag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color":
                variant === "on-sale" ? "var(--color-gray-700)" : undefined,
              "--text-decoration":
                variant === "on-sale" ? "line-through" : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const ZoomContainer = styled.div`
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const jump = keyframes`
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
`;

const flashAndFocus = keyframes`
  0% {
    filter: contrast(100%) blur(0);
  }
  10% {
    filter: contrast(110%) blur(var(--blur));
  }
  30% {
    filter: contrast(105%) blur(0);
  }
  100% {
    filter: contrast(100%) blur(0);
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  transition: transform 500ms;
  transform-origin: 50% 90%;

  @media (prefers-reduced-motion: no-preference) {
    --blur: 4px;

    ${Link}:hover &, ${Link}:focus & {
      transform: scale(1.1);
      transition: transform 200ms;
      animation: ${flashAndFocus} 1500ms both cubic-bezier(0, 0.73, 0.3, 1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    --blur: 0;

    ${Link}:hover &, ${Link}:focus & {
      animation: ${flashAndFocus} 2000ms both;
    }
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;

  @media (prefers-reduced-motion: no-preference) {
    ${Link}:hover &, ${Link}:focus & {
      animation: ${jump} 400ms ease-out;
    }
  }
`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);
`;
const NewFlag = styled(Flag)`
  background-color: var(--color-secondary);
`;

export default ShoeCard;
