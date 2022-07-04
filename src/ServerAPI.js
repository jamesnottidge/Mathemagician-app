const SERVER_ADDRESS = "http://localhost:8081";

const parse = async (fetchPromise) => {
    const response = await fetchPromise;
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error((await response.json()).error);
    }
  };
  

export const createGame = (type, rounds) => {
    return parse(
        fetch(SERVER_ADDRESS + "/games", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ type: type, rounds: rounds})
        })
    );
};

export const answerGame = (id, guess) => {
    return parse(
        fetch(SERVER_ADDRESS + `/games/${id}/moves`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                guess: guess
            })
        })
    );
};

export const createServer = () => {
    return {
        createGame: (type, rounds) => createGame(type, rounds),
        answerGame: (id, guess) => answerGame(id, guess)
    };
};