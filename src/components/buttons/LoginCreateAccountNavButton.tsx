import React , {FC} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { sovietButtonStyles, sovietTextStyles } from '../../assets/sovietStyles';

interface LoginCreateAccountNavButtonProps {
  onPress: () => void;
  title: string;
}

export const LoginCreateAccountNavButton: FC<LoginCreateAccountNavButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={sovietButtonStyles.LoginCreateAccountNavButton}>
      <Text style={sovietTextStyles.SmallRedSovietText}>{title}</Text>
    </TouchableOpacity>
  );
};
