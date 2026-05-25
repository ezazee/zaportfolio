import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/common/utils/supabase";

const isAuthor = async () => {
  const session = await getServerSession();
  return session?.user?.email === process.env.NEXT_PUBLIC_AUTHOR_EMAIL;
};

export const PUT = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  if (!(await isAuthor())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { data, error } = await supabase.from("links").update(body).eq("id", id).select().single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
};

export const DELETE = async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
  if (!(await isAuthor())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { error } = await supabase.from("links").delete().eq("id", id);

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
};
