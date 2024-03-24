import React from 'react';
import '../src/stylesheets/Search.css'; // Import CSS for styling

const Search = () => {
    return (
        <div className="bg-home">
            <div className="content">
                <h1 className="title">Find Great Job Opportunity You Deserve</h1>
                <h3 className="subtitle">Getting a new job is never easy. Check what new jobs we have in store for you on Job Stock.</h3>
                <div className="search-container">
                    <div className="search">
                        <input className=' h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 px-10' placeholder="Opportuntiy you are Looking For.." />
                        <div className="filters">
                            <select >
                                <option value="filter1">Filter 1</option>
                                <option value="filter2">Filter 2</option>
                                <option value="filter3">Filter 3</option>
                            </select>
                            <select>
                                <option value="filter1">Filter 1</option>
                                <option value="filter2">Filter 2</option>
                                <option value="filter3">Filter 3</option>
                            </select>
                            <select>
                                <option value="filter1">Filter 1</option>
                                <option value="filter2">Filter 2</option>
                                <option value="filter3">Filter 3</option>
                            </select>
                        </div>
                        <button className='bg-gray-700 my-3 text-white font-bold py-2 px-4 rounded'>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
