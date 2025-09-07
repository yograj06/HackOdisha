import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// ✅ Schema for form validation
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

// ✅ Allowed users (hidden from frontend, only checked in code)
const ALLOWED_USERS = [
  { email: 'arman98@gmail.com', password: 'arman123' },
  { email: 'joelpur18@gmail.com', password: 'joel123' },
  { email: 'rajveerpandit23@gmail.com', password: 'rajveer31' },
] as const;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Custom submit handler with fixed credentials
  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const email = data.email.trim().toLowerCase();
      const password = data.password;

      const match = ALLOWED_USERS.find(
        (u) => u.email.toLowerCase() === email && u.password === password
      );

      if (!match) {
        toast({
          title: 'Invalid credentials',
          description: 'Please use one of the approved Gmail addresses and passwords.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      login(email);
      toast({
        title: 'Welcome to ElderCare+',
        description: 'You have successfully signed in.',
      });

      navigate(from, { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-2">ElderCare+</h1>
          <p className="text-muted-foreground">Your Complete Senior Care Companion</p>
        </div>

        <Card className="p-8 card-bg border-border/50 hover-glow">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground">Welcome Back</h2>
              <p className="text-muted-foreground mt-2">Sign in to access your health dashboard</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="focus-ring"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className="focus-ring"
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full transition-smooth hover:bg-primary-hover"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
  
export default Login;