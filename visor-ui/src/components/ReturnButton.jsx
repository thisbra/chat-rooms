import React from "react";
import { useRouter } from "next/navigation";

function ReturnButton({value}) {

  const router = useRouter();

  const handleClick = () => {
    router.push("/chat");
  };

  return (
    <button onClick={handleClick} style={{display: "flex"}} className="pt-3">
        <div className="ml-3 font-bold text-xs hover:underline" style={{color: "#85C1B7"}}>{value}</div>
    </button>
  );
}

export default ReturnButton;