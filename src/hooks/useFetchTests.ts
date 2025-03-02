import { useEffect, useState } from "react";
import api from "../api/api";
import { TestType } from "../types/test"

const useFetchTests = () => {
    const [tests, setTests] = useState<TestType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const data = await api.getTests();
                setTests(data);
            } catch (err) {
                setError("Ошибка при загрузке данных");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    return {tests, loading, error};
};

export default useFetchTests;