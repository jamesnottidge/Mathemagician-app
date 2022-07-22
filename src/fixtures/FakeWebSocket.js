    export const createMockWebSocketInterface = ({ onOpen, onClose, onMessage, parameters = {name: null}}) => {
        setTimeout( () => {
            onOpen();
            onMessage({
                eventName: "connection:accepted", 
                payload: {
                    playerId: "1"
                }
            });
        }, 500);
        setTimeout( () => {
            onMessage({
                eventName: "online-players", 
                payload: [{
                    id: "1",
                    name: parameters.playerName
                }]
            });
        }, 1000);
        return {close: () => onClose({reason: null})};
    }