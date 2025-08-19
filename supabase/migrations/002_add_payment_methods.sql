-- Add payment method tracking to donations table
-- Migration: 002_add_payment_methods.sql

-- Add payment method column
ALTER TABLE donations 
ADD COLUMN payment_method VARCHAR(20) DEFAULT 'credit_card' 
CHECK (payment_method IN ('credit_card', 'gcash', 'paymaya', 'bank_transfer'));

-- Add payment_intent_id for tracking external payment processor transactions
ALTER TABLE donations 
ADD COLUMN payment_intent_id VARCHAR(255);

-- Add payment gateway column to track which service processed the payment
ALTER TABLE donations 
ADD COLUMN payment_gateway VARCHAR(50) DEFAULT 'stripe';

-- Add index for faster queries on payment method
CREATE INDEX idx_donations_payment_method ON donations(payment_method);

-- Add index for payment intent tracking
CREATE INDEX idx_donations_payment_intent ON donations(payment_intent_id) WHERE payment_intent_id IS NOT NULL;

-- Update existing rows to have default payment method
UPDATE donations SET payment_method = 'credit_card' WHERE payment_method IS NULL;
