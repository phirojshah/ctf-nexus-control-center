import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, Trophy, Target, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, session } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user?.username || "");

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">Please log in to view your profile.</p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    console.log("Saving profile:", { username: editedUsername });
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const mockAchievements = [
    { id: 1, name: "First Blood", description: "Solved your first challenge", icon: "🩸" },
    { id: 2, name: "Web Warrior", description: "Solved 5 web challenges", icon: "🌐" },
    { id: 3, name: "Crypto Novice", description: "Solved your first crypto challenge", icon: "🔐" },
  ];

  const mockSolvedChallenges = [
    { id: 1, title: "Caesar's Secret", category: "Crypto", points: 75, solvedAt: "2024-01-10" },
    { id: 2, title: "SQL Injection Basics", category: "Web", points: 100, solvedAt: "2024-01-08" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">{user.username}</CardTitle>
                    <CardDescription className="text-slate-300 flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{session?.user?.email}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Badge className={user.email_verified ? "bg-green-600" : "bg-red-600"}>
                    {user.email_verified ? "Email Verified" : "Email Pending"}
                  </Badge>
                  <Badge className={user.approved ? "bg-green-600" : "bg-yellow-600"}>
                    {user.approved ? "Approved" : "Pending Approval"}
                  </Badge>
                  {user.is_admin && (
                    <Badge className="bg-red-600">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-slate-400 mb-4">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditedUsername(user.username);
                      }}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
                >
                  Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                  Total Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-400">{user.score}</div>
                <p className="text-sm text-slate-400">Points earned</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-cyan-400" />
                  Challenges Solved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-cyan-400">{mockSolvedChallenges.length}</div>
                <p className="text-sm text-slate-400">Total completed</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <Award className="h-5 w-5 mr-2 text-purple-400" />
                  Global Rank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400">#42</div>
                <p className="text-sm text-slate-400">Current position</p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Achievements</CardTitle>
              <CardDescription className="text-slate-300">
                Unlock badges by completing challenges and reaching milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold text-white">{achievement.name}</div>
                      <div className="text-sm text-slate-400">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Solved Challenges</CardTitle>
              <CardDescription className="text-slate-300">
                Your recent challenge completions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockSolvedChallenges.length > 0 ? (
                <div className="space-y-4">
                  {mockSolvedChallenges.map((challenge, index) => (
                    <div key={challenge.id}>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <div className="font-semibold text-white">{challenge.title}</div>
                          <div className="text-sm text-slate-400">{challenge.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-cyan-400">+{challenge.points} pts</div>
                          <div className="text-xs text-slate-400">{challenge.solvedAt}</div>
                        </div>
                      </div>
                      {index < mockSolvedChallenges.length - 1 && (
                        <Separator className="bg-slate-700" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Target className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>No challenges solved yet</p>
                  <Button asChild className="mt-4" variant="outline">
                    <Link to="/challenges">Start Solving</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
