import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  Files,
  LayoutDashboard,
  LogOut,
  UserCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useAuthStore } from "../../store/authStore";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/student/dashboard" },
  { label: "Browse Notes", icon: BookOpen, to: "/student/notes" },
  { label: "Question Papers", icon: Files, to: "/student/question-papers" },
];

export function StudentLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top navbar */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 border-b"
        style={{
          background: "oklch(0.09 0.03 250 / 0.9)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderColor: "oklch(0.62 0.24 250 / 0.15)",
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center glow-blue">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-sm text-gradient-blue">
            AI Academic
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to}>
                <motion.div
                  whileHover={{ y: -1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-smooth ${
                    active
                      ? "bg-gradient-brand-subtle text-blue-400"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                  data-ocid={`student.nav.${item.label.toLowerCase().replace(" ", "_")}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl glass">
              <UserCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-muted-foreground">{user.name}</span>
            </div>
          )}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-smooth"
            data-ocid="student.logout_button"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="py-4 px-6 text-center text-xs text-muted-foreground border-t"
        style={{ borderColor: "oklch(0.62 0.24 250 / 0.1)" }}
      >
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
