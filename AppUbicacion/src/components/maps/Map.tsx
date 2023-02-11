import React, { useEffect, useRef } from 'react'
import MapView, { Polyline } from 'react-native-maps'
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import useLocation from '../../hooks/useLocation';
import ButtonTab from '../customButton/ButtonTap';



const Map = () => {

    const {
        showMap,
        userLocation,
        getCurrentLocation,
        followUsers,
        stopFollowUsers,
        userLocationWach,
        routeLine,
        showPolyLine,
    } = useLocation();

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);



    const centerPosition = async () => {
        let langAndLatitud = await getCurrentLocation()
        mapViewRef.current?.animateCamera({
            center: langAndLatitud,
        })
        following.current = true;
    }
    const changeShowPoliLine = () => {
        showPolyLine.current = !showPolyLine.current
    }
    useEffect(() => {
        followUsers();
        return () => {
            ///Cancelar el seguimiento
        }
    }, [])

    useEffect(() => {

        if (following.current) {
            const { latitude, longitude } = userLocationWach
            mapViewRef.current?.animateCamera({
                center: { latitude, longitude },
            })
        }


        return () => {
            stopFollowUsers();
        }

    }, [userLocationWach])


    if (!showMap) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color="red" />
            </View>
        )
    }


    return (
        <>
            <MapView
                ref={(element) => {
                    return mapViewRef.current = element!;
                }}
                style={{ flex: 1 }}
                // provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart={() => following.current = false}
            >
                {showPolyLine.current && <Polyline
                    coordinates={routeLine}
                    strokeColor='aqua'
                    strokeWidth={5}
                />}


            </MapView>
            <View style={{ ...styles.btnMapContainer }}>
                <ButtonTab
                    iconName='brush'
                    styleBtn={styles.btn}
                    action={changeShowPoliLine}
                />
                <ButtonTab
                    iconName='location'
                    styleBtn={styles.btn}
                    action={centerPosition}
                />
            </View>

        </>
    )
}

export default Map;
const styles = StyleSheet.create({
    btnMapContainer: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        height: '30%',
        width: 75
    },
    btn: {
        backgroundColor: '#000',
        padding: 18,
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
})