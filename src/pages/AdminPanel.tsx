import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Shield, Plus, CheckCircle, X, AlertTriangle, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";

interface PendingUser {
  id: string;
  email: string;
  username: string;
  registeredAt: string;
  emailVerified: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  flag: string;
  author: string;
  isActive: boolean;
}

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "" as 'Easy' | 'Medium' | 'Hard',
    points: 0,
    flag: "",
  });

  const mockPendingUsers: PendingUser[] = [
    {
      id: "1",
      email: "alice@example.com",
      username: "alice_hacker",
      registeredAt: "2024-01-15T10:30:00Z",
      emailVerified: true,
    },
    {
      id: "2",
      email: "bob@university.edu",
      username: "crypto_bob",
      registeredAt: "2024-01-14T15:45:00Z",
      emailVerified: true,
    },
    {
      id: "3",
      email: "charlie@company.com",
      username: "web_warrior",
      registeredAt: "2024-01-13T09:20:00Z",
      emailVerified: false,
    },
  ];

  const mockChallenges: Challenge[] = [
    {
      id: "1",
      title: "SQL Injection Basics",
      description: "Find the flag hidden in this vulnerable login form.",
      category: "Web",
      difficulty: "Easy",
      points: 100,
      flag: "flag{sql_injection_is_dangerous}",
      author: "admin",
      isActive: true,
    },
    {
      id: "2",
      title: "Caesar's Secret",
      description: "A classic cipher used by Julius Caesar himself.",
      category: "Crypto",
      difficulty: "Easy",
      points: 75,
      flag: "flag{caesar_cipher_decoded}",
      author: "cryptomaster",
      isActive: true,
    },
  ];

  // Check if user is admin
  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You need admin privileges to access this panel.</p>
          <Button asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleApproveUser = (userId: string) => {
    console.log("Approving user:", userId);
    toast({
      title: "User Approved",
      description: "User has been granted access to the platform.",
    });
  };

  const handleRejectUser = (userId: string) => {
    console.log("Rejecting user:", userId);
    toast({
      title: "User Rejected",
      description: "User access has been denied.",
      variant: "destructive",
    });
  };

  const handleCreateChallenge = () => {
    if (!newChallenge.title || !newChallenge.description || !newChallenge.category || !newChallenge.difficulty || !newChallenge.flag) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("Creating challenge:", newChallenge);
    toast({
      title: "Challenge Created",
      description: `${newChallenge.title} has been added to the platform.`,
    });

    // Reset form
    setNewChallenge({
      title: "",
      description: "",
      category: "",
      difficulty: "" as 'Easy' | 'Medium' | 'Hard',
      points: 0,
      flag: "",
    });
  };

  const handleDeleteChallenge = (challengeId: string) => {
    console.log("Deleting challenge:", challengeId);
    toast({
      title: "Challenge Deleted",
      description: "Challenge has been removed from the platform.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-300">Manage users, challenges, and platform settings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-cyan-400" />
                Pending Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{mockPendingUsers.length}</div>
              <p className="text-sm text-slate-400">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-400" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">1,247</div>
              <p className="text-sm text-slate-400">Approved users</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-400" />
                Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{mockChallenges.length}</div>
              <p className="text-sm text-slate-400">Active challenges</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">3</div>
              <p className="text-sm text-slate-400">Pending review</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300">
              User Management
            </TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300">
              Challenge Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Pending User Approvals</CardTitle>
                <CardDescription className="text-slate-300">
                  Users waiting for admin approval to access the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPendingUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-semibold text-white">{user.username}</div>
                          <div className="text-sm text-slate-400">{user.email}</div>
                          <div className="text-xs text-slate-500">
                            Registered: {new Date(user.registeredAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={user.emailVerified ? "bg-green-600" : "bg-red-600"}>
                            {user.emailVerified ? "Email Verified" : "Email Pending"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveUser(user.id)}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={!user.emailVerified}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRejectUser(user.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}

                  {mockPendingUsers.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      No pending user approvals
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges">
            <div className="space-y-6">
              {/* Create Challenge */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-white">Title</Label>
                      <Input
                        id="title"
                        value={newChallenge.title}
                        onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                        placeholder="Challenge title"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-white">Category</Label>
                      <Select value={newChallenge.category} onValueChange={(value) => setNewChallenge({ ...newChallenge, category: value })}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="Web">Web</SelectItem>
                          <SelectItem value="Crypto">Crypto</SelectItem>
                          <SelectItem value="Reverse">Reverse</SelectItem>
                          <SelectItem value="Forensics">Forensics</SelectItem>
                          <SelectItem value="Pwn">Pwn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="difficulty" className="text-white">Difficulty</Label>
                      <Select value={newChallenge.difficulty} onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => setNewChallenge({ ...newChallenge, difficulty: value })}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="points" className="text-white">Points</Label>
                      <Input
                        id="points"
                        type="number"
                        value={newChallenge.points}
                        onChange={(e) => setNewChallenge({ ...newChallenge, points: parseInt(e.target.value) || 0 })}
                        placeholder="100"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea
                      id="description"
                      value={newChallenge.description}
                      onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                      placeholder="Challenge description..."
                      className="bg-slate-700/50 border-slate-600 text-white"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="flag" className="text-white">Flag</Label>
                    <Input
                      id="flag"
                      value={newChallenge.flag}
                      onChange={(e) => setNewChallenge({ ...newChallenge, flag: e.target.value })}
                      placeholder="flag{example_flag}"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <Button onClick={handleCreateChallenge} className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                    Create Challenge
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Challenges */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Existing Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockChallenges.map((challenge) => (
                      <div key={challenge.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                        <div>
                          <div className="font-semibold text-white">{challenge.title}</div>
                          <div className="text-sm text-slate-400">{challenge.category} • {challenge.difficulty} • {challenge.points} pts</div>
                          <div className="text-xs text-slate-500">by {challenge.author}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={challenge.isActive ? "bg-green-600" : "bg-red-600"}>
                            {challenge.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteChallenge(challenge.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Platform Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Registrations:</span>
                    <span className="text-white font-semibold">1,523</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active Users (7 days):</span>
                    <span className="text-white font-semibold">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Flag Submissions:</span>
                    <span className="text-white font-semibold">8,934</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Success Rate:</span>
                    <span className="text-green-400 font-semibold">67.3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Popular Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Web:</span>
                    <span className="text-cyan-400 font-semibold">2,341 attempts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Crypto:</span>
                    <span className="text-cyan-400 font-semibold">1,892 attempts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pwn:</span>
                    <span className="text-cyan-400 font-semibold">1,234 attempts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Forensics:</span>
                    <span className="text-cyan-400 font-semibold">891 attempts</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
