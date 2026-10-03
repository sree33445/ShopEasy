import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart_items, set_cart_items] = useState([]);

  const add_to_cart = (product) => {
    set_cart_items((current_items) => {
      const existing_item = current_items.find(
        (item) => item._id === product._id
      );

      if (existing_item) {
        if (
          existing_item.quantity >= product.stock
        ) {
          return current_items;
        }

        return current_items.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      if (product.stock <= 0) {
        return current_items;
      }

      return [
        ...current_items,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const update_quantity = (product_id, change) => {
    set_cart_items((current_items) =>
      current_items
        .map((item) => {
          if (item._id !== product_id) {
            return item;
          }

          const new_quantity =
            item.quantity + change;

          if (new_quantity > item.stock) {
            return item;
          }

          return {
            ...item,
            quantity: new_quantity,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const remove_from_cart = (product_id) => {
    set_cart_items((current_items) =>
      current_items.filter(
        (item) => item._id !== product_id
      )
    );
  };

  const cart_count = cart_items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cart_total = cart_items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart_items,
        add_to_cart,
        update_quantity,
        remove_from_cart,
        cart_count,
        cart_total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cart_context = useContext(CartContext);

  if (!cart_context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    );
  }

  return cart_context;
};