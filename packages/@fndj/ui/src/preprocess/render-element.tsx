import React from 'react';
type Props = { element: HTMLElement; };
export const RenderElement = ({ element }:Props) => {
    const initContainer = (div: HTMLDivElement) => {
        if (div)
        div.appendChild(element);
    }
    return (<div ref={initContainer}></div>)
}
