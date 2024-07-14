import React from "react";
import { View, StyleSheet } from "react-native";

interface PageIndicatorProps {
  count: number;
  current: number;
  style?: object;
  activeColor: string;
  inactiveColor: string;
  size: number;
  borderWidth?: number;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({
  count,
  current,
  style,
  activeColor,
  inactiveColor,
  size,
  borderWidth = 1,
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              ...(index === current
                ? {
                    backgroundColor: activeColor,
                  }
                : {
                    borderWidth: borderWidth,
                    borderColor: inactiveColor,
                  }),
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    marginHorizontal: 3,
  },
});

export default PageIndicator;
