import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../configs/colors.config";
import ProductCategory from "../../components/product-category/ProductCategory";
import { getProductsWithRatings, Product } from "../../api/products";
import { useCartStore } from "../../store/useCartStore";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";

const { width } = Dimensions.get("window");
const productWidth = (width - 66) / 2;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const addToCart = useCartStore((state) => state.addToCart);

  const checkNetworkConnection = useCallback(async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const fetchProducts = useCallback(async () => {
    if (!isConnected) {
      setError("Network unavailable. Please check your connection.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getProductsWithRatings();
      if (result && result.items) {
        setProducts(result.items);
      } else {
        setError("Failed to fetch products. Please try again.");
      }
    } catch (err) {
      if (err.message === "Network request failed") {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    checkNetworkConnection();
    if (isConnected) {
      fetchProducts();
    }
  }, [checkNetworkConnection, fetchProducts, isConnected]);

  if (!isConnected) {
    return (
      <View style={styles.otherContainer}>
        <Ionicons
          name="cloud-offline-outline"
          size={40}
          color={colors.danger}
        />
        <Text style={styles.errorText}>Network unavailable</Text>
        <TouchableOpacity
          style={styles.tryAgainButton}
          onPress={checkNetworkConnection}
        >
          <Text style={styles.tryAgainButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderSkeletonLoading = () => (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia style={styles.bannerSkeleton} />
        </Placeholder>
      </View>
      <View style={styles.categoryContainer}>
        <Placeholder Animation={Fade}>
          <PlaceholderLine width={30} />
        </Placeholder>
        <View style={styles.productsContainer}>
          {[...Array(4)].map((_, index) => (
            <View key={index} style={styles.productSkeleton}>
              <Placeholder Animation={Fade}>
                <PlaceholderMedia style={styles.productImageSkeleton} />
                <PlaceholderLine width={80} />
                <PlaceholderLine width={60} />
                <PlaceholderLine width={40} />
                <PlaceholderLine
                  width={80}
                  height={30}
                  style={styles.addToCartSkeleton}
                />
              </Placeholder>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return <ScrollView>{renderSkeletonLoading()}</ScrollView>;
  }

  if (error) {
    return (
      <View style={styles.otherContainer}>
        <Ionicons name="alert-circle-outline" size={40} color={colors.danger} />
        <Text style={styles.errorText}>{error}</Text>
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
  errorText: {
    color: colors.danger,
    fontFamily: "Montserrat_500Medium",
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  categoryContainer: {
    paddingHorizontal: 22,
    marginTop: 20,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productSkeleton: {
    width: productWidth,
    marginBottom: 20,
  },
  bannerSkeleton: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  productImageSkeleton: {
    width: productWidth,
    height: productWidth,
    borderRadius: 10,
    marginBottom: 10,
  },
  addToCartSkeleton: {
    marginTop: 10,
    borderRadius: 5,
  },
});

export default Products;
