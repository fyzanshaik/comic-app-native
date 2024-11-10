import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

interface EmptyStateProps {
	title: string;
	subTitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subTitle }) => {
	return (
		<View className="justify-center items-center px-4">
			<Image source={images.empty} resizeMode="contain" className="w-[270px] h-[215px]" />
			<Text className="text-xl text-center font-psemibold text-white mt-2">{title}</Text>
			<Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
			<CustomButton title="Create Video" containerStyles="w-full my-5" handlePress={() => router.push('/(tabs)/create')} />
		</View>
	);
};

export default EmptyState;
