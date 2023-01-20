import React, { FC } from 'react';
import styles from "./Menu.module.scss";

export const MenuTab: FC<{ title: string, selected?: boolean, onClick: () => void }> = (
    {
        title,
        selected = false,
        onClick
    }
) => {
    return (
        <div className={ selected ? styles.menuTabsSelected : "" } onClick={ onClick }>
            <p>{ title }</p>
        </div>
    );
};
