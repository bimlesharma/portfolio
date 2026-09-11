import { ImageResponse } from 'next/og';

export const alt = 'Bimlesh — Full Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #09090b, #1e1b4b, #0f172a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            color: '#d8b4fe',
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          bimlesh.dev
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
            }}
          >
            Bimlesh
          </div>
          <div style={{ fontSize: 32, color: '#a1a1aa', maxWidth: 800 }}>
            Full Stack Developer · Software Engineer · AI Explorer
          </div>
        </div>
        <div style={{ fontSize: 22, color: '#71717a' }}>
          Products, projects, and writing
        </div>
      </div>
    ),
    { ...size },
  );
}
