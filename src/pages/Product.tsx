import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw, Star, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const Product = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const relatedProducts = mockProducts.filter(p => p.id !== id && p.category === product?.category).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <Button asChild>
            <Link to="/shop">Voltar à Loja</Link>
          </Button>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedColor, quantity);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const colorVariants = {
    'Preto': 'bg-black',
    'Marrom': 'bg-amber-800',
    'Bege': 'bg-amber-100 border border-gray-300',
    'Branco': 'bg-white border border-gray-300',
    'Vermelho': 'bg-red-600',
    'Azul': 'bg-blue-600',
  };

  // Mock gallery images - in a real app, you'd have multiple images per product
  const galleryImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Loja</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <Button variant="ghost" asChild className="mb-6">
          <Link to="/shop">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar à Loja
          </Link>
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={galleryImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 bg-muted rounded overflow-hidden border-2 transition-colors",
                    selectedImageIndex === index ? "border-primary" : "border-transparent"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  {product.category === 'new' && (
                    <Badge className="mb-2">Novo</Badge>
                  )}
                  {discountPercentage > 0 && (
                    <Badge variant="destructive" className="mb-2 ml-2">
                      -{discountPercentage}%
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={isWishlisted ? "text-red-500" : ""}
                  >
                    <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.rating!) ? "text-primary fill-current" : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} avaliações)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Descrição</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">
                Cor: <span className="text-primary">{selectedColor}</span>
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 border rounded-lg transition-all hover:shadow-md",
                      selectedColor === color 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div
                      className={cn(
                        "h-4 w-4 rounded-full",
                        colorVariants[color as keyof typeof colorVariants]
                      )}
                    />
                    <span className="text-sm">{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantidade</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-gradient-primary hover:shadow-glow"
              >
                Adicionar ao Carrinho - R$ {(product.price * quantity).toFixed(2)}
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                Comprar Agora
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              {[
                { icon: Truck, text: 'Frete Grátis' },
                { icon: Shield, text: 'Compra Segura' },
                { icon: RotateCcw, text: '30 dias para troca' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Detalhes</TabsTrigger>
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <h4 className="font-semibold mt-6 mb-3">Características:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Material: Couro legítimo de alta qualidade</li>
                  <li>• Forro: Tecido de poliéster resistente</li>
                  <li>• Fechamento: Zíper de metal YKK</li>
                  <li>• Alça ajustável e removível</li>
                  <li>• Compartimentos internos organizadores</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Dimensões</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Largura:</span>
                      <span>30cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Altura:</span>
                      <span>25cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profundidade:</span>
                      <span>12cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peso:</span>
                      <span>650g</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Materiais</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Exterior:</span>
                      <span>Couro legítimo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interior:</span>
                      <span>Poliéster</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hardware:</span>
                      <span>Metal dourado</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Origem:</span>
                      <span>Brasil</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl font-bold">{product.rating}</div>
                    <div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < Math.floor(product.rating!) ? "text-primary fill-current" : "text-muted"
                            )}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Baseado em {product.reviews} avaliações
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      name: 'Maria S.',
                      rating: 5,
                      date: '15 de março, 2024',
                      comment: 'Produto excelente! A qualidade do couro é excepcional e o acabamento é perfeito. Recomendo!'
                    },
                    {
                      name: 'Ana C.',
                      rating: 4,
                      date: '10 de março, 2024',
                      comment: 'Muito bonita e funcional. Única observação é que é um pouco menor do que esperava, mas ainda assim vale a pena.'
                    },
                    {
                      name: 'Julia R.',
                      rating: 5,
                      date: '5 de março, 2024',
                      comment: 'Perfeita para uso diário. Cabe tudo que preciso e o design é lindo!'
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{review.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-sm">{review.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-3 w-3",
                                    i < review.rating ? "text-primary fill-current" : "text-muted"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;