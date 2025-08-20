import React from "react";
import { Search, Target } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  heading?: string;
  mainIcon: React.ReactNode;
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  children: React.ReactNode;
  placeholder?: string;
};

const PageHeader = ({
  heading,
  mainIcon,
  leftIcon,
  rightIcon,
  children,
  placeholder,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex justify-center sm:justify-between items-center gap-8 flex-wrap ">
        <p className="text-primary text-4xl font-semibold">{heading}</p>

        <div className="relative md:mr-28">
          <Target className="absolute -left-4 -top-3 -z-10 -rotate-45 py-3">
            {leftIcon}
          </Target>
          <Target className="z-10 backdrop-blur">{mainIcon}</Target>
          <Target className="absolute -right-4 -z-10 py-3 rotate-45 -top-3">
            {rightIcon}
          </Target>
        </div>
      </div>

      <div
        className="w-full flex flex-wrap gap-6 items-center
      justify-between"
      >
        <div className="w-full md:max-w-3/4 relative flex-1">
        {/* Use Command component instead of search */}
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

          <Input
            type="text"
            placeholder={placeholder || "Search ..."}
            className="pl-10 rounded-md"
          />
        </div>
        <div className="md:max-w-1/4 w-full overflow-x-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageHeader;
