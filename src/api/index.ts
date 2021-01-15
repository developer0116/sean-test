import axios from 'axios'
const ghAPI = axios.create({
  baseURL: 'https://api.github.com/',
})
const token = process.env.USER_SEARCH_OAUTH
if (token) {
  ghAPI.defaults.headers.common.Authorization = `token ${token}`
}

function searchUserAPI(params: any) {
  return ghAPI.get('/search/users', {
    params,
  })
}

function getUserProfile(username: string) {
  return ghAPI.get(`/users/${username}`)
}

function getUserRepos(id: string) {
  return ghAPI.get(`/users/${id}/repos`)
}

export { searchUserAPI, getUserProfile, getUserRepos }
