/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

interface FetchData<T> {
    fetcher: () => Promise<T>;
    initialData: T;
}

export function useFetchData<T>({ fetcher, initialData }: FetchData<T>, deps: any[] = []) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<T>(initialData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>(null);


    function refetch() {
        setLoading(true);
        fetcher()
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        refetch();
    }, deps);

    return { data, error, refetch, loading };
}

