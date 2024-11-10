import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';
interface FormFieldsProps {
	title: string;
	value: string;
	handleChangeText: (element: string) => void;
	otherStyles: string;
	placeholder: string;

	keyboardType?: string;
}

const FormField: React.FC<FormFieldsProps> = ({ title, value, handleChangeText, otherStyles, keyboardType, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isFocussed, setIsFocussed] = useState(false);

	return (
		<View className={`space-y-2 mb-3  ${otherStyles}`}>
			<Text className="text-base text-gray-100 font-pmedium">{title}</Text>
			<View className={`border-2 w-full h-16 flex-row px-4  rounded-2xl ${isFocussed ? 'border-secondary-100' : 'border-stone-800'} items-center mt-3 `}>
				<TextInput
					className="flex-1 text-white font-psemibold text-base "
					value={value}
					onFocus={() => setIsFocussed(true)}
					onBlur={() => {
						setIsFocussed(false);
					}}
					{...props}
					placeholderTextColor="#7b7b8b"
					onChangeText={handleChangeText}
					secureTextEntry={title === 'Password' && !showPassword}
				/>
				{title === 'Password' && (
					<TouchableOpacity
						onPress={() => {
							setShowPassword(!showPassword);
						}}
					>
						<Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormField;
