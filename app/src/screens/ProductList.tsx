/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackNavigationProp} from '@react-navigation/stack';
import {findAllProducts} from '../actions/productActions';
import {
  Card,
  Container,
  Header,
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
import {Product} from '../interfaces/Product';

type RootStackParamList = {
  ProductDetail: {productId: number};
  Camera: undefined;
};

type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;
interface State {
  search: string;
  products: Product[];
  fullDataProducts: Product[];
}
interface Props {
  products: Product[];
  fullDataProducts: Product[];
  navigation: ProductListScreenNavigationProp;
  findAllProducts: any;
}

class ProductList extends React.Component<Props, State> {
  state = {
    search: '',
    products: [],
    fullDataProducts: [],
  };

  updateSearch = (text: string) => {
    this.setState({search: text});
    const newData = this.state.fullDataProducts.filter((item: Product) => {
      const itemData = `${item.name.toUpperCase()} ${item.ean}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({products: newData});
  };

  navigateToProductDetail = (productId: number) => {
    this.props.navigation.navigate('ProductDetail', {productId});
  };

  async componentDidMount() {
    await this.props.findAllProducts();
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if (!state.products.length && props.products.length) {
      return {
        products: props.products,
        fullDataProducts: props.fullDataProducts,
      };
    }
    return null;
  }

  render() {
    const {search, products} = this.state;
    return (
      <Container>
        <Header>
          <SearchBar
            inputContainerStyle={{
              backgroundColor: '#c3cfd9',
            }}
            containerStyle={{
              flex: 1,
              backgroundColor: 'white',
              borderTopColor: 'white',
              borderBottomColor: 'white',
            }}
            inputStyle={{
              borderStyle: 'solid',
              borderColor: '#c3cfd9',
            }}
            placeholder="Pesquisar produto..."
            platform="default"
            onChangeText={text => this.updateSearch(text)}
            value={search}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Camera')}>
            <Icon
              name="barcode"
              size={57}
              style={{marginTop: 4}}
              color="#c3cfd9"
            />
          </TouchableOpacity>
        </Header>
        <FlatList
          data={products}
          keyExtractor={(product: any) => String(product.id)}
          extraData={this.state}
          onEndReachedThreshold={0.3}
          renderItem={({item: product, index}) => (
            <TouchableOpacity
              onPress={() => this.navigateToProductDetail(product.id)}>
              <Card key={index}>
                <ProductImageContainer>
                  {Object.keys(product.price).length > 1 && (
                    <ProductPromotion>
                      <ProductPricePercentage>
                        -{product.price.percentage}%
                      </ProductPricePercentage>
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
            </TouchableOpacity>
          )}
        />
      </Container>
    );
  }
}
const mapStateToProps = (store: any) => {
  return {
    products: store.productsReducer.products,
    fullDataProducts: store.productsReducer.fullDataProducts,
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
