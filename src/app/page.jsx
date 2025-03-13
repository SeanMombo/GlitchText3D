import Image from "next/image";
import R3fCanvas from "../components/canvas";
import ResponsiveBoxGrid from "../components/ResponsiveBoxGrid";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] relative overflow-x-hidden pointer-events-auto">
      {/* <R3fCanvas/>
      <div style={{ height: '100vh', width: '100vw', marginTop: '00vh' }}></div> */}
      <ResponsiveBoxGrid rows={3} cols={2} />
    </div>
  );
}
