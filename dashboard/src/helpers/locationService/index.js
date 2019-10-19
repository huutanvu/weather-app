import axios from 'axios';

// Does not support http calls
// const IP_API_URL = "http://ip-api.com/json/"; 

class LocationService {

    getCurrentPosition = () => {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        }
    }

    // getCurrentLocation = async () => {
    //     try {
    //         let response = await axios.get(IP_API_URL);
    //         return response.data;
    //     }
    //     catch (err) {
    //         console.error(err);
    //     }
    // }

}

export default new LocationService();