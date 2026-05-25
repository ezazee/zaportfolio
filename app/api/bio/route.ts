import { NextResponse } from "next/server";
import { supabase } from "@/common/utils/supabase";

export const GET = async () => {
  const { data, error } = await supabase
    .from("bio")
    .select("*")
    .order("paragraph_index", { ascending: true });
  if (error || !data) return NextResponse.json([], { status: 200 });
  return NextResponse.json(data, { status: 200 });
};
