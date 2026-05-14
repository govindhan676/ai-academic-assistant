import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import {
  BarChart2,
  Brain,
  ChevronLeft,
  ChevronRight,
  FileText,
  Files,
  LayoutDashboard,
  LogOut,
  Settings,
  Upload,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/teacher/dashboard" },
  { label: "Upload Audio", icon: Upload, to: "/teacher/upload" },
  { label: "Manage Notes", icon: FileText, to: "/teacher/notes" },
  { label: "Question Papers", icon: Files, to: "/teacher/question-papers" },
  { label: "Students", icon: Users, to: "/teacher/students" },
  { label: "Analytics", icon: BarChart2, to: "/teacher/analytics" },
  { label: "Settings", icon: Settings, to: "/teacher/settings" },
];

export function TeacherLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex flex-col h-screen sticky top-0 overflow-hidden"
        style={{
          background: "oklch(0.09 0.03 250 / 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRight: "1px solid oklch(0.62 0.24 250 / 0.15)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 border-b"
          style={{ borderColor: "oklch(0.62 0.24 250 / 0.12)" }}
        >
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg glow-blue">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="font-display font-bold text-sm text-gradient-blue whitespace-nowrap"
              >
                AI Academic
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden space-y-1 px-2">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to}>
                <motion.div
                  whileHover={{ x: 2 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-smooth cursor-pointer group relative
                    ${active ? "bg-gradient-brand-subtle" : "hover:bg-white/5"}`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-brand rounded-full" />
                  )}
                  <item.icon
                    className={`w-5 h-5 flex-shrink-0 transition-smooth ${
                      active
                        ? "text-blue-400"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`text-sm font-medium whitespace-nowrap ${
                          active
                            ? "text-gradient-blue"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          className="px-2 pb-4 border-t pt-3"
          style={{ borderColor: "oklch(0.62 0.24 250 / 0.12)" }}
        >
          <motion.button
            type="button"
            whileHover={{ x: 2 }}
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-red-500/10 transition-smooth group"
            data-ocid="teacher.logout_button"
          >
            <LogOut className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-red-400 transition-smooth" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium text-muted-foreground group-hover:text-red-400 transition-smooth whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Collapse toggle */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.15 0.04 250)",
            border: "1px solid oklch(0.62 0.24 250 / 0.3)",
          }}
          data-ocid="teacher.sidebar_toggle"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3 text-blue-400" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-blue-400" />
          )}
        </motion.button>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
