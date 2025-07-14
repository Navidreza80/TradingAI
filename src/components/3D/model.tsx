// 3D imports
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
// Types for type safety
import { ModelProps } from "@/types";

export default function Model({ url, position, rotation, scale }: ModelProps) {
    const { scene } = useGLTF(url) as { scene: THREE.Object3D };
    const meshRef = useRef<THREE.Object3D>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.position.y = position[1];
        }
    });

    // Set uniform scale and size
    scene.scale.set(scale, scale, scale);
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const targetSize = 70;
    const scaleFactor = Math.min(targetSize / size.x, targetSize / size.y) * 0.015;
    scene.scale.multiplyScalar(scaleFactor);

    return (
        <primitive
            ref={meshRef}
            object={scene}
            position={position}
            rotation={rotation}
        />
    );
}