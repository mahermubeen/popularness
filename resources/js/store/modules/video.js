import { HTTP } from "../../config/conifg";

const state = {
    genres: [],
    myVideos: [],
    recentlyWatched: [],
    latestVideos: [],
};

const getters = {
    genres(state) {
        return state.genres;
    },
    myVideos(state) {
        return state.myVideos;
    },
    recentlyWatched(state) {
        return state.recentlyWatched;
    },
    latestVideos(state) {
        return state.latestVideos;
    },
    latestVideosByGenre: (state) => (genreId) => {
        if(state.latestVideos == []) {
            return state.latestVideos
        }
        return state.latestVideos.find(vid => vid.genre.includes(genreId))
    },
};

const mutations = {
    SET_GENRES(state, payload) {
        state.genres = payload;
    },
    SET_MY_VIDEOS(state, payload) {
        state.myVideos = payload;
    },
    SET_RECENTLY_WATCHED_VIDEOS(state, payload) {
        state.recentlyWatched = payload;
    },
    SET_LATEST_VIDEOS(state, payload) {
        state.latestVideos = payload;
    },
};

const actions = {
    getGenres(context) {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/genres')
                .then(res => {
                    context.commit('SET_GENRES', res.data)
                    resolve(res);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    getMyVideos(context) {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/myVideos')
                .then(res => {
                    context.commit('SET_MY_VIDEOS', res.data)
                    resolve(res);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    getLatestVideos(context, filter) {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/latest-videos', filter)
                .then(res => {
                    context.commit('SET_LATEST_VIDEOS', res.data)
                    resolve(res.data);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    checkVideoLimits({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/video/check-limit", { precheck: 1 })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    if (err.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    saveVideoInfo({ commit }, videoInfo) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/video/save", videoInfo)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    if (err.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    alert(err)
                });
        });
    },
    processVideoTip({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/video-tip", params)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    if (err.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    alert(err)
                });
        });
    },
    updateVideoInfo({ commit }, videoInfo) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/video/update", videoInfo)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    if (err.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    alert(err)
                });
        });
    },
    getVideoDetails({commit}, video) {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/get-videos/' + video.hashId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    getVideoStats({commit}, video) {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/video/stats/' + video.hashId)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    updateVideoStats({commit}, hash) {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/videos/stats', hash)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    getVideosByArtist({commit}, params) {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/latest-videos', params)
                .then(res => {
                    commit('SET_LATEST_VIDEOS', res.data)
                    resolve(res.data);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    getVideosByDateRange({commit}, params) {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/latest-videos', params)
                .then(res => {
                    commit('SET_LATEST_VIDEOS', res.data)
                    resolve(res.data);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    getRecentlyWatchedVideos(context) {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/recently-watched')
                .then(res => {
                    context.commit('SET_RECENTLY_WATCHED_VIDEOS', res.data)
                    resolve(res);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    addToFavourite({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/video/add-to-favourite", payload)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    if (err.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    alert(err)
                });
        });
    },
    getMyFavourites(context) {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/video/my-favourites')
                .then(res => {
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
};

export default {
    state,
    mutations,
    actions,
    getters
};
