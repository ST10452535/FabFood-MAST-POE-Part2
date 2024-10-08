import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const MenuContext = createContext();

// MenuProvider component
export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);      // List of all menu items
    const [selectedItems, setSelectedItems] = useState([]); // List of items visible on home screen

    // Function to add a menu item
    const addMenuItem = (item) => {
        setMenuItems(prevItems => [...prevItems, item]);
    };

    // Function to select a menu item for display
    const selectMenuItem = (itemId) => {
        setSelectedItems(prevSelected => {
            if (!prevSelected.includes(itemId)) {
                return [...prevSelected, itemId];
            }
            return prevSelected;
        });
    };

    // Function to deselect a menu item
    const deselectMenuItem = (itemId) => {
        setSelectedItems(prevSelected => prevSelected.filter(id => id !== itemId));
    };

    // Function to get the currently visible menu items
    const getVisibleMenuItems = () => {
        return menuItems.filter(item => selectedItems.includes(item.id));
    };

    return (
        <MenuContext.Provider value={{ 
            menuItems, 
            selectedItems, 
            addMenuItem, 
            selectMenuItem, 
            deselectMenuItem, 
            getVisibleMenuItems 
        }}>
            {children}
        </MenuContext.Provider>
    );
};

MenuProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuProvider;
