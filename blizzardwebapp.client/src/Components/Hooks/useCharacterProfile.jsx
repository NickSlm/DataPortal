import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';




export const useCharacterProfile = (name, realm ) => {
    return useQuery({
        queryKey: ['characterProfile', name, realm],
        queryFn: async () => {
            const res = await fetch(`http://127.0.0.1:5201/pvp/profile/character/${name}/realm/${realm}/get`,);
            return res.json();
        },
        staleTime: Infinity,
        cacheTime: Infinity
    });
};