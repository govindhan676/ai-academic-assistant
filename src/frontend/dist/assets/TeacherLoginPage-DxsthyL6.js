import { c as createLucideIcon, e as useNavigate, g as useInternetIdentity, h as useAuthStore, d as reactExports, j as jsxRuntimeExports, m as motion, i as ChevronLeft, A as AnimatePresence, k as ue } from "./index--tQIKzjM.js";
import { u as useActor, s as setActor, g as getUserProfile, a as setUserProfile, c as createActor } from "./backendService-DLDa8DMz.js";
import { C as CircleCheck } from "./circle-check-0ZUIPUN2.js";
import { S as Sparkles } from "./sparkles-iQEjdQ6Q.js";
import { U as UserPlus } from "./user-plus-BV-hmciO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  ["path", { d: "M9 13a4.5 4.5 0 0 0 3-4", key: "10igwf" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M12 13h4", key: "1ku699" }],
  ["path", { d: "M12 18h6a2 2 0 0 1 2 2v1", key: "105ag5" }],
  ["path", { d: "M12 8h8", key: "1lhi5i" }],
  ["path", { d: "M16 8V5a2 2 0 0 1 2-2", key: "u6izg6" }],
  ["circle", { cx: "16", cy: "13", r: ".5", key: "ry7gng" }],
  ["circle", { cx: "18", cy: "3", r: ".5", key: "1aiba7" }],
  ["circle", { cx: "20", cy: "21", r: ".5", key: "yhc1fs" }],
  ["circle", { cx: "20", cy: "8", r: ".5", key: "1e43v0" }]
];
const BrainCircuit = createLucideIcon("brain-circuit", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function ActorInit() {
  const { actor } = useActor(createActor);
  if (actor) setActor(actor);
  return null;
}
const getFloatAnim = (i) => ({
  y: [0, -18, 0],
  x: [0, i % 2 === 0 ? 8 : -8, 0],
  transition: {
    duration: 4 + i,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
    delay: i * 0.7
  }
});
function TeacherLoginPage() {
  const navigate = useNavigate();
  const { login: iiLogin, loginStatus } = useInternetIdentity();
  const { login: storeLogin } = useAuthStore();
  const [step, setStep] = reactExports.useState("login");
  const [name, setName] = reactExports.useState("");
  const [isWorking, setIsWorking] = reactExports.useState(false);
  const { actor } = useActor(createActor);
  const handleConnect = async () => {
    setIsWorking(true);
    try {
      await iiLogin();
      await new Promise((r) => setTimeout(r, 800));
      if (actor) setActor(actor);
      const profile = await getUserProfile();
      if (!profile) {
        setIsWorking(false);
        setStep("register");
        return;
      }
      const role = typeof profile.role === "string" ? profile.role : Object.keys(profile.role)[0];
      if (role !== "teacher") {
        ue.error("Access denied — this account is not a teacher account.");
        setIsWorking(false);
        return;
      }
      storeLogin({
        principal: profile.principal.toString(),
        name: profile.name,
        role: "teacher"
      });
      setStep("success");
      setTimeout(() => navigate({ to: "/teacher/dashboard" }), 1800);
    } catch (err) {
      console.error(err);
      ue.error("Authentication failed. Please try again.");
      setIsWorking(false);
    }
  };
  const handleRegister = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      ue.error("Please enter your full name.");
      return;
    }
    if (trimmed.length < 2) {
      ue.error("Name must be at least 2 characters.");
      return;
    }
    setIsWorking(true);
    try {
      const profile = await setUserProfile(trimmed);
      if (!profile) {
        ue.error("Registration failed. Please try again.");
        setIsWorking(false);
        return;
      }
      storeLogin({
        principal: profile.principal.toString(),
        name: profile.name,
        role: "teacher"
      });
      setStep("success");
      setTimeout(() => navigate({ to: "/teacher/dashboard" }), 1800);
    } catch (err) {
      console.error(err);
      ue.error("Registration failed. Please try again.");
      setIsWorking(false);
    }
  };
  const isLoading = isWorking || loginStatus === "logging-in";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen flex items-center justify-center overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ActorInit, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[80px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]" })
    ] }),
    [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        animate: getFloatAnim(i),
        className: "absolute pointer-events-none",
        style: {
          top: `${[15, 70, 25, 80][i]}%`,
          left: `${[10, 85, 75, 15][i]}%`
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-full opacity-20",
            style: {
              width: [40, 24, 56, 32][i],
              height: [40, 24, 56, 32][i],
              background: i % 2 === 0 ? "oklch(0.62 0.24 250 / 0.5)" : "oklch(0.62 0.22 290 / 0.5)",
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
          backgroundImage: "linear-gradient(oklch(0.62 0.24 250) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.24 250) 1px, transparent 1px)",
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
        "data-ocid": "teacher-login.back_link",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-8 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            step === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 1.1 },
                transition: { type: "spring", stiffness: 200, damping: 18 },
                className: "flex flex-col items-center justify-center py-8 text-center",
                "data-ocid": "teacher-login.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0 },
                      animate: { scale: 1 },
                      transition: { type: "spring", stiffness: 300, delay: 0.1 },
                      className: "w-20 h-20 rounded-full flex items-center justify-center mb-5",
                      style: {
                        background: "oklch(0.55 0.18 145 / 0.2)",
                        border: "2px solid oklch(0.65 0.2 145 / 0.4)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CircleCheck,
                        {
                          size: 40,
                          style: { color: "oklch(0.65 0.2 145)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Welcome!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
                    "Teacher portal access granted.",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    "Redirecting to your dashboard..."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { width: 0 },
                      animate: { width: "100%" },
                      transition: { duration: 1.8, ease: "linear", delay: 0.3 },
                      className: "h-1 rounded-full mt-6",
                      style: {
                        background: "linear-gradient(90deg, oklch(0.62 0.24 250), oklch(0.62 0.22 290))"
                      }
                    }
                  )
                ]
              },
              "success"
            ),
            step === "register" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -20 },
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0, rotate: -15 },
                      animate: { scale: 1, rotate: 0 },
                      transition: { delay: 0.1, type: "spring", stiffness: 200 },
                      className: "flex justify-center mb-6",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center glow-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { size: 32, className: "text-white" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            animate: { rotate: 360 },
                            transition: {
                              duration: 8,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear"
                            },
                            className: "absolute -top-1 -right-1",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, className: "text-primary" })
                          }
                        )
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-gradient-blue mb-1", children: "Set Up Teacher Account" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Enter your name to complete registration" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "teacher-name",
                        className: "block text-sm font-medium text-foreground/80 mb-2",
                        children: "Full Name"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "teacher-name",
                        type: "text",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        onKeyDown: (e) => e.key === "Enter" && !isLoading && handleRegister(),
                        placeholder: "Enter your full name",
                        disabled: isLoading,
                        "data-ocid": "teacher-login.name_input",
                        className: "w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 transition-smooth focus:outline-none disabled:opacity-60",
                        style: {
                          background: "oklch(0.11 0.03 250 / 0.6)",
                          border: "1px solid oklch(0.62 0.24 250 / 0.2)",
                          boxShadow: "inset 0 1px 2px oklch(0 0 0 / 0.2)"
                        },
                        onFocus: (e) => {
                          e.currentTarget.style.borderColor = "oklch(0.62 0.24 250 / 0.5)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px oklch(0.62 0.24 250 / 0.1)";
                        },
                        onBlur: (e) => {
                          e.currentTarget.style.borderColor = "oklch(0.62 0.24 250 / 0.2)";
                          e.currentTarget.style.boxShadow = "inset 0 1px 2px oklch(0 0 0 / 0.2)";
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      onClick: handleRegister,
                      disabled: isLoading || !name.trim(),
                      type: "button",
                      "data-ocid": "teacher-login.register_button",
                      className: "w-full relative flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-gradient-brand text-white font-semibold text-sm glow-blue hover:opacity-90 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed",
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
                        "Creating account..."
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 16 }),
                        "Create Teacher Account"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-4", children: [
                    "Your identity is already verified.",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/80", children: "Just enter your name." })
                  ] })
                ]
              },
              "register"
            ),
            step === "login" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 1 },
                exit: { opacity: 0, y: -10 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0, rotate: -15 },
                      animate: { scale: 1, rotate: 0 },
                      transition: { delay: 0.2, type: "spring", stiffness: 200 },
                      className: "flex justify-center mb-6",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center glow-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { size: 32, className: "text-white" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            animate: { rotate: 360 },
                            transition: {
                              duration: 8,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear"
                            },
                            className: "absolute -top-1 -right-1",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, className: "text-primary" })
                          }
                        )
                      ] })
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
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-gradient-blue mb-1", children: "Teacher Portal" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Authenticate with Internet Identity to access your dashboard" })
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
                      children: ["Upload Audio", "AI Transcripts", "Manage Notes"].map(
                        (f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary/80",
                            children: f
                          },
                          f
                        )
                      )
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
                      "data-ocid": "teacher-login.submit_button",
                      className: "w-full relative flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-gradient-brand text-white font-semibold text-sm glow-blue hover:opacity-90 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed",
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
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16 }),
                        "Connect with Internet Identity"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.p,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { delay: 0.65 },
                      className: "text-center text-xs text-muted-foreground mt-5",
                      children: [
                        "First time?",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/80", children: "Your account will be set up automatically." })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-6 border-t border-border/40 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Are you a student?",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: "/student/login",
                        className: "text-accent hover:text-accent/80 transition-smooth",
                        "data-ocid": "teacher-login.student_link",
                        children: "Student Portal"
                      }
                    )
                  ] }) })
                ]
              },
              "login"
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" })
        ]
      }
    )
  ] });
}
export {
  TeacherLoginPage as default
};
