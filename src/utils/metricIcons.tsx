import {
    BookOpen,
    Swords,
    Monitor,
    Gamepad2,
    UserRound,
    Users,
    Settings2,
    Fingerprint,
    Zap,
    LineChart,
    TrendingUp,
    Map,
    Layers,
    Car,
    Activity,
    Dices
} from "lucide-react";

export const METRIC_ICONS: Record<string, any> = {
    "Story": BookOpen,
    "Combat": Swords,
    "Graphics": Monitor,
    "Gameplay": Gamepad2,
    "Character Development": UserRound,
    "Co-op and Multiplayer": Users,
    "Co-op Customisation": Settings2,
    "Customization": Fingerprint,
    "Diversity": Zap,
    "Free to Play": Dices,
    "Handling Model": Activity,
    "Learning Curve": LineChart,
    "Progression": TrendingUp,
    "Skill Ceiling": TrendingUp,
    "Track variety": Map,
    "Variety of Game Modes": Layers,
    "Car list": Car,
};

export const getMetricIcon = (name: string) => {
    return METRIC_ICONS[name] || Gamepad2;
};
