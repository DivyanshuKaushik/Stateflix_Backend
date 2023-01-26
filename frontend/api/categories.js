export async function getCategories() {
    const { data } = await API.get("/categories");
    return data.data;
}