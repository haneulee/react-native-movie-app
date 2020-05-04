import React, { useState, useEffect, Fragment, useRef } from "react";
import { ActivityIndicator, Dimensions, View, Text, TouchableOpacity } from "react-native";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as FaceDetector from 'expo-face-detector';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';
import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons'

const { width, height } = Dimensions.get("window");

const ALBUM_NAME = "Smiley Cam";

const CenterView = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
   background-color: black;
 `;

const InnerText = styled.Text`
   color: white;
   font-size: 22px;
 `;

const IconBar = styled.View`
 margin-top: 20px;
`;


export default ({ results }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [smileDetected, setSmileDetected] = useState(false);
    const cameraRef = useRef();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const switchCameraType = () => {
        if (type === Camera.Constants.Type.front) {
            setType(Camera.Constants.Type.back);
        } else {
            setType(Camera.Constants.Type.front);
        }
    };

    const onFacesDetected = ({ faces }) => {
        const face = faces[0];
        if (face) {
            if (face.smilingProbability > 0.7) {
                setSmileDetected(true)
                console.log("take photo");
                takePhoto();
            }
        }
    };

    const takePhoto = async () => {
        try {
            if (cameraRef.current) {
                let { uri } = await cameraRef.current.takePictureAsync({
                    quality: 1
                });
                if (uri) {
                    savePhoto(uri);
                }
            }
        } catch (error) {
            alert(error);
            setSmileDetected(false);
        }
    };
    const savePhoto = async uri => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status === "granted") {
                const asset = await MediaLibrary.createAssetAsync(uri);
                let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
                if (album === null) {
                    // album = await MediaLibrary.createAlbumAsync(
                    //     ALBUM_NAME,
                    //     Platform.OS !== "iOS" ? asset : null
                    // );
                    album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset);
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
                }
                setTimeout(
                    () =>
                        setSmileDetected(false),
                    2000
                );
            } else {
                setHasPermission(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    renderConetent = () => {
        if (hasPermission === true) {
            return (
                <Fragment><Camera
                    style={{
                        width: width - 40,
                        height: height / 1.5,
                        borderRadius: 10,
                        overflow: "hidden",
                        marginTop: 10,
                    }}
                    type={type}
                    onFacesDetected={smileDetected ? null : onFacesDetected}
                    faceDetectorSettings={{
                        detectLandmarks: FaceDetector.Constants.Landmarks.all,
                        runClassifications: FaceDetector.Constants.Classifications.all
                    }}
                    ref={cameraRef}
                />
                    <IconBar>
                        <TouchableOpacity onPress={switchCameraType}>
                            <MaterialIcons
                                name={
                                    type === Camera.Constants.Type.front
                                        ? "camera-rear"
                                        : "camera-front"
                                }
                                color="white"
                                size={50}
                            />
                        </TouchableOpacity>
                    </IconBar></Fragment>)
        } else if (hasPermission === false) {
            return <Text>Don't have permission for this</Text>
        } else {
            return <ActivityIndicator />
        }
    }
    return (
        <CenterView>
            <Text>Smile to take photo</Text>
            {renderConetent()}
        </CenterView>
    );
};