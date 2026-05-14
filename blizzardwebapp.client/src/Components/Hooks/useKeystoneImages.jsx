import { useQuery } from '@tanstack/react-query';




export const useKeystoneImages = () => {
    return useQuery({
        queryKey: ['keystoneImages'],
        queryFn: async () => {
            const res = await fetch('http://127.0.0.1:5201/data/mythic-keystones/get');
            return res.json();
        },
        staleTime: Infinity,
        cacheTime: Infinity
    });
};





