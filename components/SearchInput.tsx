import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
interface SearchInputProps {
	handleChangeText: (element: string) => void;
	placeholder: string;
	keyboardType: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ handleChangeText, keyboardType, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isFocussed, setIsFocussed] = useState(false);

	return (
		<View className={`border-2 w-full h-16 flex-row px-4 space-x-4  rounded-2xl ${isFocussed ? 'border-secondary-100' : 'border-stone-800'} items-center mt-3 `}>
			<TextInput
				className="text-base mt-0.5 text-white flex-1 font-pregular "
				onFocus={() => setIsFocussed(true)}
				onBlur={() => {
					setIsFocussed(false);
				}}
				{...props}
				placeholderTextColor="#7b7b8b"
				onChangeText={handleChangeText}
			/>
			<TouchableOpacity>
				<Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
