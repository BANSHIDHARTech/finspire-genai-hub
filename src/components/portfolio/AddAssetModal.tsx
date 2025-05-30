
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, TrendingUp, Building, Coins, PieChart } from 'lucide-react';

const AddAssetModal = () => {
  const [selectedAsset, setSelectedAsset] = useState('stocks');

  const assetTypes = [
    { id: 'stocks', name: 'Stocks', icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
    { id: 'mutual-funds', name: 'Mutual Funds', icon: PieChart, color: 'bg-green-100 text-green-600' },
    { id: 'bonds', name: 'Bonds', icon: Building, color: 'bg-purple-100 text-purple-600' },
    { id: 'crypto', name: 'Crypto', icon: Coins, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus size={20} />
          Add New Investment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedAsset} onValueChange={setSelectedAsset}>
          <TabsList className="grid w-full grid-cols-4">
            {assetTypes.map((asset) => (
              <TabsTrigger key={asset.id} value={asset.id} className="flex items-center gap-2">
                <asset.icon size={16} />
                {asset.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {assetTypes.map((asset) => (
            <TabsContent key={asset.id} value={asset.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="symbol">Symbol/Name</Label>
                    <Input 
                      id="symbol" 
                      placeholder={`Enter ${asset.name.toLowerCase()} symbol`}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      placeholder="Enter quantity"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per unit</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="Enter price"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Purchase Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className={`p-6 rounded-lg ${asset.color.replace('text-', 'border-')} border-2 border-dashed`}>
                  <div className="text-center">
                    <asset.icon size={48} className="mx-auto mb-4 text-slate-400" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      Add {asset.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Track your {asset.name.toLowerCase()} investments and monitor performance
                    </p>
                    <Button className="w-full">
                      Add {asset.name}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AddAssetModal;
