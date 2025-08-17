import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  Phone,
  PhoneOutgoing,
  MessageSquare,
  Calendar,
  BarChart3,
  BookOpen,
  Mic,
  Globe,
  Settings,
  User,
} from "lucide-react";
import { DashboardHome } from "@/components/DashboardHome";
import { DashboardCalls } from "@/components/DashboardCalls";
import { DashboardOutbound } from "@/components/DashboardOutboundCalls";
import { DashboardMessages } from "@/components/DashboardMessage";
import { DashboardCallPlanning } from "@/components/DashboardCallPlanning";
import { DashboardAnalytics } from "./DashboardAnalytics";
import { DashboardKnowledgeBase } from "./DashboardKnowledgeBase";
import { DashboardVoices } from "./DashboardVoice";
import { UserButton } from "@clerk/clerk-react";

const sidebarItems = [
  { title: "Home", url: "/dashboard", icon: Home, id: "home" },
  { title: "Calls", url: "/dashboard/calls", icon: Phone, id: "calls" },
  {
    title: "Outbound Calls",
    url: "/dashboard/outbound",
    icon: PhoneOutgoing,
    id: "outbound",
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageSquare,
    id: "messages",
  },
  {
    title: "Call Planning",
    url: "/dashboard/planning",
    icon: Calendar,
    id: "planning",
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
    id: "analytics",
  },
  {
    title: "Knowledge Base",
    url: "/dashboard/knowledge",
    icon: BookOpen,
    id: "knowledge",
  },
  { title: "Voices", url: "/dashboard/voices", icon: Mic, id: "voices" },
  {
    title: "Website Agent",
    url: "/dashboard/website",
    icon: Globe,
    id: "website",
  },
  {
    title: "Integration",
    url: "/dashboard/integration",
    icon: Settings,
    id: "integration",
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    id: "settings",
  },
];

export const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");

  console.log("Dashboard component rendered, active section:", activeSection);

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <DashboardHome />;
      case "calls":
        return <DashboardCalls />;
      case "outbound":
        return <DashboardOutbound />;
      case "messages":
        return <DashboardMessages />;  
      case "planning":
        return <DashboardCallPlanning />;
      case "analytics":
        return <DashboardAnalytics />;
      case "knowledge":
        return <DashboardKnowledgeBase />;
      case "voices":
        return <DashboardVoices />;
      default:
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {sidebarItems.find((item) => item.id === activeSection)?.title}
            </h1>
            <p className="text-muted-foreground">
              This section is coming soon. We're working hard to bring you more
              features!
            </p>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-border">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">CallAgent Pro</span>
            </div>
          </div>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveSection(item.id)}
                          className={`${
                            activeSection === item.id
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-secondary"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-hidden">
          <header className="border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-foreground">
                  {
                    sidebarItems.find((item) => item.id === activeSection)
                      ?.title
                  }
                </h1>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </header>

          <div className="h-[calc(100vh-73px)] overflow-y-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
