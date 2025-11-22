interface TuxIconProps {
  size?: number;
  className?: string;
}

export function TuxIcon({ size = 48, className = "" }: TuxIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 身体 */}
      <ellipse cx="24" cy="28" rx="12" ry="14" fill="currentColor" />
      
      {/* 白色肚子 */}
      <ellipse cx="24" cy="30" rx="8" ry="10" fill="white" />
      
      {/* 头部 */}
      <ellipse cx="24" cy="14" rx="10" ry="9" fill="currentColor" />
      
      {/* 眼睛 */}
      <ellipse cx="20" cy="13" rx="2.5" ry="3" fill="white" />
      <ellipse cx="28" cy="13" rx="2.5" ry="3" fill="white" />
      <circle cx="20" cy="13.5" r="1.2" fill="currentColor" />
      <circle cx="28" cy="13.5" r="1.2" fill="currentColor" />
      
      {/* 嘴巴 */}
      <ellipse cx="24" cy="17" rx="1.5" ry="1" fill="#FFA500" />
      <path d="M 22 17 Q 24 19 26 17" stroke="#FFA500" strokeWidth="1" fill="none" />
      
      {/* 脚 */}
      <ellipse cx="19" cy="42" rx="3" ry="2" fill="#FFA500" />
      <ellipse cx="29" cy="42" rx="3" ry="2" fill="#FFA500" />
      
      {/* 翅膀 */}
      <ellipse cx="13" cy="26" rx="3" ry="6" fill="currentColor" transform="rotate(-20 13 26)" />
      <ellipse cx="35" cy="26" rx="3" ry="6" fill="currentColor" transform="rotate(20 35 26)" />
    </svg>
  );
}
