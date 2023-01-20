import React, { FC, FormEvent, Suspense, useCallback, useDeferredValue, useMemo, useRef, useState } from 'react';
import { useDocTitle, useTypedSelector } from "../../hooks";
import styles from "./HomePage.module.scss";
import { Movie } from "../../models";
import Menu from "../../components/common/Menu/Menu";
import MovieCard from "../../components/home/MovieCard/MovieCard";
import { Loader } from "../../components/common/loader";

const HomePage: FC = () => {
    const { movies, series } = useTypedSelector(state => state.movie);
    const { mainSelectedTab } = useTypedSelector(state => state.main);

    /*const { logged_in, user } = useTypedSelector(state => state.user);
    const currentUser = user as AuthorizedUser;
    const dispatch = useDispatch();*/

    const contentRef = useRef<HTMLDivElement>(null);

    useDocTitle('Главная');

    return (
        <main className={ styles.homeMain }>
            <div className={ styles.homeMainContent } ref={ contentRef }>
                <Suspense fallback={ <Loader/> }>
                    {
                        mainSelectedTab === 0 ?
                            <HomeContent array={ movies } title="Фильмы" type="movie"/> :
                            <HomeContent array={ series } title="Сериалы" type="series"/>
                    }
                </Suspense>
            </div>
            <Menu/>
        </main>
    );
};

const HomeContent: FC<{ title: string, array: Movie[], type?: "movie" | "series" }> = (
    { array, title, type = "movie" }
) => {
    const { posters } = useTypedSelector(state => state.movie);

    const [searchValue, setSearchValue] = useState('');
    const deferredSearch = useDeferredValue(searchValue);

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(() => target.value);
    }

    const filterArray = useCallback(
        (array: Movie[]) => array.filter(
            movie => movie.title.toLowerCase().includes(deferredSearch.toLowerCase())
        ),
        [deferredSearch]
    )

    const filteredArray = useMemo(
        () => filterArray(array),
        [filterArray, array]
    )

    console.log(filteredArray.length !== 0)

    return (
        <>
            <div className={ styles.homeMainContentSearch }>
                <h1>{ title }</h1>
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={ searchValue }
                    onChange={ handleInputChange }
                />
            </div>
            {
                filteredArray.length !== 0 && array ?
                    <div className={ styles.homeMainContentMovies }>
                        {
                            searchValue ?
                                filteredArray &&
                                filteredArray.map(movie => <MovieCard
                                    movieId={ movie.id }
                                    posterId={ posters.find(poster => poster.id === movie.poster_id)?.id ?? 0 }
                                    caption={ movie.title }
                                    key={ movie.id }
                                    type={ type }
                                />)
                                :
                                array &&
                                array.map(movie => <MovieCard
                                    movieId={ movie.id }
                                    posterId={ posters.find(poster => poster.id === movie.poster_id)?.id ?? 0 }
                                    caption={ movie.title }
                                    key={ movie.id }
                                    type={ type }
                                />)
                        }
                    </div> :
                    <HomeContentEmpty/>
            }
        </>
    );
}

const HomeContentEmpty: FC = () => {
    return (
        <div className={ styles.homeMainContentEmpty }>
            <h2>Ничего не найдено</h2>
        </div>
    );
}

export default HomePage;
