import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && 
    supabaseUrl.startsWith('https://') && 
    supabaseAnonKey.length > 0);
};

// Only create client if both URL and key are provided and valid
export const supabase = (() => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
    return null;
  }
  
  try {
    return createClient(supabaseUrl!, supabaseAnonKey!);
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    return null;
  }
})();

export type Donation = {
  id?: string;
  amount: number;
  donation_type: 'one-time' | 'monthly';
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  message?: string;
  created_at?: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method?: 'credit_card' | 'gcash' | 'paymaya' | 'bank_transfer';
  payment_intent_id?: string;
  payment_gateway?: string;
};