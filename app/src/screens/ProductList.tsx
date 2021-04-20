import React, {PureComponent} from 'react';
import {FlatList, Alert} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {findAllProducts} from '../actions/productActions';
import {
  Card,
  Container,
  ProductImage,
  ProductPromotion,
  ProductImageContainer,
  ProductInfoContainer,
  ProductInfoName,
  ProductInfoPrice,
  ProductOriginalPrice,
  ProductDealPrice,
  ProductPricePercentage,
  ProductRelease,
} from '../components/ProductList';

class ProductList extends PureComponent<any, any> {
  state = {
    search: '',
    products: [],
  };

  updateSearch = (search: any) => {
    this.setState({search});
  };

  componentDidMount() {
    (async () => {
      await this.props.findAllProducts();
    })();
  }
  render() {
    const {search} = this.state;
    return (
      this.props.products.length !== 0 && (
        <Container>
          <SearchBar
            lightTheme
            placeholder="Pesquisar produto..."
            onChangeText={this.updateSearch}
            value={search}
          />
          <FlatList
            data={this.props.products}
            keyExtractor={(product: any) => String(product.id)}
            onEndReachedThreshold={0.3}
            onEndReached={() => Alert.alert('Oi')}
            renderItem={({item: product, index}) => (
              <Card key={index}>
                <ProductImageContainer>
                  {Object.keys(product.price).length > 1 && (
                    <ProductPromotion>
                      <ProductPricePercentage>-33%</ProductPricePercentage>
                      <ProductRelease>Lançamento</ProductRelease>
                    </ProductPromotion>
                  )}
                  <ProductImage source={{uri: product.images[0]}} />
                </ProductImageContainer>
                <ProductInfoContainer>
                  <ProductInfoName>{product.name}</ProductInfoName>
                  <ProductInfoPrice>
                    {Object.keys(product.price).length > 1 ? (
                      <>
                        <ProductOriginalPrice>
                          De R$ {product.price.dealPrice}
                        </ProductOriginalPrice>
                        <ProductDealPrice>
                          {' '}
                          Por R$ {product.price.originalPrice}
                        </ProductDealPrice>
                      </>
                    ) : (
                      <ProductOriginalPrice>
                        Por R$ {product.price.originalPrice}
                      </ProductOriginalPrice>
                    )}
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
const mapStateToProps = (state: any, props: any) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    findAllProducts: () => {
      dispatch(findAllProducts());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
