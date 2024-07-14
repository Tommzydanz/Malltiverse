import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../configs/colors.config";
import ProductCategory from "../../components/product-category/ProductCategory";
import { Loader } from "../../components/Loader/Loader";
import { getProductsWithRatings, Product } from "../../api/products";

interface ProductsScreenProps {
  addToCart: (product: Product) => void;
}

const Products: React.FC<ProductsScreenProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the products from the server.
   */
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getProductsWithRatings();
      if (result && result.items) {
        setProducts(result.items);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("An error occurred while fetching products");
    }
    setIsLoading(false);
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Render loading state
  if (isLoading) {
    return (
      <View style={styles.otherContainer}>
        <Loader size={"large"} color={colors.primary} />
        <Text style={{ fontFamily: "Montserrat_500Medium" }}>
          Fetching Products...
        </Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.otherContainer}>
        <Ionicons name="alert-circle-outline" size={40} color={colors.danger} />
        <Text style={styles.tryAgainButtonText}>Error: {error}</Text>
        <TouchableOpacity style={styles.tryAgainButton} onPress={fetchProducts}>
          <Text style={styles.tryAgainButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          source={require("../../../assets/big-banner.png")}
          style={styles.banner}
        />
      </View>
      <ProductCategory products={products} addToCart={addToCart} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteFade,
  },
  bannerContainer: {
    paddingHorizontal: 22,
  },
  banner: {
    width: "100%",
    borderRadius: 10,
  },
  otherContainer: {
    flex: 1,
    backgroundColor: colors.whiteFade,
    justifyContent: "center",
    alignItems: "center",
  },
  tryAgainButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  tryAgainButtonText: {
    color: colors.secondary,
    fontFamily: "Montserrat_500Medium",
  },
});

export default Products;
