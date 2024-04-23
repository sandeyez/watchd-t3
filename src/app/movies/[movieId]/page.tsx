import Image from 'next/image';
import TMDB from "~/server/models/tmdb";
import MovieMetadata from "./_components/MovieMetadata";
import { formatCurrency } from '~/utils/format';

type MovieBackdropProps = {
    backdropPath: string;
}

function MovieBackdrop({backdropPath}: MovieBackdropProps) {
    return (
        <div className="absolute top-0 left-0 h-96 w-full pointer-events-none">
            <div className="absolute h-full -z-20 w-full overflow-hidden">
                <div className=" w-full h-full blur-[2px]" >
                    <Image src={TMDB.getImageUrl({
                        type: 'backdrop',
                        path: backdropPath,
                        size: 'original'
                    })}
                    alt=""
                    layout="fill"
                    className="object-cover"
                    />
                </div>
            </div>
            <div className="absolute h-full top-0 left-0 -z-10 bg-gradient-to-b from-primary/70 to-secondary w-full"/>
        </div>
    )
}

type MoviePosterProps = {
    posterPath: string;
    altText: string;
    budget: number;
    revenue: number;
    productionCompanies: Awaited<ReturnType<typeof TMDB.getMovie>>['production_companies'];
}

function MoviePoster({altText, posterPath, budget, revenue, productionCompanies}: MoviePosterProps) {
    const mainProductionCompany = productionCompanies[0];
    return (
        <div className='movie-poster w-full aspect-[2/3] rounded-lg overflow-hidden'>
            <div className='movie-poster__inner w-full h-full'>
                <Image src={TMDB.getImageUrl({path: posterPath, type: 'poster', size: 'w342'})}
                        alt={altText}
                        width={228}
                        height={342}
                        className="movie-poster__front object-contain w-full h-full"
                    />
                <div className='movie-poster__back w-full h-full'>
                    <div className='flex flex-col justify-between h-full w-full gap-2 bg-primary p-4'>
                        <div className='w-full h-32 mx-auto bg-white p-2 rounded-md flex items-center justify-center'>
                            <div className='relative w-full h-16'>
                                <Image
                                    src={TMDB.getImageUrl({
                                        path: mainProductionCompany?.logo_path ?? '',
                                        size: 'w185',
                                        type: 'logo'
                                    })}
                                    alt={mainProductionCompany?.name ?? ''}
                                    layout='fill'
                                    className='object-contain w-full h-full'
                                />
                            </div>
                            
                        </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <span className='text-xs font-bold'>Production company</span>
                                    <span>{productionCompanies[0]?.name}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-xs font-bold'>Budget</span>
                                    <span>{formatCurrency(budget)}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-xs font-bold'>Revenue</span>
                                    <span>{formatCurrency(revenue)}</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// type MovieButtonsProps = {}

function MovieButtons() {
    return (
        <div className="flex flex-col justify-end gap-4">
            <button>Check-in</button>
        </div>
    )
}

type MovieCastProps = {
    cast: Awaited<ReturnType<typeof TMDB.getMovieCredits>>['cast'];
}

function MovieCast({cast}: MovieCastProps) {
    return (
        <div>
            <h2 className="text-lg font-bold">Cast</h2>
            <div className="flex flex-col gap-4">
                {
                    cast.slice(0,8).map(({character, id, name, profile_path}) => (
                        <div key={id} className="flex gap-2">
                            {profile_path &&
                            <div className="min-w-12 max-w-12 min-h-12 max-h-12 rounded-full overflow-hidden">
                                <Image
                                    src={TMDB.getImageUrl({path: profile_path, type: 'profile', size: 'w185'})}
                                    alt={name ?? ''}
                                    width={128}
                                    height={192}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            }
                            <div className="flex flex-col">
                                <span className="font-bold text-sm line-clamp-2 text-ellipsis">{name}</span>
                                <span className="text-xs line-clamp-2 text-ellipsis">{character}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default async function MoviePage({ params }: { params: { movieId: string } }) {
    const movie = await TMDB.getMovie({movieId: params.movieId});
    const credits = await TMDB.getMovieCredits({movieId: params.movieId});

    console.log(credits.cast)

    return (
    <div className="relative">
        <MovieBackdrop backdropPath={movie.backdrop_path} />
        <div className="grid grid-cols-[1fr_3fr_auto] grid-rows-[1fr_auto] max-w-5xl mx-auto gap-6 py-16 px-8">
            <MoviePoster posterPath={movie.poster_path} altText={`${movie.title} poster`} budget={movie.budget} revenue={movie.revenue} productionCompanies={movie.production_companies} />
            <MovieMetadata title={movie.title} tagline={movie.tagline} releaseDate={new Date(movie.release_date)} genres={movie.genres} />
            <MovieButtons />
            
            <MovieCast cast={credits.cast} />
            <div>
                <h2 className="text-lg font-bold">Description</h2>
                <p className="text-justify text-sm">{movie.overview}</p>
            </div>
        </div>
    </div>);
}