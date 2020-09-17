import axios from 'axios';
import { Dispatch } from 'redux';

const gifyAPi = axios.create({
    baseURL: "https://api.giphy.com/v1/gifs"
});

export const searchThroughGifyApi = (query: string) => async (dispatch: Dispatch) => {
    try {
        const { data } = await gifyAPi.get("/search", {
            params: {
                api_key: "dD08mrciqbR49IJynxJX7EbTb7Jh5Ku1",
                limit: 25,
                q: query
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}