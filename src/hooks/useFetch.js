import { useState, useEffect } from "react";

//Custom Hook para buscar dados
export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    //Refatorando o POST
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

// Loafding inicial
const [loading, setLoading] = useState(true);

    const httpConfig = (data, method) => {
        if(method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            setMethod(method);
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

            setLoading(false);
        };

        fetchData();
    }, [url, callFetch]);

    //Refatorando o POST

    useEffect(() => {
        const httRequest = async () => {
            if (method === "POST") {

                let fetchOptions = [url, config]

                const res = await fetch(...fetchOptions);

                const json = await res.json();

                setCallFetch(json)
            }
        }

        httRequest();
    }, [config, method, url]);

    return { data, httpConfig, loading, error};
};