import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/common/utils/supabase";

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ index: string }> }) => {
  const session = await getServerSession();
  if (session?.user?.email !== process.env.NEXT_PUBLIC_AUTHOR_EMAIL) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { index } = await params;
  const body = await req.json();
  const { data, error } = await supabase
    .from("bio")
    .upsert({ paragraph_index: parseInt(index), content_en: body.content_en, content_id: body.content_id })
    .select()
    .single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
};
