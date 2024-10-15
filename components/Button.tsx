import { StyleSheet, View, Pressable, Text, ViewStyle, TextStyle } from 'react-native';

type Props = {
  label?: string;
  onClickHandler: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  icon?: React.ReactNode;
};

export default function Button({
  label,
  onClickHandler,
  style,
  labelStyle,
  icon,
}: Props) {
  const buttonContent = icon ? (
    icon
  ) : (
    <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
  );

  // Flatten the styles to check for padding
  const buttonStyle = StyleSheet.flatten([styles.button, style]);

  return (
    <View style={[styles.buttonContainer]}>
      <Pressable
        style={[
          buttonStyle,
          // {
          //   backgroundColor: '#fff',
          // },
        ]}
        onPress={onClickHandler}
      >
        {buttonContent}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 0, // No padding needed for icon-only button
  },
  buttonLabel: {
    color: '#25292e',
    fontSize: 16,
  },
});
