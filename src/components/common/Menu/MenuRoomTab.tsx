import React, { FC } from 'react';
import { Room } from "../../../models";
import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";

export const MenuRoomTab: FC<{ room: Room }> = ({ room }) => {
    return (
        <Link to={ `/room/${ room.unique_id }` } className={styles.menuRoomsTab}>
            <p>{ room.name }</p>
        </Link>
    );
};
