import { useEffect, useState } from 'react';

function useFetch(url, options = {}) {
    const [data, setData] = useState();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setData(undefined);
        setIsError(false);
        setIsLoading(true);

        fetch(url, { ...options })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error en la petición');
                }
            })
            .then(setData)
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url]);

    return { data, isError, isLoading };
}

export default useFetch;
