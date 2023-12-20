import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitFlightData } from '../actions/flightActions';
import { getAirports } from '../utils/rapidapi';
import FlightResults from './FlightResults';

const Flight = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [suggestion, setSuggestion] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchResults = useSelector((state) => state.flight.searchResults);
    const dispatch = useDispatch();
    const suggestionBoxRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleFlightFrom = (e) => {
        setFrom(e.target.value);
    }

    const handleAirportClick = (e) => {
        const flyTo = e.target.getAttribute('value');
        setTo(flyTo);
        setShowSuggestions(false);
    }

    const handleFlightTochange = (e) => {
        setTo(e.target.value);
        const airportLength = e.target.value.length;
        if (airportLength > 2) suggestAirports(e.target.value);
        setShowSuggestions(true);
    }

    const suggestAirports = async (key) => {
        try {
            const suggestedAirports = await getAirports(key);
            console.log(suggestedAirports)
            setSuggestion(suggestedAirports);
        } catch (e) {
            console.log(e)
        }
    }

    const handleSearch = () => {
        dispatch(submitFlightData({
            departure: '2024-01-01',
            locationDeparture: from,
            locationArrival: to
        }))
    }

    return (
        <>
            <div className='text-center text-4xl mt-14'>Direct Flight</div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='ml-0 md:ml-auto'>
                    <label for='from' className='block text-gray-500 font-bold text-center mb-1 md:mb-0 py-4'>Fly From</label>
                    <select id='from' onChange={handleFlightFrom} className='
                        bg-gray-50 
                        border border-gray-300 
                        text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        block p-2.5 mx-auto w-80
                        dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                        <option selected></option>
                        <option value="SEA">Seattle-Tacoma International Airport (SEA)</option>
                        <option value="BFI">Boeing Field (BFI)</option>
                        <option value="LKE">Kenmore Air Harbor (Lake Union) (LKE)</option>
                    </select>
                </div>
                <div className='mx-auto md:mr-auto md:ml-0'>
                    <label for='from' className='block text-gray-500 font-bold text-center mb-1 md:mb-0 py-4'>Fly To</label>
                    <input id='from' value={to} onChange={handleFlightTochange} className='
                        bg-gray-50 
                        border border-gray-300 
                        text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        block p-2.5 mx-auto w-80
                        dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    </input>
                    {showSuggestions && (
                        <div className='p-2.5 absolute overflow-auto max-h-40 w-80 bg-white border-solid border-2 shadow-lg' ref={suggestionBoxRef}>
                            <ul className=''>
                                {suggestion.map((airport, index) => {
                                    return (
                                        <li onClick={handleAirportClick} key={index} value={airport.AirportCode}
                                            className='hover:bg-gray-200 cursor-pointer'
                                        ><strong>{airport.AirportCode}</strong> {airport.AirportName}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </div>
                <div>

                </div>
            </div>
            <div className='flex justify-center'>
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div>
                <FlightResults />
            </div>
        </>
    );
};

export default Flight;