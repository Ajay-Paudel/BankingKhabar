"use client";
import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";

export default function PageWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false); 
    }, 15000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircleLoader color="#d63636" size={80} />
      </div>
    );
  }

  return <>{children}</>;
}
