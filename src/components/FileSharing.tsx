import { useState } from "react";
import { createPeer, connectToPeer, sendFileToPeer } from "./PeerConnection";
import { QRCodeCanvas } from "qrcode.react";
import {
  Upload,
  Link2,
  Loader2,
  CheckCircle,
  XCircle,
  Share2,
} from "lucide-react";
import Spline from "@splinetool/react-spline";

const FileSharing = () => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [peer, setPeer] = useState<any>(null);
  const [connection, setConnection] = useState<any>(null);
  const [status, setStatus] = useState<string>("");
  const [remotePeerId, setRemotePeerId] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

  const initializePeer = () => {
    const newPeer = createPeer(setPeerId);
    setPeer(newPeer);
  };

  const handleConnect = () => {
    if (!peer) return;
    setIsConnecting(true);
    const conn = connectToPeer(peer, remotePeerId, setConnection);
    setConnection(conn);
    setTimeout(() => setIsConnecting(false), 1500);
  };

  const handleSendFile = () => {
    if (connection && file) {
      sendFileToPeer(connection, file, setStatus);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-transparent">
      <Spline
        className="absolute inset-0 w-full h-full"
        scene="https://prod.spline.design/uoniJSBcsERDYsSh/scene.splinecode"
        onMouseDown={() => console.log("Clicked on Spline!")}
        onMouseOver={() => console.log("Hovered on Spline!")}
        onLoad={() => console.log("Spline Loaded!")}
      />

      {!peerId ? (
        <div className="h-full w-full flex flex-col p-6">
          <div className=" relative text-center space-y-6 max-w-2xl">
            <div className="relative ">
              <div className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-30"></div>
            </div>
            <h1 className="  text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300">
              Secure P2P Transfer
            </h1>
            <p className="  text-xl text-blue-100/90">
              Share files directly and securely with end-to-end encryption
            </p>
            <button
              onClick={initializePeer}
              className=" ml-24 mt-8 px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-purple-600 transform hover:scale-[1.02] transition-all duration-200 shadow-[0_0_30px_rgba(167,139,250,0.3)] hover:shadow-[0_0_30px_rgba(167,139,250,0.5)] flex items-center justify-center gap-2 text-lg"
            >
              <Link2 className="w-6 h-6" />
              Start Secure Transfer
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex items-stretch">
          <div className="w-1/2 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-xl p-12 flex flex-col items-center justify-center">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-blue-100">
                  Your Secure ID
                </h2>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <p className="font-mono text-lg text-blue-100 break-all">
                    {peerId}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <QRCodeCanvas value={peerId} size={300} level="H" />
                </div>
              </div>

              <p className="text-blue-100/80 text-center">
                Share this ID or QR code with your recipient to establish a
                secure connection
              </p>
            </div>
          </div>

          <div className="w-1/2 bg-gradient-to-bl from-blue-900/30 to-purple-900/30 backdrop-blur-xl p-12 flex flex-col">
            <div className="max-w-md w-full mx-auto space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-blue-100">
                  Connect & Transfer
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter recipient's Secure ID"
                    value={remotePeerId}
                    onChange={(e) => setRemotePeerId(e.target.value)}
                    className="w-full px-4 py-3 bg-blue-900/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400/30 focus:border-transparent outline-none transition-all duration-200 text-blue-100 placeholder-blue-200/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  />

                  <button
                    onClick={handleConnect}
                    disabled={isConnecting || !remotePeerId}
                    className="w-full py-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    {isConnecting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : connection ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Link2 className="w-5 h-5" />
                    )}
                    {isConnecting
                      ? "Connecting..."
                      : connection
                      ? "Connected"
                      : "Connect"}
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-400/20 file:text-blue-100 hover:file:bg-blue-400/30 text-blue-100 rounded-xl border border-white/10 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  />

                  <button
                    onClick={handleSendFile}
                    disabled={!file || !connection}
                    className="w-full py-4 bg-gradient-to-r from-purple-400 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  >
                    <Upload className="w-5 h-5" />
                    Send File
                  </button>
                </div>
              </div>

              {status && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-2 backdrop-blur-sm shadow-lg ${
                    status.includes("Error")
                      ? "bg-red-500/20 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                      : status.includes("Success")
                      ? "bg-emerald-500/20 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "bg-blue-500/20 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                  }`}
                >
                  {status.includes("Error") ? (
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                  ) : status.includes("Success") ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
                  )}
                  <p className="font-medium">{status}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSharing;
