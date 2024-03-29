import * as React from 'react';
export { };
declare global {
    interface Response {
        json<T>(): Promise<T>;
    }
    interface Element {
        setAttributeNS(namespace: string | null, qualifiedName: string, value: string | number): void;
    }
}
// declare global {
//     export interface NodeModule {
//         hot: {
//             accept(module: string, callback: () => void): void;
//         };
//     }
//     export const module: NodeModule;
// }

declare global {
    interface HTMLWavesElement extends HTMLElement { }
    interface HTMLWavesScrollElement extends HTMLElement { }
    namespace JSX {
        interface IntrinsicElements {
            'waves-ui': React.DetailedHTMLProps<React.HTMLAttributes<HTMLWavesElement>, HTMLWavesElement>;
            'waves-ui-scrollbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLWavesScrollElement>, HTMLWavesScrollElement>;
            'number-chooser': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
