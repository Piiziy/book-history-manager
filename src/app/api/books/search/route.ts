import { NextResponse } from "next/server";
import { Parser as Xml2JsParser } from "xml2js";

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

  const apiUrl = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ALADIN_TTB_KEY}&Query=${query}&cover=big&start=${start}&sort=${sort}&MaxResults=${MaxResults}&SearchTarget=Book&output=xml`;

  const resXml = await fetch(apiUrl);
  const xmlText = await resXml.text();
  const parser = new Xml2JsParser({ explicitArray: false });
  const jsonObj = await parser.parseStringPromise(xmlText);

  if (!resXml.ok) {
    return NextResponse.json({ jsonObj }, { status: resXml.status });
  }
  return NextResponse.json(jsonObj.object);
}
