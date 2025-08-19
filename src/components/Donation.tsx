import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Heart, Zap, Shield } from 'lucide-react';

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = React.useState(50);
  const [customAmount, setCustomAmount] = React.useState('');

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const impactExamples = [
    { amount: 25, impact: 'Provides clean water for a family for one month' },
    { amount: 50, impact: 'Feeds a family of five for two weeks' },
    { amount: 100, impact: 'Funds medical care for children in rural areas' },
    { amount: 250, impact: 'Sponsors a child\'s education for one semester' },
    { amount: 500, impact: 'Builds a well serving an entire village' },
  ];

  const getCurrentImpact = () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount;
    const closest = impactExamples.find(example => example.amount <= amount);
    return closest || impactExamples[0];
  };

  return (
    <section className="py-20 bg-gradient-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Make a Lasting Impact
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Every dollar goes directly to changing lives. Choose your gift amount and see the difference you'll make.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donation Form */}
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-foreground">
                  Your Donation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Amount Selection */}
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 block">Select Amount</Label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedAmount === amount && !customAmount
                            ? 'border-mission-red bg-mission-red text-white'
                            : 'border-gray-200 hover:border-mission-red'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Amount */}
                  <div>
                    <Label htmlFor="custom-amount" className="text-sm text-muted-foreground">
                      Or enter custom amount
                    </Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="$"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Impact Display */}
                <div className="bg-mission-red-muted p-4 rounded-lg mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="h-5 w-5 text-mission-red" />
                    <span className="font-semibold text-mission-red">Your Impact</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    ${customAmount || selectedAmount}: {getCurrentImpact().impact}
                  </p>
                </div>

                {/* Donation Type */}
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 block">Donation Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 rounded-lg border-2 border-mission-red bg-mission-red text-white">
                      One-time
                    </button>
                    <button className="p-3 rounded-lg border-2 border-gray-200 hover:border-mission-red">
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Donate Button */}
                <Button variant="donate" size="lg" className="w-full text-lg py-4">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Donate ${customAmount || selectedAmount}
                </Button>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure & encrypted donation processing</span>
                </div>
              </CardContent>
            </Card>

            {/* Impact Information */}
            <div className="space-y-6">
              <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Zap className="h-6 w-6 text-white" />
                    <h3 className="text-lg font-semibold">Immediate Impact</h3>
                  </div>
                  <p className="opacity-90">
                    Your donation is processed immediately and begins making an impact within 24 hours. 
                    100% of your gift goes directly to mission work.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Where Your Money Goes</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Direct Mission Work</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Program Administration</span>
                      <span className="font-semibold">10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fundraising</span>
                      <span className="font-semibold">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Tax Benefits</h3>
                  <p className="opacity-90">
                    Net Missions Fellowship is a 501(c)(3) nonprofit organization. 
                    Your donation is tax-deductible to the fullest extent allowed by law.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;