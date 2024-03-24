import React from 'react';
import './stylesheets/cards.css';
import { FaGoogle } from "react-icons/fa";

const Card = ({ data }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">
                <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>
                <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={data.image} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{data.role}</span>
                <div className="flex mt-4 md:mt-6">
                    <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Apply Now</a>
                    <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">View More</a>
                </div>
            </div>
        </div>
    );
}

const CardList = () => {
    // Dummy data for cards
    const cardsData = [
        { id: 1, name: 'Google', role: 'Software Engineer', image: 'data:image/png;base64,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' },
        { id: 2, name: 'Microsoft', role: 'Product Manager', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5J6oiT7Dsy6zMyjZwQ-tgN9_jcQJEDJpndw&usqp=CAU' },
        { id: 3, name: 'Amazon', role: 'Designer', image: 'data:image/png;base64,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' },

    ];

    return (
        <div className="my-5 flex flex-wrap justify-center gap-4">
            {cardsData.map((data) => (
                <Card key={data.id} data={data} />
            ))}
        </div>
    );
}

export default CardList;
