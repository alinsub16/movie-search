import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const TrailerPlayer = () => {
  const { videoKey } = useParams();
  const [searchParams] = useSearchParams();

  const rawQuery = searchParams.get('query');
  const query = rawQuery && rawQuery !== 'undefined' ? rawQuery : '';
  const backLink = query ? `/?query=${encodeURIComponent(query)}` : '/';

  return (
    <div className="bg-indigo">
      <div className='w-full max-w-[1400px] mx-auto'>
        <div className='min-h-screen flex flex-col items-center justify-center p-4 text-white '>
          <a href={backLink} className="text-blue-400 underline mb-4">← Back to Movies</a>
          <div className="w-full max-w-4xl aspect-video border border-solid">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerPlayer;
