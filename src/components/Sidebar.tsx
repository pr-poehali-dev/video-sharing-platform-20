import Icon from "@/components/ui/icon";
import { sidebarItems, sidebarSubscriptions } from "@/data/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-40 bg-background border-r border-border/30 transition-all duration-300 ${
        isOpen ? "w-60" : "w-[72px]"
      }`}
    >
      <ScrollArea className="h-full">
        <div className="py-3">
          <nav className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  item.active
                    ? "bg-secondary text-foreground"
                    : "text-foreground/60 hover:bg-secondary/50 hover:text-foreground"
                } ${!isOpen ? "justify-center" : ""}`}
              >
                <div className="relative">
                  <Icon
                    name={item.icon}
                    size={22}
                    className={item.active ? "text-primary" : "group-hover:text-primary transition-colors"}
                  />
                  {item.active && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full gradient-bg" />
                  )}
                </div>
                {isOpen && (
                  <span className="text-sm font-medium truncate animate-fade-in">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {isOpen && (
            <>
              <div className="mx-4 my-4 h-px bg-border/50" />
              <div className="px-4 mb-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider animate-fade-in">
                  Подписки
                </h3>
              </div>
              <nav className="space-y-1 px-2">
                {sidebarSubscriptions.map((channel) => (
                  <button
                    key={channel.id}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-foreground/60 hover:bg-secondary/50 hover:text-foreground transition-all duration-200 animate-fade-in"
                  >
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-sm shrink-0">
                      {channel.avatar}
                    </div>
                    <span className="text-sm truncate">{channel.name}</span>
                    {channel.verified && (
                      <Icon name="BadgeCheck" size={14} className="text-primary shrink-0" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="mx-4 my-4 h-px bg-border/50" />
              <nav className="space-y-1 px-2">
                {[
                  { icon: "Settings", label: "Настройки" },
                  { icon: "Flag", label: "Жалобы" },
                  { icon: "HelpCircle", label: "Справка" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-4 px-3 py-2.5 rounded-xl text-foreground/60 hover:bg-secondary/50 hover:text-foreground transition-all duration-200"
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
