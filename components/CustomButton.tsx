import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, StyleProp, ViewStyle, View } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
	title: string;
	handlePress: () => void;
	isLoading?: boolean;
	textStyles?: string;
	containerStyles?: string;
}
const CustomButton: React.FC<CustomButtonProps> = ({ title, containerStyles, handlePress, isLoading, textStyles, ...props }) => {
	return (
		<TouchableOpacity
			className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''} `}
			disabled={isLoading}
			onPress={handlePress}
			activeOpacity={0.7}
			{...props}
		>
			<Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
