import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: string;
  trending?: boolean;
}

interface NewsHeadlinesProps {
  className?: string;
}

export function NewsHeadlines({ className }: NewsHeadlinesProps) {
  // Mock news data - in a real app, this would come from an API
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Federal Reserve Signals Potential Rate Cut in Q4',
      summary: 'Markets rally as Fed chair hints at monetary policy shift amid cooling inflation data.',
      source: 'Financial Times',
      timestamp: '2 hours ago',
      category: 'Monetary Policy',
      trending: true,
    },
    {
      id: '2',
      title: 'Tech Giants Report Strong Q3 Earnings',
      summary: 'Apple, Microsoft, and Google exceed analyst expectations, driving NASDAQ to new highs.',
      source: 'Bloomberg',
      timestamp: '4 hours ago',
      category: 'Earnings',
      trending: true,
    },
    {
      id: '3',
      title: 'Oil Prices Surge on Supply Chain Concerns',
      summary: 'Brent crude rises 3.2% as geopolitical tensions affect major shipping routes.',
      source: 'Reuters',
      timestamp: '6 hours ago',
      category: 'Commodities',
    },
    {
      id: '4',
      title: 'Cryptocurrency Market Shows Signs of Recovery',
      summary: 'Bitcoin crosses $45,000 mark as institutional adoption continues to grow.',
      source: 'CoinDesk',
      timestamp: '8 hours ago',
      category: 'Crypto',
    },
    {
      id: '5',
      title: 'European Markets Open Higher on ECB Decision',
      summary: 'FTSE 100 and DAX gain ground following European Central Bank policy announcement.',
      source: 'MarketWatch',
      timestamp: '10 hours ago',
      category: 'International',
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Latest Market News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="group p-4 rounded-lg border border-border/50 hover:border-border transition-all duration-200 hover:shadow-sm cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                    >
                      {item.category}
                    </Badge>
                    {item.trending && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                      >
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {item.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">{item.source}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-sm text-primary hover:underline font-medium">
            View All News →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}