import Peer from "peerjs";

export const createPeer = (setPeerId: (id: string) => void) => {
  const peer = new Peer();

  peer.on("open", (id) => {
    console.log("Peer ID:", id);
    setPeerId(id);
  });

  return peer;
};

export const connectToPeer = (peer: Peer, peerId: string, setConnection: (conn: any) => void) => {
  const conn = peer.connect(peerId);

  conn.on("open", () => {
    console.log("Connected to:", peerId);
    setConnection(conn);
  });

  conn.on("error", (err) => {
    console.error("Connection error:", err);
  });

  return conn;
};

export const sendFileToPeer = (connection: any, file: File, setStatus: (status: string) => void) => {
  if (!connection || !file) return;

  const reader = new FileReader();
  reader.onload = () => {
    connection.send({ type: "file", fileName: file.name, content: reader.result });
    setStatus("File sent successfully!");
  };
  reader.readAsArrayBuffer(file);
};
