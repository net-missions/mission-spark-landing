import axios from 'axios';

export interface PayMongoSource {
  id: string;
  type: string;
  amount: number;
  currency: string;
  redirect: {
    checkout_url: string;
    success: string;
    failed: string;
  };
  billing?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface PayMongoPayment {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  source: {
    id: string;
    type: string;
  };
}

class PayMongoAPI {
  private baseURL = 'https://api.paymongo.com/v1';
  private secretKey: string;
  private publicKey: string;

  constructor() {
    this.secretKey = import.meta.env.VITE_PAYMONGO_SECRET_KEY || '';
    this.publicKey = import.meta.env.VITE_PAYMONGO_PUBLIC_KEY || '';
  }

  private getAuthHeaders() {
    return {
      'Authorization': `Basic ${btoa(this.secretKey + ':')}`,
      'Content-Type': 'application/json',
    };
  }

  public isConfigured(): boolean {
    return Boolean(this.secretKey && this.publicKey);
  }

  // Create GCash payment source
  async createGCashPayment(
    amount: number, // amount in centavos (e.g., 10000 = ₱100.00)
    description: string,
    billing: {
      name: string;
      email: string;
      phone?: string;
    },
    redirectUrls: {
      success: string;
      failed: string;
    }
  ): Promise<PayMongoSource> {
    try {
      const response = await axios.post(
        `${this.baseURL}/sources`,
        {
          data: {
            attributes: {
              amount,
              currency: 'PHP',
              type: 'gcash',
              redirect: {
                success: redirectUrls.success,
                failed: redirectUrls.failed,
              },
              billing,
              description,
            },
          },
        },
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('PayMongo GCash payment creation failed:', error);
      throw new Error(
        axios.isAxiosError(error) && error.response?.data?.errors?.[0]?.detail
          ? error.response.data.errors[0].detail
          : 'Failed to create GCash payment'
      );
    }
  }

  // Create PayMaya payment source
  async createPayMayaPayment(
    amount: number,
    description: string,
    billing: {
      name: string;
      email: string;
      phone?: string;
    },
    redirectUrls: {
      success: string;
      failed: string;
    }
  ): Promise<PayMongoSource> {
    try {
      const response = await axios.post(
        `${this.baseURL}/sources`,
        {
          data: {
            attributes: {
              amount,
              currency: 'PHP',
              type: 'paymaya',
              redirect: {
                success: redirectUrls.success,
                failed: redirectUrls.failed,
              },
              billing,
              description,
            },
          },
        },
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('PayMongo PayMaya payment creation failed:', error);
      throw new Error(
        axios.isAxiosError(error) && error.response?.data?.errors?.[0]?.detail
          ? error.response.data.errors[0].detail
          : 'Failed to create PayMaya payment'
      );
    }
  }

  // Create credit card payment intent
  async createCardPayment(
    amount: number,
    description: string,
    billing: {
      name: string;
      email: string;
      phone?: string;
    }
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseURL}/payment_intents`,
        {
          data: {
            attributes: {
              amount,
              currency: 'PHP',
              payment_method_allowed: ['card'],
              description,
              statement_descriptor: 'Net Missions Fellowship',
              metadata: {
                billing_name: billing.name,
                billing_email: billing.email,
                billing_phone: billing.phone || '',
              },
            },
          },
        },
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('PayMongo card payment creation failed:', error);
      throw new Error(
        axios.isAxiosError(error) && error.response?.data?.errors?.[0]?.detail
          ? error.response.data.errors[0].detail
          : 'Failed to create card payment'
      );
    }
  }

  // Retrieve payment status
  async getPaymentStatus(paymentId: string): Promise<PayMongoPayment> {
    try {
      const response = await axios.get(
        `${this.baseURL}/payments/${paymentId}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('PayMongo payment status retrieval failed:', error);
      throw new Error('Failed to retrieve payment status');
    }
  }

  // Retrieve source status (for GCash/PayMaya)
  async getSourceStatus(sourceId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseURL}/sources/${sourceId}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('PayMongo source status retrieval failed:', error);
      throw new Error('Failed to retrieve source status');
    }
  }
}

export const paymongoAPI = new PayMongoAPI();
export default paymongoAPI;
