import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, PieChart, BarChart3, Wallet, LineChart, Globe, 
  DollarSign, Settings, Home, ArrowRight
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NewsHeadlines } from '@/components/news/NewsHeadlines';
import { StockPreferencesForm } from '@/components/forms/StockPreferencesForm';

interface NavTile {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

export function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const navTiles: NavTile[] = [
    {
      title: 'Stocks',
      description: 'View and analyze individual stock performance, charts, and market data',
      icon: BarChart,
      href: '/stocks',
      color: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-200',
    },
    {
      title: 'Markets',
      description: 'Explore market indices, sector performance, and overall market trends',
      icon: BarChart3,
      href: '/markets',
      color: 'bg-green-500/10 hover:bg-green-500/20 border-green-200',
    },
    {
      title: 'Currencies',
      description: 'Track foreign exchange rates and currency pair movements',
      icon: DollarSign,
      href: '/currencies',
      color: 'bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-200',
    },
    {
      title: 'Global',
      description: 'Monitor international markets and global economic indicators',
      icon: Globe,
      href: '/global',
      color: 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-200',
    },
    {
      title: 'Portfolio',
      description: 'Manage your investment portfolio and track performance',
      icon: Wallet,
      href: '/portfolio',
      color: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-200',
    },
    {
      title: 'Performance',
      description: 'Analyze investment returns and performance metrics',
      icon: LineChart,
      href: '/performance',
      color: 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-200',
    },
    {
      title: 'Analysis',
      description: 'Access detailed market analysis and research tools',
      icon: PieChart,
      href: '/analysis',
      color: 'bg-red-500/10 hover:bg-red-500/20 border-red-200',
    },
    {
      title: 'Settings',
      description: 'Customize your dashboard preferences and account settings',
      icon: Settings,
      href: '/settings',
      color: 'bg-gray-500/10 hover:bg-gray-500/20 border-gray-200',
    }
  ];
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        
        <main className="flex-1 transition-all duration-300">
          <div className="container max-w-full p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Welcome to MarketPulse
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your comprehensive financial dashboard for tracking markets, managing portfolios, and making informed investment decisions.
              </p>
            </div>
            
            {/* Navigation Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {navTiles.map((tile, index) => (
                <Link 
                  key={tile.href} 
                  to={tile.href}
                  className="group transform transition-all duration-200 hover:scale-105"
                >
                  <Card className={`h-full cursor-pointer transition-all duration-200 ${tile.color} group-hover:shadow-lg`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-background/50">
                          <tile.icon className="h-6 w-6 text-primary" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200 group-hover:translate-x-1" />
                      </div>
                      <CardTitle className="text-lg font-semibold">
                        {tile.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {tile.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {/* Stock Preferences Form */}
            <div className="mb-12">
              <StockPreferencesForm />
            </div>
            
            {/* News Headlines Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className="lg:col-span-2">
                <NewsHeadlines />
              </div>
              
              {/* Market Summary */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg">Market Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">S&P 500</span>
                    <div className="text-right">
                      <div className="font-semibold">4,567.89</div>
                      <div className="text-xs text-green-600">+1.24%</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">NASDAQ</span>
                    <div className="text-right">
                      <div className="font-semibold">14,123.45</div>
                      <div className="text-xs text-green-600">+0.87%</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Dow Jones</span>
                    <div className="text-right">
                      <div className="font-semibold">34,890.12</div>
                      <div className="text-xs text-red-600">-0.23%</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Link 
                      to="/dashboard" 
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      View Full Dashboard →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    Real-time Data
                  </CardTitle>
                  <CardDescription>
                    Live market updates and price movements
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-300">
                    Portfolio Tracking
                  </CardTitle>
                  <CardDescription>
                    Monitor your investments and performance
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    Market Analysis
                  </CardTitle>
                  <CardDescription>
                    Advanced tools and insights for better decisions
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}