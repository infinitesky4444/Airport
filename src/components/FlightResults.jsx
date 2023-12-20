import React from "react";
import { useSelector } from "react-redux";

import { aircrafts } from '../data/aircrafts';
import { carriers } from '../data/carriers';

const FlightResults = () => {
    const searchResults = useSelector((state) => state.flight.searchResults);
    console.log(searchResults);

    const groups = {};

    searchResults.forEach(data => {
        data.itineraries.forEach((itinerary) => {
            itinerary.segments.forEach((segment) => {
                if (segment.numberOfStops === 0) {
                    const carrierCode = segment.carrierCode;
                    if (!groups[carrierCode]) {
                        groups[carrierCode] = [];
                    }
                    groups[carrierCode].push(segment);
                }
            })
        })
    });

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mx-4 lg:mx-72">
            <div>
                {searchResults.length > 0
                    ?
                    Object.entries(groups).map(([carrierCode, segments]) => {
                        const carrier = carriers.find((carrier) => carrier[carrierCode]);
                        console.log(carrier);
                        return (
                            <div key={carrierCode} className="flex items-center my-2">
                                <img src={carrier.logo} className="logo-md rounded-md" />
                                <div className="ml-3">
                                    <strong>{carrier[carrierCode]}</strong>
                                    <p className="text-sm text-slate-400">{segments.length} flights available</p>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="text-lg">There is no available flight</div>
                }
            </div>
            <div>

            </div>
        </div>
    );
}

export default FlightResults;