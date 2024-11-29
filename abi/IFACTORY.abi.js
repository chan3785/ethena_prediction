const FACTORY_ABI = [
    {
        "type": "function",
        "name": "createEthenaPredict",
        "inputs": [
            {
                "name": "duration",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "minAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "upTokenURI",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "downTokenURI",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract EthenaPredict"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "gameCounter",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "games",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getActiveGameList",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Types.Game[]",
                "components": [
                    {
                        "name": "startTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "markedPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lastPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "minAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "upAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "downAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "prizeAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "isBetEnded",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "isEnded",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "token",
                        "type": "address",
                        "internalType": "contract IERC20"
                    },
                    {
                        "name": "betUsers",
                        "type": "address[]",
                        "internalType": "address[]"
                    },
                    {
                        "name": "winnerTokenId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "bettingToken",
                        "type": "address",
                        "internalType": "contract BettingToken"
                    },
                    {
                        "name": "betEndTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "gameEndTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEndedGameList",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Types.Game[]",
                "components": [
                    {
                        "name": "startTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "markedPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lastPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "minAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "upAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "downAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "prizeAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "isBetEnded",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "isEnded",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "token",
                        "type": "address",
                        "internalType": "contract IERC20"
                    },
                    {
                        "name": "betUsers",
                        "type": "address[]",
                        "internalType": "address[]"
                    },
                    {
                        "name": "winnerTokenId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "bettingToken",
                        "type": "address",
                        "internalType": "contract BettingToken"
                    },
                    {
                        "name": "betEndTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "gameEndTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getGame",
        "inputs": [
            {
                "name": "gameAddress",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Types.Game",
                "components": [
                    {
                        "name": "startTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "markedPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lastPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "minAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "upAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "downAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "prizeAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "isBetEnded",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "isEnded",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "token",
                        "type": "address",
                        "internalType": "contract IERC20"
                    },
                    {
                        "name": "betUsers",
                        "type": "address[]",
                        "internalType": "address[]"
                    },
                    {
                        "name": "winnerTokenId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "bettingToken",
                        "type": "address",
                        "internalType": "contract BettingToken"
                    },
                    {
                        "name": "betEndTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "gameEndTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getGameList",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Types.Game[]",
                "components": [
                    {
                        "name": "startTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "markedPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lastPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "minAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "upAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "downAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "prizeAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "isBetEnded",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "isEnded",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "token",
                        "type": "address",
                        "internalType": "contract IERC20"
                    },
                    {
                        "name": "betUsers",
                        "type": "address[]",
                        "internalType": "address[]"
                    },
                    {
                        "name": "winnerTokenId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "bettingToken",
                        "type": "address",
                        "internalType": "contract BettingToken"
                    },
                    {
                        "name": "betEndTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "gameEndTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    }
];

export default FACTORY_ABI;