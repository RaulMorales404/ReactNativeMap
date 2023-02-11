import { useEffect, useRef, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { TypeLocation } from '../interfaces/interfaceLocation';


const useLocation = () => {

    const [showMap, setShowMap] = useState(false);
    const idStopFallowUser = useRef<number>();
    const isMounted = useRef<boolean>(true);
    const showPolyLine = useRef<boolean>(false);

    const [routeLine, setRouteLine] = useState<TypeLocation[]>([]);

    const [userLocation, setUserLocation] = useState<TypeLocation>({
        latitude: 0,
        longitude: 0,
    });
    const [userLocationWach, setUserLocationWach] = useState<TypeLocation>({
        latitude: 0,
        longitude: 0,
    });

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }


    }, [])

    useEffect(() => {
        getCurrentLocation().then((location) => {
            if (!isMounted) return;
            setUserLocation(location);
            setUserLocationWach(location);
            setRouteLine(userLocationWach => [...userLocationWach, location]);
            setShowMap(true);

        }).catch((error) => console.log("promis fallida", error))

    }, [])

    const getCurrentLocation = (): Promise<TypeLocation> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    const location: TypeLocation = {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    }
                    resolve(location);
                    setRouteLine(routes => [...routes, location]);
                },
                (err) => reject(console.log({ err })), { enableHighAccuracy: true, }
            );
        })
    }

    const followUsers = () => {
        idStopFallowUser.current = Geolocation.watchPosition(({ coords }) => {
            if (!isMounted) return;
            const location: TypeLocation = {
                latitude: coords.latitude,
                longitude: coords.longitude,
            };
            setUserLocationWach(location)
            setRouteLine(routes => [...routes, location]);
        }, (err) => console.log(err), {
            enableHighAccuracy: true, distanceFilter: 10
        })
    }

    const stopFollowUsers = () => {
        if (idStopFallowUser.current) {
            Geolocation.clearWatch(idStopFallowUser.current)
        }

    }



    return {
        showMap,
        userLocation,
        getCurrentLocation,
        followUsers,
        userLocationWach,
        stopFollowUsers,
        routeLine,
        showPolyLine,

    }
}

export default useLocation