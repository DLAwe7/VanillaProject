export async function fetchData(sourceUrl, options = {}){

  try{
    const response = await fetch(sourceUrl, options);
    if (!response.ok) throw new Error(`Fetch error: ${response.status}`);
    return await response.json();

  }catch (err){
    console.error(err);
    return null;
  }

}

export function formatNumber(number){
    return new Intl.NumberFormat('de-DE').format(number);
  }