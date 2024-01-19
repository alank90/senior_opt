
/**
 * @Description - Vue function to fetch data from Google SS
 * @param {string} url
 * @returns {object} - SS data
 * @importedBy - Home.vue
 */

export async function useFetch(url) {
  // ======= Variable Declarations ============ //
  let data = null;

  try {
    const res = await fetch(url);
    data = await res.json();
  } catch (e) {
    console.log(e);
  }

  return { data };
}
