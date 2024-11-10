import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { isLoading } from 'expo-font';
import { useGlobalConst } from '@/context/GlobalProvider';
export default function App() {
	const { isLoading, isLoggedIn } = useGlobalConst();
	if (!isLoading && isLoggedIn) return <Redirect href="/home"></Redirect>;
	return (
		<SafeAreaView className="bg-primary h-full flex-1">
			<ScrollView contentContainerStyle={{ height: '100%' }} showsVerticalScrollIndicator={false}>
				<View className="w-full justify-center min-h-[85vh] items-center  px-4">
					<Image source={images.graphytlogo} className="w-[130px] h-[84px] " resizeMode="contain" />
					<Image source={images.gojo} className="w-full max-w-[380px] h-[300px] " resizeMode="contain" />

					<View className="relative mt-5">
						<Text className="text-4xl text-white font-bold text-center">
							Discover Endless Fantasises & also create with <Text className="text-secondary-200">graphyt</Text>
						</Text>
						<Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-1" resizeMode="contain" />
					</View>

					<Text className="text-sm font-pregular text-gray-100 text-center mt-7 ">Comic reader app with voice features! First of it's kind</Text>

					<CustomButton
						title={'Continue With Email'}
						handlePress={() => {
							console.log('Routing to sign in page');
							router.push('/sign-in');
						}}
						containerStyles="w-full mt-7"
					/>
				</View>
			</ScrollView>

			<StatusBar backgroundColor={'#161622'} style="light" />
		</SafeAreaView>
	);
}
