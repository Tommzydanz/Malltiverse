import {StyleProp, TextProps} from 'react-native';

export type ILoaderProps = React.FC<
  StyleProp<any> &
    TextProps & {
      size?: 'small' | 'large' | number;
      color?: string;
    }
>;
