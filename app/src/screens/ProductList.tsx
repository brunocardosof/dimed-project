import React from 'react';
import {FlatList, Alert} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {
  Card,
  Container,
  ProductImage,
  ProductImageContainer,
  ProductInfoContainer,
  ProductInfoName,
  ProductInfoPrice,
} from '../components/ProductList';
import {findAllProducts} from '../services/http/products';

export default class ProductList extends React.Component {
  state = {
    search: '',
    products: [],
  };

  updateSearch = (search: any) => {
    this.setState({search});
  };

  componentDidMount() {
    (async () => {
      const response = await findAllProducts();
      this.setState({products: response.data.payload});
      console.log(response.data.payload);
    })();
  }
  render() {
    const {search} = this.state;
    return (
      this.state.products.length !== 0 && (
        <Container>
          <SearchBar
            lightTheme
            round
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
          <FlatList
            data={this.state.products}
            keyExtractor={(product: any) => String(product.id)}
            onEndReachedThreshold={0.3}
            onEndReached={() => Alert.alert('Oi')}
            renderItem={({item: product, index}) => (
              <Card key={index}>
                <ProductImageContainer>
                  <ProductImage source={{uri: product.images[0]}} />
                </ProductImageContainer>
                <ProductInfoContainer>
                  <ProductInfoName>{product.name}</ProductInfoName>
                  <ProductInfoPrice>
                    {product.price.originalPrice}
                  </ProductInfoPrice>
                </ProductInfoContainer>
              </Card>
            )}
          />
        </Container>
      )
    );
  }
}
