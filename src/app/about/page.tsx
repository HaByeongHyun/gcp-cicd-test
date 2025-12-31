import { memo } from "react";

const AboutPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-xl font-bold">This is About Page</div>
    </div>
  );
};

export default memo(AboutPage);
