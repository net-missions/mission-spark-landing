# Supabase Setup for Net Missions Fellowship Donation System

## Quick Setup

1. **Create Environment File**
   ```bash
   touch .env.local
   ```

2. **Add Supabase Configuration**
   Add these lines to your `.env.local` file:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   
   # PayMongo Configuration (for GCash and PayMaya payments)
   VITE_PAYMONGO_PUBLIC_KEY=pk_test_your_paymongo_public_key_here
   VITE_PAYMONGO_SECRET_KEY=sk_test_your_paymongo_secret_key_here
   ```

3. **Get Your Credentials**
   
   **Supabase:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project or use existing "Net Missions Fellowship" project
   - Go to Settings → API
   - Copy the "Project URL" and "anon/public" key
   
   **PayMongo (for Philippine payment methods):**
   - Go to [PayMongo Dashboard](https://dashboard.paymongo.com/)
   - Create an account and verify your business
   - Go to Developers → API Keys
   - Copy the "Public Key" and "Secret Key"
   - Use test keys (pk_test_... and sk_test_...) for development

## Database Schema

Run this SQL in your Supabase SQL Editor to create the donations table:

```sql
-- Create donations table
CREATE TABLE donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  donation_type TEXT NOT NULL CHECK (donation_type IN ('one-time', 'monthly')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  payment_method VARCHAR(20) DEFAULT 'credit_card' CHECK (payment_method IN ('credit_card', 'gcash', 'paymaya', 'bank_transfer')),
  payment_intent_id VARCHAR(255),
  payment_gateway VARCHAR(50) DEFAULT 'stripe',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting donations (public can submit)
CREATE POLICY "Anyone can insert donations" ON donations
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading donations (for admin purposes)
CREATE POLICY "Admin can view donations" ON donations
  FOR SELECT USING (false); -- Update this based on your admin authentication

-- Create indexes for better performance
CREATE INDEX idx_donations_email ON donations(email);
CREATE INDEX idx_donations_created_at ON donations(created_at);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_payment_method ON donations(payment_method);
CREATE INDEX idx_donations_payment_intent ON donations(payment_intent_id) WHERE payment_intent_id IS NOT NULL;
```

## Payment Methods

The donation system supports multiple payment methods:

1. **Credit/Debit Cards**: Traditional card payments (requires additional payment processor integration)
2. **GCash**: Philippine mobile wallet via PayMongo
3. **PayMaya**: Philippine mobile wallet via PayMongo

### PayMongo Integration

For GCash and PayMaya payments, the system uses PayMongo's API:

- **GCash**: Users are redirected to GCash's payment page
- **PayMaya**: Users are redirected to PayMaya's payment page
- **Success/Failure**: Users are redirected back to your site with payment status

The system automatically tracks:
- Payment method used
- Payment intent ID from PayMongo
- Payment gateway information
- Transaction status

## Testing

After setup, restart your development server:
```bash
npm run dev
```

The donation form should now save submissions to your Supabase database and support Philippine payment methods.

## Troubleshooting

- **"Invalid URL" error**: Make sure your `VITE_SUPABASE_URL` starts with `https://`
- **"Failed to construct URL"**: Check that environment variables are properly set
- **Database errors**: Ensure the donations table is created with the correct schema
- **Environment not loading**: Make sure the file is named `.env.local` (not `.env`)
