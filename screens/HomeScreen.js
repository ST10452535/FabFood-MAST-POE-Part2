import React, { useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MenuContext } from '../MenuContext'; 

const HomeScreen = ({ navigation }) => {
    const { menuItems, selectedItems, selectMenuItem, deselectMenuItem } = useContext(MenuContext);
    
    const displayedItems = menuItems.filter(item => selectedItems.includes(item.id));
    
    const toggleSelection = useCallback((itemId) => {
        if (selectedItems.includes(itemId)) {
            deselectMenuItem(itemId); 
        } else {
            selectMenuItem(itemId); 
        }
    }, [selectedItems, selectMenuItem, deselectMenuItem]);

    const renderItem = useCallback(({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <TouchableOpacity 
                style={styles.selectButton} 
                onPress={() => toggleSelection(item.id)}
            >
                <Text style={styles.selectButtonText}>
                    {selectedItems.includes(item.id) ? 'Deselect' : 'Select'}
                </Text>
            </TouchableOpacity>
        </View>
    ), [selectedItems, toggleSelection]);

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../assets/fab-food-home.png')}
                style={styles.headerImage}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.navButton} 
                    // onPress={() => {
                    //     navigation.navigate('Main', {
                    //     screen : 'Add Dish'
                    //   });
                    // }}
                    onPress={() => {
                        alert.show('Gwen')
                    }}
                >
                    <Text style={styles.navButtonText}>Add Dish</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.navButton} 
                    onPress={() => navigation.navigate('Filter')}
                >
                    <Text style={styles.navButtonText}>Filter Dishes</Text>
                </TouchableOpacity>
            </View>
            {displayedItems.length > 0 ? (
                <FlatList
                    data={displayedItems}
                    keyExtractor={(item) => item.id.toString()} // Ensure item.id is a string
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.noItemsText}>No dishes selected. Please add or filter dishes.</Text>
            )}
            <Text style={styles.totalDishes}>Total Dishes: {displayedItems.length}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    navButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    itemContainer: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    itemImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        color: '#000',
        marginVertical: 8,
    },
    selectButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    totalDishes: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
    },
    noItemsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default HomeScreen;
