import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import ProductItem from "../product-item/ProductItem";
import colors from "../../configs/colors.config";
import { ProductCategoryProps } from "./interface";
import { Product } from "../../api/products";
import PageIndicator from "../page-indicator/PageIndicator";

const screenWidth = Dimensions.get("window").width;
const itemMargin = 7;
const itemsPerPage = 2;
const itemWidth =
  (screenWidth - itemMargin * (itemsPerPage + 1)) / itemsPerPage;
const ProductCategory: ProductCategoryProps = ({ products, addToCart }) => {
  const [currentPages, setCurrentPages] = useState<Record<string, number>>({});
  const flatListRefs = useRef<Record<string, FlatList | null>>({});

  const categorizedProducts: [string, Product[]][] = useMemo(() => {
    if (!products || products.length === 0) return [];

    const grouped: Record<string, Product[]> = {};
    const categoryOrder: string[] = [];

    products.forEach((product) => {
      const categoryName = product.categories[0]?.name || "Uncategorized";

      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
        categoryOrder.unshift(categoryName); // Add new categories to the beginning of the order array
      }
      grouped[categoryName].push(product);
    });

    // Use the categoryOrder to create the final array
    return categoryOrder.map((category) => [category, grouped[category]]);
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No products available.</Text>
      </View>
    );
  }

  const handleScroll = (
    event: any,
    category: string,
    categoryProducts: Product[],
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / screenWidth);
    setCurrentPages((prevPages) => ({
      ...prevPages,
      [category]: page,
    }));
    // Prevent extra dragging at the last page
    const totalItems = categoryProducts.length;
    const maxOffset = (Math.ceil(totalItems / itemsPerPage) - 1) * screenWidth;
    if (offsetX > maxOffset) {
      flatListRefs.current[category]?.scrollToOffset({
        offset: maxOffset,
        animated: true,
      });
    }
  };

  const renderCategory = ([category, categoryProducts]: [
    string,
    Product[],
  ]) => (
    <View key={category} style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>
        {category
          .split(/[\s_]+/) // Split by space or underscore
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ")}
      </Text>
      <FlatList
        ref={(ref) => (flatListRefs.current[category] = ref)}
        data={categoryProducts}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleScroll(event, category, categoryProducts)}
        renderItem={({ item, index }) => (
          <View style={styles.productWrapper}>
            <ProductItem product={item} onAddToCart={addToCart} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
      />
      <PageIndicator
        count={Math.ceil(categoryProducts.length / 2)}
        current={currentPages[category] || 0}
        size={12}
        style={styles.pageIndicator}
        activeColor={colors.primary}
        inactiveColor={colors.gray400}
      />
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {categorizedProducts.map(renderCategory)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 44,
  },
  categoryContainer: {
    marginBottom: 67,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  productWrapper: {
    width: itemWidth,
    marginRight: 10,
  },
  spacer: {
    width: screenWidth - (itemWidth * 2 + 20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  pageIndicator: {
    marginTop: 10,
    alignSelf: "center",
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
});

export default ProductCategory;
