import React, { useState } from 'react';

function Checkout() {
  const [cartItems] = useState([
    { 
      id: 1, 
      title: 'JavaScript Fundamentals', 
      price: 49.99,
      image: 'https://via.placeholder.com/80'
    },
    { 
      id: 3, 
      title: 'Advanced CSS Techniques', 
      price: 39.99,
      image: 'https://via.placeholder.com/80'
    }
  ]);
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.05; // 5% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="bg-gray-50 py-4 px-6 border-b">
            <h2 className="text-xl font-semibold">Order Summary</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax (5%)</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="bg-gray-50 py-4 px-6 border-b">
            <h2 className="text-xl font-semibold">Payment Details</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mr-2"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="paypal" 
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="mr-2"
                  />
                  <span>PayPal</span>
                </label>
              </div>
              
              {paymentMethod === 'card' && (
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Card Number
                    </label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Expiry Date
                      </label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        CVC
                      </label>
                      <input 
                        type="text" 
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Name on Card
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </form>
              )}
              
              {paymentMethod === 'paypal' && (
                <div className="bg-blue-50 text-center py-8 rounded-lg">
                  <p className="text-gray-700">You will be redirected to PayPal to complete your purchase</p>
                </div>
              )}
            </div>
            
            <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-md transition-colors text-lg font-medium">
              Complete Purchase
            </button>
            <p className="text-center text-gray-500 text-sm mt-4">
              <span className="inline-block mr-1">🔒</span>
              Secure payment processed by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
