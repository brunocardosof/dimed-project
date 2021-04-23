import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  width: 100%;
  padding: 10px;
  background-color: #fefefe;
`;
export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const Card = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 3px solid #c3cfd9;
  margin: 10px 0px;
  padding: 10px;
`;
export const ProductImageContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
export const ProductPromotion = styled.View`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
`;
export const ProductPricePercentage = styled.Text`
  font-size: 11px;
  text-align: center;
  padding: 3px;
  border-radius: 8px;
  background-color: #f36719;
  color: white;
  margin-bottom: 10px;
  width: 70%;
`;
export const ProductRelease = styled.Text`
  font-size: 11px;
  text-align: center;
  padding: 3px;
  border-radius: 8px;
  background-color: #f36719;
  color: white;
`;
export const ProductImage = styled.Image`
  width: 70px;
  height: 70px;
`;
export const ProductInfoContainer = styled.View`
  display: flex;
  justify-content: space-around;
  align-content: flex-end;
`;
export const ProductInfoName = styled.Text`
  font-size: 18px;
  text-align: left;
`;
export const ProductInfoPrice = styled.View`
  display: flex;
  flex-direction: row;
  text-align: left;
`;
export const ProductOriginalPrice = styled.Text`
  font-size: 13px;
`;
export const ProductDealPrice = styled.Text`
  font-size: 13px;
`;
