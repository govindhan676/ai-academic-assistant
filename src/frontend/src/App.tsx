import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { StudentLayout } from "./components/Layout/StudentLayout";
import { TeacherLayout } from "./components/Layout/TeacherLayout";
import { LoadingSpinner } from "./components/UI/LoadingSpinner";
import { useAuthStore } from "./store/authStore";

// Lazy pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const TeacherLoginPage = lazy(() => import("./pages/TeacherLoginPage"));
const StudentLoginPage = lazy(() => import("./pages/StudentLoginPage"));
const StudentRegisterPage = lazy(() => import("./pages/StudentRegisterPage"));
const TeacherDashboardPage = lazy(
  () => import("./pages/teacher/DashboardPage"),
);
const UploadAudioPage = lazy(() => import("./pages/teacher/UploadAudioPage"));
const ManageNotesPage = lazy(() => import("./pages/teacher/ManageNotesPage"));
const CreateNotePage = lazy(() => import("./pages/teacher/CreateNotePage"));
const EditNotePage = lazy(() => import("./pages/teacher/EditNotePage"));
const QuestionPapersTeacherPage = lazy(
  () => import("./pages/teacher/QuestionPapersPage"),
);
const StudentsPage = lazy(() => import("./pages/teacher/StudentsPage"));
const AnalyticsPage = lazy(() => import("./pages/teacher/AnalyticsPage"));
const SettingsPage = lazy(() => import("./pages/teacher/SettingsPage"));
const StudentDashboardPage = lazy(
  () => import("./pages/student/DashboardPage"),
);
const StudentNotesPage = lazy(() => import("./pages/student/NotesPage"));
const StudentQuestionPapersPage = lazy(
  () => import("./pages/student/QuestionPapersPage"),
);

const PageFallback = () => <LoadingSpinner fullPage />;

function wrap(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Component />
    </Suspense>
  );
}

// Auth guards
function requireAuth(role?: "teacher" | "student") {
  const { isAuthenticated, user } = useAuthStore.getState();
  if (!isAuthenticated || !user) {
    throw redirect({
      to: role === "teacher" ? "/teacher/login" : "/student/login",
    });
  }
  if (role && user.role !== role) {
    throw redirect({
      to: user.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard",
    });
  }
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.13 0.03 250 / 0.95)",
            border: "1px solid oklch(0.62 0.24 250 / 0.25)",
            color: "oklch(0.93 0.01 240)",
            backdropFilter: "blur(12px)",
          },
        }}
      />
    </>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => wrap(LandingPage),
});

const teacherLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/login",
  component: () => wrap(TeacherLoginPage),
});

const studentLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/login",
  component: () => wrap(StudentLoginPage),
});

const studentRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/register",
  component: () => wrap(StudentRegisterPage),
});

// Teacher layout route
const teacherLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "teacher-layout",
  beforeLoad: () => requireAuth("teacher"),
  component: TeacherLayout,
});

const teacherDashboardRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/teacher/dashboard",
  component: () => wrap(TeacherDashboardPage),
});

const teacherUploadRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/teacher/upload",
  component: () => wrap(UploadAudioPage),
});

const teacherNotesRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/teacher/notes",
  component: () => wrap(ManageNotesPage),
});

const teacherNotesNewRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/teacher/notes/new",
  component: () => wrap(CreateNotePage),
});

const teacherNoteEditRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/teacher/notes/$noteId",
  component: () => wrap(EditNotePage),
});

const teacherQuestionPapersRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/teacher/question-papers",
  component: () => wrap(QuestionPapersTeacherPage),
});

const teacherStudentsRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/teacher/students",
  component: () => wrap(StudentsPage),
});

const teacherAnalyticsRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/teacher/analytics",
  component: () => wrap(AnalyticsPage),
});

const teacherSettingsRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/teacher/settings",
  component: () => wrap(SettingsPage),
});

// Student layout route
const studentLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "student-layout",
  beforeLoad: () => requireAuth("student"),
  component: StudentLayout,
});

const studentDashboardRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/student/dashboard",
  component: () => wrap(StudentDashboardPage),
});

const studentNotesRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/student/notes",
  component: () => wrap(StudentNotesPage),
});

const studentQuestionPapersRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/student/question-papers",
  component: () => wrap(StudentQuestionPapersPage),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  teacherLoginRoute,
  studentLoginRoute,
  studentRegisterRoute,
  teacherLayoutRoute.addChildren([
    teacherDashboardRoute,
    teacherUploadRoute,
    teacherNotesRoute,
    teacherNotesNewRoute,
    teacherNoteEditRoute,
    teacherQuestionPapersRoute,
    teacherStudentsRoute,
    teacherAnalyticsRoute,
    teacherSettingsRoute,
  ]),
  studentLayoutRoute.addChildren([
    studentDashboardRoute,
    studentNotesRoute,
    studentQuestionPapersRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
