import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowUpIcon, ArrowDownIcon, TrendingUp, TrendingDown, Volume, DollarSign } from 'lucide-react';
import { mockStocks, mockNews, generatePriceHistory, formatCurrency, formatPercentage, formatNumber, formatDate } from '@/utils/stocksApi';
import { StockChart } from '@/components/stocks/StockChart';
import { NewsCard } from '@/components/news/NewsCard';
import { cn } from '@/lib/utils';

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  
  const stock = mockStocks.find(s => s.symbol === symbol);
  
  if (!stock) {
    return (
      <PageLayout title="Stock Not Found">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Stock not found</h2>
          <p className="text-muted-foreground mb-6">The stock symbol "{symbol}" could not be found.</p>
          <Button onClick={() => navigate('/stocks')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stocks
          </Button>
        </div>
      </PageLayout>
    );
  }

  const isPositive = stock.change >= 0;
  const priceHistory = generatePriceHistory(30, stock.price, 2.5);
  
  // Filter news related to this stock
  const relatedNews = mockNews.filter(news => 
    news.relatedSymbols?.includes(stock.symbol) || 
    news.title.toLowerCase().includes(stock.name.toLowerCase()) ||
    news.title.toLowerCase().includes(stock.symbol.toLowerCase())
  );

  // Generate mock projections
  const projections = [
    { period: '1 Week', target: stock.price * (1 + (Math.random() - 0.5) * 0.05), confidence: 'Medium' },
    { period: '1 Month', target: stock.price * (1 + (Math.random() - 0.5) * 0.15), confidence: 'High' },
    { period: '3 Months', target: stock.price * (1 + (Math.random() - 0.5) * 0.25), confidence: 'Medium' },
    { period: '1 Year', target: stock.price * (1 + (Math.random() - 0.5) * 0.4), confidence: 'Low' }
  ];

  return (
    <PageLayout title={`${stock.symbol} - ${stock.name}`}>
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/stocks')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stocks
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{stock.symbol}</h1>
            <p className="text-lg text-muted-foreground">{stock.name}</p>
          </div>
        </div>

        {/* Price and Change Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <div className="text-4xl font-bold mb-2">{formatCurrency(stock.price)}</div>
                <div className={cn(
                  "flex items-center text-lg font-medium",
                  isPositive ? "text-success" : "text-danger"
                )}>
                  {isPositive ? 
                    <ArrowUpIcon className="h-5 w-5 mr-2" /> : 
                    <ArrowDownIcon className="h-5 w-5 mr-2" />
                  }
                  {formatCurrency(Math.abs(stock.change))} ({formatPercentage(stock.changePercent)})
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Last updated: {formatDate(stock.lastUpdated)}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Volume className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Volume</p>
                    <p className="font-semibold">{formatNumber(stock.volume)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Market Cap</p>
                    <p className="font-semibold">{formatNumber(stock.marketCap)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">52W Range</p>
                  <p className="font-semibold">
                    {formatCurrency(stock.price * 0.8)} - {formatCurrency(stock.price * 1.2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">P/E Ratio</p>
                  <p className="font-semibold">{(Math.random() * 30 + 10).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Price Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <StockChart 
              symbol={stock.symbol}
              name={stock.name}
              currentPrice={stock.price}
              volatility={2.5}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Analyst Projections */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analyst Projections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projections.map((projection, index) => {
                  const projectionChange = ((projection.target - stock.price) / stock.price) * 100;
                  const isProjectionPositive = projectionChange >= 0;
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{projection.period}</p>
                        <p className="text-sm text-muted-foreground">
                          Confidence: {projection.confidence}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(projection.target)}</p>
                        <p className={cn(
                          "text-sm flex items-center",
                          isProjectionPositive ? "text-success" : "text-danger"
                        )}>
                          {isProjectionPositive ? 
                            <TrendingUp className="h-3 w-3 mr-1" /> : 
                            <TrendingDown className="h-3 w-3 mr-1" />
                          }
                          {formatPercentage(projectionChange)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-accent/20 border">
                <p className="text-xs text-muted-foreground">
                  <strong>Disclaimer:</strong> These projections are for demonstration purposes only and should not be considered as investment advice.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Previous Close</p>
                    <p className="font-semibold">{formatCurrency(stock.price - stock.change)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Day Range</p>
                    <p className="font-semibold">
                      {formatCurrency(stock.price * 0.98)} - {formatCurrency(stock.price * 1.02)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Volume</p>
                    <p className="font-semibold">{formatNumber(stock.volume * 0.9)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Beta</p>
                    <p className="font-semibold">{(Math.random() * 1.5 + 0.5).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">EPS</p>
                    <p className="font-semibold">${(Math.random() * 20 + 1).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dividend Yield</p>
                    <p className="font-semibold">{(Math.random() * 3).toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Related News</CardTitle>
            </CardHeader>
            <CardContent>
              <NewsCard news={relatedNews} />
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default StockDetail;