import * as React from 'react';
import { useState, useEffect } from 'react';
import { Transition, TransitionChild } from '@headlessui/react'

interface CartItem {
  id: string;
  key: string; // Line item key
  title: string;
  image: string;
  price: number;
  quantity: number;
  variant_title?: string;
  line_price: number;
  selling_plan_allocation?: {
    compare_at_price: number;
    price: number;
    selling_plan: {
      name: string;
    };
  };
}

interface CartData {
  item_count: number;
  items: CartItem[];
  total_price: number;
}

const CartDrawer: React.FC = () => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await fetch('/cart.js');
      const data = await response.json();
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: data }));
      setCart(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener('open:cart', () => {
      setIsOpen(true);
      fetchCart();
    });

    document.addEventListener('product:added', () => {
      setIsOpen(true);
      fetchCart();
    });

    return () => {
      document.removeEventListener('open:cart', () => {});
      document.removeEventListener('product:added', () => {});
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isOpen]);

  const updateQuantity = async (lineKey: string, quantity: number) => {
    try {
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: lineKey,
          quantity: quantity,
        }),
      });
      fetchCart(); // Refresh cart data
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (lineKey: string) => {
    await updateQuantity(lineKey, 0);
  };

  return (
    <Transition show={isOpen}> 
      <div className="fixed top-0 right-0 w-full h-screen z-50">
        {/* Overlay */}
        <TransitionChild>
          <button className="absolute inset-0 z-10 bg-black opacity-75 data-[closed]:opacity-0 duration-200 transition-opacity" onClick={() => setIsOpen(false)}>
            <span className="sr-only">Close</span>
          </button>
        </TransitionChild>

        {/* Drawer */}
        <TransitionChild>
          <div className="absolute z-20 top-0 right-0 h-screen w-full max-w-[375px] bg-white flex flex-col duration-200 transition-transform data-[closed]:translate-x-full translate-x-0">
            {/* Cart Header */}
            <div className="border-y border-x border-border flex justify-between items-center p-5">
              <button type="button" onClick={() => setIsOpen(false)}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L8.5 8.5M8.5 8.5L1 16M8.5 8.5L16 16M8.5 8.5L16 1" stroke="#131313" />
                </svg>
              </button>
              <h2 className="italic font-serif">Cart ({cart?.item_count})</h2>
            </div>

            {/* Cart Contents */}
            <div className="border-x border-border grow flex-1 overflow-y-auto px-5">
              {cart?.items?.length > 0 ? cart.items.map((item) => (
                <div key={item.key} className="flex gap-5 border-b border-border py-5">
                  <div className="relative shrink-0 w-24 aspect-square">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-1">
                      <p className="leading-none">
                        {item.title}<br />
                        {item.selling_plan_allocation && (
                          <span className="italic">
                            {item?.selling_plan_allocation?.selling_plan?.name?.split(',')?.[0]}
                          </span>
                        )}
                      </p>
                      <button onClick={() => removeItem(item.key)} className="text-sm underline">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L4.5 4.5M4.5 4.5L1 8M4.5 4.5L8 8M4.5 4.5L8 1" stroke="#404040" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="p-2"
                          aria-label="Decrease quantity"
                        >
                          <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="1" x2="8" y2="1" stroke="#404040" />
                          </svg>
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="p-2"
                          aria-label="Increase quantity"
                        >
                          <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M0 5.5H4.94975M4.94975 5.5V10.4497M4.94975 5.5H9.89949M4.94975 5.5V0.550253"
                              stroke="#404040"
                            />
                          </svg>
                        </button>
                      </div>
                      <div>
                        {item.selling_plan_allocation ? (
                          <div className="flex gap-1 items-center">
                            <p className="text-dark-grey">${(item.selling_plan_allocation.price / 100).toFixed(2)}</p>
                            <p className="text-grey-50 line-through italic">${(item.selling_plan_allocation.compare_at_price / 100).toFixed(2)}</p>
                          </div>
                        ) : (
                          <p className="text-dark-grey">${(item.line_price / 100).toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )) : "Your cart is empty"}
            </div>

            {/* Cart Footer */}
            <div className="">
              <form action="/cart" method="post">
                <button
                  type="submit"
                  name="checkout"
                  className="border border-dark-grey w-full bg-dark-grey text-white p-5 flex justify-between items-center font-sans uppercase tracking-[0.15em] text-sm"
                >
                  Checkout <span>${(cart?.total_price / 100).toFixed(2)}</span>
                </button>
              </form>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};

export default CartDrawer;
