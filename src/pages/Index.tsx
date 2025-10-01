import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/products';
import { AnimatedMarqueeHero } from '@/components/ui/hero-3';
import bagBlack from '@/assets/bag-black.jpg';
import bagBrown from '@/assets/bag-brown.jpg';
import bagBeige from '@/assets/bag-beige.jpg';

const Index = () => {
  const navigate = useNavigate();
  const featuredProducts = mockProducts.slice(0, 4);
  const newArrivals = mockProducts.filter(p => p.category === 'new').slice(0, 3);
  const discountedProducts = mockProducts.filter(p => p.originalPrice).slice(0, 3);

  const heroImages = [
    bagBlack,
    bagBrown,
    bagBeige,
    bagBlack,
    bagBrown,
    bagBeige,
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedMarqueeHero
        tagline="Nova Coleção 2024"
        title={
          <>
            escrevendo histórias
            <br />
            <span className="text-primary">com pontos.</span>
          </>
        }
        description="Descubra nossa coleção exclusiva de bolsas femininas que combinam elegância, qualidade e sofisticação para a mulher moderna."
        ctaText="Explorar Coleção"
        onCtaClick={() => navigate('/shop')}
        images={heroImages}
      />

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

      {/* New Arrivals Carousel */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Novidades</Badge>
            <h2 className="text-3xl font-bold mb-4">Últimos Lançamentos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              As mais novas adições à nossa coleção exclusiva
            </p>
          </div>

          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {newArrivals.map((product) => (
                  <CarouselItem key={product.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
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
