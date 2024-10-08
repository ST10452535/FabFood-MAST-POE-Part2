import React, { useState, useContext } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Image, Text, TouchableOpacity, Keyboard, ScrollView, SafeAreaView } from 'react-native';
import { MenuContext } from '../MenuContext';

const FilterScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const { menuItems } = useContext(MenuContext);
  const [filteredItems, setFilteredItems] = useState([]);

  const filterDishes = () => {
    Keyboard.dismiss();
    if (search.trim() === '') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(item => {
        const matchesName = item.name?.toLowerCase().includes(search.toLowerCase());
        const matchesCourse = item.course?. toLowerCase().includes(search.toLowerCase());; 
        return matchesName || matchesCourse; 
      });
      setFilteredItems(filtered);
    }
  };

  const selectDish = (item) => {
    // Assuming you want to navigate to the detail page or home after selecting a dish
    navigation.navigate('DishDetail', { dish: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Search by name or course"
          value={search}
          onChangeText={setSearch}
        />
        <Button title="Filter" onPress={filterDishes} />
        {filteredItems.length === 0 ? (
          <Text style={styles.noItemsText}>No items match your search</Text>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id.toString() || Math.random().toString()} // Ensure item.id is a string
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.selectButton} onPress={() => selectDish(item)}>
                  <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
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
});

export default FilterScreen;

