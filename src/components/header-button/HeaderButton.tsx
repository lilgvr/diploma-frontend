import React, { FC } from 'react';
import styles from "./HeaderButton.module.scss";
import { Link } from "react-router-dom";
import login from "../../assets/icons/login.svg";
import logout from "../../assets/icons/logout.svg";
import { useTypedSelector } from "../../hooks";

export const HeaderButton: FC<{ icon: string, to: string }> = ({ icon, to }) => {
    return (
        <Link to={ to } className={ styles.HeaderButtonLink }>
            <img src={ icon } alt={ icon }/>
        </Link>
    );
};

export const HeaderAccountButton: FC<{ onClick?: () => void }> = ({ onClick }) => {
    const { logged_in } = useTypedSelector(state => state.user);

    return (
        <div onClick={ onClick } className={ styles.HeaderButtonLink }>
            <img src={ logged_in ? logout : login } alt=""/>
        </div>
    );
}
