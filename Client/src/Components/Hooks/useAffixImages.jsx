import { useQuery } from '@tanstack/react-query';



export const useAffixImages = () => {
    return useQuery({
        queryKey: ['affixData'],
        queryFn: async () => {
            const res = await fetch('http://127.0.0.1:5201/data/affixes/assets');
            return res.json();
        },
        staleTime: Infinity,
        cacheTime: Infinity
    });
};