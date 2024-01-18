import { ref, unref, watchEffect, isRef } from "vue";

/**
 * @Description - Vue  composable function to fetch data
 * @param {string} url
 * @returns {object} - Reactive variables
 * @importedBy - Home.vue
 */

export function useFetch(url) {
  // ======= Variable Declarations ============ //

  const data = ref(null);
  const loadingState = ref(true);
  const error = ref(null);

  async function getSS() {
    // reset state before fetching SS ...
    data.value = null;
    error.value = null;

    // unref() will return the ref value if it's a ref
    // otherwise the value will be returned as-is
    const unrefedUrlValue = unref(url);

    try {
      const res = await fetch(unrefedUrlValue);
      loadingState.value = false;
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    }
  }

  // Will refetch data if input url changes when url is a ref
  // resolve the url value synchrously so it's tracked as a
  // dependency by watchEffect()
  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(getSS);
  } else {
    // otherwise, just fetch once
    getSS();
  }

  return { data, loadingState, error };
}
