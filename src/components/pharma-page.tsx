
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Package, 
  Search, 
  Trash2, 
  Plus, 
  Minus,
  ShoppingBag,
  MapPin,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  address: z.string().min(5, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
});

type ShippingValues = z.infer<typeof shippingSchema>;

interface ProductVariant {
  id: string;
  quantity: string;
  price: string;
  priceValue: number;
}

interface Product {
  name: string;
  variants: ProductVariant[];
}

interface CartItem {
  id: string;
  productName: string;
  variantQuantity: string;
  price: string;
  priceValue: number;
  count: number;
}

const products: Product[] = [
  { name: 'Citra 100mg', variants: [{ id: 'citra-180', quantity: '180 pills', price: '150 USDT', priceValue: 150 }] },
  { name: 'Aspadol 100mg', variants: [{ id: 'aspadol-180', quantity: '180 pills', price: '135 USDT', priceValue: 135 }] },
  { name: 'Mitidol 100mg', variants: [{ id: 'mitidol-90', quantity: '90 pills', price: '150 USDT', priceValue: 150 }, { id: 'mitidol-180', quantity: '180 pills', price: '175 USDT', priceValue: 175 }] },
  { name: 'Soma 350mg', variants: [{ id: 'soma-180', quantity: '180 pills', price: '135 USDT', priceValue: 135 }] },
  { name: 'Zolpidem 100mg', variants: [{ id: 'zolpidem-90', quantity: '90 pills', price: '150 USDT', priceValue: 150 }, { id: 'zolpidem-180', quantity: '180 pills', price: '240 USDT', priceValue: 240 }] },
  { name: 'Belbien 100mg', variants: [{ id: 'belbien-90', quantity: '90 pills', price: '150 USDT', priceValue: 150 }, { id: 'belbien-180', quantity: '180 pills', price: '260 USDT', priceValue: 260 }] },
  { name: 'Kaslol 100mg', variants: [{ id: 'kaslol-90', quantity: '90 pills', price: '175 USDT', priceValue: 175 }, { id: 'kaslol-180', quantity: '180 pills', price: '225 USDT', priceValue: 225 }] },
  { name: 'Xanx 1mg', variants: [{ id: 'xanx-90', quantity: '90 pills', price: '140 USDT', priceValue: 140 }, { id: 'xanx-180', quantity: '180 pills', price: '190 USDT', priceValue: 190 }] },
  { name: 'Ativan', variants: [{ id: 'ativan-90', quantity: '90 pills', price: '150 USDT', priceValue: 150 }, { id: 'ativan-180', quantity: '180 pills', price: '210 USDT', priceValue: 210 }] },
  { name: 'Clono', variants: [{ id: 'clono-90', quantity: '90 pills', price: '150 USDT', priceValue: 150 }, { id: 'clono-180', quantity: '180 pills', price: '210 USDT', priceValue: 210 }] },
  { name: 'Valium', variants: [{ id: 'valium-90', quantity: '90 pills', price: '150 USDT', priceValue: 150 }, { id: 'valium-180', quantity: '180 pills', price: '210 USDT', priceValue: 210 }] },
  { name: 'Hydro/oxy/addrall', variants: [{ id: 'hydro-90', quantity: '90 pills', price: '110 USDT', priceValue: 110 }, { id: 'hydro-180', quantity: '180 pills', price: '175 USDT', priceValue: 175 }] },
  { name: 'Fiorocet', variants: [{ id: 'fiorocet-180', quantity: '180 pills', price: '225 USDT', priceValue: 225 }] },
];

export function PharmaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isShippingDialogOpen, setShippingDialogOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ShippingValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.count, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.priceValue * item.count), 0), [cart]);

  const addToCart = (product: Product, variant: ProductVariant) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === variant.id);
      if (existing) {
        return prev.map(item => item.id === variant.id ? { ...item, count: item.count + 1 } : item);
      }
      return [...prev, {
        id: variant.id,
        productName: product.name,
        variantQuantity: variant.quantity,
        price: variant.price,
        priceValue: variant.priceValue,
        count: 1
      }];
    });
    toast({
      title: 'Added to Cart',
      description: `${product.name} (${variant.quantity}) added to your basket.`,
    });
  };

  const updateCartCount = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newCount = Math.max(1, item.count + delta);
        return { ...item, count: newCount };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast({
      title: 'Removed from Cart',
      description: 'The item has been removed from your basket.',
    });
  };

  const onShippingSubmit = (values: ShippingValues) => {
    const orderLines = cart.map(item => `• ${item.productName} [${item.variantQuantity}] x${item.count} - ${item.priceValue * item.count} USDT`);
    const shippingDetails = [
      `*Name:* ${values.fullName}`,
      `*Address:* ${values.address}${values.apartment ? `, ${values.apartment}` : ''}`,
      `*Location:* ${values.city}, ${values.state} ${values.zipCode}`,
      `*Region:* USA Domestic (USA to USA Shipping)`
    ];

    const message = encodeURIComponent(
      `🛒 *NEW PHARMA ORDER REQUEST*\n\n` +
      `*CUSTOMER SHIPPING DETAILS:*\n${shippingDetails.join('\n')}\n\n` +
      `*ORDER ITEMS:*\n${orderLines.join('\n')}\n\n` +
      `*TOTAL AMOUNT: ${cartTotal} USDT*\n\n` +
      `I have provided my shipping details above. Please provide the USDT wallet address for payment.`
    );
    window.open(`https://wa.me/17633272191?text=${message}`, '_blank');
    setShippingDialogOpen(false);
    setCartOpen(false);
    setCart([]);
    form.reset();
    toast({
      title: 'Order Request Sent',
      description: 'Redirecting to WhatsApp to finalize your payment.',
    });
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
              <h1 className="text-xl font-black font-headline tracking-tight text-primary uppercase">Pharma Medication</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">E-Commerce Supply Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-6 mr-4">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground tracking-tighter">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Verified Supply
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground tracking-tighter">
                  <Truck className="w-4 h-4 text-blue-500" />
                  USA to USA Shipping
               </div>
            </div>

            <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative rounded-full border-black/10 gap-2 h-10 px-4">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline font-bold text-xs uppercase tracking-widest">Basket</span>
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-2 border-white">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="flex items-center gap-2 font-black uppercase tracking-widest">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    Shopping Basket
                  </SheetTitle>
                </SheetHeader>
                
                <ScrollArea className="flex-grow">
                  <div className="p-6 space-y-6">
                    {cart.length === 0 ? (
                      <div className="text-center py-20 space-y-4">
                        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                          <ShoppingBag className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Basket is empty</p>
                        <Button variant="link" onClick={() => setCartOpen(false)}>Start Shopping</Button>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex gap-4 group">
                          <div className="flex-grow space-y-1">
                            <h4 className="font-black text-sm uppercase tracking-tight">{item.productName}</h4>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.variantQuantity}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center border rounded-lg bg-slate-50">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7 rounded-none"
                                  onClick={() => updateCartCount(item.id, -1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center text-xs font-bold">{item.count}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7 rounded-none"
                                  onClick={() => updateCartCount(item.id, 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-sm text-primary">{item.priceValue * item.count} USDT</p>
                            <p className="text-[9px] text-muted-foreground uppercase">{item.price}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>

                {cart.length > 0 && (
                  <SheetFooter className="p-6 border-t bg-slate-50/50 block space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subtotal</span>
                      <span className="text-2xl font-black text-primary tracking-tighter">{cartTotal} USDT</span>
                    </div>
                    <Button 
                      className="w-full h-12 rounded-xl font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                      onClick={() => setShippingDialogOpen(true)}
                    >
                      Checkout via WhatsApp
                    </Button>
                    <p className="text-[9px] text-center text-muted-foreground font-medium">Shipping details will be requested in the next step.</p>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <section className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tighter uppercase leading-tight">
              Premium Medical <br /><span className="text-primary">Supply Distribution.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-medium text-sm">
              Reliable pharmaceutical logistics across North America. USA to USA domestic node 
              guaranteed. Bulk and retail fulfillment via secure USDT payment.
            </p>
          </section>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-12 h-14 rounded-2xl border-black/10 shadow-sm bg-white font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.name} className="border-black/5 hover:border-primary/20 transition-all duration-300 rounded-2xl overflow-hidden group flex flex-col bg-white shadow-sm hover:shadow-xl">
                <CardHeader className="p-6 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-primary/5 text-primary text-[8px] font-black uppercase tracking-widest border-none px-2 py-1">Stock Verified</Badge>
                  </div>
                  <CardTitle className="text-lg font-black font-headline tracking-tight uppercase leading-tight">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4 flex-grow">
                  <div className="space-y-4">
                    {product.variants.map((variant) => (
                      <div key={variant.id} className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors group/item">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-wider">{variant.quantity}</span>
                          <span className="text-sm font-black text-primary tracking-tight">{variant.price}</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full h-10 rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 bg-white border border-black/5 text-black hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
                          onClick={() => addToCart(product, variant)}
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="bg-black/5" />

          <section className="bg-white rounded-[2rem] p-10 border border-black/5 shadow-2xl shadow-primary/5">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4 text-center">
                  <div className="mx-auto w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-2 rotate-3 hover:rotate-0 transition-transform"><ShieldCheck className="w-8 h-8" /></div>
                  <h4 className="font-black uppercase tracking-widest text-xs">Pharma Verified</h4>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase leading-relaxed">Certified grade products sourced directly from licensed manufacturing facilities.</p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2 -rotate-3 hover:rotate-0 transition-transform"><Truck className="w-8 h-8" /></div>
                  <h4 className="font-black uppercase tracking-widest text-xs">USA Domestic Node</h4>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase leading-relaxed">Local USA to USA fulfillment network ensuring discreet delivery within 48-72 hours.</p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="mx-auto w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-2 rotate-3 hover:rotate-0 transition-transform"><Package className="w-8 h-8" /></div>
                  <h4 className="font-black uppercase tracking-widest text-xs">USDT Checkout</h4>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase leading-relaxed">Encrypted cryptocurrency payment processing for maximum privacy and efficiency.</p>
                </div>
             </div>
          </section>
        </div>
      </main>

      <Dialog open={isShippingDialogOpen} onOpenChange={setShippingDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl overflow-hidden p-0 border-none bg-white">
          <DialogHeader className="p-8 pb-4 bg-slate-50 border-b">
            <DialogTitle className="flex items-center gap-3 font-black uppercase tracking-tight text-2xl">
              <MapPin className="w-6 h-6 text-primary" />
              Shipping Details
            </DialogTitle>
            <DialogDescription className="font-medium text-muted-foreground uppercase text-[10px] tracking-widest">
              Please provide your USA domestic shipping address.
            </DialogDescription>
          </DialogHeader>

          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onShippingSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="rounded-xl h-12 bg-slate-50 border-slate-200 font-bold" {...field} />
                      </FormControl>
                      <FormMessage className="text-[9px] font-bold uppercase" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" className="rounded-xl h-12 bg-slate-50 border-slate-200 font-bold" {...field} />
                        </FormControl>
                        <FormMessage className="text-[9px] font-bold uppercase" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apartment"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Apartment, suite, etc. (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Apt 4B" className="rounded-xl h-12 bg-slate-50 border-slate-200 font-bold" {...field} />
                        </FormControl>
                        <FormMessage className="text-[9px] font-bold uppercase" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" className="rounded-xl h-12 bg-slate-50 border-slate-200 font-bold" {...field} />
                        </FormControl>
                        <FormMessage className="text-[9px] font-bold uppercase" />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">State</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" className="rounded-xl h-12 bg-slate-50 border-slate-200 font-bold uppercase" {...field} />
                          </FormControl>
                          <FormMessage className="text-[9px] font-bold uppercase" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" className="rounded-xl h-12 bg-slate-50 border-slate-200 font-bold" {...field} />
                          </FormControl>
                          <FormMessage className="text-[9px] font-bold uppercase" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <DialogFooter className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                  >
                    Confirm & Send to WhatsApp
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="py-16 border-t border-black/5 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-[0.5em]">
            &copy; {new Date().getFullYear()} AMS MED COMMERCE. DOMESTIC DISTRIBUTION.
          </p>
        </div>
      </footer>
    </div>
  );
}
