import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/products';
import heroImage from '@/assets/hero-banner.jpg';

const Index = () => {
  const featuredProducts = mockProducts.slice(0, 4);
  const newArrivals = mockProducts.filter(p => p.category === 'new').slice(0, 3);
  const discountedProducts = mockProducts.filter(p => p.originalPrice).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-primary/20 text-primary-light border-primary/30">
            Nova Coleção 2024
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            escrevendo histórias
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              com pontos.
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto animate-slide-up">
            Descubra nossa coleção exclusiva de bolsas femininas que combinam 
            elegância, qualidade e sofisticação para a mulher moderna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" asChild className="bg-primary hover:bg-primary-light">
              <Link to="/shop">
                Explorar Coleção
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Ver Lançamentos
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: 'Frete Grátis',
                description: 'Em compras acima de R$ 299'
              },
              {
                icon: Shield,
                title: 'Compra Segura',
                description: 'Seus dados protegidos'
              },
              {
                icon: Headphones,
                title: 'Suporte 24/7',
                description: 'Atendimento especializado'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-4 animate-fade-in">
                <div className="h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Selecionamos especialmente para você as peças mais desejadas da nossa coleção
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Novidades</Badge>
            <h2 className="text-3xl font-bold mb-4">Últimos Lançamentos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              As mais novas adições à nossa coleção exclusiva
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="destructive" className="mb-4 animate-pulse">
              Ofertas Especiais
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Promoções Imperdíveis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Aproveite nossos descontos especiais por tempo limitado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O que nossas clientes dizem</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Maria Silva',
                text: 'Qualidade excepcional! A bolsa chegou exatamente como esperava. Recomendo!',
                rating: 5
              },
              {
                name: 'Ana Costa',
                text: 'Atendimento perfeito e entrega rápida. Já comprei 3 bolsas e sempre satisfeita.',
                rating: 5
              },
              {
                name: 'Julia Santos',
                text: 'Design incrível e muito funcional. Uso no trabalho todos os dias.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-elegant text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
