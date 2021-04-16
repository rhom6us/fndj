import { useQueryClient, useMutation } from 'react-query';

export function useFancyMutation<TData>(name: string, fn: (args: TData) => Promise<TData>, keySelector: (data: TData) => any) {

    const queryClient = useQueryClient();
    return useMutation<TData, Error, TData, { previousEntity?: TData, newEntity: TData; }>(fn, {
        // When mutate is called:
        async onMutate(newEntity: TData) {
            const key = [name, keySelector(newEntity)];
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(key);

            // Snapshot the previous value
            const previousEntity = queryClient.getQueryData<TData>(key);

            // Optimistically update to the new value
            queryClient.setQueryData(key, newEntity);

            // Return a context with the previous and new todo
            return { previousEntity, newEntity };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError(err, newTodo, context) {
            const key = [name, keySelector(context!.newEntity)];
            queryClient.setQueryData(key, context!.previousEntity);
        },
        // Always refetch after error or success:
        onSettled(newEntity?: TData) {
            const key = [name, keySelector(newEntity!)];
            queryClient.invalidateQueries(key);
        },
        // onSuccess() {
        //     queryClient.invalidateQueries(key);
        // },
    });
}
// function useFancyQuery<TData, TKey extends any[]>(name: string, fetch: (...args: TKey) => Promise<TData>, update: (args: TData) => Promise<TData>, keySelector: (data: TData) => TArgs) {
//     return {
//         useGet: (...args: TKey) => useQuery<TData, Error>([name, ...args], () => fetch(...args)),
//         update: useFancyMutation<TData>('preprocessdata', update, keySelector),
//     };
// }
