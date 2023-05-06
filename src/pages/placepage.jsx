import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import BookingWidget from "../bookingwidget";
import PlaceGallery from "../placegallery";
import AddressLink from "../addresslink";
export default function PlacesPage() {
    const {id} = useParams();
    const [place, setPlace] = useState(null)
    useEffect(() => {
        if(!id){
            return
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })
    } ,[id])
    
    if(!place) return '';

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place}/>
            <div className="w-full mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]"> 
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">簡介</h2>
                        <p className="break-words">{place.description}</p>
                    </div>
                    入住時間：{place.checkIn}<br/>
                    退房時間：{place.checkOut}<br/>
                    最多入住人數：{place.maxGuests}
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl">額外須知</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
            </div>
        </div>
    );
}
