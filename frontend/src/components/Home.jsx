import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../css/Home.css';

const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Shoes',
];

const Home = () => {
  const navigate = useNavigate();

  const {
    add_to_cart,
    cart_items,
    update_quantity,
    cart_count,
    cart_total,
  } = useCart();

  const [products, set_products] = useState([]);
  const [search_query, set_search_query] = useState('');
  const [selected_category, set_selected_category] =
    useState('All');
  const [loading, set_loading] = useState(true);
  const [error_message, set_error_message] = useState('');

  useEffect(() => {
    const fetch_products = async () => {
      try {
        set_loading(true);
        set_error_message('');

        const response = await fetch(
          'http://localhost:5000/api/products'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const product_data = await response.json();

        set_products(product_data);
      } catch (error) {
        console.error('Error fetching products:', error);

        set_error_message(
          'Unable to load products. Please try again.'
        );
      } finally {
        set_loading(false);
      }
    };

    fetch_products();
  }, []);

  const filtered_products = products.filter((product) => {
    const search_value = search_query
      .toLowerCase()
      .trim();

    const matches_search =
      product.name
        .toLowerCase()
        .includes(search_value) ||
      product.category
        .toLowerCase()
        .includes(search_value);

    const matches_category =
      selected_category === 'All' ||
      product.category === selected_category;

    return matches_search && matches_category;
  });

  return (
    <div className="shopping-page">
      <header className="navbar">
        <h1>ShopEasy</h1>

        <div
          className="cart-icon"
          onClick={() => navigate('/cart')}
        >
          🛒 Cart
          <span>{cart_count}</span>
        </div>
      </header>

      <main className="content">
        <section className="products-section">
          <div className="products-header">
            <h2>Our Products</h2>

            <input
              type="text"
              className="search-box"
              placeholder="Search products..."
              value={search_query}
              onChange={(event) =>
                set_search_query(event.target.value)
              }
            />
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selected_category === category
                    ? 'category-filter active'
                    : 'category-filter'
                }
                onClick={() =>
                  set_selected_category(category)
                }
              >
                {category}
              </button>
            ))}
          </div>

          {loading && (
            <div className="no-products">
              <p>Loading products...</p>
            </div>
          )}

          {!loading && error_message && (
            <div className="no-products">
              <p>{error_message}</p>
            </div>
          )}

          {!loading &&
            !error_message &&
            filtered_products.length === 0 && (
              <div className="no-products">
                <p>No products found.</p>

                <span>
                  Try searching for another product or
                  category.
                </span>
              </div>
            )}

          {!loading &&
            !error_message &&
            filtered_products.length > 0 && (
              <div className="product-grid">
                {filtered_products.map((product) => (
                  <div
                    className="product-card"
                    key={product._id}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <div className="product-info">
                      <h3>{product.name}</h3>

                      <p className="price">
                        ₹
                        {product.price.toLocaleString(
                          'en-IN'
                        )}
                      </p>

                      <p className="category">
                        {product.category}
                      </p>

                      <p>
                        Stock: {product.stock}
                      </p>

                      <button
                        onClick={() =>
                          add_to_cart(product)
                        }
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0
                          ? 'Out of Stock'
                          : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </section>

        <aside className="cart-section">
          <h2>Shopping Cart</h2>

          {cart_items.length === 0 ? (
            <div className="empty-cart">
              <div>🛒</div>

              <p>Your cart is empty</p>

              <span>Add products to your cart.</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart_items.map((item) => (
                  <div
                    className="cart-item"
                    key={item._id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-item-details">
                      <h3>{item.name}</h3>

                      <p>
                        ₹
                        {item.price.toLocaleString(
                          'en-IN'
                        )}
                      </p>

                      <span className="cart-category">
                        {item.category}
                      </span>

                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            update_quantity(
                              item._id,
                              -1
                            )
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            update_quantity(
                              item._id,
                              1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div>
                  <span>Subtotal</span>

                  <strong>
                    ₹
                    {cart_total.toLocaleString(
                      'en-IN'
                    )}
                  </strong>
                </div>

                <div>
                  <span>Delivery</span>

                  <strong>Free</strong>
                </div>

                <hr />

                <div className="total">
                  <span>Total</span>

                  <strong>
                    ₹
                    {cart_total.toLocaleString(
                      'en-IN'
                    )}
                  </strong>
                </div>

                <button className="checkout-button">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </aside>
      </main>
    </div>
  );
};

export default Home;