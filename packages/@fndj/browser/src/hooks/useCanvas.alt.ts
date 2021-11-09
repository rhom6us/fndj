import { Sub } from '@rhombus/func';
import { useEffect, useRef, useState } from 'react';
export function useCanvas() {
    const ref = useRef<HTMLCanvasElement>(null);
    
    const [tracer, setTracer] = useState<Sub<[context: CanvasRenderingContext2D]>>(p => { });
    useEffect(() => {
        const ctx = ref.current?.getContext('2d');
        if (!ctx) {
            console.warn('no ctx');
            return;
        }
        let id: number;
        void function draw() {
            id = requestAnimationFrame(draw);
            tracer?.(ctx);
        }();

        return () => cancelAnimationFrame(id);

    }, [tracer]);


    return [ref, setTracer] as const;
}
