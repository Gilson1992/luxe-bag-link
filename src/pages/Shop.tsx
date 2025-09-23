import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';
import { mockProducts, categories, priceRanges, availableColors } from '@/data/products';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (!selectedCategories.includes('all') && selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Filter by price range
    if (selectedPriceRange !== 'all') {
      const priceRange = priceRanges.find(range => range.id === selectedPriceRange);
      if (priceRange) {
        filtered = filtered.filter(product =>
          product.price >= priceRange.min && product.price <= priceRange.max
        );
      }
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.category === 'new' ? 1 : 0) - (a.category === 'new' ? 1 : 0));
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedColors, selectedPriceRange, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.filter(cat => cat !== 'all');
        if (prev.includes(categoryId)) {
          const updated = newCategories.filter(cat => cat !== categoryId);
          return updated.length === 0 ? ['all'] : updated;
        } else {
          return [...newCategories, categoryId];
        }
      });
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories(['all']);
    setSelectedColors([]);
    setSelectedPriceRange('all');
    setSortBy('featured');
  };

  const activeFiltersCount = 
    (selectedCategories.length > 1 || !selectedCategories.includes('all') ? 1 : 0) +
    (selectedColors.length > 0 ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0);

  const colorVariants = {
    'Preto': 'bg-black',
    'Marrom': 'bg-amber-800',
    'Bege': 'bg-amber-100 border border-gray-300',
    'Branco': 'bg-white border border-gray-300',
    'Vermelho': 'bg-red-600',
    'Azul': 'bg-blue-600',
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categorias</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label htmlFor={category.id} className="text-sm cursor-pointer flex-1">
                {category.name}
                <span className="text-muted-foreground ml-1">({category.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Faixa de Preço</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center space-x-2">
              <Checkbox
                id={range.id}
                checked={selectedPriceRange === range.id}
                onCheckedChange={() => setSelectedPriceRange(range.id)}
              />
              <Label htmlFor={range.id} className="text-sm cursor-pointer">
                {range.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold mb-3">Cores</h3>
        <div className="grid grid-cols-3 gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={cn(
                "flex items-center space-x-2 p-2 rounded border transition-colors",
                selectedColors.includes(color) 
                  ? "bg-primary/10 border-primary" 
                  : "hover:bg-muted"
              )}
            >
              <div
                className={cn(
                  "h-4 w-4 rounded-full",
                  colorVariants[color as keyof typeof colorVariants]
                )}
              />
              <span className="text-xs">{color}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Nossa Loja</h1>
          <p className="text-muted-foreground">
            Descubra nossa coleção completa de bolsas femininas
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="bg-card p-6 rounded-lg shadow-elegant sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold">Filtros</h2>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-primary"
                  >
                    Limpar ({activeFiltersCount})
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                  Buscar
                </Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Nome do produto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <FiltersContent />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      {/* Mobile Search */}
                      <div className="mb-6">
                        <Label htmlFor="mobile-search" className="text-sm font-medium mb-2 block">
                          Buscar
                        </Label>
                        <Input
                          id="mobile-search"
                          type="text"
                          placeholder="Nome do produto..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <FiltersContent />
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="outline"
                          onClick={clearAllFilters}
                          className="w-full mt-6"
                        >
                          Limpar Filtros
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="text-sm text-muted-foreground">
                  {filteredAndSortedProducts.length} produtos encontrados
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Em Destaque</SelectItem>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                    <SelectItem value="price-asc">Menor Preço</SelectItem>
                    <SelectItem value="price-desc">Maior Preço</SelectItem>
                    <SelectItem value="name-asc">A-Z</SelectItem>
                    <SelectItem value="name-desc">Z-A</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex items-center border rounded">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className={cn(
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              )}>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className={viewMode === 'list' ? "flex-row" : ""}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  Nenhum produto encontrado com os filtros selecionados.
                </div>
                <Button onClick={clearAllFilters}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
