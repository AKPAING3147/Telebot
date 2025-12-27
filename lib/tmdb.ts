import axios from 'axios';

// TMDB API configuration
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * TMDB API interface for searching and fetching movie data
 */

// Type definitions for TMDB API
export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
}

export interface MovieDetails extends Movie {
    runtime: number;
    genres: { id: number; name: string }[];
    tagline: string;
    budget: number;
    revenue: number;
    status: string;
}

export interface SearchMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

/**
 * Search for movies by query
 */
export async function searchMovies(query: string, page: number = 1): Promise<SearchMoviesResponse> {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query,
                page,
                language: 'en-US',
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error searching movies:', error.response?.data || error.message);
        throw new Error('Failed to search movies');
    }
}

/**
 * Get movie details by ID
 */
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error getting movie details:', error.response?.data || error.message);
        throw new Error('Failed to get movie details');
    }
}

/**
 * Get full poster URL
 */
export function getPosterUrl(posterPath: string | null): string | null {
    if (!posterPath) return null;
    return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
}

/**
 * Format movie details for Telegram message
 */
export function formatMovieMessage(movie: Movie | MovieDetails): string {
    const rating = movie.vote_average.toFixed(1);
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

    // Check if it's MovieDetails (has runtime property)
    const runtime = 'runtime' in movie && movie.runtime
        ? `\n⏱ Runtime: ${movie.runtime} min`
        : '';

    const overview = movie.overview
        ? movie.overview.length > 300
            ? movie.overview.substring(0, 300) + '...'
            : movie.overview
        : 'No overview available.';

    return `🎬 <b>${movie.title}</b> (${year})

⭐️ Rating: ${rating}/10 (${movie.vote_count.toLocaleString()} votes)${runtime}

📝 <b>Overview:</b>
${overview}`;
}

/**
 * Format movie caption for channel post
 */
export function formatChannelCaption(movie: Movie | MovieDetails): string {
    const rating = movie.vote_average.toFixed(1);
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

    const runtime = 'runtime' in movie && movie.runtime
        ? `\n⏱ Runtime: ${movie.runtime} min`
        : '';

    return `🎬 <b>${movie.title}</b> (${year})

⭐️ Rating: ${rating}/10${runtime}

📝 ${movie.overview || 'No overview available.'}

#movie #cinema #${movie.title.replace(/\s+/g, '')}`;
}
