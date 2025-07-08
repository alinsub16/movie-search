import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import poster from '../assets/No-Poster.png';
import rating from '../assets/Rating.svg';
import { useLocation } from 'react-router-dom';

const MovieCard = ({ movie, searchTerm }) => {
  const {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    videoKey
  } = movie;

  return (
    <div className='movie-card w-full max-w-[300px] transition transform duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-violet-500 hover:ring-2 hover:ring-violet-500/30'>
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : poster}
        alt={title}
      />
      <div className='mt-4'>
        <h3>{title}</h3>
        <div className='content'>
          <div className='rating'>
            <img src={rating} alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>|</span>
          <p className='lang'>{original_language}</p>
          <span>|</span>
          <p className='year'>
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </div>

      {videoKey ? (
        <Link
          to={`/trailer/${videoKey}?query=${encodeURIComponent(searchTerm)}`}
          className="text-blue-500 underline mt-2 inline-block"
        >
          Watch Trailer
        </Link>
      ) : (
        <p className="text-sm text-gray-500 mt-2">No trailer available.</p>
      )}
    </div>
  );
};

export default MovieCard;
