import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>

      </Canvas>
    </Suspense>
  )
}
