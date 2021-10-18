import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPreprocessData, PreProcessData, savePreprocessData } from '../api';

export function useGetPreProcessData(id: string) {
    const key = ['preprocess', { id }];
    // const queryClient = useQueryClient();
    return useQuery<PreProcessData, Error>(key, () => getPreprocessData(id), { enabled: false });

}
export function usePostPreprocessData(data: PreProcessData) {
    const key = ['preprocess', { id: data.id }];
    const queryClient = useQueryClient();
    return useMutation<PreProcessData, Error, PreProcessData>(key, savePreprocessData, {
        onSuccess() {
            queryClient.invalidateQueries('preprocess');
        }
    });
}
