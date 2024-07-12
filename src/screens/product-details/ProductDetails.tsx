import { ScrollView, StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ProductDetailProps } from './interface';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');


const ProductDetails: ProductDetailProps = ({route, navigation}) => {
  const { product } = route.params;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const flatListRef = useRef<FlatList | null>(null);

  /**
   * Handles the "Add to Cart" button press.
   * Increases the cart items count by 1.
   */
  const handleAddToCart = () => {
    setCartItemsCount(prevCount => prevCount + 1);
  };
 
  useEffect(() => {
    /**
     * Updates the header right component with the cart items count badge.
     */
    const updateHeaderRight = () => {
      navigation.setOptions({
        headerRight: () => (
          <View style={{ marginRight: 15 }}>
            <MaterialCommunityIcons name="shopping-outline" size={24} color="black" style={{marginHorizontal: 16}}/>
            {cartItemsCount >= 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemsCount}</Text>
              </View>
            )}
          </View>
        ),
      });
    };

    updateHeaderRight();

    return () => {
      // Reset the header when the component unmounts
      navigation.setOptions({
        headerRight: undefined,
      });
    };
  }, [navigation, cartItemsCount]);


  /**
   * Renders an image item in the FlatList.
   * @param item - The image item object.
   * @param index - The index of the image item.
   */
  const renderImageItem = ({ item, index }: { item: { url: string }, index: number }) => (     
    <View style={styles.imageWrapper}>
      <Image 
        style={styles.image} 
        source={{uri: `https://api.timbu.cloud/images/${item.url}`}} 
        resizeMode="contain" 
      />
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {index + 1}/{product.photos.length}
        </Text>
      </View>
    </View>
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  
  return (
    <View style={styles.container}>

      <ScrollView style={styles.scrollView}>
        <FlatList
          ref={flatListRef}
          data={product.photos}
          renderItem={renderImageItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={viewabilityConfig}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.price}>
            ₦ {product.current_price[0]?.NGN[0]?.toLocaleString("en-US") || "N/A"}
          </Text>
          <Text style={styles.name}>{product.name}</Text>
          <View style={{borderBottomWidth: 1, marginBottom: 6, borderBottomColor: '#80808031'}}>
            <Text style={styles.descriptionName}>ITEM DESCRIPTION</Text>
          </View>
          <Text style={styles.description}>{product.description || ''}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>ADD TO CART</Text>
      </TouchableOpacity>
    </View>
  )
};

export default ProductDetails

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  detailsContainer: {
    padding: 16,
  },
  imageWrapper: {
    position: 'relative',
    width: screenWidth,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  counterContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
  },
  counterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  descriptionName: {
    fontSize: 15,
    color: 'gray',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#FFE4B5', 
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    right: 9,
    top: -1,
    backgroundColor: 'orange',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});