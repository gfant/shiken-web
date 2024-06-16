const REACT_APP_CHAIN_ID = process.env.REACT_APP_CHAIN_ID
const REACT_APP_CHAIN_RPC = process.env.REACT_APP_CHAIN_RPC
const REACT_APP_REALM_PATH = process.env.REACT_APP_REALM_PATH
const GO_API_READER = "http://localhost:8080"
const GO_API_EXECUTOR = "http://localhost:8081"

if (!REACT_APP_CHAIN_ID) {
  throw new Error('REACT_APP_CHAIN_ID property not found in .env');
}

if (!REACT_APP_CHAIN_RPC) {
  throw new Error('REACT_APP_CHAIN_RPC property not found in .env');
}

if (!REACT_APP_REALM_PATH) {
  throw new Error('REACT_APP_REALM_PATH property not found in .env');
}

const output = {
  CHAIN_ID: REACT_APP_CHAIN_ID,
  CHAIN_RPC: REACT_APP_CHAIN_RPC,
  REALM_PATH: REACT_APP_REALM_PATH,
  SERVER_URL: GO_API_READER,
  SERVER_EXEC: GO_API_EXECUTOR,
};

export default output;