import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";

// Fetch post from a determined category
export const fetchPostsFromCategory = createAsyncThunk(
	"posts/fetchPostsFromCategory",
	async (category, thunkObj) => {
		const endpoint = `https://www.reddit.com/${category}.json`;
		const response = await fetch(endpoint);
		const jsonResponse = await response.json();
		let arrayResponse = [];
		console.log("post", jsonResponse);
		const getYoutubeVideoId = (url) => {
			// Detect type of url
			let index = "";
			if (url.includes("youtube.com")) {
				index = url.indexOf("?v=");
			} else if (url.includes("youtu.be")) {
				index = url.indexOf("be/");
			} else {
				return false;
			}
			const id = url.slice(index + 3, index + 3 + 11);
			return id;
		};

		jsonResponse.data.children.forEach((entry) => {
			arrayResponse.push({
				id: entry.data.id,
				author: entry.data.author,
				url: entry.data.subreddit_name_prefixed,
				title: entry.data.title,
				content: entry.data.selftext_html,
				content_text: entry.data.selftext,
				img: entry.data.url,
				is_gallery: entry.data.is_gallery ? entry.data.is_gallery : false,
				gallery_data: entry.data.gallery_data ? entry.data.gallery_data : false,
				is_video: entry.data.is_video,
				is_reddit_media_domain: entry.data.is_reddit_media_domain,
				created: entry.data.created,
				permalink: entry.data.permalink,
				ups: entry.data.ups,
				upvote_ratio: entry.data.upvote_ratio,
				num_comments: entry.data.num_comments,
				youtube_id_video: getYoutubeVideoId(entry.data.url),
				reddit_video_url:
					entry.data.secure_media &&
					entry.data.secure_media.reddit_video ? entry.data.secure_media.reddit_video.fallback_url : false,
				reddit_height: entry.data.secure_media &&
					entry.data.secure_media.reddit_video ?
					entry.data.secure_media.reddit_video.height
					: false,
				reddit_width: entry.data.secure_media &&
				entry.data.secure_media.reddit_video ?
				entry.data.secure_media.reddit_video.width
				: false,
			});
		});
		return arrayResponse;
	}
);
// Fetch post based in a determined post Id

// Create entityAdapter
const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
	status: "iddle",
	error: null,
});

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPostsFromCategory.fulfilled, (state, action) => {
				postsAdapter.setAll(state, action.payload);
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(fetchPostsFromCategory.pending, (state, action) => {
				state.status = "loading";
				state.error = null;
			});
	},
});

export default postsSlice.reducer;
export const {
	selectAll: selectAllPosts,
	selectIds: selectAllPostsIds,
	selectById: selectPostById,
} = postsAdapter.getSelectors((state) => state.posts);
