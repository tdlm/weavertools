"use server";

export default async function fetchJsonUrl(url: string) {
  try {
    const resp = await fetch(url);

    // Get http status.
    const status = resp.status;

    if (status !== 200) {
      return { error: `HTTP ${status}: Error getting data` };
    }

    const text = await resp.json();

    return text;
  } catch (err: any) {
    if (err instanceof TypeError) {
      return { error: err.message };
    }
    console.error(err?.message);
    return { error: err?.message || "Failed to fetch JSON" };
  }
}
