import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import PlacesFormPage from "./placesformpage";
import AccountNav from "../AccountNav";
import axios from "axios";
export default function PlacesPage() {
    const [places,setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        })
    }, [])
    return (
        <div>
            <AccountNav/>
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-3 text-1 py-2 px-6 rounded-full"to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        增加新的地點
                    </Link>
                </div>
                <div className="mt-4">
                    {places.length > 0 && places.map (place => (
                        <Link to={'/account/places/'+place._id} className="text-4 flex gap-4 bg-gray-300 p-4 rounded-2xl cursor-pointer">
                            <div className="flex h-32 w-32 bg-gray-400 shrink-0">
                                {/* grow */}
                                {place.photos.length >0 && (
                                    <img className="object-cover"src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                                )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{place.title}</h2>
                                <p className="text-sm mt-2">{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
        </div>
    )
}