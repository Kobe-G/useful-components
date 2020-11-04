import {useCallback, useEffect, useState} from "react";
import {now} from "lodash-es";
import {useAsync} from "react-use";

export default function useRemoteData<D>(
    load: () => Promise<D>
): {
    data?: D;
    loading: boolean;
    error?: any;
    refresh: () => void;
    setData: (data: any) => void;
} {
    const [dataTS, setDataTS] = useState(now());
    const dataState = useAsync(load, [dataTS]);
    const [cache, setCache] = useState(dataState.value);

    useEffect(() => {
        if (dataState.value) {
            setCache(dataState.value);
        }
    }, [dataState.value]);

    const refresh = useCallback(() => {
        setDataTS(now());
    }, [setDataTS]);

    const setData = useCallback(
        (data: any) => {
            setCache(data);
        },
        [setCache]
    );

    return {
        data: cache,
        loading: dataState.loading,
        error: dataState.error,
        refresh,
        setData
    };
}

