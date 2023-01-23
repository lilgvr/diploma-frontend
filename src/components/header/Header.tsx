import React, { FC, useEffect, useState } from 'react';
import "./header.scss";
import { HeaderAccountButton, HeaderButton } from "../header-button/HeaderButton";
import { Link } from "react-router-dom";
import { default as userSvg } from '../../assets/icons/user.svg';
import bookmarks from '../../assets/icons/bookmarks.svg';
import login from '../../assets/icons/login.svg';
import { logout } from "../../service/AuthService";
import { useTypedSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import { UserActionLogOut } from "../../store/action-creators";

export enum HeaderVariant {
    DEFAULT,
    UNAUTHORIZED,
    USER_PAGE,
    FAVS_PAGE
}

const Header: FC = () => {
    const { user } = useTypedSelector(state => state.user);
    const [variant, setVariant] = useState<HeaderVariant>(HeaderVariant.UNAUTHORIZED);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setVariant(HeaderVariant.DEFAULT);
        } else setVariant(HeaderVariant.UNAUTHORIZED)
    }, [user]);

    return (
        <header>
            <Link to="/">W2Gether</Link>
            <div className="header_links">
                {
                    user && variant === HeaderVariant.DEFAULT &&
                  <>
                    <HeaderButton icon={ userSvg } to="/profile"/>
                    <HeaderButton icon={ bookmarks } to="/favorites"/>
                    <HeaderAccountButton onClick={ () => {
                        logout(user.id).then(res => {
                            if (res.status === 200) {
                                dispatch(UserActionLogOut())
                            }
                        });
                    }
                    }/>
                      {/*<HeaderAccountButton/>*/ }
                  </>
                }
                {
                    variant === HeaderVariant.UNAUTHORIZED &&
                  <>
                    <HeaderButton icon={ login } to="/login"/>
                  </>
                }
            </div>
        </header>
    );
};

export default Header;
