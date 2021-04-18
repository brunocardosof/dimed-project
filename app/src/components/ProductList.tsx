import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  width: 100%;
  padding: 10px;
`;
export const Card = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 1px solid #000;
  margin: 10px 0px;
`;
export const ProductImageContainer = styled.View`
  display: flex;
`;
export const ProductImage = styled.Image`
  width: 100px;
  height: 100px;
`;
export const ProductInfoContainer = styled.View`
  display: flex;
`;
export const ProductInfoName = styled.Text`
  font-size: 24px;
`;
export const ProductInfoPrice = styled.Text`
  font-size: 24px;
`;
