import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { mockStocks, Stock, formatCurrency } from '@/utils/stocksApi';
import { StockCard } from '@/components/stocks/StockCard';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  stockType: z.string().min(1, { message: "Please select a stock type" }),
  minPrice: z.number().min(0, { message: "Minimum price must be positive" }),
  maxPrice: z.number().min(0, { message: "Maximum price must be positive" }),
  purchaseDate: z.date({
    required_error: "Please select a purchase date",
  }),
}).refine((data) => data.maxPrice > data.minPrice, {
  message: "Maximum price must be greater than minimum price",
  path: ["maxPrice"],
});

type FormData = z.infer<typeof formSchema>;

interface StockPreferencesFormProps {
  className?: string;
}

const stockTypes = [
  { value: 'technology', label: 'Technology', symbols: ['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA'] },
  { value: 'automotive', label: 'Automotive', symbols: ['TSLA'] },
  { value: 'ecommerce', label: 'E-commerce', symbols: ['AMZN'] },
  { value: 'financial', label: 'Financial Services', symbols: ['V'] },
  { value: 'all', label: 'All Sectors', symbols: mockStocks.map(s => s.symbol) }
];

export function StockPreferencesForm({ className }: StockPreferencesFormProps) {
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stockType: '',
      minPrice: 0,
      maxPrice: 1000,
    },
  });

  const onSubmit = (data: FormData) => {
    // Find the selected stock type
    const selectedType = stockTypes.find(type => type.value === data.stockType);
    
    if (!selectedType) return;

    // Filter stocks based on criteria
    const filtered = mockStocks.filter(stock => {
      const inPriceRange = stock.price >= data.minPrice && stock.price <= data.maxPrice;
      const inSelectedType = selectedType.symbols.includes(stock.symbol);
      
      return inPriceRange && inSelectedType;
    });

    setFilteredStocks(filtered);
    setShowResults(true);
  };

  const clearResults = () => {
    setShowResults(false);
    setFilteredStocks([]);
    form.reset();
  };

  const handlePurchase = (stock: Stock) => {
    toast({
      title: "Purchase Initiated",
      description: `Added ${stock.symbol} (${stock.name}) at ${formatCurrency(stock.price)} to your cart.`,
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="inline-flex w-fit items-center gap-2">
            <Filter className="h-5 w-5" />
            Find Your Perfect Stocks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="stockType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select stock type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stockTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Purchase Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="1000.00"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Find Matching Stocks
                </Button>
                {showResults && (
                  <Button type="button" variant="outline" onClick={clearResults}>
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>
              Stocks Matching Your Criteria ({filteredStocks.length} found)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStocks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStocks.map((stock) => (
                  <div key={stock.symbol} className="space-y-2">
                    <StockCard
                      stock={stock}
                      onClick={() => navigate(`/stocks/${stock.symbol}`)}
                      className="hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer"
                    />
                    <Button 
                      onClick={() => handlePurchase(stock)}
                      className="w-full"
                      size="sm"
                    >
                      Purchase for {formatCurrency(stock.price)}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  No stocks found matching your criteria.
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your price range or selecting a different stock type.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}