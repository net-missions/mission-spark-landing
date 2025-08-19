-- Create donations table
CREATE TABLE donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  donation_type TEXT NOT NULL CHECK (donation_type IN ('one-time', 'monthly')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for lookups
CREATE INDEX idx_donations_email ON donations(email);

-- Create index on created_at for chronological queries
CREATE INDEX idx_donations_created_at ON donations(created_at);

-- Create index on status for filtering
CREATE INDEX idx_donations_status ON donations(status);

-- Enable Row Level Security
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting donations (anyone can create)
CREATE POLICY "Anyone can insert donations" ON donations
  FOR INSERT WITH CHECK (true);

-- Create policy for viewing donations (only authenticated users can view)
CREATE POLICY "Authenticated users can view donations" ON donations
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();