import React, {useEffect} from 'react';
import {useFrame, useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Mesh} from "three"
import {Detailed} from "@react-three/drei";

function Car(props) {

    const gltf = useLoader(
        GLTFLoader,
        "models/car/scene.gltf"
    )

    useEffect(()=>{
        gltf.scene.scale.set(0.004,0.004, 0.004);
        gltf.scene.position.set(0,-0.035,0);
        gltf.scene.traverse((object)=>{
            if(object instanceof Mesh){
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
                object.material.metalness = 1;
                object.material.roughness = 1;
                // reduce pixelation
            }
        })
    },[0])

    useFrame((state,delta)=>{
        let t = state.clock.getElapsedTime();

        let group = gltf.scene.children[0].children[0].children[0];
        group.children[0].rotation.x = t *2;
        group.children[2].rotation.x = t *2;
        group.children[4].rotation.x = t *2;
        group.children[6].rotation.x = t *2;
    })

    return (
        <Detailed
            distances={[0, 10, 20, 0]}
        >
            <primitive object={gltf.scene} />
        </Detailed>
    )
}

export default Car;