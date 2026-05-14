import { c as createLucideIcon, e as useNavigate, g as useInternetIdentity, h as useAuthStore, d as reactExports, j as jsxRuntimeExports, m as motion, i as ChevronLeft, l as BookOpen, k as ue } from "./index--tQIKzjM.js";
import { u as useActor, s as setActor, g as getUserProfile, c as createActor } from "./backendService-DLDa8DMz.js";
import { G as GraduationCap } from "./graduation-cap-COX9yIHY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function ActorInit() {
  const { actor } = useActor(createActor);
  if (actor) setActor(actor);
  return null;
}
const getFloatAnim = (i) => ({
  y: [0, -16, 0],
  x: [0, i % 2 === 0 ? 10 : -10, 0],
  transition: {
    duration: 3.5 + i * 0.8,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
    delay: i * 0.5
  }
});
function StudentLoginPage() {
  const navigate = useNavigate();
  const { login: iiLogin, loginStatus } = useInternetIdentity();
  const { login: storeLogin } = useAuthStore();
  const [isConnecting, setIsConnecting] = reactExports.useState(false);
  const { actor } = useActor(createActor);
  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await iiLogin();
      await new Promise((r) => setTimeout(r, 800));
      if (actor) setActor(actor);
      const profile = await getUserProfile();
      if (!profile) {
        ue.error("No student account found. Please register first.");
        setIsConnecting(false);
        return;
      }
      const role = typeof profile.role === "string" ? profile.role : Object.keys(profile.role)[0];
      if (role !== "student") {
        ue.error("Access denied — student accounts only.");
        setIsConnecting(false);
        return;
      }
      storeLogin({
        principal: profile.principal.toString(),
        name: profile.name,
        role: "student"
      });
      ue.success(`Welcome back, ${profile.name}!`);
      navigate({ to: "/student/dashboard" });
    } catch (err) {
      console.error(err);
      ue.error("Authentication failed. Please try again.");
      setIsConnecting(false);
    }
  };
  const isLoading = isConnecting || loginStatus === "logging-in";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen flex items-center justify-center overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ActorInit, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px]",
          style: { background: "oklch(0.62 0.22 290 / 0.1)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/8 blur-[80px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px]",
          style: { background: "oklch(0.62 0.22 290 / 0.05)" }
        }
      )
    ] }),
    [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        animate: getFloatAnim(i),
        className: "absolute pointer-events-none",
        style: {
          top: `${[20, 65, 30, 75][i]}%`,
          left: `${[80, 12, 82, 8][i]}%`
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-full opacity-20",
            style: {
              width: [32, 48, 20, 40][i],
              height: [32, 48, 20, 40][i],
              background: "oklch(0.62 0.22 290 / 0.6)",
              filter: "blur(1px)"
            }
          }
        )
      },
      i
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: "linear-gradient(oklch(0.62 0.22 290) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.22 290) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.a,
      {
        href: "/",
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: 0.2 },
        className: "absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm group",
        "data-ocid": "student-login.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronLeft,
            {
              size: 16,
              className: "group-hover:-translate-x-0.5 transition-transform duration-200"
            }
          ),
          "Back to Home"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 32, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        className: "relative z-10 w-full max-w-md mx-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-8 shadow-2xl",
              style: { borderColor: "oklch(0.62 0.22 290 / 0.2)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0, rotate: 15 },
                    animate: { scale: 1, rotate: 0 },
                    transition: { delay: 0.2, type: "spring", stiffness: 200 },
                    className: "flex justify-center mb-6",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-16 h-16 rounded-2xl flex items-center justify-center",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.55 0.22 270), oklch(0.62 0.22 290))",
                          boxShadow: "0 0 20px oklch(0.62 0.22 290 / 0.4), 0 0 40px oklch(0.62 0.22 290 / 0.15)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 32, className: "text-white" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3 },
                    className: "text-center mb-8",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-gradient-purple mb-1", children: "Student Portal" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Access your notes, question papers, and study resources" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.4 },
                    className: "flex gap-2 justify-center flex-wrap mb-8",
                    children: ["View Notes", "Question Papers", "Download PDFs"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs px-3 py-1 rounded-full border text-accent/80",
                        style: {
                          borderColor: "oklch(0.62 0.22 290 / 0.2)",
                          background: "oklch(0.62 0.22 290 / 0.1)"
                        },
                        children: f
                      },
                      f
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.5 },
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.98 },
                    onClick: handleConnect,
                    disabled: isLoading,
                    type: "button",
                    "data-ocid": "student-login.submit_button",
                    className: "w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl text-white font-semibold text-sm transition-smooth disabled:opacity-60 disabled:cursor-not-allowed",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.55 0.22 270), oklch(0.62 0.22 290))",
                      boxShadow: "0 0 20px oklch(0.62 0.22 290 / 0.35)"
                    },
                    children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          animate: { rotate: 360 },
                          transition: {
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear"
                          },
                          className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        }
                      ),
                      "Connecting..."
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 16 }),
                      "Login with Internet Identity"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.65 },
                    className: "text-center text-sm text-muted-foreground mt-5",
                    children: [
                      "New student?",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "/student/register",
                          className: "text-accent hover:text-accent/80 transition-smooth font-medium",
                          "data-ocid": "student-login.register_link",
                          children: "Register here"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-6 border-t border-border/40 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Are you a teacher?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "/teacher/login",
                      className: "text-primary hover:text-primary/80 transition-smooth",
                      "data-ocid": "student-login.teacher_link",
                      children: "Teacher Portal"
                    }
                  )
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-px left-8 right-8 h-px",
              style: {
                background: "linear-gradient(90deg, transparent, oklch(0.62 0.22 290 / 0.6), transparent)"
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        animate: { y: [0, -12, 0], rotate: [0, 5, 0] },
        transition: {
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        },
        className: "absolute bottom-12 right-12 opacity-10 pointer-events-none hidden lg:block",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 64, className: "text-accent" })
      }
    )
  ] });
}
export {
  StudentLoginPage as default
};
