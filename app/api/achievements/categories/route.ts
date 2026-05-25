import { NextRequest, NextResponse } from "next/server";
import { getAchivementCategories } from "@/services/achievements";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const locale = (searchParams.get("locale") as "en" | "id") || "id";
    const data = await getAchivementCategories();
    
    // Map objects to localized strings based on locale
    const localizedData = data.map(item => item[locale]);

    return NextResponse.json(localizedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
