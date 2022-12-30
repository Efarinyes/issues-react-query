import axios from 'axios';



export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: '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'
    }
})