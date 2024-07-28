import { BarProps } from "recharts";

export interface CustomBarProps extends BarProps {
    index?: number; // Added index to identify the bar
  
  }
  
  
  const CustomBar: React.FC<CustomBarProps> = (props) => {
    const { x, y, width, height, fill, index } = props;
    const radius = 5;
  
    // Style the bar differently if it's the one to be highlighted
    const isHighlighted = index === 3; // Example: highlight the fifth bar
    return (
      <g>
        <defs>
        </defs>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={"#EDEDF4"} // Different fill for the highlighted bar
          rx={radius}
          ry={radius}
        />
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke={isHighlighted ? "#1d4ed8" : "#cbd5e1"}
          strokeWidth={isHighlighted ? 1.5 : 1}
          fill="none"
          rx={radius}
          ry={radius}
        />
      </g>
    );
  };
  
  export default CustomBar