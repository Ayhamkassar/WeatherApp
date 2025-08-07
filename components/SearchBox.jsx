import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, ImageBackground,ActivityIndicator } from 'react-native';
import React, { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { fetchWeather } from "@/API/WeatherAPI";
import one from '@/assets/Backgrounds/1.jpg'
import two from '@/assets/Backgrounds/2.jpg'
import three from '@/assets/Backgrounds/3.jpg'
import four from '@/assets/Backgrounds/4.jpg'
import five from '@/assets/Backgrounds/5.jpg'
import six from '@/assets/Backgrounds/6.jpg'
import seven from '@/assets/Backgrounds/7.jpg'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const images = [one, two, three, four, five, six, seven];

export default function SearchCity() {
    const Styles = createStyles();

    const [city, setCity] = useState('')
    const [weather, setWeather] = useState({})
    const [loading,setLoading] = useState(false)
    const [randomImages,setRandomImage] = useState(images[0])
    const n = Math.floor(Math.random() * images.length)

    const getWeather = async () => {
        setLoading(true)
        const data = await fetchWeather(city);
        console.log(data)
        setWeather(data || {});
        setRandomImage(images[n])
        setLoading(false)
    };

    return (
        <ImageBackground source={randomImages} style={Styles.image} imageStyle={{opacity : 0.5}}>
            <SafeAreaView style={Styles.Safearea}>
                <View style={Styles.TextinputContainer}>
                    <TextInput
                        style={Styles.Textinput}
                        placeholder="Enter Your City"
                        value={city}
                        onChangeText={setCity}
                    />
                    {loading ? <ActivityIndicator size="small" color="black"/> :<Pressable onPress={getWeather}>
                        <AntDesign name="check" size={24} color="black" />
                    </Pressable>}


                </View>
                {Object.keys(weather).length > 0 ?
                <>
                        <View style={Styles.locationContainer}>
                            <Text style={Styles.location}>
                                {weather?.name}, {weather?.sys?.country}
                            </Text>
                        </View>
                    <View style={Styles.mainContainer}>
                        <View style={Styles.weatherContainer}>
                            <Text style={Styles.temp}>
                            <FontAwesome6 name="temperature-half" size={50} color="black" />
                                {weather.main?.temp}°C
                            </Text>
                            <Text style={Styles.temp}>
                            feels : {weather.main?.feels_like}
                            </Text>
                            <View style={Styles.weatherTextContainer}>
                            <Text style={Styles.weather}>
                               {weather.weather[0]?.main === 'Clouds' ?
                                <MaterialCommunityIcons name="weather-cloudy" size={48} color="black" /> :
                                weather.weather[0]?.main === 'Clear' ? <MaterialCommunityIcons name="weather-sunny" size={48} color="black" />  :
                                <MaterialCommunityIcons name="weather-rainy" size={48} color="black" />
                            } 
                               {weather.weather && weather.weather[0]?.main}
                            </Text>
                            <Text style={Styles.weather}>
                               { weather.weather[0]?.description}
                            </Text>
                            </View>
                        </View>
                    </View>
                        <View style={Styles.windContainer}>
                            <Text style={Styles.temp}>
                            <MaterialCommunityIcons name="weather-windy" size={50} color="black" />
                                {weather?.wind?.speed}
                            </Text>
                        </View>
                        <View style={Styles.windContainer}>
                        <Text style={Styles.temp}>
                        <AntDesign name="dashboard" size={48} color="black" />
                            {weather?.main?.pressure}
                        </Text>
                        </View>
                    </>
                    : null}
            </SafeAreaView>
        </ImageBackground>
    );
}

function createStyles() {
    return StyleSheet.create({
        mainContainer :{
        },
        windContainer :{
            alignItems: 'center'
        },
        weatherTextContainer :{
            backgroundColor: "rgba(255,255,255,0.5)",
            shadowOpacity: 0.7,
            textShadowColor: "rgba (0,0,0,0.75)",
            textShadowOffset: { width: -3, height: 3 },
            textShadowRadius: 10,
            textAlign: 'center',
            borderRadius : 10,
        },
        wind :{
            color: "#FFFFFF",
            fontSize: 48,
            fontWeight: "700",
            shadowColor: "#000000",
            shadowOffset: {
                width: -1,
                height: 3,
            },
            backgroundColor: "rgba(255,255,255,0.5)",
            shadowOpacity: 0.7,
            textShadowColor: "rgba (0,0,0,0.75)",
            textShadowOffset: { width: -3, height: 3 },
            textShadowRadius: 10,
            textAlign: 'center',
            borderRadius : 10,
        },
        Safearea: {
            flex: 1,
            marginVertical: 30,
        },
        TextinputContainer: {
            backgroundColor: 'rgba(255,255,255,0.7)',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 10,
            paddingHorizontal: 10,
            width: '80%',
            margin: 10,
        },
        Textinput: {
            height: 40,
            width: '90%',
            fontWeight: '600'
        },
        locationContainer: {
            marginVertical: 15
        },
        location: {
            color: "black",
            fontSize: 35,
            fontWeight: "500",
            textAlign: 'center',
            textShadowColor: "rgba (0,0,0,0.55)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 5,
        },
        weather: {
            color: "black",
            fontSize: 48,
            fontWeight: "700",
            shadowColor: "#000000",
            shadowOffset: {
                width: -1,
                height: 3,
            },
        },
        weatherContainer: {
            alignItems: 'center'
        },
        image: {
            flex: 1,
        },
        temp: {
            textAlign: 'center',
            color: 'black',
            fontSize: 50,
            fontWeight: "800",
            backgroundColor: "rgba(255,255,255,0.5)",
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderRadius: 30,
            overflow: "hidden",
            marginTop: 10,
            textShadowColor: "rgba (0,0,0,0.75)",
            textShadowOffset: { width: -3, height: 3 },
            textShadowRadius: 10,

        }
    });
}