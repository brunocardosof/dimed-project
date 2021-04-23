import styled from 'styled-components/native';
export const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
`;
export const ProductImageContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin: 10px 0px;
  background-color: #fefefe;
`;
export const ProductPricePercentage = styled.Text`
  font-size: 14px;
  text-align: center;
  padding: 3px;
  border-radius: 8px;
  background-color: #f36719;
  color: white;
  width: 30%;
  margin: 20px 0px;
`;

export const ProductImage = styled.Image`
  width: 170px;
  height: 170px;
`;
export const ProductName = styled.Text`
  font-size: 22px;
  text-align: center;
  margin: 10px 0px;
`;
export const ContainerProductDescription = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #c3cfd9;
  padding: 40px 0px;
`;
export const ProductDescription = styled.Text`
  font-size: 18px;
  text-align: center;
`;
export const ContainerViewPrice = styled.View`
  display: flex;
  margin: 10px 0px;
  padding: 0px 10px;
  /* flex-direction: row;
  justify-content: center;
  align-items: center; */
`;
export const ProductInfoPrice = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const ProductPriceTitle = styled.Text`
  font-size: 22px;
`;
export const ProductOriginalPrice = styled.Text`
  font-size: 20px;
`;
export const ProductDealPrice = styled.Text`
  font-size: 20px;
`;
export const ProductTotalPrice = styled.Text`
  font-size: 24px;
  text-align: center;
  margin: 25px 0px;
`;
export const ContainerQuantity = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const ProductQuantity = styled.Text`
  font-size: 20px;
`;
