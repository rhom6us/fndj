import { Sub } from "@rhombus-toolkit/func";
import { DependencyList, MutableRefObject, RefObject, useCallback, useEffect, useRef } from 'react';
export function useCanvas(ref:undefined | RefObject<HTMLCanvasElement> | MutableRefObject<HTMLCanvasElement | null>, tracer:Sub<[context: CanvasRenderingContext2D]>, deps:DependencyList) {
     ref ??= useRef<HTMLCanvasElement>(null);
    
    const cb = useCallback(tracer, deps);
    useEffect(() => {
        const ctx = ref!.current?.getContext('2d');
        if (!ctx) {
            console.error('no ctx');
            return;
        }
        let id: number;
        void function draw() {
            cb?.(ctx);
            // id = requestAnimationFrame(draw);
        }();
        console.log('CANVAS');
        return () => cancelAnimationFrame(id);

    }, [tracer]);
    return ref;
}
