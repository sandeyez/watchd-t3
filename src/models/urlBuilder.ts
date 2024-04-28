export default class URLBuilder {
    static getMovieUrl({ movieId }: { movieId: number }): string {
        return `/movie/${movieId}`;
    }
}
