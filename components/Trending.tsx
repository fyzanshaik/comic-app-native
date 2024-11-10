import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native';
import React, { useState, useRef } from 'react';
import * as Animatable from 'react-native-animatable';
import icons from '@/constants/icons';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
const zoomIn: Animatable.CustomAnimation = {
	0: {
		transform: [{ scale: 0.9 }],
	},
	1: {
		transform: [{ scale: 1.1 }],
	},
};

const zoomOut: Animatable.CustomAnimation = {
	0: {
		transform: [{ scale: 1.1 }],
	},
	1: {
		transform: [{ scale: 0.9 }],
	},
};

const TrendingItem = ({ activeItem, item }: any) => {
	if (!item || !item.$id) {
		return null;
	}
	const testVideoUrl = 'https://www.w3schools.com/html/movie.mp4';

	const [play, setPlay] = useState(false);
	const handlePlaybackStatusUpdate = (status: any) => {
		if (status.isLoaded) {
			if (status.didJustFinish) {
				setPlay(false);
				console.log('Video finished playing');
			}
		} else if (status.error) {
			console.log('Error:', status.error);
		}
	};
	return (
		<Animatable.View className="mr-5" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
			{play ? (
				<Video
					source={{ uri: testVideoUrl }}
					style={styles.videoContainer}
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay={play}
					onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
				/>
			) : (
				<TouchableOpacity
					className="relative justify-center items-center"
					activeOpacity={0.7}
					onPress={() => {
						setPlay(true);
					}}
				>
					<ImageBackground source={{ uri: item.thumbnail }} className="w-52 h-52 rounded-[35px] my-2 overflow-hidden shadow-lg shadow-black/40" resizeMode="cover" />
					<Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
				</TouchableOpacity>
			)}
		</Animatable.View>
	);
};

const Trending = ({ posts }: any) => {
	if (!posts || posts.length === 0) {
		return <Text>No posts available</Text>;
	}

	const [activeItem, setActiveItem] = useState(posts[0]?.$id);

	const viewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].item.$id);
		}
	}).current;

	return (
		<FlatList
			className="border border-primary"
			data={posts}
			horizontal
			keyExtractor={(item) => item.$id}
			onViewableItemsChanged={viewableItemsChanged}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 70,
			}}
			contentOffset={{ x: 170, y: 0 }}
			renderItem={({ item }) => (
				<TouchableOpacity onPress={() => setActiveItem(item.$id)}>
					<TrendingItem activeItem={activeItem} item={item} />
				</TouchableOpacity>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	videoContainer: {
		width: 200,
		height: 200,
		borderWidth: 2,
		borderRadius: 35,
		marginTop: 12,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
});

export default Trending;
