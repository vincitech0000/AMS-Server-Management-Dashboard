'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, Package, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const products = [
  { name: 'Citra 100mg', variants: [{ quantity: '180 pills', price: '150 USDT' }] },
  { name: 'Aspadol 100mg', variants: [{ quantity: '180 pills', price: '135 USDT' }] },
  { name: 'Mitidol 100mg', variants: [{ quantity: '90 pills', price: '150 USDT' }, { quantity: '180 pills', price: '175 USDT' }] },
  { name: 'Soma 350mg', variants: [{ quantity: '180 pills', price: '135 USDT' }] },
  { name: 'Zolpidem 100mg', variants: [{ quantity: '90 pills', price: '150 USDT' }, { quantity: '180 pills', price: '240 USDT' }] },
  { name: 'Belbien 100mg', variants: [{ quantity: '90 pills', price: '150 USDT' }, { quantity: '180 pills', price: '260 USDT' }] },
  { name: 'Kaslol 100mg', variants: [{ quantity: '90 pills', price: '175 USDT' }, { quantity: '180 pills', price: '225 USDT' }] },
  { name: 'Xanx 1mg', variants: [{ quantity: '90 pills', price: '140 USDT' }, { quantity: '180 pills', price: '190 USDT' }] },
  { name: 'Ativan', variants: [{ quantity: '90 pills', price: '150 USDT' }, { quantity: '180 pills', price: '210 USDT' }] },
  { name: 'Clono', variants: [{ quantity: '90 pills', price: '150 USDT' }, { quantity: '180 pills', price: '210 USDT' }] },
  { name: 'Valium', variants: [{ quantity: '90 pills', price: '150 USDT' }, { quantity: '180 pills', price: '210 USDT' }] },
  { name: 'Hydro/oxy/addrall', variants: [{ quantity: '90 pills', price: '110 USDT' }, { quantity: '180 pills', price: '175 USDT' }] },
  { name: 'Fiorocet', variants: [{ quantity: '180 pills', price: '225 USDT' }] },
];

export function PharmaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrder = (productName: string, quantity: string, price: string) => {
    const message = encodeURIComponent(`Pharma Order Request:\nProduct: ${productName}\nQuantity: ${quantity}\nPrice: ${price}\nI'm interested in placing an order.`);
    window.open(`https://wa.me/17633272191?text=${message}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-black font-headline tracking-tight text-primary">Pharma Medication</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Premium Supply Portal</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Discreet Packaging
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <Truck className="w-4 h-4 text-blue-500" />
                USA to USA Shipping
             </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <section className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tighter">Reliable Pharmaceutical <br /><span className="text-primary">Global Distribution.</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-medium">
              Wholesale and retail medication supply with secure USDT payments. 
              Verified quality and guaranteed discreet domestic delivery via USA to USA Shipping.
            </p>
          </section>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search medication..." 
              className="pl-10 h-12 rounded-full border-black/10 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.name} className="border-black/5 hover:border-primary/20 transition-all duration-300 rounded-2xl overflow-hidden group flex flex-col bg-white">
                <CardHeader className="p-5 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest border-none">Verified</Badge>
                  </div>
                  <CardTitle className="text-lg font-black font-headline tracking-tight">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3 flex-grow">
                  <div className="space-y-2">
                    {product.variants.map((variant, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-black/5">
                        <span className="text-xs font-bold text-muted-foreground">{variant.quantity}</span>
                        <span className="text-sm font-black text-primary">{variant.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button 
                    className="w-full rounded-xl h-11 font-bold gap-2 bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-all"
                    onClick={() => handleOrder(product.name, product.variants[0].quantity, product.variants[0].price)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Separator className="bg-black/5" />

          <section className="bg-white rounded-3xl p-8 border border-black/5 shadow-xl shadow-primary/5">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2 text-center">
                  <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4"><ShieldCheck className="w-6 h-6" /></div>
                  <h4 className="font-bold">Quality Guaranteed</h4>
                  <p className="text-xs text-muted-foreground">All products sourced from verified manufacturers.</p>
                </div>
                <div className="space-y-2 text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4"><Truck className="w-6 h-6" /></div>
                  <h4 className="font-bold">USA to USA Shipping</h4>
                  <p className="text-xs text-muted-foreground">Fast domestic USA to USA delivery services.</p>
                </div>
                <div className="space-y-2 text-center">
                  <div className="mx-auto w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-4"><Package className="w-6 h-6" /></div>
                  <h4 className="font-bold">USDT Payments</h4>
                  <p className="text-xs text-muted-foreground">Secure, anonymous, and instant crypto transactions.</p>
                </div>
             </div>
          </section>
        </div>
      </main>

      <footer className="py-12 border-t border-black/5 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[9px] text-muted-foreground/40 font-black uppercase tracking-[0.5em]">
            &copy; {new Date().getFullYear()} AMS MED PORTAL. GLOBAL DISTRIBUTION.
          </p>
        </div>
      </footer>
    </div>
  );
}
