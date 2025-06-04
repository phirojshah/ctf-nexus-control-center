
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Trophy, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">CyberCTF</h1>
          </div>
          <div className="space-x-4">
            <Button asChild variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-fade-in">
            Elite CTF Platform
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in">
            Join the ultimate cybersecurity challenge platform. Test your skills, learn new techniques, 
            and compete with the best hackers worldwide.
          </p>
          <div className="space-x-4 animate-fade-in">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-lg px-8 py-3">
              <Link to="/register">Start Hacking</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 text-lg px-8 py-3">
              <Link to="/leaderboard">View Leaderboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Shield className="h-12 w-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Secure Platform</CardTitle>
              <CardDescription className="text-slate-300">
                Enterprise-grade security with admin approval workflow
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Users className="h-12 w-12 text-purple-400 mb-4" />
              <CardTitle className="text-white">Community Driven</CardTitle>
              <CardDescription className="text-slate-300">
                Join thousands of ethical hackers and cybersecurity enthusiasts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Trophy className="h-12 w-12 text-yellow-400 mb-4" />
              <CardTitle className="text-white">Competitive Scoring</CardTitle>
              <CardDescription className="text-slate-300">
                Real-time leaderboards and achievement tracking
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Lock className="h-12 w-12 text-red-400 mb-4" />
              <CardTitle className="text-white">Diverse Challenges</CardTitle>
              <CardDescription className="text-slate-300">
                Web, Crypto, Reverse Engineering, and more categories
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Platform Workflow</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            { step: "1", title: "Register & Verify Email", desc: "Create account and verify your email address" },
            { step: "2", title: "Admin Approval", desc: "Wait for admin review and approval of your account" },
            { step: "3", title: "Access Granted", desc: "Get full access to challenges and platform features" },
            { step: "4", title: "Solve Challenges", desc: "Tackle diverse cybersecurity challenges and earn points" },
            { step: "5", title: "Climb Leaderboard", desc: "Compete with others and showcase your skills" }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-6 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {item.step}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-700/50 py-8">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2024 CyberCTF Platform. Hack responsibly.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
