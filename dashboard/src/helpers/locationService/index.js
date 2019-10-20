import axios from 'axios';

// Does not support http calls
// const IP_API_URL = "http://ip-api.com/json/"; 

// OpenCageData api: https://opencagedata.com/demo
const OPEN_CAGE_DATA_API = "https://api.opencagedata.com/geocode/v1/json"
const OPEN_CAGE_API_KEY = process.env.REACT_APP_OPEN_CAGE_API_KEY;

class LocationService {

    getCurrentPosition = () => {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        }
    }

    getReverseLocation = async (location) => {
        const locationString = `${location.lat},${location.lon}`;
        try {
            let response = await axios.get(OPEN_CAGE_DATA_API, {
                params: {
                    q: locationString,
                    key: OPEN_CAGE_API_KEY
                }
            });
            let allInfos = response.data;
            if (allInfos.total_results > 0) {
                let city = allInfos.results[0].components.city;
                let country = allInfos.results[0].components.country;
                return { city, country };
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    getLocation = async (cityName, country) => {
        const locationString = `${cityName},${country}`;
        try {
            let response = await axios.get(OPEN_CAGE_DATA_API, {
                params: {
                    q: locationString,
                    key: OPEN_CAGE_API_KEY
                }
            });
            let allInfos = response.data;
            let location = {};
            if (allInfos.total_results > 0) {
                location["lon"] = allInfos.results[0].geometry.lng;
                location["lat"] = allInfos.results[0].geometry.lat;
            }
            return location;
        }
        catch (err) {
            console.error(err);
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