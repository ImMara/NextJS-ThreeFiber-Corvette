import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Canvas} from "@react-three/fiber";
import {Suspense, useState} from "react";
import {
    CubeCamera,
    Detailed,
    Environment,
    OrbitControls,
    PerformanceMonitor,
    PerspectiveCamera
} from "@react-three/drei";
import Ground from "../components/Ground";
import Car from "../components/Car";
import Ring from "../components/Ring";
import {Boxes} from "../components/Boxes";
import {Bloom, ChromaticAberration, DepthOfField, EffectComposer} from "@react-three/postprocessing";
import {BlendFunction} from 'postprocessing';
import FloatingGrid from "../components/FloatingGrid";

function CarShow(){
    return(
        <>
            {/* to control the 3d  */}
            <OrbitControls
                target={[ 0, 0.50 , 0 ]}
                maxPolarAngle={1.45}
            />

            <PerspectiveCamera
                makeDefault
                fov={50}
                position={[3,2,5]}
            />

            {/* add a background to the canvas */}
            <color
                args={[0,0,0]}
                attach="background"
            />

            <CubeCamera resolution={512} frames={Infinity} >
                {
                    (texture) => (
                        <>
                            <Environment map={texture} />
                            <Car />
                        </>
                    )
                }
            </CubeCamera>


            <Ring/>
            <Boxes />
            {/*<FloatingGrid/>*/}
             <ambientLight intensity={0.3} />

            {/* adding spotlight */}
            <spotLight
                color={[1, 0.25, 0.7]}
                intensity={1.5}
                angle={0.6}
                penumbra={0.5}
                position={[5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />

            <spotLight
                color={[0.14, 0.5, 1]}
                intensity={2}
                angle={0.6}
                penumbra={0.5}
                position={[-5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />

            <Ground/>

           <EffectComposer>
                    <DepthOfField
                        focusDistance={0.0035}
                        focalLength={0.01}
                        bokehScale={3}
                        height={480}
                    />
                    <Bloom
                        blendFunction={BlendFunction.ADD}
                        intensity={0.3}
                        width={300}
                        height={300}
                        kernelSize={5}
                        luminanceThreshold={0.95}
                        lumianceSmoothing={0.025}
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL}
                        offset={[0.0005,0.0012]}
                    />
            </EffectComposer>

            {/*
            <mesh>
                <boxGeometry args={[1,1,1]} />
                <meshBasicMaterial color={"red"} />
            </mesh>
             */}
        </>
    )
}
export default function Home() {
    const [dpr, setDpr] = useState(1.5)

    return (
    <Suspense fallback={null}>
      <Canvas shadows dpr={dpr}>
          <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(0.4)} />
          <CarShow/>
      </Canvas>
    </Suspense>

  )
}
