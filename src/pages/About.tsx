import React from 'react';
import { Award, Heart, Users, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Qualidade Premium',
      description: 'Utilizamos apenas materiais de primeira linha, como couro legítimo e ferragens importadas, garantindo durabilidade e sofisticação em cada peça.'
    },
    {
      icon: Heart,
      title: 'Paixão pelo Design',
      description: 'Cada bolsa é cuidadosamente desenvolvida por nossa equipe de designers, combinando tendências internacionais com o gosto refinado brasileiro.'
    },
    {
      icon: Users,
      title: 'Atendimento Personalizado',
      description: 'Nossa equipe está sempre pronta para oferecer um atendimento exclusivo, ajudando você a encontrar a bolsa perfeita para cada ocasião.'
    },
    {
      icon: Truck,
      title: 'Entrega Rápida',
      description: 'Envios para todo o Brasil com rastreamento completo. Frete grátis para compras acima de R$ 299,00.'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Fundação',
      description: 'Nascemos com o sonho de criar bolsas que combinem elegância e funcionalidade para a mulher moderna.'
    },
    {
      year: '2021',
      title: 'Primeira Coleção',
      description: 'Lançamos nossa primeira linha de bolsas de couro, conquistando o coração de centenas de clientes.'
    },
    {
      year: '2022',
      title: 'Expansão',
      description: 'Ampliamos nosso catálogo e iniciamos vendas online, alcançando todo território nacional.'
    },
    {
      year: '2023',
      title: 'Reconhecimento',
      description: 'Fomos premiados como uma das marcas emergentes mais promissoras do setor de acessórios femininos.'
    },
    {
      year: '2024',
      title: 'Inovação',
      description: 'Lançamos nossa nova coleção sustentável e implementamos tecnologias para melhor experiência do cliente.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
              Nossa História
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Sobre a ELEGANTE
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Há mais de 4 anos criamos bolsas excepcionais que combinam design sofisticado, 
              qualidade premium e funcionalidade para acompanhar a rotina da mulher moderna.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Clientes Satisfeitas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Modelos Únicos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-muted-foreground">Avaliação Média</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Acreditamos que cada mulher merece se sentir confiante e elegante em seu dia a dia. 
                Por isso, criamos bolsas que são muito mais do que acessórios - são companheiras fiéis 
                que complementam sua personalidade e estilo único.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nosso compromisso vai além da beleza: priorizamos a qualidade dos materiais, 
                o cuidado nos detalhes e a funcionalidade pensada especialmente para as necessidades 
                da mulher contemporânea.
              </p>
              <Button className="bg-gradient-primary hover:shadow-glow">
                Conheça Nossa Coleção
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-subtle rounded-lg flex items-center justify-center">
                <div className="text-6xl text-primary/20">👜</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Os pilares que guiam nosso trabalho e nos mantêm comprometidas com a excelência.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossa Jornada</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Veja como evoluímos ao longo dos anos, sempre mantendo nosso compromisso com a qualidade e inovação.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="hover:shadow-elegant transition-shadow">
                      <CardContent className="p-6">
                        <Badge className="mb-3">{item.year}</Badge>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Venha Fazer Parte da Nossa História</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se às milhares de mulheres que já escolheram a ELEGANTE para acompanhar seus momentos especiais.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-primary hover:shadow-glow">
              Ver Produtos
            </Button>
            <Button variant="outline">
              Entre em Contato
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;