
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Lock, Code, Shield, Flag, CheckCircle, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  solved: boolean;
  solves: number;
  flag?: string;
  attachments?: string[];
  author: string;
}

const Challenges = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [flagInput, setFlagInput] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const mockChallenges: Challenge[] = [
    {
      id: "1",
      title: "SQL Injection Basics",
      description: "Find the flag hidden in this vulnerable login form. The database contains secrets that shouldn't be accessible through normal means.",
      category: "Web",
      difficulty: "Easy",
      points: 100,
      solved: false,
      solves: 234,
      flag: "flag{sql_injection_is_dangerous}",
      author: "admin"
    },
    {
      id: "2",
      title: "Caesar's Secret",
      description: "A classic cipher used by Julius Caesar himself. Can you decode this ancient message? The shift might not be what you expect.",
      category: "Crypto",
      difficulty: "Easy",
      points: 75,
      solved: true,
      solves: 412,
      flag: "flag{caesar_cipher_decoded}",
      author: "cryptomaster"
    },
    {
      id: "3",
      title: "Hidden Service",
      description: "Sometimes the most valuable information is hidden in plain sight. This web application has more than meets the eye.",
      category: "Web",
      difficulty: "Medium",
      points: 200,
      solved: false,
      solves: 89,
      flag: "flag{hidden_in_robots_txt}",
      author: "webdev"
    },
    {
      id: "4",
      title: "Reverse Me",
      description: "This binary holds a secret. Use your reverse engineering skills to extract the flag from the compiled application.",
      category: "Reverse",
      difficulty: "Hard",
      points: 400,
      solved: false,
      solves: 23,
      flag: "flag{reverse_engineering_master}",
      author: "binary_ninja"
    },
    {
      id: "5",
      title: "Network Forensics",
      description: "Analyze this network capture to find evidence of data exfiltration. The attacker left traces in the network traffic.",
      category: "Forensics",
      difficulty: "Medium",
      points: 250,
      solved: false,
      solves: 67,
      flag: "flag{network_analysis_complete}",
      author: "forensics_expert"
    },
    {
      id: "6",
      title: "Buffer Overflow 101",
      description: "A classic stack-based buffer overflow vulnerability. Can you exploit it to gain control and retrieve the flag?",
      category: "Pwn",
      difficulty: "Hard",
      points: 350,
      solved: false,
      solves: 45,
      flag: "flag{buffer_overflow_exploited}",
      author: "pwn_master"
    }
  ];

  const categories = ["all", "Web", "Crypto", "Reverse", "Forensics", "Pwn"];
  
  const categoryIcons = {
    Web: <Globe className="h-4 w-4" />,
    Crypto: <Lock className="h-4 w-4" />,
    Reverse: <Code className="h-4 w-4" />,
    Forensics: <Shield className="h-4 w-4" />,
    Pwn: <Flag className="h-4 w-4" />,
  };

  const filteredChallenges = selectedCategory === "all" 
    ? mockChallenges 
    : mockChallenges.filter(c => c.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-600';
      case 'Medium': return 'bg-yellow-600';
      case 'Hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const handleFlagSubmit = (challenge: Challenge) => {
    if (!user) return;

    if (flagInput.trim() === challenge.flag) {
      toast({
        title: "Correct Flag! 🎉",
        description: `You earned ${challenge.points} points!`,
      });
      // Update challenge as solved (in real app, this would update the backend)
      challenge.solved = true;
      setFlagInput("");
      setSelectedChallenge(null);
    } else {
      toast({
        title: "Incorrect Flag",
        description: "Try again! The flag format is flag{...}",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">Please log in to access challenges.</p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const canAccessChallenges = user.emailVerified && user.approved;

  if (!canAccessChallenges) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert className="border-yellow-500 bg-yellow-950/50 max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-yellow-200">
              <strong>Access Restricted:</strong> You need to verify your email and get admin approval before accessing challenges.
              <Button asChild className="mt-2 ml-2" size="sm">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Challenges</h1>
          <p className="text-slate-300">Test your cybersecurity skills and earn points</p>
        </div>

        {/* Category Filter */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="bg-slate-800 border-slate-700">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300"
              >
                {category === "all" ? "All" : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {categoryIcons[challenge.category as keyof typeof categoryIcons]}
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {challenge.category}
                    </Badge>
                  </div>
                  {challenge.solved && (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                </div>
                <CardTitle className="text-white">{challenge.title}</CardTitle>
                <CardDescription className="text-slate-300">
                  {challenge.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">{challenge.points}</div>
                    <div className="text-xs text-slate-400">{challenge.solves} solves</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 mb-4">by {challenge.author}</div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                      onClick={() => setSelectedChallenge(challenge)}
                    >
                      {challenge.solved ? "View Solution" : "Attempt Challenge"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        {categoryIcons[challenge.category as keyof typeof categoryIcons]}
                        <span>{challenge.title}</span>
                        {challenge.solved && <CheckCircle className="h-5 w-5 text-green-400" />}
                      </DialogTitle>
                      <DialogDescription className="text-slate-300">
                        {challenge.description}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Badge className={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty}
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {challenge.category}
                        </Badge>
                        <span className="text-cyan-400 font-bold">{challenge.points} points</span>
                      </div>

                      {challenge.attachments && challenge.attachments.length > 0 && (
                        <div>
                          <Label className="text-white">Attachments:</Label>
                          <div className="mt-2 space-y-2">
                            {challenge.attachments.map((attachment, index) => (
                              <Button key={index} variant="outline" size="sm" className="border-slate-600 text-slate-300">
                                Download {attachment}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {!challenge.solved ? (
                        <div>
                          <Label htmlFor="flag" className="text-white">Submit Flag:</Label>
                          <div className="flex space-x-2 mt-2">
                            <Input
                              id="flag"
                              placeholder="flag{...}"
                              value={flagInput}
                              onChange={(e) => setFlagInput(e.target.value)}
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                            />
                            <Button 
                              onClick={() => handleFlagSubmit(challenge)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Alert className="border-green-500 bg-green-950/50">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription className="text-green-200">
                            Challenge completed! You earned {challenge.points} points.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-16">
            <X className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Challenges Found</h3>
            <p className="text-slate-400">Try a different category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;
