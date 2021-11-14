import React, { FC } from "react";
import { useParams } from "react-router-dom";
export const ConfigureTrack: FC = () => {
    const params = useParams();
    const id = params['id'];
    if (!id) {
        throw 'missing id param';
    }
    return <ConfigureTrack_Internal id={id} />;

};
const ConfigureTrack_Internal: FC<{ id: string; }> = ({ id }) => {
    return <div>{id}</div>;
};