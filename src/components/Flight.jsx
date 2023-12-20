import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import { submitFlightData } from '../actions/flightActions';
import { getAirports } from '../utils/rapidapi';
import FlightResults from './FlightResults';

const Flight = () => {
    const [to, setTo] = useState('');
    const [suggestion, setSuggestion] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [flightDate, setFlightDate] = useState(null);

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

    const handleDateChange = (date) => {
        const dateString = date;
        const flightDate = new Date(dateString);

        const year = flightDate.getUTCFullYear();
        const month = String(flightDate.getMonth() + 1).padStart(2, '0');
        const day = String(flightDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
        setSelectedDate(formattedDate);
        setFlightDate(date);
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
        console.log(selectedDate)
        dispatch(submitFlightData({
            departure: selectedDate,
            locationDeparture: "SEA",
            locationArrival: to
        }))
    }

    return (
        <>
            <div className='shadow-lg py-3'>
                <div className='text-center text-4xl mt-14'>Direct Flight</div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='mx-auto md:ml-auto md:mr-0'>
                        <label for='from' className='block text-gray-500 font-bold text-center mb-1 md:mb-0 py-4'>Fly From</label>
                        <select id='from' className='
                        bg-gray-50 
                        border border-gray-300 
                        text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        block p-2.5 mx-auto w-80
                        dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled>
                            <option value="SEA" selected>Seattle International Airport (SEA)</option>
                        </select>
                    </div>
                    <div className='mx-auto'>
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
                    <div className="mx-auto md:mr-auto md:ml-0">
                        <label htmlFor="datepicker" className="block text-gray-500 font-bold text-center mb-1 md:mb-0 py-4">
                            Select a date
                        </label>
                        <DatePicker
                            id="datepicker"
                            selected={flightDate}
                            onChange={handleDateChange}
                            className="bg-gray-50 
                            border border-gray-300 
                            text-gray-900 text-sm 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block p-2.5 mx-auto w-80
                            dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white 
                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div>

                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            <div className='mt-5'>
                <FlightResults />
            </div>
        </>
    );
};

export default Flight;