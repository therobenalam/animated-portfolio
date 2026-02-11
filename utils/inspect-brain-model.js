// Script to inspect brain.glb model structure
const fs = require('fs');
const path = require('path');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');
const THREE = require('three');

const modelPath = path.join(__dirname, '../public/models/brain.glb');

const loader = new GLTFLoader();

// Node.js file loader adapter
loader.load(
  modelPath,
  (gltf) => {
    console.log('\n=== BRAIN MODEL STRUCTURE ===\n');
    
    let meshCount = 0;
    const meshes = [];
    
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        meshCount++;
        meshes.push({
          name: child.name || `Unnamed_Mesh_${meshCount}`,
          geometry: {
            vertices: child.geometry.attributes.position?.count || 0,
            triangles: child.geometry.index ? child.geometry.index.count / 3 : 0
          },
          material: child.material.name || 'Unnamed_Material',
          type: child.material.type
        });
        
        console.log(`\nMesh #${meshCount}:`);
        console.log(`  Name: ${child.name || 'Unnamed'}`);
        console.log(`  Vertices: ${child.geometry.attributes.position?.count || 0}`);
        console.log(`  Material: ${child.material.name || 'Unnamed'}`);
        console.log(`  Material Type: ${child.material.type}`);
      }
    });
    
    console.log(`\n\nTotal Meshes: ${meshCount}`);
    console.log('\nMesh Summary:');
    meshes.forEach((mesh, i) => {
      console.log(`  ${i + 1}. ${mesh.name} (${mesh.geometry.vertices} vertices)`);
    });
  },
  (progress) => {
    console.log('Loading:', (progress.loaded / progress.total * 100).toFixed(2) + '%');
  },
  (error) => {
    console.error('Error loading model:', error);
  }
);
