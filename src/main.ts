//milestone 1
type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number;
  death_year?: number,
  biography: string,
  image: string
}
//milestone 2
type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: "American" | "British" | "Australian" | "Israeli-American" 
  | "South African" | "French" | "Indian" | "Israeli" 
  | "Spanish" | "South Korean" | "Chinese";
}

//milestone 3
const url: string = 'http://localhost:3333';

//(type guard)
function isActress(data: unknown): data is Actress {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const d = data as Actress;

  const nationalities = ["American", "British", "Australian", "Israeli-American", "South African", "French", "Indian", "Israeli", "Spanish", "South Korean", "Chinese"];

  return (
    typeof d.id === 'number' &&
    typeof d.name === 'string' &&
    typeof d.birth_year === 'number' &&
    typeof d.biography === 'string' &&
    typeof d.image === 'string' &&
    typeof d.awards === 'string' &&
    Array.isArray(d.most_famous_movies) && d.most_famous_movies.length === 3 &&
    nationalities.includes(d.nationality)
  );
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`${url}/actresses/${id}`);

    //controlliamo la proprietà .ok
    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();

    // Verifichiamo che il JSON ricevuto corrisponda al tipo Actress
    if (isActress(data)) {
      return data;
    }

    return null;
  } catch (error) {
    // In caso di errore
    console.error("Errore nel recupero dell'attrice:", error);
    return null;
  }
}

//Chiamata per il test
getActress(1).then(actress => {
  if (actress) {
    console.log("Dati validi:", actress);
  } else {
    console.log("Dati non validi o errore nella chiamata");
  }
});

//milestone 4
async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch(`${url}/actresses`);

    if (!response.ok) {
      //in caso di errore restituiamo un array vuoto
      return [];
    }

    const data: unknown = await response.json();

    // Verifichiamo che i dati siano un array
    if (Array.isArray(data)) {
      // Filtriamo gli elementi mantenendo solo quelli che superano il Type Guard
      return data.filter(isActress);
    }

    return [];
  } catch (error) {
    console.error("Errore nel recupero della lista attrici:", error);
    return [];
  }
}

//test per vedere attrici
getAllActresses().then(actresses => {
  console.log(`Trovate ${actresses.length} attrici`);
  if (actresses.length > 0) {
    console.log(actresses);
  }
});





