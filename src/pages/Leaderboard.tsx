
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  solvedChallenges: number;
  lastSolved: string;
  country?: string;
}

const Leaderboard = () => {
  const { user } = useAuth();

  const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, username: "CyberNinja", score: 2850, solvedChallenges: 28, lastSolved: "2 hours ago", country: "🇺🇸" },
    { rank: 2, username: "HackMaster", score: 2720, solvedChallenges: 25, lastSolved: "4 hours ago", country: "🇩🇪" },
    { rank: 3, username: "CryptoQueen", score: 2650, solvedChallenges: 24, lastSolved: "6 hours ago", country: "🇯🇵" },
    { rank: 4, username: "BinaryGhost", score: 2400, solvedChallenges: 22, lastSolved: "1 day ago", country: "🇬🇧" },
    { rank: 5, username: "WebWarrior", score: 2200, solvedChallenges: 20, lastSolved: "1 day ago", country: "🇫🇷" },
    { rank: 6, username: "ForensicsFox", score: 2100, solvedChallenges: 19, lastSolved: "2 days ago", country: "🇨🇦" },
    { rank: 7, username: "PwnPanda", score: 1950, solvedChallenges: 18, lastSolved: "2 days ago", country: "🇦🇺" },
    { rank: 8, username: "ReverseRaven", score: 1850, solvedChallenges: 17, lastSolved: "3 days ago", country: "🇰🇷" },
    { rank: 9, username: "SqlSlayer", score: 1750, solvedChallenges: 16, lastSolved: "3 days ago", country: "🇧🇷" },
    { rank: 10, username: "ZeroDay", score: 1650, solvedChallenges: 15, lastSolved: "4 days ago", country: "🇮🇳" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <Award className="h-5 w-5 text-slate-400" />;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50";
      default:
        return "bg-slate-800/50 border-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Global Leaderboard</h1>
          <p className="text-slate-300">See who's leading the cybersecurity challenge</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                Total Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">1,247</div>
              <p className="text-sm text-slate-400">Active participants</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Medal className="h-5 w-5 mr-2 text-cyan-400" />
                Challenges Solved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">8,934</div>
              <p className="text-sm text-slate-400">Total submissions</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-400" />
                Your Rank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">
                {user ? "#42" : "#-"}
              </div>
              <p className="text-sm text-slate-400">Current position</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
              Top Players
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {mockLeaderboard.map((entry, index) => (
                <div
                  key={entry.username}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] ${getRankStyle(entry.rank)}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 min-w-[80px]">
                      {getRankIcon(entry.rank)}
                      <span className="text-2xl font-bold text-white">#{entry.rank}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {entry.country && <span className="text-2xl">{entry.country}</span>}
                      <div>
                        <div className="font-semibold text-white text-lg">{entry.username}</div>
                        <div className="text-sm text-slate-400">
                          {entry.solvedChallenges} challenges solved • Last active {entry.lastSolved}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">{entry.score.toLocaleString()}</div>
                    <div className="text-sm text-slate-400">points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User's Position (if logged in and not in top 10) */}
        {user && (
          <Card className="mt-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-purple-400" />
                    <span className="text-xl font-bold text-white">#42</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{user.username} (You)</div>
                    <div className="text-sm text-slate-300">0 challenges solved • Joined recently</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-400">{user.score}</div>
                  <div className="text-sm text-slate-400">points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
