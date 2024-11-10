import { View, Text, SafeAreaView, FlatList, Image, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import useAppWrite from '@/lib/useAppWrite';
import VideoCard from '@/components/VideoCard';

const handleChange = () => {};

const Home = () => {
	const { data: posts, refetch, isLoading } = useAppWrite(getAllPosts);
	const { data: latestPosts } = useAppWrite(getLatestPosts);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		console.log('reloading');
		await refetch();
		setRefreshing(false);
	};

	return (
		<SafeAreaView className="bg-primary">
			<FlatList
				data={posts}
				keyExtractor={(item) => String(item.$id)}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListHeaderComponent={() => (
					<View className="my-7 px-6 space-y-7">
						<View className="flex-row justify-between items-center mb-3 mt-3">
							<View>
								<Text className="font-pmedium text-gray-100 text-sm">Welcome Back</Text>
								<Text className="text-2xl font-psemibold text-white">fyzanshaik</Text>
							</View>
							<Image source={images.roundedLogo} className="w-8 h-10" resizeMode="contain" />
						</View>
						<SearchInput handleChangeText={handleChange} placeholder="Search for a video topic" keyboardType="text" />
						<View className="w-full">
							<Text className="text-gray-100 text-lg font-pregular mb-3">Latest Comics</Text>
							<Trending posts={latestPosts} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<View className="flex-1 justify-center items-center py-10">
						<EmptyState title="No Videos Found" subTitle="Be the first one to upload a video" />
					</View>
				)}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
			/>
		</SafeAreaView>
	);
};

export default Home;
