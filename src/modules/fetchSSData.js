/**
 * @Description - Vue function to fetch data from Google SS Senior Options A School
 * @param {string} url
 * @returns {object} - SS data
 * @importedBy - Home.vue
 */

export async function fetchSSData(url) {
  // ======= Variable Declarations ============ //
  let data = null;
  
  try {
    const res = await fetch(url);

    data = await res.json();
  } catch (e) {
    console.error("There was an error", e);
  }

  return { data };
}
