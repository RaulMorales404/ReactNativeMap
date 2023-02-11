import React, { createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { PERMISSIONS, PermissionStatus, check, openSettings, request } from "react-native-permissions";

export interface PermissonsState {
    locationStatus: PermissionStatus,
}

export const permisionInicialState: PermissonsState = {
    locationStatus: 'unavailable',
}

type PermisionsContextProps = {
    permissions: PermissonsState,
    askLocationPermission: () => void,
    checkLocationPermission: () => void,

}
export const PermissionsContext = createContext({} as PermisionsContextProps) ///TODO que esporta


export const PermisionsProvider = ({ children }: any) => {
    const [permissions, setPermissions] = useState(permisionInicialState);

    useEffect(() => {
        checkLocationPermission();
        AppState.addEventListener('change', state => {

            if (state !== 'active') return;
            checkLocationPermission();

        })

    }, [])



    const askLocationPermission = async () => {

        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        if (permissions.locationStatus === 'blocked') {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus,
        })
    }

    const checkLocationPermission = async () => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus,
        })
    }

    return <PermissionsContext.Provider
        value={{
            permissions,
            checkLocationPermission,
            askLocationPermission,

        }}>
        {children}

    </PermissionsContext.Provider>
}