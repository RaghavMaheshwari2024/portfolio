import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99] transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="absolute w-[350px] h-[350px] rounded-full filter blur-[80px]"
        style={{
          left: position.x - 175,
          top: position.y - 175,
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.07) 0%, rgba(127, 0, 255, 0.03) 70%, transparent 100%)',
        }}
      />
    </div>
  );
}
