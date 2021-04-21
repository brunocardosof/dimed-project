import React from 'react';
import {FlatList} from 'react-native';
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

class ProductList extends React.Component<any, any> {
  state = {
    search: '',
    updateSearch: false,
    products: [],
    fullDataProducts: [],
  };

  updateSearch = text => {
    this.setState({search: text});
    const newData = this.state.fullDataProducts.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.ean}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({products: newData});
  };
  toggleUpdateSearch = () => {
    this.setState({updateSearch: !this.state.updateSearch});
  };

  renderProductDetail = () => {
    this.setState({products: []});
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
        <SearchBar
          inputContainerStyle={{
            backgroundColor: '#c3cfd9',
          }}
          containerStyle={{
            backgroundColor: 'white',
            borderTopColor: 'white',
            borderBottomColor: 'white',
          }}
          inputStyle={{
            borderStyle: 'solid',
            borderColor: '#c3cfd9',
          }}
          lightTheme
          placeholder="Pesquisar produto..."
          onChangeText={text => this.updateSearch(text)}
          value={this.state.search}
        />
        <FlatList
          data={this.state.products}
          keyExtractor={(product: any) => String(product.id)}
          extraData={this.state}
          onEndReachedThreshold={0.3}
          renderItem={({item: product, index}) => (
            <Card key={index} onPress={() => this.renderProductDetail()}>
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
const mapStateToProps = (state: any, props: any) => {
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
