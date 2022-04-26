import type { NextPage } from "next";
import QRCode from "react-qr-code";
import { useCallback, useState } from "react";
import { Twitter, GitHub } from "../react-feather/src";
import Link from "next/link";

const Home: NextPage = () => {
  const [url, setUrl] = useState("");

  const onDownload = useCallback(() => {
    console.log("downloading...");
    const svg = document.getElementById("QRCode") as HTMLElement;

    const data = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const file = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      link.download = "code";
      link.href = `${file}`;
      link.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(data)}`;
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-center items-center h-[400px]">
        <div className="text-9xl font-black">slurp.li</div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <QRCode id="QRCode" value={url || "https://slurp.li"} />
          </div>

          <div className="p-10"></div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">your awsome website url</span>
            </label>
            <input
              type="text"
              placeholder="url"
              className="input input-bordered w-full max-w-xs"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
          <div className="p-10 flex justify-center">
            <button className="btn btn-secondary" onClick={onDownload}>
              Download
            </button>
          </div>
        </div>
      </div>
      <div className="mt-auto h-12 flex justify-between items-center">
        <div className="p-2">© 2022 Dominique Garmier</div>
        <div className="flex">
          <div className="p-2">
            <Link href="https://twitter.com/dominiqgarmier">
              <a>
                <Twitter />
              </a>
            </Link>
          </div>
          <div className="p-2">
            <Link href="https://github.com/dominiquegarmier">
              <a>
                <GitHub />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;