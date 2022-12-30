import axios from 'axios';



export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})