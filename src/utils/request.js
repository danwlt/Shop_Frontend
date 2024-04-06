import axios from 'axios';

export default {
    async get(url) {
        const response = await axios.get(url);
        return response;
    },
    async authenticatedGet(url, token) {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    },
    async authenticatedDelete(url, token) {
        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    },
    async authenticatedPost(url, token, data) {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    },
    async authenticatedDeleteWithBody(url, data, token) {
        const response = await axios.delete(url, {
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }
}