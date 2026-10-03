import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../css/Cart.css';

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart_items,
    update_quantity,
    remove_from_cart,
    cart_total,
  } = useCart();

  const handle_increase_quantity = (product_id) => {
    update_quantity(product_id, 1);
  };

  const handle_decrease_quantity = (product_id) => {
    update_quantity(product_id, -1);
  };

  return (
    <div className="cart-page">
      <header className="cart-navbar">
        <h1>ShopEasy</h1>

        <button
          className="continue-shopping"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </header>

      <main className="cart-content">
        <section className="cart-products">
          <h2>Shopping Cart</h2>

          {cart_items.length === 0 ? (
            <div className="cart-empty">
              <div>🛒</div>

              <h3>Your cart is empty</h3>

              <p>
                Add products to your cart.
              </p>

              <button onClick={() => navigate('/')}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-list">
              {cart_items.map((item) => (
                <div
                  className="cart-product"
                  key={item._id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-product-info">
                    <h3>{item.name}</h3>

                    <p className="cart-product-category">
                      {item.category}
                    </p>

                    <p className="cart-product-price">
                      ₹
                      {item.price.toLocaleString('en-IN')}
                    </p>

                    <div className="cart-quantity">
                      <button
                        onClick={() =>
                          handle_decrease_quantity(
                            item._id
                          )
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          handle_increase_quantity(
                            item._id
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-product-right">
                    <strong>
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString('en-IN')}
                    </strong>

                    <button
                      className="remove-button"
                      onClick={() =>
                        remove_from_cart(item._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {cart_items.length > 0 && (
          <aside className="cart-summary-page">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>
                ₹
                {cart_total.toLocaleString('en-IN')}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>

              <strong>Free</strong>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>

              <strong>
                ₹
                {cart_total.toLocaleString('en-IN')}
              </strong>
            </div>

            <button className="checkout-button">
              Proceed to Checkout
            </button>
          </aside>
        )}
      </main>
    </div>
  );
};

export default Cart;