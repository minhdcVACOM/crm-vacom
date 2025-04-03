import { VcConstant } from '@/utils/constant';
import { Text, TextStyle, StyleProp } from 'react-native';
interface IProps {
  type?: 'default' | 'headerLarge' | 'header' | 'subHeader' | 'title' | 'subTitle' | 'subText' | 'error'
  style?: StyleProp<TextStyle>,
  text: string,
  numberOfLines?: number
};

export const VcText = ({
  style,
  type,
  text,
  numberOfLines = 1
}: IProps) => {
  return (
    <Text
      style={[
        // { textAlign: 'center' },
        VcConstant.stylesText(type),
        style,
      ]}
      numberOfLines={numberOfLines}
    >{text}</Text>
  );
}