export type NavItemConfig = {
  to: string;
  label: string;
};
export type FooterNavConfig = {
  label: string;
  navItems: NavItemConfig[];
};

export const headerNavItems: NavItemConfig[] = [
  { to: "/", label: "Home" },
  { to: "/patterns", label: "Patterns" },
  { to: "/learning-path", label: "Learning Path" },
  { to: "/quiz", label: "Quiz" },
] as const;

// export const footerNavItems: NavItemConfig[] = [

// ] as const;
export const footerNavItems: FooterNavConfig[] = [
  {
    label: "Explore",
    navItems: [
      { to: "/", label: "Home" },
      { to: "/patterns", label: "Patterns" },
      { to: "/learning-path", label: "Learning Path" },
      { to: "/compare/strategy/state", label: "Compare patterns" },
      { to: "/quiz", label: "Quiz" },
    ],
  },
  {
    label: "Focus areas",
    navItems: [
      { to: "/patterns?category=must-know", label: "Must Know" },
      { to: "/patterns?category=good-to-know", label: "Good to Know" },
      { to: "/patterns?category=de-emphasize", label: "De-emphasize" },
    ],
  },
];
