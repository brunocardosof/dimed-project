import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon, withBadge} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  ProductImageContainer,
  ProductPricePercentage,
  ProductImage,
  ProductName,
  ProductDescription,
  ContainerProductDescription,
  ContainerViewPrice,
  ProductPriceTitle,
  ProductOriginalPrice,
  ProductInfoPrice,
  ProductDealPrice,
  ProductTotalPrice,
  ContainerQuantity,
  ProductQuantity,
} from '../components/ProductDetail';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {
  decrementQuantityMethod,
  findProductById,
  incrementQuantityMethod,
} from '../actions/productActions';
class ProductDetail extends React.Component<any, any> {
  state = {
    quantity: 1,
    totalPrice: 0,
  };

  async componentDidMount() {
    await this.props.findProductById(this.props.productId);
  }
  render() {
    const {
      product,
      quantity,
      totalPrice,
      incrementQuantity,
      decrementQuantity,
    } = this.props;
    if (!product) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      );
    }
    const BadgedIcon = withBadge(quantity)(Icon);
    return (
      <Container>
        <Header>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ProductList')}>
            <IconFontAwesome name="chevron-left" size={30} color="#000" />
          </TouchableOpacity>
          <BadgedIcon
            name="shopping-cart"
            type="font-awesome"
            size={30}
            color="#000"
          />
        </Header>
        <ScrollView>
          <ProductImageContainer>
            {Object.keys(product.price).length > 1 && (
              <ProductPricePercentage>
                -{product.price.percentage}%
              </ProductPricePercentage>
            )}
            <ProductImage source={{uri: product.images[0]}} />
          </ProductImageContainer>
          <ProductName>{product.name}</ProductName>
          <ContainerProductDescription>
            <ProductDescription>{product.description}</ProductDescription>
          </ContainerProductDescription>
          <ContainerViewPrice>
            {Object.keys(product.price).length === 1 ? (
              <>
                <ProductPriceTitle>Price</ProductPriceTitle>
                <ProductOriginalPrice>
                  Por R${product.price.originalPrice}
                </ProductOriginalPrice>
              </>
            ) : (
              <>
                <ProductPriceTitle>Preço</ProductPriceTitle>
                <ProductInfoPrice>
                  <ProductOriginalPrice>
                    De R${product.price.originalPrice}
                  </ProductOriginalPrice>
                  <ProductDealPrice>
                    Por R${product.price.dealPrice}
                  </ProductDealPrice>
                </ProductInfoPrice>
              </>
            )}
            <ProductTotalPrice>Total R$ {totalPrice}</ProductTotalPrice>
            <ContainerQuantity>
              <TouchableOpacity onPress={() => incrementQuantity(quantity)}>
                <IconFontAwesome name="plus" size={30} color="#000" />
              </TouchableOpacity>
              <ProductQuantity>{quantity}</ProductQuantity>
              <TouchableOpacity onPress={() => decrementQuantity(quantity)}>
                <IconFontAwesome name="minus" size={30} color="#000" />
              </TouchableOpacity>
            </ContainerQuantity>
          </ContainerViewPrice>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const id = ownProps.route.params.productId;
  return {
    productId: id,
    product: state.productsReducer.product,
    quantity: state.productsReducer.quantity,
    totalPrice: state.productsReducer.totalPrice,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    findProductById: (id: number) => {
      dispatch(findProductById(id));
    },
    incrementQuantity: (quantity: number) => {
      dispatch(incrementQuantityMethod(quantity));
    },
    decrementQuantity: (quantity: number) => {
      dispatch(decrementQuantityMethod(quantity));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
