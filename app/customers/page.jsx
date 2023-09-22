"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import CustomerBoard from "@components/CustomerBoard";

const Customers = () => {

  return (
    <CustomerBoard
    />
  );
};

export default Customers;