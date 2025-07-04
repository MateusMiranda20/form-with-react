import { useState, useEffect } from "react";

//Custom Hook para buscar dados
export const useFetch = (url) => {
    const [data, setData] = useState([]);

    //Refatorando o POST
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    // Loafding inicial
    const [loading, setLoading] = useState(true);

    // Estado para armazenar erros
    const [error, setError] = useState(null);
    const [item, setItem] = useState(null);

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            setMethod(method);
        } else if (method === "DELETE") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json",
                },
            });

            setMethod(method);
            setItem(data);
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
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError("Houve algum erro ao carregar os dados.");
            }
            setLoading(false);
        };

        fetchData();
    }, [url, callFetch]);

    //Refatorando o POST

    useEffect(() => {
        const httRequest = async () => {
            if (method === "POST") {
                let fetchOptions = [url, config];
                await fetch(...fetchOptions);
                setCallFetch(prev => !prev); // Alterna o valor para disparar o GET
            } else if (method === "DELETE") {
                const deleteUrl = `${url}/${item}`;
                await fetch(deleteUrl, config);
                setCallFetch(prev => !prev); // Alterna o valor para disparar o GET
            }
        }
        if (method) {
            httRequest();
        }
    }, [config, method, url, item]);

    return { data, httpConfig, loading, error };
};