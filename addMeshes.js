import {
	BoxGeometry,
	MeshBasicMaterial,
	MeshStandardMaterial,
	Mesh,
	SphereGeometry,
	MeshPhongMaterial,
	MeshPhysicalMaterial,
	TextureLoader,
	BufferGeometry,
	Shape,
	ShapeGeometry,
	ExtrudeGeometry,
	CircleGeometry,
	TorusGeometry,
	ConeGeometry,
	CylinderGeometry,
	PlaneGeometry,
	LinearMipmapLinearFilter,
	WebGLRenderer,
	CapsuleGeometry,
	MeshMatcapMaterial 

} from 'three'

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const renderer = new WebGLRenderer();
const loader = new TextureLoader()
const textloader = new FontLoader();
loader.generateMipmaps = true;
loader.minFilter = LinearMipmapLinearFilter;
loader.anisotropy = renderer.capabilities.getMaxAnisotropy();


// export const text = () => {
//     return new Promise((resolve, reject) => {
//         textloader.load(
// 			'fonts/helvetiker_bold.typeface.json', 
// 			function (font) {
//             const textGeometry = new TextGeometry(
// 				'Hello three.js!', 
// 				{
//                 font: font,
//                 size: 80,
//                 height: 5,
//                 curveSegments: 12,
//                 bevelEnabled: true,
//                 bevelThickness: 10,
//                 bevelSize: 8,
//                 bevelOffset: 0,
//                 bevelSegments: 5
//             });
// 			const textMaterial = new MeshMatcapMaterial({
// 				matcap: loader.load('matcap1.png'),
// 			})
// 			resolve({ geometry: textGeometry, material: textMaterial });
//         }, undefined, reject);
//     });
//};
// export const flowerModel = () => {
// 	return new Promise((resolve, reject) => {
// 		//using model loader we're going to async load a 3D model from our path
// 		modelLoader.load(
// 			'bouquet.glb',
// 			//this function below is called if our modle is loaded correctly
// 			(gltf) => {
// 				const modelMixer = new AnimationMixer(gltf.scene)
// 				const newMaterial = new MeshMatcapMaterial({
// 					matcap: tLoader.load('matcap1.png'),
// 				})
// 				gltf.scene.traverse((child) =>{
// 					if(child.isMesh){
// 						child.material = newMaterial
// 					}
// 				})
// 				gltf.animations.forEach((clip) => {
// 					modelMixer.clipAction(clip).play()
// 				})
// 				resolve({ scene: gltf.scene, mixer: modelMixer })
// 			}, 
// 			undefined, 
// 			(error) => {
// 				console.error(error)
// 				reject(error)
// 			}

// 		)
// 	})
// }
export const background = () => {
	const background = new PlaneGeometry(100, 100)
	const backgroundMaterial = new MeshBasicMaterial({ color:0xD8BFD8 })
	const plane = new Mesh(background, backgroundMaterial)
	plane.position.set(0, 0, -100)
	// boxMesh.userData.name = 'target1'
	return plane
}


export const cover = () => {
	const covergeo = new PlaneGeometry(100, 100)
	const coverMaterial = new MeshBasicMaterial({ color:0xD8BFD8 })
	const cover = new Mesh(covergeo, coverMaterial)
	cover.position.set(0, 0, 10)
	cover.name = 'cover'
	// boxMesh.userData.name = 'target1'
	return cover
}

export const coverdrop = () => {
	const coverdropgeo = new CircleGeometry(25,32,10,2.5)
	const coverdropMaterial = new MeshBasicMaterial({ color:0x9FC5E8  })
	const coverdrop = new Mesh(coverdropgeo, coverdropMaterial)
	coverdrop.position.set(-2, 26.5, 10)
	// boxMesh.userData.name = 'target1'
	return coverdrop
}

export const coverdrop1 = () => {
	const coverdropgeo1 = new ConeGeometry(0.7,1,4,8)
	const coverdropMaterial1 = new MeshBasicMaterial({ color:0x9FC5E8  })
	const coverdrop1 = new Mesh(coverdropgeo1, coverdropMaterial1)
	coverdrop1.position.set(-8,4, 10)
	coverdrop1.rotation.set(0, 0, 1);
	// boxMesh.userData.name = 'target1'
	return coverdrop1
}





export const button = () => {
	const color = loader.load('cover1.png')
	const buttongeo = new PlaneGeometry(8,4)
	const buttonMaterial = new MeshBasicMaterial({ 
		//color:0x9FC5E8 
		map:color,
	    transparent: true,

	})//blue
	const button = new Mesh(buttongeo, buttonMaterial)
	button.position.set(0, 0, 15)
	button.scale.set(1, 1, 2)
	button.name = 'button'
	// boxMesh.userData.name = 'target1'
	return button
}

export const girlcover = () => {
	const color = loader.load('girlcover.png')
	const girlgeo = new PlaneGeometry(10,14)
	const girlMaterial = new MeshBasicMaterial({ 
		//color:0x9FC5E8 
		map:color,
	    transparent: true,

	})//blue
	const girlcover = new Mesh(girlgeo, girlMaterial)
	girlcover.position.set(0, 0, 14)
	girlcover.scale.set(1, 1, 1)
	girlcover.name = 'girlcover'
	// boxMesh.userData.name = 'target1'
	return girlcover
}


export const magicCircle = () => {
	const color = loader.load('Seal381.png')
	const circle = new CircleGeometry(8,32)
	const circleMaterial = new  MeshBasicMaterial({ 
		map:color,
		transparent: true
	})
	const magicCircle = new Mesh(circle, circleMaterial)
	magicCircle.position.set(0, 0, -7)
	// boxMesh.userData.name = 'target1'
	return magicCircle
}

