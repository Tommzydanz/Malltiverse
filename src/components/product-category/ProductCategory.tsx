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
const containerPadding = 22 * 2;
const itemMargin = 13;
const itemsPerPage = 2;
const pageWidth = screenWidth - containerPadding;
const itemWidth = (pageWidth - itemMargin) / itemsPerPage;

const ProductCategory: ProductCategoryProps = ({ products, addToCart }) => {
  const [currentPages, setCurrentPages] = useState<Record<string, number>>({});
  const flatListRefs = useRef<Record<string, FlatList | null>>({});

  const categorizedProducts: [string, Product[]][] = useMemo(() => {
    if (!products || products.length === 0) return [];

    const grouped: Record<string, Product[]> = {};
    const categoryOrder: string[] = [];

    products.forEach((product: Product) => {
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

  const handleScroll = (event: any, category: string) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / pageWidth);
    setCurrentPages((prevPages) => ({
      ...prevPages,
      [category]: page,
    }));
  };

  const renderCategory = ([category, categoryProducts]: [
    string,
    Product[],
  ]) => {
    const pageCount = Math.ceil(categoryProducts.length / itemsPerPage);

    return (
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
          onScroll={(event) => handleScroll(event, category)}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.productWrapper,
                index % 2 === 0 && { marginRight: itemMargin },
                index === categoryProducts.length - 1 &&
                  categoryProducts.length % 2 !== 0 && { width: pageWidth },
              ]}
            >
              <ProductItem product={item} onAddToCart={addToCart} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          snapToInterval={pageWidth}
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: pageWidth,
            offset: pageWidth * Math.floor(index / itemsPerPage),
            index,
          })}
        />
        <PageIndicator
          count={pageCount}
          current={currentPages[category] || 0}
          size={12}
          style={styles.pageIndicator}
          activeColor={colors.primary}
          inactiveColor={colors.gray400}
        />
      </View>
    );
  };

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
    paddingHorizontal: 22,
  },
  categoryContainer: {
    marginBottom: 67,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    marginVertical: 10,
  },
  productWrapper: {
    width: itemWidth,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  pageIndicator: {
    marginTop: 38,
    alignSelf: "center",
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
});

export default ProductCategory;
