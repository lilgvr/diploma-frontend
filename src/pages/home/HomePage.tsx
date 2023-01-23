import React, {
    FC,
    FormEvent,
    lazy,
    Suspense,
    useCallback,
    useDeferredValue,
    useEffect,
    useMemo,
    useState
} from 'react';
import { useDocTitle, useTypedSelector } from "../../hooks";
import styles from "./HomePage.module.scss";
import { AuthorizedUser, Movie } from "../../models";
import Menu from "../../components/common/Menu/Menu";
import { Loader } from "../../components/common/loader";
import { useDispatch } from "react-redux";

const MovieCard = lazy(() => import("../../components/home/MovieCard/MovieCard"));

const HomePage: FC = () => {
    const { movies, series } = useTypedSelector(state => state.movie);
    const { mainSelectedTab } = useTypedSelector(state => state.main);

    const { logged_in, user } = useTypedSelector(state => state.user);
    const currentUser = user as AuthorizedUser;
    const dispatch = useDispatch();

    useDocTitle('Главная');

    useEffect(() => {
        console.log(user)
    }, [user]);

    return (
        <main className={ styles.homeMain }>
            <div className={ styles.homeMainContent }>
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


// TODO Загрузка всех картинок
const HomeContent: FC<{ title: string, array: Movie[], type?: "movie" | "series" }> = (
    { array, title, type = "movie" }
) => {
    const [imagePromises, setImagePromises] = useState<Promise<boolean>[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const deferredSearch = useDeferredValue(searchValue);

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(() => target.value);
    }

    /*const handleImageLoad = (pr: Promise<boolean>) => {
        setImagePromises(prevState => {
            prevState?.push(pr);
            return prevState;
        });
    }*/

    useEffect(() => {
        if (array.length === imagePromises.length) {
            Promise.all(imagePromises)
                .then(() => setImagesLoaded(true))
                .catch(() => setImagesLoaded(false))
        }
    }, [array.length, imagePromises]);

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
                imagesLoaded ?
                    <>
                        {
                            filteredArray.length !== 0 && array ?
                                <div className={ styles.homeMainContentMovies }>
                                    {
                                        searchValue ?
                                            filteredArray &&
                                            filteredArray.map(movie => <MovieCard
                                                movieId={ movie.id }
                                                posterId={ movie.poster_id ?? 0 }
                                                caption={ movie.title }
                                                key={ movie.id }
                                                type={ type }
                                                // onLoad={ handleImageLoad }

                                            />)
                                            :
                                            array &&
                                            array.map(movie => <MovieCard
                                                movieId={ movie.id }
                                                posterId={ movie.poster_id ?? 0 }
                                                caption={ movie.title }
                                                key={ movie.id }
                                                type={ type }
                                                // onLoad={ handleImageLoad }
                                            />)
                                    }
                                </div> :
                                <HomeContentEmpty/>
                        }
                    </> : <Loader/>
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
