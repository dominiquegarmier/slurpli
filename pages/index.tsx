import type { NextPage } from "next";
import QRCode from "react-qr-code";
import { useCallback, useState } from "react";
import { Twitter, GitHub } from "@aw-web-design/react-feather";
import Link from "next/link";
import Head from "next/head";

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
    <>
      <Head>
        <title>slurp.li - QR Code generator</title>
        <meta name="title" content="free, No Bullshit QR Code generator" />
        <meta
          name="description"
          content="here you don't have to signup for us to spam you with unwanted dogshit"
        />
        <meta
          name="keywords"
          content="QR, QRCodes, QRCode, Codes, QR Codes, QR Code, URLS, Links, Share, Dominique Garmier, Garmier, Open Source, Free, No Ads, No Signup, Easy, Fast, Instant, Content Creators, Community, Post, Send, Website"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.slurp.li/" />
        <meta
          property="og:title"
          content="free, No Bullshit QR Code generator"
        />
        <meta
          property="og:description"
          content="here you don't have to signup for us to spam you with unwanted dogshit"
        />
        <meta property="og:image" content="https://slurp.li/metatags.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.slurp.li/" />
        <meta
          name="twitter:title"
          content="free, No Bullshit QR Code generator"
        />
        <meta
          name="twitter:description"
          content="here you don't have to signup for us to spam you with unwanted dogshit"
        />
        <meta name="twitter:image" content="https://slurp.li/metatags.png" />

        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
        <meta name="author" content="Dominique Garmier" />
      </Head>
      <div className="h-screen flex flex-col">
        <div className="flex justify-center items-center h-36 sm:h-96">
          <div className="flex flex-col">
            <div className="text-6xl sm:text-9xl font-black text-center">
              slurp.li
            </div>
            <div className="p-2 text-xl sm:text-3xl">
              your No Bullshit QR Code generator
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <QRCode id="QRCode" value={url || "https://slurp.li"} />
            </div>
            <div className="form-control w-full max-w-xs p-5 sm:p-10">
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
            <div className="p-5 sm:p-10 flex justify-center">
              <button className="btn btn-secondary" onClick={onDownload}>
                Download
              </button>
            </div>
          </div>
        </div>
        <div className="mt-auto flex justify-center">
          <div className="h-12 flex justify-between items-center w-full max-w-[900px]">
            <div className="p-2 text-sm sm:text-md">
              © 2022 Dominique Garmier
            </div>
            <div className="p-2 text-sm md:text-base">
              <Link href="https://github.com/dominiquegarmier/slurpli">
                <a>source</a>
              </Link>
            </div>
            <div className="flex">
              <div className="p-2">
                <Link href="https://twitter.com/dominiqugarmier">
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
      </div>
    </>
  );
};

export default Home;
