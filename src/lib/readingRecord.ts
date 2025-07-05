interface AddReadingRecordParams {
  userBookId: string;
  pages: number;
  date: string;
}

export const addReadingRecord = async (params: AddReadingRecordParams) => {
  const response = await fetch("/api/add-record", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
    credentials: "include",
  });

  if (response.status === 401) {
    window.location.href = "/login";
    return;
  }

  if (!response.ok) {
    throw new Error("Failed to add reading record");
  }

  return response.json();
};
