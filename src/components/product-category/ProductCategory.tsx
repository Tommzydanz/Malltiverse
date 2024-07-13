import React, { useMemo, useState } from "react";
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
import { PageIndicator } from "react-native-page-indicator";
import { ProductCategoryProps } from "./interface";
import { Product } from "../../api/products";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 30) / 2; // Assuming 10px gap and 10px padding on each side

const ProductCategory: ProductCategoryProps = ({ products, addToCart }) => {
  const [currentPage, setCurrentPage] = useState(0);

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

  const handleScroll = (event: any, _categoryProducts: Product[]) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / screenWidth);
    setCurrentPage(page);
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
        data={categoryProducts}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleScroll(event, categoryProducts)}
        renderItem={({ item, index }) => (
          <View style={styles.productWrapper}>
            <ProductItem product={item} onAddToCart={addToCart} />
            {index % 2 !== 0 && index !== categoryProducts.length - 1 && (
              <View style={styles.spacer} />
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productRow}
        snapToInterval={screenWidth}
        decelerationRate="fast"
      />
      <PageIndicator
        count={Math.ceil(categoryProducts.length / 2)}
        current={currentPage}
        size={12}
        variant={"beads"}
        style={styles.pageIndicator}
        activeColor={colors.primary}
        scale={1}
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
  productRow: {
    paddingHorizontal: 1,
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
