
import Navbar from "@/components/core/Navbar";

import StreamDataWrapper from "./component/StreamDataWrapper";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)] pt-24">
      <Navbar />
    {/* <StreamData/> */}
    <StreamDataWrapper/>
    </div>
  );
}
