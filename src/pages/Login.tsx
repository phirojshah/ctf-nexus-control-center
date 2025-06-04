
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(email, password);
    
    if (result.error) {
      setError(result.error);
      toast({
        title: "Login Failed",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-cyan-400" />
          </div>
          <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
          <CardDescription className="text-slate-300">
            Sign in to your CTF account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-500 bg-red-950/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300">
                Sign up
              </Link>
            </p>
            <Link to="/" className="text-slate-400 hover:text-slate-300 text-sm">
              ← Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
