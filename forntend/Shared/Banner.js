
import React, {useState, useEffect } from 'react';
import {Image, StyleSheet, Dimensions, View, ScrollView} from 'react-native';

import Swiper from 'react-native-swiper';


var {width} = Dimensions.get('window');

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() =>{
        setBannerData([
           "https://www.organicfacts.net/wp-content/uploads/capsicum.jpg",
            "https://marhabaworld.com/wp-content/uploads/2021/04/Cucumber-Imported.jpg",
            "https://cdn.harvesttotable.com/htt/2016/08/23180309/canstockphoto41889464-1024x755.jpg",
        ])
        return () => {
            setBannerData([])
        }
    }, [])

/*     return (
        <ScrollView>  
            <View style = {styles.container}>
                <View style = {styles.swiper}>
                    <Swiper 
                        style={{ height: width / 2}}
                        showButtons = {false}
                        autoplay={true}
                        autoplayTimeout = {2}
                    >
                        {bannerData.map((item) => {
                            return (
                                <Image 
                                key={item}
                                style ={styles.imageBanner}
                                resizeMode="contain"
                                source={{uri: item}}
                             />
                            );
                        })}
                    </Swiper>
                    <View style={{height: 20}}> whatever  </View>
                </View>
            </View>  
         </ScrollView>
       
    ) */
   return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.swiper}>
              <Swiper
                style={{ height: width / 2 }}
                showButtons={false}
                autoplay={true}
                autoplayTimeout={2}
              >
                {bannerData.map((item) => {
                  return (
                    <Image
                      key={item}
                      style={styles.imageBanner}
                      resizeMode="contain"
                      source={{ uri: item }}
                    />
                  );
                })}
              </Swiper>
              <View style={{ height: 20 }}></View>
            </View>
          </View>
        </ScrollView>
      );
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#a9a9a9',

    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10, 

    },
    imageBanner: {
        height: width/2,
        width: width -40,
        borderRadius: 10, 
        marginHorizontal: 20
    }
})

export default Banner;