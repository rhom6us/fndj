import { iterate } from '../iterable/iterate';

export function range(length: number): number[];
export function range(start: number, length: number): number[];
export function range(...args: [number] | [number, number]): number[] {
    if (args.length == 1) {
        return range(0, args[0]);
    }
    return Array.from(iterate(args[0], args[1]));
}
