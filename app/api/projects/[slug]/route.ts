import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/common/utils/supabase";
import { getProjectsDataBySlug } from "@/services/projects";

const isAuthor = async () => {
  const session = await getServerSession();
  return session?.user?.email === process.env.NEXT_PUBLIC_AUTHOR_EMAIL;
};

export const GET = async (_req: Request, { params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;
    const data = await getProjectsDataBySlug(slug);
    if (!data) return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: Promise<{ slug: string }> }) => {
  if (!(await isAuthor())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const body = await req.json();
  const { data, error } = await supabase.from("projects").update(body).eq("slug", slug).select().single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
};

export const DELETE = async (_req: Request, { params }: { params: Promise<{ slug: string }> }) => {
  if (!(await isAuthor())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const { error } = await supabase.from("projects").delete().eq("slug", slug);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
};
