"use client";
import { useEffect, useState } from "react";
import { Avatar } from "@heroui/avatar";
import { getIconPath } from "@/lib/traq";

export default function TrapAvatarMe() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/me")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if (!user) return null;

  return (
    <Avatar
      src={getIconPath(user.iconFileId)}
      alt="icon"
      size="lg"
    />
  );
}