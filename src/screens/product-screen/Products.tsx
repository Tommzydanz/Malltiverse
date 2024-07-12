import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
import ProductItem from "../../components/product-item/ProductItem";
import { Ionicons } from "@expo/vector-icons"
import { getProducts, Product } from "../../api/products";
import { Loader } from "../../components/Loader/Loader";


const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the products from the server.
   */
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getProducts();
      if (result && result.items) {
        setProducts(result.items);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('An error occurred while fetching products');
    }
    setIsLoading(false);
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <View style={styles.otherContainer}>
        <Loader size={'large'} color={'orange'} />
        <Text>Fetching Products...</Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.otherContainer}>
        <Ionicons name="alert-circle-outline" size={40} color="red" />
        <Text>Error: {error}</Text>
        <TouchableOpacity style={styles.tryAgainButton} onPress={fetchProducts}>
          <Text style={styles.tryAgainButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products || []}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductItem product={item} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  otherContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  tryAgainButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Products;
