import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email);

    if (user) {
      // In a real app, you would hash the password before comparing
      if (user.password === password) {
        if (rememberMe) {
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
        
        toast({
          title: "Success!",
          description: "You have successfully logged in.",
        });
        
        navigate("/tasks");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid password. Please try again.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No user found with this email.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-green-900 border-green-500">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Welcome Back!</CardTitle>
          <CardDescription className="text-green-300">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black border-green-500 text-white"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black border-green-500 text-white"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-green-500 data-[state=checked]:bg-green-500"
              />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              >
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}