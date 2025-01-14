import { Navbar } from "@/components/Navbar";
import { Weather } from "@/components/Weather";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  Layout,
  Smartphone,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Stay Organized",
    description: "Keep track of all your tasks in one place",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Save Time",
    description: "Efficiently manage your daily schedule",
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Customizable Views",
    description: "Organize tasks your way with flexible layouts",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Ready",
    description: "Access your tasks from any device",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight animate-fadeIn">
              Organize Your Day with Ease
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-fadeIn">
              Stay productive and focused with our intuitive task management
              platform. Plan your day ahead with real-time weather updates.
            </p>
            <div className="mt-8 flex justify-center gap-4 animate-fadeIn">
              <Button asChild size="lg">
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="mt-16 max-w-md mx-auto">
            <Weather />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;