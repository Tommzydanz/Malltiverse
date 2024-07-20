import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import colors from "../../configs/colors.config";
import useWishlistStore from "../../store/useWishlistStore";
import SavedItem from "../../components/saved-item/SavedItem";

const Wishlist: React.FC = () => {
  const products = useWishlistStore((state) => state.products);

  const renderFooter = () => {
    if (products.length === 0) {
      return (
        <View style={styles.emptyWishlistContainer}>
          <Text style={styles.emptyWishlistText}>No Item in Wishlist</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SavedItem product={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteFade,
    padding: 22,
  },
  cartItem: {
    marginBottom: 8,
  },
  removeButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fallbackContainer: {
    flex: 1,
    marginBottom: 120,
  },
  checkoutButton: {
    backgroundColor: "orange",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyWishlistContainer: {
    flex: 2,
    marginTop: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.whiteFade,
  },
  emptyWishlistText: {
    fontSize: 24,
    fontFamily: "Montserrat_500Medium",
    color: colors.secondary,
  },
});

export default Wishlist;
