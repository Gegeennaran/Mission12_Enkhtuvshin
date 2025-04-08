import { Book } from "../types/Book";

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCat: string[],
  sortOrder: "asc" | "desc",
): Promise<FetchBooksResponse> => {
  try {
    const catParams = selectedCat
      .map((cat) => `bookCats=${encodeURIComponent(cat)}`)
      .join("&");
    const response = await fetch(
      `https://localhost:5000/Book?pageMany=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}${selectedCat.length ? `&${catParams}` : ""}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    return await response.json();
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
