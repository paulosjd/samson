export const FETCH_PROFILE_DATA_BEGIN = 'FETCH_PROFILE_DATA_BEGIN'
export const FETCH_PROFILE_DATA_SUCCESS = 'FETCH_PROFILE_DATA_SUCCESS'
export const FETCH_PROFILE_DATA_FAILURE = 'FETCH_PROFILE_DATA_FAILURE'

export const fetchProfileDataBegin = () => ({
    type: FETCH_PROFILE_DATA_BEGIN
})

export const fetchProfileDataSuccess = profileData => ({
    type: FETCH_PROFILE_DATA_SUCCESS,
    payload: { profileData }

})

export const fetchProfileDataFailure = error => ({
    type: FETCH_PROFILE_DATA_FAILURE,
    payload: { error }
})





// export const setCategories = () => {
//     let url = 'https://snipstore.paulja.me/api/categories';
//     return dispatch => {
//         fetch(url)
//             .then(response => response.json())
//             .then(cats => {
//                 let allTopics = cats.map(cat => {
//                     return {topics: cat.topics, catName: cat.name}
//                 });
//                 let categories = cats.map(cat => cat.name);
//                 dispatch({ type: 'SET_CATEGORIES', value: {categories, allTopics} });
//                 dispatch({ type: 'CAT_TOPICS' })
//             })
//     }
// };
//
// export const getMarkdownContent = (slug) => {
//     let url = 'https://snipstore.paulja.me/api/topics/' + slug;
//     let mdContent = '';
//     return dispatch => {
//         fetch(url)
//             .then(response => response.json())
//             .then(obj => {
//                 obj.forEach(obj => mdContent = mdContent + obj.content);
//                 dispatch({ type: 'MD_CONTENT', value: mdContent })
//             })
//     };
// };
//
// export const getTextSearchResults = (text) => {
//     let url = 'https://snipstore.paulja.me/api/search/' + text;
//     return dispatch => {
//         fetch(url)
//             .then(response => response.json())
//             .then(obj => dispatch(
//                 { type: 'SEARCH_RESULTS', value: obj })
//             )
//     }
// };
//
// export const setResultIndex = (val) => {
//     return ( {type: "SET_RESULT_INDEX", value: val } )
// };
//
// export const setSearchLoading = () => {
//     return ( {type: "SET_SEARCH_LOADING", value: true } )
// };
//
// export const setSearchRedirect = (val) => {
//     return { type: "SEARCH_REDIRECT", value: val }
// };
//
// export const setTopicFromSlug = (slug) => {
//     return { type: "TOPIC_FROM_SLUG", value: slug };
// };
//
// export const setTopic = (val) => {
//     return { type: "SET_TOPIC", value: val };
// };
//
// export const topicsByCategory = () => {
//     return { type: "CAT_TOPICS" }
// };
//
// export const setPathname = () => {
//     return { type: "SET_PATHNAME" }
// };
//
// export const setCategory = (val) => {
//     return { type: "SET_CATEGORY", value: val };
// };
//
// export const setTextInput = (val) => {
//     return { type: 'SET_TEXT_INPUT', value: val}
// };