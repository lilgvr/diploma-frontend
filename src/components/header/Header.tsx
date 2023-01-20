import React, { FC } from 'react';
import "./header.scss";
import { HeaderAccountButton, HeaderButton } from "../header-button/HeaderButton";
import { Link } from "react-router-dom";
import user from '../../assets/icons/user.svg';
import bookmarks from '../../assets/icons/bookmarks.svg';

export enum HeaderVariant {
    DEFAULT,
    UNAUTHORIZED,
    USER_PAGE,
    FAVS_PAGE
}

const Header: FC<{ variant?: HeaderVariant }> = ({ variant = HeaderVariant.DEFAULT }) => {
    return (
        <header>
            <Link to="/">W2Gether</Link>
            <div className="header_links">
                {
                    variant === HeaderVariant.DEFAULT &&
                  <>
                    <HeaderButton icon={ user } to="/profile"/>
                    <HeaderButton icon={ bookmarks } to="/favorites"/>
                      {/*<HeaderAccountButton/>*/ }
                  </>
                }
            </div>
        </header>
    );
};

export default Header;
