import { useState, useCallback } from 'react';

const localUrl = 'http://127.0.0.1:3001'

export const useFetchData = (BASE_URL = '', token, error_msg = 'oops!') => {
    const [fetch_data, setFetchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');    

    const fetchData = useCallback(async () => {
        
        const fetchOptions = { 
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}`: null
            },
        };

        setLoading(true);
        //Pedimos los datos a la api
            try {
                const response = await fetch(localUrl + BASE_URL, fetchOptions);
                if (!response) {
                    throw new Error(`Http status ${response.status}`);
                }
                const data = await response.json();
                console.log('en el hook', data, BASE_URL);
                setFetchData(data);
            } catch (error) {
                //Si hay un error ...
                console.error(error.message);
                setError(error_msg)
            }
        setLoading(false);
    },[BASE_URL]); //Hacer enfasis en la url
//Retornamos nuestro fetch_data como data, nuestro loading y error

    return { fetchData: fetchData, data: fetch_data, loading, error };
}