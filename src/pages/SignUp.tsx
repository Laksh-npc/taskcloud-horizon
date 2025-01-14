import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface UserData {
  name: string;
  email: string;
  location: string;
  username: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    location: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address",
      });
      return;
    }

    if (Object.values(formData).some(value => !value)) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all fields",
      });
      return;
    }

    // Store in localStorage
    localStorage.setItem("userData", JSON.stringify(formData));
    
    toast({
      title: "Success!",
      description: "Your account has been created. Please log in.",
    });

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-md mx-auto glass-card p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="New York, US"
              value={formData.location}
              onChange={handleChange}
              className="bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="johndoe123"
              value={formData.username}
              onChange={handleChange}
              className="bg-secondary"
            />
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}