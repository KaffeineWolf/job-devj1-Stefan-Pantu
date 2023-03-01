import React, { useEffect, useState } from 'react';
import { Button, Rating, Spinner } from 'flowbite-react';

const Index = props => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [yearFilter, setYearFilter] = useState(true);
    const [ratingFilter, setRatingFilter] = useState(false);

    const fetchMovies = () => {
        setLoading(true);

        return fetch('/api/movies')
            .then(response => response.json())
            .then(data => {
                setMovies(data.movies);
                setLoading(false);
            });
    }

    // Sort the movies by year

    const filterByYear = () => {
      if (!yearFilter)
      {
        setYearFilter(true);
        movies.sort((a, b) => {return b.year - a.year});
      }
      else
      {
        setYearFilter(false);
        movies.sort((a, b) => {return a.year - b.year});
      }
    }

    // Year sorting component

    const FilterButtonYear = props => { 
      if (yearFilter) {
        return (
          <div
            className="flex md:flex-row text-align-left font-medium cursor-pointer items-center"
            onClick={filterByYear}
          >
            <i className="fa-solid fa-caret-up"></i>&nbsp;&nbsp;Most recent
          </div>
        );
      } else {
        return (
          <div
            className="flex md:flex-row text-align-left font-medium cursor-pointer items-center"
            onClick={filterByYear}
          >
            <i className="fa-solid fa-caret-down"></i>&nbsp;&nbsp;Least recent
          </div>
        );
      }
      
    }

    // Sort the movies by rating

    const filterByRating = () => {
      if (!ratingFilter) {
        setRatingFilter(true);
        movies.sort((a, b) => {return b.rating - a.rating});
      } else {
        setRatingFilter(false);
        movies.sort((a, b) => {return a.rating - b.rating});
      }
    }

    // Rating sorting component

    const FilterButtonRating = props => {
      if (ratingFilter) {
        return (
          <div
            className="flex text-align-left font-medium cursor-pointer items-center"
            onClick={filterByRating}
          >
            <i className="fa-solid fa-caret-up"></i>&nbsp;&nbsp;Most rated
          </div>
        );
      } else {
        return (
          <div
            className="flex text-align-left font-medium cursor-pointer items-center"
            onClick={filterByRating}
          >
            <i className="fa-solid fa-caret-down"></i>&nbsp;&nbsp;Least rated
          </div>
        );
      }
    }

    // Boilerplate component for the genre filter

    const GenreSelector = props => {
      return (
        <div className="flex grow font-medium cursor-pointer items-center">
          <label htmlFor="genres">Filter by genre:</label>
          <select name="genres" id="genres" className="outline-0 outline-transparent border-0 border-transparent font-medium align-middle">
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
          </select>
        </div>
      );
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <Layout>
          <Heading />
          <FilterBar>
            <GenreSelector /> 
            <FilterButtonYear />
            <FilterButtonRating />
          </FilterBar>
          <MovieList loading={loading}>
            {movies.map((item, key) => (
              <MovieItem key={key} {...item} />
            ))}
          </MovieList>
        </Layout>
    );
};

const Layout = props => {
    return (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            {props.children}
          </div>
        </section>
    );
};

const Heading = props => {
    return (
        <div className="mx-auto max-w-screen-sm mb-8 lg:mb-16">
          <h1 className="mb-4 text-4xl tracking-tight text-center font-extrabold text-gray-900 dark:text-white">
            Movie Collection
          </h1>

          <p className="font-light text-gray-500 text-center lg:mb-16 sm:text-xl dark:text-gray-400">
            Explore the whole collection of movies
          </p>
        </div>
    );
};

// Component to wrap the sorting and filtering functionality

const FilterBar = props => {
    return (
          <div className="mx-auto max-w-screen-xl mb-8 lg:mb-16">
              <div className="md:flex gap-4 justify-between">
                {props.children}                
              </div>
          </div>
    );
}

const MovieList = props => {
    if (props.loading) {
        return (
            <div className="text-center">
              <Spinner size="xl" />
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
          {props.children}
        </div>
    );
};

const MovieItem = props => {
    return (
        <div className="flex flex-col w-full h-full rounded-lg shadow-md lg:max-w-sm">
          <div className="grow">
            <img
              className="object-cover w-full h-60 md:h-80"
              src={props.image}
              alt={props.title}
              loading="lazy"
            />
          </div>

          <div className="grow flex flex-col h-full p-3">
            <div className="grow mb-3 last:mb-0">
              {props.year || props.rating
                ? <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
                    <span>{props.year}</span>

                    {props.rating
                      ? <Rating>
                          <Rating.Star />

                          <span className="ml-0.5">
                            {props.rating}
                          </span>
                        </Rating>
                      : null
                    }
                  </div>
                : null
              }

              <h3 className="text-gray-900 text-lg leading-tight font-semibold mb-1">
                {props.title}
              </h3>

              <p className="text-gray-600 text-sm leading-normal mb-4 last:mb-0">
                {props.plot.substr(0, 80)}...
              </p>
            </div>

            {props.wikipedia_url
              ? <Button
                  color="light"
                  size="xs"
                  className="w-full"
                  onClick={() => window.open(props.wikipedia_url, '_blank')}
                >
                  More
                </Button>
              : null
            }
          </div>
        </div>
    );
};

export default Index;
