import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../addresslink";
import PlaceGallery from "../placegallery";
import BookingDates from "../bookingdates";
export default function Booking () {
    const{id} = useParams();
    const [booking,setBookings] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                 const foundBooking = response.data.find(({_id}) => _id === id)
                if (foundBooking) {
                    setBookings(foundBooking);
                }
            })
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">你的預訂內容</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-4 p-6 text-1 rounded-2xl">
                    <div>總價</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place}/>
        </div>
    )
}