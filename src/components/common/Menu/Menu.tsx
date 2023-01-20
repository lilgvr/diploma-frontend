import React, { FC, useState } from 'react';
import styles from "./Menu.module.scss";
import { MenuTab } from "./MenuTab";
import { useDispatch } from "react-redux";
import { MainTabActionSet } from "../../../store/action-creators/tab/MainTabActionSet";
import { useTypedSelector } from "../../../hooks";

const Menu: FC<{ ref?: React.RefObject<HTMLElement> }> = ({ ref }) => {
    const { mainSelectedTab } = useTypedSelector(state => state.main);
    const [currentTab, setCurrentTab] = useState(mainSelectedTab);
    const dispatch = useDispatch();

    const handleMoviesTabClick = () => {
        if (currentTab === 0) {
            if (ref) ref.current?.scrollTo(0, 0);
            return;
        }
        setCurrentTab(0);
        dispatch(MainTabActionSet(0));
    }
    const handleSeriesTabClick = () => {
        if (currentTab === 1) {
            if (ref) ref.current?.scrollTo(0, 0);
            return;
        }
        setCurrentTab(1);
        dispatch(MainTabActionSet(1));
    }

    return (
        <div className={ styles.menu }>
            <div className={ styles.menuTabs }>
                <MenuTab title="Фильмы" selected={ currentTab === 0 } onClick={ handleMoviesTabClick }/>
                <MenuTab title="Сериалы" selected={ currentTab === 1 } onClick={ handleSeriesTabClick }/>
            </div>
            <div className={ styles.menuRooms }>

            </div>
        </div>
    );
};

export default Menu;
