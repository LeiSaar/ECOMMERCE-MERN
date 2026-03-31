import { createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/assets"
import { toast } from "react-toastify";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';

    const delivery_fee = 10;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const [cartItems, setCartItems] = useState({});

    const navigate =useNavigate();

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                }
                catch (error) {
                    print(error);
                }
            }
        }

        return totalCount;
    }

    // example for cartItems:
    //     {
    //         { aaaab: { L: 1, M: 1 } },
    //         { aaabm: { M: 2, L: 1 } }
    //     }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () => {

        let totalAmount = 0;

        for (const itemId in cartItems) {

            for (const itemSize in cartItems[itemId]) {
                let itemInfo = products.find((product) => product._id === itemId);
                try {
                    if (cartItems[itemId][itemSize] > 0) {
                        totalAmount += itemInfo.price * cartItems[itemId][itemSize];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        return totalAmount;

    }

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;