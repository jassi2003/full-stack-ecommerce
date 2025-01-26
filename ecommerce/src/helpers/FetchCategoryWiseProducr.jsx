import summaryApi from "../common/Index";

const fetchCategoryWise = async (category) => {
  const response = await fetch(summaryApi.getCategoryWise.url, {
    method: summaryApi.getCategoryWise.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

export default fetchCategoryWise;
