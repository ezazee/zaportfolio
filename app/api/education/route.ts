import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/common/utils/supabase";

export const GET = async () => {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("display_order", { ascending: true });
  if (error || !data) return NextResponse.json([], { status: 200 });
  return NextResponse.json(data, { status: 200 });
};

export const POST = async (req: Request) => {
  const session = await getServerSession();
  if (session?.user?.email !== process.env.NEXT_PUBLIC_AUTHOR_EMAIL) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { data, error } = await supabase.from("education").insert(body).select().single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
};
