
import React from 'react';
import { Search, Bell, User, Settings, UserCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { signOut } = useAuth();
  return (
    <header className={cn("bg-background/95 backdrop-blur-sm sticky top-0 z-30 border-b", className)}>
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2 lg:gap-4">
          <h1 className="text-lg font-semibold tracking-tight lg:text-xl">MarketPulse</h1>
          
          <div className="relative hidden md:flex items-center h-9 rounded-md px-3 text-muted-foreground focus-within:text-foreground bg-muted/50">
            <Search className="h-4 w-4 mr-2" />
            <Input 
              type="search" 
              placeholder="Search stocks, indices..." 
              className="h-9 w-[200px] lg:w-[280px] bg-transparent border-none px-0 py-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-9 w-9"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-background border shadow-lg z-50">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Notifications</h4>
                <div className="p-3 rounded-md bg-muted/50 border-l-4 border-primary">
                  <p className="text-sm text-foreground">
                    There are market updates that need your attention
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 transition-transform duration-200 hover:scale-105 cursor-pointer">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-50">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/profile" className="flex items-center w-full">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile Views
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/settings" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
