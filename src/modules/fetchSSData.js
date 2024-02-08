/**
 * @Description - Vue function to fetch data from Google SS Senior Options A School
 * @param {string} url
 * @returns {object} - SS data
 * @importedBy - Home.vue
 */

export async function fetchSSData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    return { data };
  } catch (e) {
    console.error("There was an error", e);
  }
}
