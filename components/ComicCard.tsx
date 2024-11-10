import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface ComicCardProps {
	comic: {
		id: string;
		title: string;
		cover: string;
		episodeCount: number;
	};
	onPress: () => void;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic, onPress }) => {
	console.log(comic);
	return (
		<TouchableOpacity onPress={onPress} className="w-[48%] mb-4">
			<View className="bg-black-100 rounded-lg overflow-hidden">
				<Image source={comic.cover} className="w-full h-48" resizeMode="cover" />
				<View className="p-2">
					<Text className="text-white font-psemibold text-sm" numberOfLines={1}>
						{comic.title}
					</Text>
					<Text className="text-gray-100 text-xs">
						{comic.episodeCount} episode{comic.episodeCount !== 1 ? 's' : ''}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ComicCard;
