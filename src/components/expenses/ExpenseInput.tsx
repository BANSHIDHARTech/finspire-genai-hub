
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Receipt, Calendar, Tag, DollarSign } from 'lucide-react';

const ExpenseInput = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
    'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 'Others'
  ];

  const quickAmounts = [50, 100, 200, 500, 1000];

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus size={20} />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount" className="flex items-center gap-2">
                <DollarSign size={16} />
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
              <div className="flex gap-2 mt-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAmount(quickAmount)}
                    className="text-xs"
                  >
                    ₹{quickAmount}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="flex items-center gap-2">
                <Receipt size={16} />
                Description
              </Label>
              <Input
                id="description"
                placeholder="What did you spend on?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar size={16} />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 mb-3">
                <Tag size={16} />
                Category
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat)}
                    className="text-xs justify-start"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button className="w-full bg-finspire-500 hover:bg-finspire-600" size="lg">
                <Plus size={16} className="mr-2" />
                Add Expense
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseInput;
