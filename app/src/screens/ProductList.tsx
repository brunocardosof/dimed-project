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

type RootStackParamList = {
  ProductDetail: {product: Product};
  Camera: undefined;
};

type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;
interface Price {
  originalPrice: number;
  dealPrice?: number;
  percentage?: number;
}
interface Product {
  id: number;
  ean: number;
  name: string;
  images: string[];
  price: Price;
}

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

  renderProductDetail = (product: Product) => {
    this.props.navigation.navigate('ProductDetail', {product});
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
            value={this.state.search}
          />
          <TouchableOpacity>
            <Icon
              name="barcode"
              size={57}
              style={{marginTop: 4}}
              color="#c3cfd9"
              onPress={() => this.props.navigation.navigate('Camera')}
            />
          </TouchableOpacity>
        </Header>
        <FlatList
          data={this.state.products}
          keyExtractor={(product: any) => String(product.id)}
          extraData={this.state}
          onEndReachedThreshold={0.3}
          renderItem={({item: product, index}) => (
            <Card key={index} onPress={() => this.renderProductDetail(product)}>
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
    );
  }
}
const mapStateToProps = (state: State) => {
  return {
    products: state.products,
    fullDataProducts: state.fullDataProducts,
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
