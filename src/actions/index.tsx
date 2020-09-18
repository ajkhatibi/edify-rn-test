import axios from 'axios';
import { Dispatch } from 'redux';
import app from '../reducers/app';
import { appTypes } from '../types';

const gifyAPi = axios.create({
    baseURL: "https://api.giphy.com/v1/gifs"
});

export const searchThroughGifyApi = (query: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: appTypes.TRIGGER_QUERY_GIFY });
        const { data } = await gifyAPi.get("/search", {
            params: {
                api_key: "dD08mrciqbR49IJynxJX7EbTb7Jh5Ku1",
                limit: 25,
                q: query
            }
        })
        dispatch({ type: appTypes.QUERY_GIFY, payload: data.data })
    } catch (error) {
        throw new Error(error);
    }
}

export const showTrendingGify = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: appTypes.TRIGGER_TRENDING_GIFY });
        const { data } = await gifyAPi.get("/trending", {
            params: {
                api_key: "dD08mrciqbR49IJynxJX7EbTb7Jh5Ku1",
                limit: 25,
            }
        })
        dispatch({ type: appTypes.QUERY_TRENDING_GIFY, payload: data.data });
    } catch (error) {
        throw new Error(error)
    }
}