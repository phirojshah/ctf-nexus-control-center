
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Shield, User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white">CyberCTF</h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link to="/challenges" className="text-slate-300 hover:text-white transition-colors">
            Challenges
          </Link>
          <Link to="/leaderboard" className="text-slate-300 hover:text-white transition-colors">
            Leaderboard
          </Link>
          {user?.is_admin && (
            <Link to="/admin" className="text-red-400 hover:text-red-300 transition-colors">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-slate-700">
                  <User className="h-4 w-4" />
                  <span>{user.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-700">
                <DropdownMenuItem asChild className="text-white hover:bg-slate-700">
                  <Link to="/profile">
                    <Settings className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-slate-700">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Button asChild variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
