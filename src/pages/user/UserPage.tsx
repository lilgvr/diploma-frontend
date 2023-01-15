import React, { FC } from 'react';
import { useParams } from "react-router-dom";

const UserPage: FC = () => {
    const { id } = useParams();

    return (
        <div>

        </div>
    );
};

export default UserPage;
