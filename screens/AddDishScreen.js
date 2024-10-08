import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text } from 'react-native';
import { MenuContext } from '../MenuContext'; 
import { launchImageLibrary } from 'react-native-image-picker';
import { ChefAuthCon } from '../ChefAuthCon'; 

const AddDishScreen = ({ navigation }) => {
    const [dish, setDish] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfzZig2O3VTR2-KvwGUskvmKuxZMNorAluaA&s/150');
    const [dishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState(''); // Renamed to make it clear it's the selected course
    const [price, setPrice] = useState('');
    const { addMenuItem, selectMenuItem } = useContext(MenuContext);
    const { isAuthenticated } = useContext(ChefAuthCon); 

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.navigate('Login'); 
        }
    }, [isAuthenticated, navigation]);

    const addDish = () => {
        const newDish = {
            id: Math.random().toString(), 
            image: dish,
            name: dishName,
            description,
            course, // Using course for the selected course
            price,
        };

        addMenuItem(newDish);
        selectMenuItem(newDish.id);
        navigation.navigate('Home'); 
    };

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (!response.didCancel && response.assets) {
                const uri = response.assets[0].uri;
                setDish(uri); 
            } else {
                console.log('User cancelled image picker');
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Image</Text>
            <Button title="Select Image" onPress={selectImage} />
            {dish ? ( // Check if dish has a valid image URI
                <Image
                    source={{ uri: dish }}
                    style={styles.imagePreview} // Using style for image preview
                />
            ) : (
                <Text style={styles.label}>No Image Selected</Text>
            )}

            <Text style={styles.label}>Dish Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Dish Name'
                value={dishName}
                onChangeText={setDishName}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Course</Text>
            <TextInput
                style={styles.input}
                placeholder="Course"
                value={course}
                onChangeText={setCourse}
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <Button title='Add Dish' onPress={addDish} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
        marginBottom: 16,
    },
    imagePreview: {
        width: 150,
        height: 150,
        marginTop: 16,
        borderRadius: 8, 
    },
});


export default AddDishScreen;
