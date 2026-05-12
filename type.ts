interface TerminalCardProps {
  title: string;
  dataPoints: { label: string; value: string }[];
  description: string;
  delay?: number;
}

interface TypewriterProps {
  text: string;
  startTyping?: boolean;
  speed?: number;
  onComplete?: () => void;
}


