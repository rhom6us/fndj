import { getYoutube, Youtube } from '@rhombus/gapi';
import { usePromise } from '@rhombus/react';
import React, { FC, ReactNode, useMemo, useState } from 'react';

interface Props {

}
interface Children {
    children?: ReactNode;
}
function ResultRoot({ children }: Children) {
    return <section>{children}</section>;
};
export const Search: FC<Props> = (props) => {
    const [ready, api] = usePromise(useMemo(() => getYoutube(), []));


    if (!ready) {
        return (
            <ResultRoot >
                <p>youtube loading...</p>
            </ResultRoot >
        );
    }
    return <Search_Internal {...props} youtube={api!} />;
}

const Search_Internal: FC<Props & {youtube:Youtube}> = () => {
    const [term, setTerm] = useState<string>();

    return (
        <ResultRoot>
            <input type="text" value={term} onChange={e => setTerm(e.target.value)} />
        </ResultRoot>
    );
}
