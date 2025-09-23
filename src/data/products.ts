import { Product } from '@/context/CartContext';
import bagBlack from '@/assets/bag-black.jpg';
import bagBrown from '@/assets/bag-brown.jpg';
import bagBeige from '@/assets/bag-beige.jpg';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Bolsa Elegante Preta',
    price: 299.90,
    originalPrice: 399.90,
    image: bagBlack,
    colors: ['Preto', 'Marrom', 'Bege'],
    category: 'handbags',
    description: 'Uma bolsa elegante e sofisticada, perfeita para ocasiões especiais. Confeccionada em couro genuíno com acabamento premium.',
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Bolsa Casual Marrom',
    price: 249.90,
    image: bagBrown,
    colors: ['Marrom', 'Preto', 'Bege'],
    category: 'new',
    description: 'Ideal para o dia a dia, esta bolsa combina praticidade e estilo. Material durável e design atemporal.',
    rating: 4.6,
    reviews: 87
  },
  {
    id: '3',
    name: 'Bolsa Minimalista Bege',
    price: 329.90,
    originalPrice: 429.90,
    image: bagBeige,
    colors: ['Bege', 'Branco', 'Marrom'],
    category: 'handbags',
    description: 'Design clean e minimalista para mulheres modernas. Espaçosa e funcional, perfeita para trabalho e lazer.',
    rating: 4.9,
    reviews: 156
  },
  {
    id: '4',
    name: 'Bolsa Executiva Premium',
    price: 399.90,
    image: bagBlack,
    colors: ['Preto', 'Marrom'],
    category: 'premium',
    description: 'Para a mulher executiva que não abre mão do estilo. Compartimentos organizadores e material de alta qualidade.',
    rating: 4.7,
    reviews: 92
  },
  {
    id: '5',
    name: 'Bolsa Vintage Inspiração',
    price: 279.90,
    originalPrice: 349.90,
    image: bagBrown,
    colors: ['Marrom', 'Bege', 'Preto'],
    category: 'vintage',
    description: 'Inspirada no estilo vintage com toque contemporâneo. Perfeita para quem busca originalidade.',
    rating: 4.5,
    reviews: 73
  },
  {
    id: '6',
    name: 'Bolsa Festa Dourada',
    price: 189.90,
    image: bagBeige,
    colors: ['Bege', 'Preto'],
    category: 'evening',
    description: 'Elegante e compacta, ideal para eventos sociais. Acabamento sofisticado com detalhes dourados.',
    rating: 4.4,
    reviews: 45
  },
  {
    id: '7',
    name: 'Bolsa Trabalho Essential',
    price: 359.90,
    image: bagBlack,
    colors: ['Preto', 'Marrom', 'Bege'],
    category: 'work',
    description: 'Desenvolvida para a rotina profissional. Compartimento para laptop e organizadores internos.',
    rating: 4.8,
    reviews: 203
  },
  {
    id: '8',
    name: 'Bolsa Weekend Collection',
    price: 449.90,
    originalPrice: 549.90,
    image: bagBrown,
    colors: ['Marrom', 'Preto'],
    category: 'new',
    description: 'Perfeita para viagens de fim de semana. Espaçosa e resistente, sem abrir mão do estilo.',
    rating: 4.9,
    reviews: 167
  }
];

export const categories = [
  { id: 'all', name: 'Todas', count: mockProducts.length },
  { id: 'handbags', name: 'Bolsas de Mão', count: mockProducts.filter(p => p.category === 'handbags').length },
  { id: 'new', name: 'Lançamentos', count: mockProducts.filter(p => p.category === 'new').length },
  { id: 'premium', name: 'Premium', count: mockProducts.filter(p => p.category === 'premium').length },
  { id: 'work', name: 'Trabalho', count: mockProducts.filter(p => p.category === 'work').length },
  { id: 'evening', name: 'Festa', count: mockProducts.filter(p => p.category === 'evening').length },
  { id: 'vintage', name: 'Vintage', count: mockProducts.filter(p => p.category === 'vintage').length },
];

export const priceRanges = [
  { id: 'all', name: 'Todos os preços', min: 0, max: Infinity },
  { id: 'budget', name: 'Até R$ 200', min: 0, max: 200 },
  { id: 'mid', name: 'R$ 200 - R$ 350', min: 200, max: 350 },
  { id: 'premium', name: 'R$ 350 - R$ 500', min: 350, max: 500 },
  { id: 'luxury', name: 'Acima de R$ 500', min: 500, max: Infinity },
];

export const availableColors = [
  'Preto',
  'Marrom', 
  'Bege',
  'Branco',
  'Vermelho',
  'Azul'
];