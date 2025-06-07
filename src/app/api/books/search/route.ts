import { NextResponse } from "next/server";

const ALADIN_TTB_KEY = process.env.ALADIN_TTB_KEY!;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const start = searchParams.get("start") ?? "1";
  const MaxResults = searchParams.get("MaxResults") ?? "50";
  const sort = searchParams.get("sort") ?? "Accuracy";

  if (!query) {
    return NextResponse.json(
      { error: "query parameter is required" },
      { status: 400 }
    );
  }

  const apiUrl = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ALADIN_TTB_KEY}&Query=${query}&cover=big&start=${start}&sort=${sort}&MaxResults=${MaxResults}&SearchTarget=Book&output=js`;

  const res = await fetch(apiUrl, {});
  const raw = await res.text();
  const noSemi = raw.replace(/;\s*$/, "");
  const sanitized = noSemi.replace(/\\([^"\\/bfnrtu])/g, "\\\\$1");
  const data = JSON.parse(sanitized);

  if (!res.ok) {
    return NextResponse.json({ data }, { status: res.status });
  }
  return NextResponse.json(data);
}
