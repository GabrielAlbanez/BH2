import { type } from "os";
import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button"> & {
    isBorder? : boolean
}

export default function Button({isBorder = false, ...props} : ButtonProps) {
  return <button
   data-isBorder = {isBorder}
  className="rounded-2xl text-white bg-purple-500 text-md px-10  py-2 w-[34%]  flex items-center justify-center data-[isBorder=true]:bg-white border-[1px] data-[isBorder=true]: border-purple-500  data-[isBorder=true]:text-black" {...props} />;
}
