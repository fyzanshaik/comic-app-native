import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, FlatList, TouchableOpacity, Text, RefreshControl, ActivityIndicator } from 'react-native';

import { icons } from '../../constants';
import useAppWrite from '@/lib/useAppWrite';
import { getUserPosts, signOut } from '@/lib/appwrite';
import { useGlobalConst } from '@/context/GlobalProvider';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import InfoBox from '@/components/InfoBox';
import { useEffect, useState } from 'react';

const Profile = () => {
	const { user, setUser, setIsLoggedIn } = useGlobalConst();
	const { data: posts, refetch, isLoading } = useAppWrite(() => getUserPosts(user?.$id || ''));
	console.log(posts);
	const logout = async () => {
		await signOut();
		setUser(null);
		setIsLoggedIn(false);
		router.replace('/sign-in');
	};

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		console.log('reloading');
		await refetch();
		setRefreshing(false);
	};

	if (isLoading) {
		return (
			<SafeAreaView className="bg-primary h-full justify-center items-center">
				<ActivityIndicator size="large" color="#fff" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListEmptyComponent={() => <EmptyState title="No Comics Found Let's Create" subTitle="No comics found for this profile" />}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
				ListHeaderComponent={() =>
					user && (
						<View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
							<TouchableOpacity onPress={logout} className="flex w-full items-end mb-10">
								<Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
							</TouchableOpacity>

							<View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
								<Image source={{ uri: user.avatar }} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover" />
							</View>

							<InfoBox title={user.username || 'No Username'} subTitle="" containerStyles="mt-5" titleStyles="text-lg" />

							<View className="mt-5 flex flex-row">
								<InfoBox title={`${posts.length || 0}`} subTitle="Posts" titleStyles="text-xl" containerStyles="mr-10" />
								<InfoBox title="1.2k" subTitle="Followers" titleStyles="text-xl" />
							</View>
							<View className="flex flex-1 mt-3">
								<Text className="text-base text-gray-200 font-pmedium">My uploads</Text>
							</View>
						</View>
					)
				}
			/>
		</SafeAreaView>
	);
};

export default Profile;
