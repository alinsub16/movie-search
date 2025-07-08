import React from 'react'
import search_icon from '../assets/search.svg';

const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <>
      <div className='search'>
          <div className="border-2 border-white rounded-[25px]">
              <img src={search_icon} alt="Search" />
              <input 
              type="text" 
              placeholder='Search for a Movie' 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}/>
              
          </div>
      </div>
    </>
  )
}

export default Search