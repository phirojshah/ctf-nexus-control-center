
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  rank: number;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      // Get top 10 users
      const { data: topUsers, error } = await supabase
        .from('profiles')
        .select('id, username, score')
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return;
      }

      // Add rank to each user
      const leaderboardWithRanks = topUsers?.map((user, index) => ({
        ...user,
        rank: index + 1,
      })) || [];

      setLeaderboard(leaderboardWithRanks);

      // Get total user count
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      setTotalUsers(count || 0);

      // Get current user's rank if logged in
      if (user) {
        const { data: usersAbove } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .gt('score', user.score);

        setUserRank((usersAbove?.length || 0) + 1);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white text-xl">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

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
              <div className="text-3xl font-bold text-yellow-400">{totalUsers}</div>
              <p className="text-sm text-slate-400">Registered users</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Medal className="h-5 w-5 mr-2 text-cyan-400" />
                Active Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{leaderboard.filter(u => u.score > 0).length}</div>
              <p className="text-sm text-slate-400">With points scored</p>
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
                {user && userRank ? `#${userRank}` : "#-"}
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
              {leaderboard.length > 0 ? (
                leaderboard.map((entry) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] ${getRankStyle(entry.rank)}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 min-w-[80px]">
                        {getRankIcon(entry.rank)}
                        <span className="text-2xl font-bold text-white">#{entry.rank}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-semibold text-white text-lg">
                            {entry.username}
                            {user && entry.id === user.id && " (You)"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">{entry.score.toLocaleString()}</div>
                      <div className="text-sm text-slate-400">points</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>No players on the leaderboard yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User's Position (if logged in and not in top 10) */}
        {user && userRank && userRank > 10 && (
          <Card className="mt-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-purple-400" />
                    <span className="text-xl font-bold text-white">#{userRank}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{user.username} (You)</div>
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
