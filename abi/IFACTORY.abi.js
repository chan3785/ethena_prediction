const FACTORY_ABI = [
    {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "bet",
      "inputs": [
        {
          "name": "gameId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "betUp",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "claim",
      "inputs": [
        {
          "name": "gameId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "createGame",
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
          "name": "_priceFeed",
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
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "endBet",
      "inputs": [
        {
          "name": "gameId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "endGame",
      "inputs": [
        {
          "name": "gameId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "lastPrice",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
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
          "name": "gameId",
          "type": "uint256",
          "internalType": "uint256"
        },
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
          "name": "priceFeed",
          "type": "address",
          "internalType": "address"
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
          "name": "tokenVault",
          "type": "address",
          "internalType": "contract TokenVault"
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
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getGame",
      "inputs": [
        {
          "name": "gameId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct Types.Game",
          "components": [
            {
              "name": "gameId",
              "type": "uint256",
              "internalType": "uint256"
            },
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
              "name": "priceFeed",
              "type": "address",
              "internalType": "address"
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
              "name": "tokenVault",
              "type": "address",
              "internalType": "contract TokenVault"
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
              "name": "gameId",
              "type": "uint256",
              "internalType": "uint256"
            },
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
              "name": "priceFeed",
              "type": "address",
              "internalType": "address"
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
              "name": "tokenVault",
              "type": "address",
              "internalType": "contract TokenVault"
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
      "name": "getLatestPrice",
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
      "name": "sUsdeToken",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract ISUSDE"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "sUsdeTokenAddress",
      "inputs": [],
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
      "name": "unstake",
      "inputs": [
        {
          "name": "gameId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "usdeToken",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract IERC20"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "usdeTokenAddress",
      "inputs": [],
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
      "type": "event",
      "name": "BetPlaced",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "betUp",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Claimed",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "reward",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "GameCreated",
      "inputs": [
        {
          "name": "tokenAddress",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "GameEnded",
      "inputs": [
        {
          "name": "lastPrice",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "winnerTokenId",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "PrizeAmount",
      "inputs": [
        {
          "name": "prizeAmount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    }
  ];

export default FACTORY_ABI;