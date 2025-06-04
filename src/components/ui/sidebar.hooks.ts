import * as React from "react";
import { SidebarContext, SidebarContextValue } from "./sidebar.internals";

export function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
