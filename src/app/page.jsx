import Image from "next/image";
import R3fCanvas from "@/components/canvas";


export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] relative overflow-x-hidden pointer-events-auto">
      <R3fCanvas/>
      <div style={{ height: '100vh', width: '100vw', marginTop: '200vh' }}></div>

    </div>
  );
}
