
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Clock, Trophy, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">Please log in to access the dashboard.</p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = () => {
    if (!user.emailVerified) {
      return <Badge variant="destructive" className="bg-red-600"><AlertTriangle className="h-3 w-3 mr-1" />Email Not Verified</Badge>;
    }
    if (!user.approved) {
      return <Badge variant="secondary" className="bg-yellow-600"><Clock className="h-3 w-3 mr-1" />Pending Approval</Badge>;
    }
    return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
  };

  const canAccessChallenges = user.emailVerified && user.approved;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user.username}!</h1>
          <p className="text-slate-300">Your CTF command center</p>
        </div>

        {/* Status Alerts */}
        <div className="space-y-4 mb-8">
          {!user.emailVerified && (
            <Alert className="border-red-500 bg-red-950/50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-200">
                <strong>Email Verification Required:</strong> Please check your email and click the verification link to proceed.
              </AlertDescription>
            </Alert>
          )}

          {user.emailVerified && !user.approved && (
            <Alert className="border-yellow-500 bg-yellow-950/50">
              <Clock className="h-4 w-4" />
              <AlertDescription className="text-yellow-200">
                <strong>Awaiting Admin Approval:</strong> Your account is under review. You'll be notified once approved.
              </AlertDescription>
            </Alert>
          )}

          {canAccessChallenges && (
            <Alert className="border-green-500 bg-green-950/50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-200">
                <strong>Account Approved:</strong> You now have full access to all platform features!
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Status Card */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center justify-between">
                Account Status
                {getStatusBadge()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-white">{user.emailVerified ? "✓" : "✗"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Approved:</span>
                  <span className="text-white">{user.approved ? "✓" : "✗"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Admin:</span>
                  <span className="text-white">{user.isAdmin ? "✓" : "✗"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{user.score}</div>
              <p className="text-sm text-slate-400">Total points earned</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-cyan-400" />
                Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">0</div>
              <p className="text-sm text-slate-400">Solved challenges</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-400" />
                Rank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">#-</div>
              <p className="text-sm text-slate-400">Global ranking</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white">Challenges</CardTitle>
              <CardDescription className="text-slate-300">
                Solve cybersecurity challenges and earn points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600" disabled={!canAccessChallenges}>
                <Link to="/challenges">View Challenges</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white">Leaderboard</CardTitle>
              <CardDescription className="text-slate-300">
                See how you rank against other hackers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900">
                <Link to="/leaderboard">View Rankings</Link>
              </Button>
            </CardContent>
          </Card>

          {user.isAdmin && (
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Admin Panel</CardTitle>
                <CardDescription className="text-slate-300">
                  Manage users, challenges, and platform settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
                  <Link to="/admin">Admin Panel</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
