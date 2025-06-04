
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    const result = await register(email, username, password);
    
    if (result.error) {
      setError(result.error);
      toast({
        title: "Registration Failed",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setSuccess(true);
      toast({
        title: "Registration Successful!",
        description: "Please check your email to verify your account.",
      });
    }
    
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <CardTitle className="text-2xl text-white">Check Your Email</CardTitle>
            <CardDescription className="text-slate-300">
              We've sent you a verification link
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Alert className="border-green-500 bg-green-950/50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-200">
                A verification email has been sent to <strong>{email}</strong>. 
                Please click the link in the email to verify your account.
              </AlertDescription>
            </Alert>
            <p className="text-slate-400 text-sm">
              After verification, an admin will review and approve your account.
            </p>
            <Button asChild className="w-full">
              <Link to="/login">Return to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-cyan-400" />
          </div>
          <CardTitle className="text-2xl text-white">Join CyberCTF</CardTitle>
          <CardDescription className="text-slate-300">
            Create your account to start hacking
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
              <Label htmlFor="username" className="text-white">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Choose a username"
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
                placeholder="Create a password"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
                Sign in
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

export default Register;
