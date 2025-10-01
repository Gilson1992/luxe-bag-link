import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { AnimatedMarqueeHero } from '@/components/ui/hero-3';
import bagBlack from '@/assets/bag-black.jpg';
import bagBrown from '@/assets/bag-brown.jpg';
import bagBeige from '@/assets/bag-beige.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Endereço',
      info: 'Rua das Bolsas, 123 - Centro\nSão Paulo, SP - CEP 01234-567'
    },
    {
      icon: Phone,
      title: 'Telefone',
      info: '(11) 9999-9999\n(11) 3333-3333'
    },
    {
      icon: Mail,
      title: 'E-mail',
      info: 'contato@elegante.com.br\nvendas@elegante.com.br'
    },
    {
      icon: Clock,
      title: 'Horário',
      info: 'Segunda à Sexta: 9h às 18h\nSábado: 9h às 14h'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Criar link do WhatsApp com os dados do formulário
    const message = `Olá! Meu nome é ${formData.name}.

*Assunto:* ${formData.subject}
*E-mail:* ${formData.email}
*Telefone:* ${formData.phone}

*Mensagem:*
${formData.message}`;

    const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp
    window.open(whatsappLink, '_blank');

    toast({
      title: "Redirecionando para WhatsApp",
      description: "Sua mensagem será enviada via WhatsApp.",
    });

    // Resetar formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    setIsSubmitting(false);
  };

  const handleWhatsAppDirect = () => {
    const message = "Olá! Gostaria de mais informações sobre as bolsas da ELEGANTE.";
    const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

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
        tagline="Fale Conosco"
        title={
          <>
            Entre em Contato
            <br />
            <span className="text-primary">com a ELEGANTE</span>
          </>
        }
        description="Estamos aqui para ajudar! Tire suas dúvidas, faça sugestões ou converse conosco sobre nossos produtos. Nossa equipe está pronta para atendê-la."
        ctaText="Falar no WhatsApp"
        onCtaClick={handleWhatsAppDirect}
        images={heroImages}
      />

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {item.info}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2 text-primary" />
                  Envie sua Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nome *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">E-mail *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Telefone</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Assunto *</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Assunto da mensagem"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Mensagem *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Digite sua mensagem..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:shadow-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar via WhatsApp
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-6">
              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Dúvidas Frequentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Como funciona o frete grátis?</h4>
                    <p className="text-sm text-muted-foreground">
                      Para compras acima de R$ 299,00, o frete é gratuito para todo o Brasil.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Qual o prazo de entrega?</h4>
                    <p className="text-sm text-muted-foreground">
                      Entregamos em até 7 dias úteis para a região Sudeste e até 10 dias para as demais regiões.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Posso trocar se não gostar?</h4>
                    <p className="text-sm text-muted-foreground">
                      Sim! Você tem até 30 dias para solicitar a troca ou devolução.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">As bolsas têm garantia?</h4>
                    <p className="text-sm text-muted-foreground">
                      Todas nossas bolsas têm garantia de 6 meses contra defeitos de fabricação.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Siga-nos nas Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Acompanhe nossos lançamentos e promoções exclusivas!
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm">
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </Button>
                    <Button variant="outline" size="sm">
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleWhatsAppDirect}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Horário de Atendimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Segunda à Sexta:</span>
                      <span className="font-medium">9h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado:</span>
                      <span className="font-medium">9h às 14h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo:</span>
                      <span className="text-muted-foreground">Fechado</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted/50 rounded">
                    <p className="text-xs text-muted-foreground">
                      💬 Atendimento via WhatsApp disponível 24h para mensagens. 
                      Respondemos em até 2 horas no horário comercial.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;