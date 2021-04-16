import { Children, cloneElement, CSSProperties, FC, ReactElement, useCallback, useState } from 'react';

interface Props {
    hoverStyle: CSSProperties;
}


export const Hoverable: FC<Props> = ({ hoverStyle, children }) => {
    const [hover, setHover] = useState(false);

    const child = Children.only(children) as ReactElement;


    const onHoverChange = useCallback(
        e => {
            const name = e.type === "mouseenter" ? "onMouseEnter" : "onMouseLeave";
            setHover(!hover);
            if (child.props[name]) {
                child.props[name](e);
            }
        },
        [setHover, hover, child]
    );

    return cloneElement(child, {
        onMouseEnter: onHoverChange,
        onMouseLeave: onHoverChange,
        style: Object.assign({}, child.props.style, hover ? hoverStyle : {})
    });
};
