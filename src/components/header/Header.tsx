import React, { FC, useEffect } from 'react';
import "./header.scss";
import { HeaderAccountButton, HeaderButton } from "../header-button/HeaderButton";
import { Link } from "react-router-dom";

export enum HeaderVariant {
    DEFAULT,
    UNAUTHORIZED,
    USER_PAGE,
    FAVS_PAGE
}

export const Header: FC<{ variant?: HeaderVariant }> = ({ variant = HeaderVariant.DEFAULT }) => {
    return (
        <header>
            <Link to="/">W2Gether</Link>
            {
                variant === HeaderVariant.DEFAULT &&
              <>
                <HeaderButton icon="" to="/profile"/>
                <HeaderButton icon="" to="/favorites"/>
                <HeaderAccountButton/>
              </>
            }
        </header>
    );
};
