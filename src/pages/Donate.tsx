import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Heart, Shield, CheckCircle, ArrowLeft, Smartphone, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured, type Donation } from '@/lib/supabase';
import { paymongoAPI } from '@/lib/paymongo';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'gcash' | 'paymaya'>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Progress calculation
  const goalAmount = 18000000; // ₱18 Million
  const raisedAmount = 0; // Starting from ₱0
  const progressPercentage = Math.round((raisedAmount / goalAmount) * 100);
  const remainingAmount = goalAmount - raisedAmount;

  const predefinedAmounts = [1000, 2500, 5000, 10000, 25000, 50000]; // Philippine Peso amounts

  const getCurrentAmount = () => {
    return customAmount ? parseInt(customAmount) : selectedAmount || 0;
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    
    try {
      // Validate form data
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
        setError('Please fill in all required fields.');
        return;
      }

      if (getCurrentAmount() <= 0) {
        setError('Please select a valid donation amount.');
        return;
      }

      const amount = getCurrentAmount();
      const amountInCentavos = amount * 100; // Convert to centavos for PayMongo
      
      const billing = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone?.trim() || undefined,
      };

      let paymentIntentId = '';
      let gateway = '';

      // Handle different payment methods
      if (paymentMethod === 'gcash' || paymentMethod === 'paymaya') {
        // Check if PayMongo is configured
        if (!paymongoAPI.isConfigured()) {
          setError('Payment system is not yet configured. Please contact the administrator.');
          return;
        }

        const redirectUrls = {
          success: `${window.location.origin}/donate?status=success`,
          failed: `${window.location.origin}/donate?status=failed`,
        };

        const description = `${donationType === 'monthly' ? 'Monthly' : 'One-time'} donation to Net Missions Fellowship Building Fund`;

        if (paymentMethod === 'gcash') {
          const source = await paymongoAPI.createGCashPayment(
            amountInCentavos,
            description,
            billing,
            redirectUrls
          );
          paymentIntentId = source.id;
          gateway = 'paymongo_gcash';
          
          // Redirect to GCash payment page
          window.location.href = source.redirect.checkout_url;
          return; // Exit early as we're redirecting
        } else if (paymentMethod === 'paymaya') {
          const source = await paymongoAPI.createPayMayaPayment(
            amountInCentavos,
            description,
            billing,
            redirectUrls
          );
          paymentIntentId = source.id;
          gateway = 'paymongo_paymaya';
          
          // Redirect to PayMaya payment page
          window.location.href = source.redirect.checkout_url;
          return; // Exit early as we're redirecting
        }
      } else {
        // Credit card payment (traditional flow - could be integrated with PayMongo cards later)
        gateway = 'manual'; // For now, just record the intention
      }

      // Save donation record to Supabase
      if (isSupabaseConfigured() && supabase) {
        const donation: Omit<Donation, 'id' | 'created_at'> = {
          amount: getCurrentAmount(),
          donation_type: donationType as 'one-time' | 'monthly',
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone?.trim() || null,
          message: formData.message?.trim() || null,
          status: paymentMethod === 'credit_card' ? 'pending' : 'pending',
          payment_method: paymentMethod,
          payment_intent_id: paymentIntentId || null,
          payment_gateway: gateway
        };

        const { data, error: supabaseError } = await supabase
          .from('donations')
          .insert([donation])
          .select()
          .single();

        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
          if (supabaseError.code === '42P01') {
            throw new Error('Database table not found. Please run the setup SQL commands from SUPABASE_SETUP.md');
          } else if (supabaseError.code === '23505') {
            throw new Error('A donation with this information already exists.');
          } else {
            throw new Error(`Database error: ${supabaseError.message}`);
          }
        }
      }

      // For credit card payments, show success message (in real implementation, integrate with Stripe or similar)
      if (paymentMethod === 'credit_card') {
        setSuccess(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        setSelectedAmount(5000);
        setCustomAmount('');
      }
      
    } catch (err) {
      console.error('Donation submission error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred while processing your donation');
    } finally {
      setIsProcessing(false);
    }
  };

  const getImpactMessage = (amount: number) => {
    if (amount >= 50000) return "Funds an entire classroom setup with furniture and A/V equipment";
    if (amount >= 25000) return "Covers the cost of 10 sanctuary seats with premium cushioning";
    if (amount >= 10000) return "Provides professional lighting for the main sanctuary";
    if (amount >= 5000) return "Funds accessibility features like handrails and ramps";
    if (amount >= 2500) return "Covers flooring materials for a classroom";
    if (amount >= 1000) return "Provides paint and supplies for interior walls";
    return "Every peso brings us closer to our new church home";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Secure Donation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Progress Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Support Our Building Fund
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Help us build our new sanctuary where our community can worship and grow together.
            </p>
            
            {/* Progress Bar */}
            <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-primary">{progressPercentage}% Complete</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              
                              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">₱{raisedAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Raised</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-400">₱{remainingAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">₱{goalAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Goal</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Make Your Donation</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Amount Selection */}
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Select Amount</Label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {predefinedAmounts.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => handleAmountSelect(amount)}
                            className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                              selectedAmount === amount && !customAmount
                                ? 'border-primary bg-primary text-white shadow-lg'
                                : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                            }`}
                          >
                            ₱{amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      
                      <div>
                        <Label htmlFor="custom-amount" className="text-sm text-gray-600 mb-2 block">
                          Or enter custom amount
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
                          <Input
                            id="custom-amount"
                            type="number"
                            placeholder="0"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            className="pl-8 h-12 text-lg"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Impact Message */}
                    {getCurrentAmount() > 0 && (
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-primary mb-1">Your Impact</div>
                            <div className="text-sm text-gray-700">
                              ₱{getCurrentAmount().toLocaleString()}: {getImpactMessage(getCurrentAmount())}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Donation Type */}
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Donation Type</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setDonationType('one-time')}
                          className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                            donationType === 'one-time'
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          One-time Gift
                        </button>
                        <button
                          type="button"
                          onClick={() => setDonationType('monthly')}
                          className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                            donationType === 'monthly'
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          Monthly Pledge
                        </button>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Payment Method</Label>
                      <div className="grid grid-cols-1 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('credit_card')}
                          className={`p-4 rounded-xl border-2 transition-all font-semibold flex items-center space-x-3 ${
                            paymentMethod === 'credit_card'
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          <CreditCard className="h-5 w-5" />
                          <span>Credit/Debit Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('gcash')}
                          className={`p-4 rounded-xl border-2 transition-all font-semibold flex items-center space-x-3 ${
                            paymentMethod === 'gcash'
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          <Smartphone className="h-5 w-5" />
                          <span>GCash</span>
                          <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Philippines
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('paymaya')}
                          className={`p-4 rounded-xl border-2 transition-all font-semibold flex items-center space-x-3 ${
                            paymentMethod === 'paymaya'
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          <Wallet className="h-5 w-5" />
                          <span>PayMaya</span>
                          <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Philippines
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Personal Information</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            required 
                            className="mt-1"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            required 
                            className="mt-1"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          className="mt-1"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          className="mt-1"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Optional Message */}
                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Share why you're supporting our building fund..."
                        className="mt-1 min-h-[80px]"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="text-red-800 text-sm">{error}</div>
                      </div>
                    )}

                    {/* Success Message */}
                    {success && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div className="text-green-800 font-semibold">Donation submitted successfully!</div>
                        </div>
                        <div className="text-green-700 text-sm mt-1">
                          Thank you for your generous support. You will receive a confirmation email shortly.
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={getCurrentAmount() === 0 || isProcessing || success}
                        className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 rounded-xl"
                      >
                        {isProcessing ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing...</span>
                          </div>
                        ) : success ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5" />
                            <span>Donation Submitted</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            {paymentMethod === 'gcash' ? (
                              <>
                                <Smartphone className="h-5 w-5" />
                                <span>Pay with GCash ₱{getCurrentAmount().toLocaleString()} {donationType === 'monthly' ? '/month' : ''}</span>
                              </>
                            ) : paymentMethod === 'paymaya' ? (
                              <>
                                <Wallet className="h-5 w-5" />
                                <span>Pay with PayMaya ₱{getCurrentAmount().toLocaleString()} {donationType === 'monthly' ? '/month' : ''}</span>
                              </>
                            ) : (
                              <>
                                <CreditCard className="h-5 w-5" />
                                <span>Submit Donation ₱{getCurrentAmount().toLocaleString()} {donationType === 'monthly' ? '/month' : ''}</span>
                              </>
                            )}
                          </div>
                        )}
                      </Button>
                      
                      <div className="flex items-center justify-center space-x-2 mt-3 text-sm text-gray-500">
                        <Shield className="h-4 w-4" />
                        <span>Secure 256-bit SSL encryption</span>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Development Notice */}
              {!isSupabaseConfigured() && (
                <Card className="border-2 border-yellow-200 bg-yellow-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Development Mode</h3>
                    <p className="text-sm text-yellow-700 mb-3">
                      Supabase is not configured. Donations will not be saved.
                    </p>
                    <p className="text-xs text-yellow-600">
                      See <code className="bg-yellow-100 px-1 rounded">SUPABASE_SETUP.md</code> for setup instructions.
                    </p>
                  </CardContent>
                </Card>
              )}
              {/* Tax Information */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Tax Deductible</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Net Missions Fellowship is a 501(c)(3) nonprofit organization. 
                    Your donation is tax-deductible to the fullest extent allowed by law.
                  </p>
                  <p className="text-sm text-gray-600">
                    Tax ID: 12-3456789
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Questions?</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-medium text-gray-900">Building Fund Committee</div>
                      <div className="text-gray-600">building@netmissionsfellowship.org</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Phone</div>
                      <div className="text-gray-600">+1 (555) 123-4567</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Secure Payment</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We accept credit cards and popular Philippine e-wallets.
                  </p>
                  
                  {/* Credit Cards */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Credit/Debit Cards</p>
                    <div className="flex space-x-2">
                      <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                      <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                      <div className="w-10 h-6 bg-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>
                      <div className="w-10 h-6 bg-yellow-400 rounded text-gray-900 text-xs flex items-center justify-center font-bold">DISC</div>
                    </div>
                  </div>
                  
                  {/* E-Wallets */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Philippine E-Wallets</p>
                    <div className="flex space-x-2">
                      <div className="px-3 py-1 bg-blue-500 rounded text-white text-xs font-bold">GCash</div>
                      <div className="px-3 py-1 bg-green-500 rounded text-white text-xs font-bold">PayMaya</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
