using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;

namespace YouTubeProxy {
    public static class TaskHelper {
        public static Task<(T1, T2)> WaitWith<T1, T2>(this Task<T1> task1, Task<T2> task2) => All(task1, task2);
        

        public static async Task<(T1, T2)> All<T1, T2>(Task<T1> task1, Task<T2> task2) {
            await Task.WhenAll(task1, task2);
            return (task1.Result, task2.Result);
        }

        public static async Task<(T1, T2, T3)> All<T1, T2, T3>(Task<T1> task1, Task<T2> task2, Task<T3> task3) {
            await Task.WhenAll(task1, task2, task3);
            return (task1.Result, task2.Result, task3.Result);
        }

        public static async Task<(T1, T2, T3, T4, T5)> All<T1, T2, T3, T4, T5>(Task<T1> task1, Task<T2> task2, Task<T3> task3, Task<T4> task4, Task<T5> task5) {
            await Task.WhenAll(task1, task2, task3, task4, task5);
            return (task1.Result, task2.Result, task3.Result, task4.Result, task5.Result);
        }

        public static async Task<(T1, T2, T3, T4, T5, T6)> All<T1, T2, T3, T4, T5, T6>(Task<T1> task1, Task<T2> task2, Task<T3> task3, Task<T4> task4, Task<T5> task5, Task<T6> task6) {
            await Task.WhenAll(task1, task2, task3, task4, task5, task6);
            return (task1.Result, task2.Result, task3.Result, task4.Result, task5.Result, task6.Result);
        }

        public static async Task<(T1, T2, T3, T4, T5, T6, T7)> All<T1, T2, T3, T4, T5, T6, T7>(Task<T1> task1, Task<T2> task2, Task<T3> task3, Task<T4> task4, Task<T5> task5, Task<T6> task6, Task<T7> task7) {
            await Task.WhenAll(task1, task2, task3, task4, task5, task6, task7);
            return (task1.Result, task2.Result, task3.Result, task4.Result, task5.Result, task6.Result, task7.Result);
        }

        public static async Task<(T1, T2, T3, T4, T5, T6, T7, T8)> All<T1, T2, T3, T4, T5, T6, T7, T8, T9>(Task<T1> task1, Task<T2> task2, Task<T3> task3, Task<T4> task4, Task<T5> task5, Task<T6> task6, Task<T7> task7, Task<T8> task8) {
            await Task.WhenAll(task1, task2, task3, task4, task5, task6, task7, task8);
            return (task1.Result, task2.Result, task3.Result, task4.Result, task5.Result, task6.Result, task7.Result, task8.Result);
        }

        public static async Task<(T1, T2, T3, T4, T5, T6, T7, T8, T9)> All<T1, T2, T3, T4, T5, T6, T7, T8, T9>(Task<T1> task1, Task<T2> task2, Task<T3> task3, Task<T4> task4, Task<T5> task5, Task<T6> task6, Task<T7> task7, Task<T8> task8, Task<T9> task9) {
            await Task.WhenAll(task1, task2, task3, task4, task5, task6, task7, task8, task9);
            return (task1.Result, task2.Result, task3.Result, task4.Result, task5.Result, task6.Result, task7.Result, task8.Result, task9.Result);
        }
    }
}