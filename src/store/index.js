import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        users: [],
        userPosts: [],
        userAlbums: [],
        isLoading: {
            usersList: false,
            user: false,
            albums: false,
        },
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },
        SET_LOADING(state, { isLoading, type }) {
            state.isLoading = { ...state.isLoading, [type]: isLoading }
        },
        SET_USER_POSTS(state, posts) {
            state.userPosts = posts
        },
        SET_USER_ALBUMS(state, albums) {
            state.userAlbums = albums
        },
    },
    actions: {
        async fetchUsers({ commit }) {
            try {
                commit('SET_LOADING', { isLoading: true, type: 'usersList' })
                const response = await axios.get('https://jsonplaceholder.typicode.com/users')
                commit('SET_USERS', response.data)
                commit('SET_LOADING', { isLoading: false, type: 'usersList' })
            } catch (error) {
                console.error('Error fetching users:', error)
                commit('SET_LOADING', { isLoading: false, type: 'usersList' })
            }
        },
        async fetchUserPosts({ commit }, userId) {
            try {
                commit('SET_LOADING', { isLoading: true, type: 'user' })
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                commit('SET_USER_POSTS', response.data)
                commit('SET_LOADING', { isLoading: false, type: 'user' })
            } catch (error) {
                console.error('Error fetching user posts:', error)
                commit('SET_LOADING', { isLoading: false, type: 'user' })
            }
        },
        async fetchUserAlbums({ commit }, userId) {
            try {
                commit('SET_LOADING', { isLoading: true, type: 'albums' })
                const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
                const albums = response.data

                const albumsWithPhotos = await Promise.all(
                    albums.map(async (album) => {
                        const photosResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=5`)
                        album.photos = photosResponse.data
                        album.activePhotoIndex = 0
                        return album
                    })
                )

                commit('SET_USER_ALBUMS', albumsWithPhotos)
                commit('SET_LOADING', { isLoading: false, type: 'albums' })
            } catch (error) {
                console.error('Error fetching user albums:', error)
                commit('SET_LOADING', { isLoading: false, type: 'albums' })
            }
        }
    },
    getters: {
        getUsers: (state) => state.users,
        isUsersListLoading: (state) => state.isLoading.usersList,
        getUserPosts: (state) => state.userPosts,
        isUserLoading: (state) => state.isLoading.user,
        getUserAlbums: (state) => state.userAlbums,
        isAlbumsLoading: (state) => state.isLoading.albums,
    },
})
