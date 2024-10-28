import { StyleSheet, View, Pressable, Text, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';

export default function Button({
  label,
  onClickHandler,
  style,
  labelStyle,
  icon,
}: {
  label?: string;
  onClickHandler: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  icon?: React.ReactNode;
}) {
  const buttonContent = icon ? (
    icon
  ) : (
    <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
  );

  // Flatten the styles to check for padding
  const buttonStyle = StyleSheet.flatten([styles.button, style]);

  return (
      <TouchableOpacity
        style={[
          buttonStyle,
        ]}
        onPress={onClickHandler}
      >
        {buttonContent}
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 0, 
  },
  buttonLabel: {
    color: '#25292e',
    fontSize: 16,
  },
});
