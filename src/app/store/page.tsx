"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  name: string;
  price: number;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  cartId: number;
  image: string;
}

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const categories = ["All", "Apparel", "Accessories", "Collectibles", "Artist Merch"];

  const products = [
    {
      id: 1,
      name: "Swan Dive PDX Classic Tee",
      category: "Apparel",
      price: 25.00,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      description: "Soft cotton tee with our iconic swan logo",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Teal"],
      inStock: true
    },
    {
      id: 2,
      name: "Swan Dive Hoodie",
      category: "Apparel",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      description: "Premium hoodie perfect for Portland weather",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Gray", "Teal"],
      inStock: true
    },
    {
      id: 3,
      name: "Portland Music Scene Hat",
      category: "Accessories",
      price: 20.00,
      image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400&h=400&fit=crop",
      description: "Embroidered cap celebrating Portland's music culture",
      sizes: ["One Size"],
      colors: ["Black", "Navy", "Teal"],
      inStock: true
    },
    {
      id: 4,
      name: "Swan Dive Tote Bag",
      category: "Accessories",
      price: 15.00,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      description: "Eco-friendly canvas tote with swan logo",
      sizes: ["One Size"],
      colors: ["Natural", "Black"],
      inStock: true
    },
    {
      id: 5,
      name: "Vintage Concert Poster Collection",
      category: "Collectibles",
      price: 35.00,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      description: "Set of 5 limited edition posters from memorable shows",
      sizes: ["11x17"],
      colors: ["Multi"],
      inStock: false
    },
    {
      id: 6,
      name: "Swan Dive Enamel Pin Set",
      category: "Accessories",
      price: 12.00,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      description: "Collectible enamel pins featuring venue artwork",
      sizes: ["One Size"],
      colors: ["Multi"],
      inStock: true
    },
    {
      id: 7,
      name: "Portland Jazz Collective Album",
      category: "Artist Merch",
      price: 18.00,
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=400&fit=crop",
      description: "Limited vinyl from our featured jazz artists",
      sizes: ["LP"],
      colors: ["Black Vinyl"],
      inStock: true
    },
    {
      id: 8,
      name: "Swan Dive Coffee Mug",
      category: "Accessories",
      price: 14.00,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      description: "Ceramic mug for your morning brew",
      sizes: ["12oz"],
      colors: ["White", "Black"],
      inStock: true
    },
    {
      id: 9,
      name: "Neon Synthesis Tour Tee",
      category: "Artist Merch",
      price: 28.00,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      description: "Exclusive tour merchandise from electronic artist",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Neon Green"],
      inStock: true
    },
    {
      id: 10,
      name: "Swan Dive Anniversary Patch",
      category: "Collectibles",
      price: 8.00,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      description: "Commemorative patch celebrating 8 years of music",
      sizes: ["3 inch"],
      colors: ["Multi"],
      inStock: true
    }
  ];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: typeof products[0], size?: string, color?: string) => {
    const cartItem = {
      ...product,
      selectedSize: size || product.sizes[0],
      selectedColor: color || product.colors[0],
      quantity: 1,
      cartId: Date.now() // Simple ID for cart management
    };
    setCart(prev => [...prev, cartItem]);
    setCartOpen(true);
  };

  const removeFromCart = (cartId: number) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Shopping Cart ({getTotalItems()})</h2>
              <Button variant="ghost" onClick={() => setCartOpen(false)}>✕</Button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex gap-3 p-3 border rounded">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.selectedSize} • {item.selectedColor}</p>
                        <p className="font-bold text-teal-600">${item.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">Total: ${getTotalPrice()}</span>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 mb-2">
                    Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setCartOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Swan Dive Store
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Show your love for Swan Dive PDX with official merchandise, artist collaborations, and collectible items.
            </p>
          </div>
          <Button
            onClick={() => setCartOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 relative"
          >
            🛒 Cart ({getTotalItems()})
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-teal-600 hover:bg-teal-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {product.category}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-2xl font-bold text-teal-600">${product.price.toFixed(2)}</p>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                {product.sizes.length > 1 && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-700 block mb-1">Sizes:</span>
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors.length > 1 && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700 block mb-1">Colors:</span>
                    <div className="flex flex-wrap gap-1">
                      {product.colors.map((color) => (
                        <Badge key={color} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300"
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Store Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🚚</span> Shipping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Free shipping on orders over $50. Standard delivery 3-5 business days.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>↩️</span> Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">30-day return policy for unworn items with original tags.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎵</span> Artist Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Portion of artist merchandise sales goes directly to supporting the musicians.</p>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center bg-slate-900 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Store Updates
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Be the first to know about new merchandise drops, limited editions, and exclusive artist collaborations.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg"
              />
              <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
