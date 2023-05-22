import React, { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from "./header.module.css"
import { walletFormat } from "../utils"

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  let account = "";
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");
  const getMinaAccounts = async () => await (window as any).mina.requestAccounts();
  const getMinaNetwork = async () => await (window as any).mina.requestNetwork();

  React.useEffect(() => {
  (async () => {
    if ((window as any).mina && address === "") {
      const accounts = await getMinaAccounts();
      setAddress(accounts[0]);
      setNetwork(await getMinaNetwork());
      account = accounts[0];
      console.log("adr");
      console.log(address);
    }
  })();

  return () => {
    // this now gets called when the component unmounts
  };
  }, []);

  const connectWallet = async () => {
    let accounts;
    try {
      accounts = await (window as any).mina.requestAccounts();
      if (accounts?.length > 0) {
         setAddress(accounts[0]);
         console.log("acc")
         console.log(address);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <header>
      <Head>
          <title>Cpone zkProof</title>
          <meta name="description" content="Cryptographic Proof of NFT Endorsement" />
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.imageText}>
        <Image
          src="/buzz-on-moon.jpeg"
          alt="Buzz on the moon"
          width={75}
          height={60}
        />  &nbsp;<h2><div className={styles.orangeOne}>Cryptographic Proof of NFT Endorsement</div></h2>
      </div>
       <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            {account} && loading ? styles.loading : styles.loaded
          }`}
        >
          {{account} && (
            <>
              <span className={styles.signedInText}>
                <small>Connected to Mina account</small>
                <br />
                <strong>{walletFormat(address)}</strong>
              </span>
               <button
                className={styles.buttonPrimary}
                onClick={connectWallet}
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </header>
  )
}
