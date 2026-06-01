import { useQuery } from '@tanstack/react-query';




export const usePvpSeasons = () => {
    return useQuery({
        queryKey: ['pvpSeasons'],
        queryFn: async () => {
            const res = await fetch('http://127.0.0.1:5201/pvp/seasons/current');
            return res.json();
        },
        staleTime: Infinity,
        cacheTime: Infinity
    });
};