import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, Product } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { addItem } = useCart();

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedColor);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const colorVariants = {
    'Preto': 'bg-black',
    'Marrom': 'bg-amber-800',
    'Bege': 'bg-amber-100',
    'Branco': 'bg-white border border-gray-200',
    'Vermelho': 'bg-red-600',
    'Azul': 'bg-blue-600',
  };

  return (
    <div className={cn(
      "group relative bg-card rounded-lg shadow-elegant hover:shadow-product transition-all duration-300 hover:-translate-y-1 overflow-hidden",
      className
    )}>
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
          <Button
            size="sm"
            variant="secondary"
            asChild
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
          >
            <Link to={`/product/${product.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              -{discountPercentage}%
            </Badge>
          )}
          {product.category === 'new' && (
            <Badge className="bg-primary text-primary-foreground">
              Novo
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20",
            isWishlisted && "opacity-100 text-red-500"
          )}
          onClick={handleWishlistToggle}
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
        </Button>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>
          {product.rating && (
            <div className="flex items-center space-x-1 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-3 w-3 text-xs",
                      i < Math.floor(product.rating!) ? "text-primary" : "text-muted"
                    )}
                  >
                    ★
                  </div>
                ))}
              </div>
              {product.reviews && (
                <span className="text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Cores:</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 4).map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "h-4 w-4 rounded-full transition-all duration-200 hover:scale-110",
                  colorVariants[color as keyof typeof colorVariants] || 'bg-gray-400',
                  selectedColor === color && "ring-2 ring-primary ring-offset-1"
                )}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline space-x-2">
          <span className="text-lg font-semibold text-foreground">
            R$ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;