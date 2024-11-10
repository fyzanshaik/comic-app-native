import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import SearchInput from '@/components/SearchInput';
import ComicCard from '@/components/ComicCard';
import CustomButton from '@/components/CustomButton';
import EmptyState from '@/components/EmptyState';
import { images } from '@/constants';

// this is mock data for my usecase will change it to a backend call latee
const mockComics = [
	{ id: '1', title: 'Super Hero Adventures', cover: images.c1, episodeCount: 5 },
	{ id: '2', title: 'Mystery Island', cover: images.c2, episodeCount: 3 },
	{ id: '3', title: 'Space Explorers', cover: images.c3, episodeCount: 7 },
	{ id: '3', title: 'Earth Explorers', cover: images.c4, episodeCount: 7 },
];

const Library = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [comics, setComics] = useState(mockComics);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	const renderComicCard = ({ item }: any) => <ComicCard comic={item} onPress={() => router.push(`/create`)} />;

	return (
		<SafeAreaView className="bg-primary flex-1">
			<View className="px-4 py-6">
				<Text className="text-2xl font-psemibold text-white mb-1 mt-6">My Library</Text>
				<SearchInput handleChangeText={handleSearch} placeholder="Search comics..." keyboardType="default" />
				<View className="flex-row justify-between items-center my-4">
					<Text className="text-lg font-pmedium text-white">Your Comics</Text>
					<CustomButton title="Create New" handlePress={() => router.push('/create')} containerStyles="px-4 py-2 w-[200px]" textStyles="text-sm" />
				</View>
				{comics.length > 0 ? (
					<FlatList data={comics} renderItem={renderComicCard} keyExtractor={(item) => item.id} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-between' }} />
				) : (
					<EmptyState title="No Comics Found" subTitle="Start by creating your first comic!" />
				)}
			</View>
			<Text>hey</Text>
		</SafeAreaView>
	);
};

export default Library;
