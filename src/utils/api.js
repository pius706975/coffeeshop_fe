import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tokenExpired } from '../store/reducer/user';

function Api(urls = '') {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.users);

    const [requests, setRequests] = useState({
        baseURL: process.env.REACT_APP_BASEURL || urls,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
    });

    const setConfig = () => {
        setRequests({
            ...requests,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
        });
    };

    useEffect(() => {
        setConfig();
    }, [token]);

    const apiInstance = axios.create(requests);

    // The interceptor is used to handle token expiration
    apiInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (
                error.response &&
                error.response.status === 500 &&
                error.response.data &&
                error.response.data.status === 500 &&
                error.response.data &&
                error.response.data.result.name === 'TokenExpiredError'
            ) {
                dispatch(tokenExpired());
            }
            return Promise.reject(error);
        },
    );

    return { requests: apiInstance };
}

export default Api;
