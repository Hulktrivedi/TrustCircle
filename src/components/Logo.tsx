export function Logo() {
  return (
    <div className="relative flex items-center justify-center">
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Outer circle */}
        <circle
          cx="40"
          cy="40"
          r="38"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="white"
        />
        
        {/* Handshake icon - simplified minimal design */}
        <path
          d="M25 38L30 33C31 32 32.5 32 33.5 33L40 39.5L46.5 33C47.5 32 49 32 50 33L55 38"
          stroke="url(#gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Left hand */}
        <path
          d="M25 38V45C25 46 25.5 47 26.5 47H32"
          stroke="url(#gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Right hand */}
        <path
          d="M55 38V45C55 46 54.5 47 53.5 47H48"
          stroke="url(#gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Connection point */}
        <circle cx="40" cy="39.5" r="3" fill="url(#gradient)" />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
