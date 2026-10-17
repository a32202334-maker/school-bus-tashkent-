import { appBasePath, appPath } from "@agent-native/core/client/api-path";
import { useAgentRouteState } from "@agent-native/core/client/navigation";

import { TAB_ID } from "@/lib/tab-id";

export interface NavigationState {
  view: string;
  path?: string;
}

export function useNavigationState() {
  useAgentRouteState<NavigationState>({
    browserTabId: TAB_ID,
    requestSource: TAB_ID,
    getNavigationState: ({ pathname }) => ({
      view: viewForPath(pathname),
      path: appPath(pathname),
    }),
    getCommandPath: (command) =>
      routerPath(command.path || pathForView(command.view)),
  });
}

function viewForPath(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname === "/how-it-works") return "how-it-works";
  if (pathname === "/safety") return "safety";
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
  if (pathname === "/faq") return "faq";
  if (pathname === "/login") return "login";
  if (pathname === "/register") return "register";
  if (pathname === "/dashboard") return "dashboard";
  if (pathname === "/rides/find") return "find-ride";
  if (pathname === "/rides/offer") return "offer-ride";
  if (pathname === "/rides/my-rides") return "my-rides";
  if (pathname === "/settings") return "settings";
  if (pathname === "/coordinator") return "coordinator";
  if (pathname === "/privacy") return "privacy";
  if (pathname === "/terms") return "terms";
  return "not-found";
}

function pathForView(view?: string): string {
  switch (view) {
    case "home": return "/";
    case "how-it-works": return "/how-it-works";
    case "safety": return "/safety";
    case "about": return "/about";
    case "contact": return "/contact";
    case "faq": return "/faq";
    case "login": return "/login";
    case "register": return "/register";
    case "dashboard": return "/dashboard";
    case "find-ride": return "/rides/find";
    case "offer-ride": return "/rides/offer";
    case "my-rides": return "/rides/my-rides";
    case "settings": return "/settings";
    case "coordinator": return "/coordinator";
    case "privacy": return "/privacy";
    case "terms": return "/terms";
    default: return "/";
  }
}

function routerPath(path: string): string {
  const basePath = appBasePath();
  if (!basePath) return path;
  if (path === basePath) return "/";
  if (path.startsWith(`${basePath}/`)) {
    return path.slice(basePath.length) || "/";
  }
  return path;
}
