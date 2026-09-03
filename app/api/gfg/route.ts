import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = process.env.GFG_USERNAME;

    if (!username) {
      return NextResponse.json(
        { error: "GFG_USERNAME is missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://auth.geeksforgeeks.org/user/${username}/practice/`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        },
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GFG profile");
    }

    const html = await response.text();

    const match = html.match(
      /Problems Solved[\s\S]{0,500}?(\d+)/
    );

    const solved = match ? Number(match[1]) : 0;

    return NextResponse.json({
      platform: "GeeksforGeeks",
      solved,
      username,
    });
  } catch (error) {
    console.error("GFG API Error:", error);

    return NextResponse.json(
      {
        error: "Unable to fetch GFG data",
        solved: 0,
      },
      { status: 500 }
    );
  }
}