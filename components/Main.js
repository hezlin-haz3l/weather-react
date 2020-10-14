import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ImageBackground } from 'react-native';

export default function Main() {
    const [search, setSearch] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');   
    const callApi = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+search+"&appid=9fd7a449d055dba26a982a3220f32aa2")
    .then(response => response.json())
    .then(responseJson => {
        //setIsLoading(false);
        console.log(responseJson);
        setWeather(responseJson);
    })
    .catch(error => {
        //setIsLoading(false);
        console.log(error);
        //when it got error then it will jump back to previous
    })
    }

return (
    <ImageBackground source={require('../assets/Night.png')} 
        style={{width:'100%',
        height:'100%'}}>
    <View style={styles.container}>
    <TextInput placeholder="Enter City Name" style={styles.textInput} value={search}
    onChangeText={(value) => setSearch(value)} />
    <Button title ="Press Me" onPress={callApi} />
    {
        /*conditional rendering*/
        // If there is a value (weather), will display as below
        weather ? <View style={{alignItems: 'center'}}>
            <Image style={{width: 50, height:50}}
            source={{
                uri: "https://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png",
            }}
            />
    <Text style={{fontSize: 20}}>Date: {new Date(weather.dt*1000).toLocaleDateString()}</Text>
    <Text style={{fontSize: 20}}>Temperature: {(weather.main.temp-273.15).toFixed(2)} &deg; C</Text>
    <Text>Weather: {weather.weather[0].main}</Text>
    <Text>Humidity: {weather.main.humidity}</Text> 
    <Text>Pressure: {weather.main.pressure}</Text> 
    <Text></Text> 
    </View>
    // if no value (weather) will display as below
    :
    <View />    
    }
    </View>
    </ImageBackground>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black'
},
textInput: {
    color: 'blue'
}
});