
import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import {ListItem, Badge, Text, } from 'native-base';

const CategoryFilter = (props) => {

    return (
   /*  <View style={{height: 60}}>  */
            <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "#f2f2f2" }}
                >
            <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoryFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge
                        style={[styles.center, {margin: 5},
                            props.active == -1 ? styles.active : styles.inactive
                        ]}
                    >
                        <Text style={{ color: 'white' }}>All</Text>
                    </Badge>
                </TouchableOpacity>
                {props.categories.map((item) => (
                    <TouchableOpacity
                    key={item._id.$oid}
                    onPress={() => {
                        props.categoryFilter(item._id.$oid), 
                        props.setActive(props.categories.indexOf(item))
                    }}
                >
                    <Badge
                        style={[styles.center, 
                            {margin: 5},
                            props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                        ]}
                    >
                        <Text style={{ color: 'white' }}>{item.name}</Text>
                    </Badge>
                </TouchableOpacity>
                ))}
            </ListItem>
        </ScrollView>

/*      </View> */


)
}


const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor: 'orange'
    },
    inactive: {
        backgroundColor: 'blue'
    }
})


export default CategoryFilter;