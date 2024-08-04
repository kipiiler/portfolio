import dynamic from "next/dynamic";

const DynamicPostLayout = dynamic(() => import("../../../components/PostL"), {
  ssr: false,
});

export default DynamicPostLayout;
