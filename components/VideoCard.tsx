import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PostDocument } from '@/lib/appwrite';
import { icons } from '@/constants';

interface VideoCardProp {
	video: PostDocument;
}

const VideoCard: React.FC<VideoCardProp> = ({
	video: {
		title,
		thumbnail,
		video,
		creator: { username, avatar },
	},
}) => {
	const [play, setPlay] = useState(false);

	useEffect(() => {
		setPlay(false);
	}, []);

	return (
		<View className="mt-6 px-4 mb-8">
			<View className="flex-row items-center justify-between mb-3">
				<View className="flex-row items-center flex-1">
					<View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center overflow-hidden">
						<Image source={{ uri: avatar }} className="w-full h-full" resizeMode="cover" />
					</View>
					<View className="ml-3 flex-1">
						<Text className="text-white font-psemibold text-sm" numberOfLines={1}>
							{title}
						</Text>
						<Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
							{username}
						</Text>
					</View>
				</View>
				<TouchableOpacity>
					<Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
				</TouchableOpacity>
			</View>

			{play ? (
				<View className="w-full aspect-video bg-black justify-center items-center rounded-xl">
					<Text className="text-white">Playing</Text>
				</View>
			) : (
				<TouchableOpacity className="w-full aspect-video rounded-xl relative justify-center items-center overflow-hidden" activeOpacity={0.7} onPress={() => setPlay(true)}>
					<Image className="w-full h-full absolute" resizeMode="cover" source={{ uri: thumbnail }} />
					<Image source={icons.play} className="w-12 h-12" resizeMode="contain" />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default VideoCard;
