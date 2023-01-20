import React, { FC } from 'react';
import { useParams } from "react-router-dom";
import { useDocTitle } from "../../hooks";

const UserPage: FC = () => {
    const { id } = useParams();

    useDocTitle('Пользователь');

    return (
        <div>

        </div>
    );
};

export default UserPage;
