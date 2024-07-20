import React from "react";
import Svg, { Rect, Text, Circle, Image } from "react-native-svg";
import { Dimensions } from "react-native";
import colors from "../../configs/colors.config";

const { width: screenWidth } = Dimensions.get("window");
const aspectRatio = 377 / 217;
const cardHeight = 217;
const cardWidth = screenWidth - 40; // Subtracting 40 for left and right padding (20 each side)

const CreditCardSVG: React.FC<{
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
}> = ({ cardNumber, cardHolder, expiryDate }) => (
  <Svg
    width={cardWidth}
    height={cardHeight}
    viewBox={`0 0 ${cardWidth} ${cardHeight}`}
  >
    <Rect
      width={cardWidth}
      height={cardHeight}
      rx="10"
      ry="10"
      fill="#1a1a1a"
    />
    <Circle
      cx={cardWidth - 124}
      cy={cardHeight * 0.11}
      r={cardHeight * 0.35}
      fill={colors.whiteFade25}
      opacity="0.5"
    />
    <Circle
      cx={cardWidth - 30}
      cy={cardHeight * 0.34}
      r={cardHeight * 0.35}
      fill={colors.whiteFade25}
      opacity="0.3"
    />
    <Text
      x={cardWidth * 0.067}
      y={cardHeight * 0.55}
      fill="white"
      fontSize={cardHeight * 0.092}
    >
      {cardNumber || "5047 1245 7689 2345"}
    </Text>
    <Text
      x={cardWidth * 0.067}
      y={cardHeight * 0.75}
      fill="#cccccc"
      fontSize={cardHeight * 0.064}
    >
      Card holder name
    </Text>
    <Text
      x={cardWidth * 0.067}
      y={cardHeight * 0.84}
      fill="white"
      fontSize={cardHeight * 0.074}
    >
      {cardHolder || "Tom Cruise"}
    </Text>
    <Text
      x={cardWidth * 0.47}
      y={cardHeight * 0.75}
      fill="#cccccc"
      fontSize={cardHeight * 0.064}
    >
      Expiry date
    </Text>
    <Text
      x={cardWidth * 0.47}
      y={cardHeight * 0.84}
      fill="white"
      fontSize={cardHeight * 0.074}
    >
      {expiryDate || "MM/YY"}
    </Text>
    <Text
      x={cardWidth * 0.83}
      y={cardHeight * 0.14}
      fill="white"
      fontSize={cardHeight * 0.074}
      fontWeight="bold"
    >
      VISA
    </Text>
    <Image
      x={cardWidth * 0.83}
      y={cardHeight * 0.74}
      width={30}
      height={cardHeight * 0.1}
      preserveAspectRatio="xMidYMid slice"
      href={require("../../../assets/chip.png")}
    />
  </Svg>
);

export default CreditCardSVG;
