const url =
  "https://newsapi.org/v2/everything?q=apple&from=2021-07-24&to=2021-07-24&sortBy=popularity&apiKey=d6b896450c9b4e739cad5961b8e9ed10";

export async function getNews() {
  let result = await fetch(url).then(
    response => response.json()
   
    
    ).catch(e => console.log("error",e));
  return result.articles;
}