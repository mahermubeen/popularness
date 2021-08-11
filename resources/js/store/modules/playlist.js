import router from '@/router'

const state = {
    myPlaylists: [],
};

const getters = {
    myPlaylists(state) {
        return state.myPlaylists;
    },
};

const mutations = {
    SET_MY_PLAYLISTS(state, payload) {
        state.myPlaylists = payload;
    },
};

const actions = {
    getMyPlaylists(context, params) {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/myPlaylists')
                .then(res => {
                    context.commit('SET_MY_PLAYLISTS', res.data)
                    resolve(res);
                })
                .catch(err => {
                    if (err.response.status == 401) {
                        router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    getVideoPlaylists(context, params) {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/VideoPlayList', params)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    if (err.response.status == 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    getPlaylistAssociations(context, params) {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/VideoPlayList', params)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    if (err.response.status == 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    savePlaylist({ commit }, playlistInfo) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/savePlayList", playlistInfo)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    saveBasicPlaylist({ commit }, basicPlaylistInfo) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/saveBasicPlaylist", basicPlaylistInfo)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};
