"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Swords, LayoutDashboard, BookText, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button';

const navItems = [
    { href: '/quest', label: 'Квест', icon: Swords },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/diary', label: 'Дневник', icon: BookText },
];

export function Header() {
    const pathname = usePathname();
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);

    return (
        <header className="bg-card border-b sticky top-0 z-40">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <Swords className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold tracking-tighter">MoneyQuest</span>
                </Link>
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
                
                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Открыть меню</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                             <Link href="/" className="flex items-center gap-2 mb-8">
                                <Swords className="h-6 w-6 text-primary" />
                                <span className="text-lg font-bold tracking-tighter">MoneyQuest</span>
                            </Link>
                            <nav className="flex flex-col gap-4">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsSheetOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg p-3 text-base font-medium transition-colors",
                                                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    )
                                })}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
